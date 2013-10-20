// jQuery pageSwipe - Page swiping plugin for jQuery
// Copyright (C) 2012  Michiel Sikkes <michiel@firmhouse.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function( $ ) {
  $.fn.pageSwipe = function( ) {

    viewportHeight = $(window).height();
    viewportWidth = $(window).width();

    if (viewportHeight > 1024) {
      remaining = viewportHeight - 1024
      remainingHeight = (remaining / 2) + 'px '
      viewportHeight = 1024
    } else {
      remainingHeight = ''
    }

    if (viewportWidth > 768) {
      viewportWidth = 768
    }

    viewPortWidthCSS = viewportWidth

    var pageswipe_viewport = $(this)
    pageswipe_viewport.addClass("pageswipe_viewport viewport")

    pages_wrapper = pageswipe_viewport.children(".pages")

    pageswipe_viewport.css({height: viewportHeight + 'px', width: viewPortWidthCSS, margin: remainingHeight + 'auto', overflow: "hidden", position: "relative"})

    var numberOfPages = pages_wrapper.children('.page').length

    pages_wrapper.css({width: numberOfPages*viewPortWidthCSS, position: "absolute"})
    pages_wrapper.children('.page').css({width: viewportWidth + "px", "overflow": "hidden", "float": "left", height: viewportHeight})

    var that = pages_wrapper
    var pagesStartPosition = 0
    var horizontalTouchStart = null
    var verticalTouchStart = null
    var scrollDirection = null
    var currentPage = 1
    var touchDown = false

    initializeCurrentPage()
    initializeSwipeCallbacks()

    $(pages_wrapper).on('click.pageswipe', '.page[data-link-to]', function() {
      window.location.href = $(this).attr('data-link-to')
    })

    if(pages_wrapper.children('.page[data-goto-page]').length > 0) {
      page_number = $('.pages > div.page').index($('div[data-goto-page]')[0]) + 1;
      nextPosition = (page_number - 1) * -viewportWidth;
      currentPage = page_number

      slideToPosition(nextPosition, false);

      showOrHidePageNav()
      initializeCurrentPage()
    }

    function initializeSwipeCallbacks() {

    $(window).on('orientationchange', function() {

      viewportHeight = $(window).height();
      viewportWidth = $(window).width();

      nextPosition = (currentPage -1) * -viewportWidth;
      that[0].style.WebkitTransform = "translate3d("  + nextPosition + "px,0,0)"

      $('.viewport').css({height: viewportHeight + 'px', width: viewportWidth + 'px', margin: remainingHeight + 'auto', overflow: "hidden", position: "relative"})
      that.css({width: (numberOfPages * viewportWidth) + "px", height: viewportHeight + 'px'})
      $('.page').css({width: viewportWidth + "px", height: viewportHeight + 'px'})

      if (window.orientation == 0) {
        $(body).addClass('portrait')
        $(body).removeClass('landscape')
      } else {
        $(body).addClass('landscape')
        $(body).removeClass('portrait')
      }
    })

    $(pages_wrapper).on("click.pageswipe", "a", function(event) {
      if (scrollDirection) {
        event.originalEvent.preventDefault()
      } else {
      }
    });

    $(pages_wrapper).on("click.pageswipe", "a[data-behavior=browse-to-page]", function(event) {

      if (!scrollDirection) { /* Prevent clicking when we are swiping */
        page_number = $(this).attr('data-page-number');
        nextPosition = (page_number - 2) * -viewportWidth;
        currentPage = page_number - 1

        slideToPosition(nextPosition, false)


        showOrHidePageNav()
        initializeCurrentPage()
      }

      event.originalEvent.preventDefault()
      return false;
    })

    $(pages_wrapper).on('click.pageswipe', "a[data-behavior=to-table-of-contents]", function(event) {

      if (!scrollDirection) {
        page_number = $('.pages > div.page').index($('div#table_of_contents')[0]) + 1;
        nextPosition = (page_number - 1) * -viewportWidth;
        currentPage = page_number

        slideToPosition(nextPosition, false);
        showOrHidePageNav()
        initializeCurrentPage()
      }
      event.originalEvent.preventDefault()
      return false;
    });

    $("a[data-behavior=to-previous-page]").bind('click.pageswipe', function(event) {

      if (!scrollDirection) {
        currentPage--
        nextPosition = (currentPage - 1) * -viewportWidth;

        slideToPosition(nextPosition)
        showOrHidePageNav()
        initializeCurrentPage()
      }

      event.originalEvent.preventDefault()
      return false;
    });

    $('a[data-behavior=to-next-page]').bind('click.pageswipe', function(event) {
      if (!scrollDirection) {
        next_page = currentPage + 1
        nextPosition = currentPage * -viewportWidth;
        currentPage++

        slideToPosition(nextPosition)
        showOrHidePageNav()
        initializeCurrentPage()
      }

      event.originalEvent.preventDefault()
      return false;
    });

    $(pages_wrapper).bind('webkitTransitionEnd', function () {
      this.style.WebkitTransition = ''
      initializeCurrentPage()
    })

    $(pages_wrapper).bind('otransitionend', function () {
      this.style.OTransition = ''
      initializeCurrentPage()
    })

    $(pages_wrapper).bind('transitionend', function () {
      this.style.MozTransition = ''
      initializeCurrentPage()
    })

    $(pages_wrapper).bind('MSTransitionEnd', function() {
      this.style.MSTransition = ''
      initializeCurrentPage()
    })

    $(document).bind('touchstart.pageswipe mousedown.pageswipe', function(event) {
      e = event.originalEvent

      scrollDirection = null

      pagesStartPosition = that.position().left

      touchDown = true

      if (e.type == 'mousedown') {
        horizontalTouchStart = e.clientX
        verticalTouchStart = e.pageY
        e.preventDefault()

      } else {

        horizontalTouchStart = e.touches[0].pageX
        verticalTouchStart = e.touches[0].pageY

      }

    })

    $(document).bind('touchmove.pageswipe mousemove.pageswipe', function(event) {

      if (!touchDown) {
        return true;
      }

      e = event.originalEvent

      if (e.type == 'mousemove') {
        horizontalTouchPosition = e.clientX
      } else {
        horizontalTouchPosition = e.touches[0].pageX
      }

      horizontalTouchDelta = horizontalTouchPosition - horizontalTouchStart

      if (e.type == 'mousemove') {
        verticalTouchPosition = e.pageY
      } else {
        verticalTouchPosition = e.touches[0].pageY
      }

      verticalTouchDelta = verticalTouchPosition - verticalTouchStart

      if (horizontalTouchDelta > 0) {
        horizontalDirection = "right"
      } else if (horizontalTouchDelta < 1) {
        horizontalDirection = "left"
      }

      selecting = false;

      if (window.getSelection) {
        if (window.getSelection().type == "Range") {
          selecting = true;
        }
      }

      if (!scrollDirection && !selecting) {
        /* We do not have a scrollDirection yet. So we are going to figure it
           out: */
        if (Math.abs(horizontalTouchDelta) > 10) {
          scrollDirection = "h"
        }

        if (Math.abs(verticalTouchDelta) > 10) {
          scrollDirection = "v"
        }
      }

      if (scrollDirection == "h") {
        if (e.preventDefault) {
          e.preventDefault() /* Disable other scroll directions when we are scrolling horizontally */
        }
        if (
          (horizontalDirection == "right" && currentPage > 1) || /* Make sure we cannot scroll to the left of the first page. */
          (horizontalDirection == "left" && currentPage < numberOfPages) /* Make sure we cannot scroll beyond the last page. */
        ) {
          that[0].style.WebkitTransform = "translate3d(" + (pagesStartPosition + horizontalTouchDelta) + "px,0,0)"
          that[0].style.msTransform = "translate(" + (pagesStartPosition + horizontalTouchDelta) + "px, 0)"
          that[0].style.MozTransform = "translateX(" + (pagesStartPosition + horizontalTouchDelta) + "px)"
          that[0].style.OTransform = "translateX(" + (pagesStartPosition + horizontalTouchDelta) + "px)"

          if (jQuery.browser.version == "8.0") {
            that[0].style.left = (pagesStartPosition + horizontalTouchDelta)
          }
        }
      }
    })

    $(document).bind('touchend.pageswipe mouseup.pageswipe', function(event) {
      touchDown = false
      e = event.originalEvent

      if (e.type == 'mouseup') {
        horizontalTouchEnd = e.clientX
      } else {
        horizontalTouchEnd = e.changedTouches[0].pageX
      }

      horizontalTouchDelta = horizontalTouchStart - horizontalTouchEnd

      if (scrollDirection == "h") {
        if (horizontalTouchDelta > 0 && currentPage < numberOfPages) {
          nextPosition = (-viewportWidth * (currentPage))
          that[0].style.WebkitTransition = 'all .2s ease-in-out'
          that[0].style.WebkitTransform = "translate3d("  + nextPosition + "px,0,0)"

          that[0].style.msTransition = 'all .2s ease-in-out'
          that[0].style.msTransform = "translate(" + nextPosition + "px, 0)"

          that[0].style.MozTransition = 'all .2s ease-in-out'
          that[0].style.MozTransform = "translateX("  + nextPosition + "px)"

          that[0].style.OTransition = 'all .2s ease-in-out'
          that[0].style.OTransform = "translateX(" + nextPosition + "px)"

          if (jQuery.browser.version == "8.0") {
            that[0].style.left = nextPosition
          }
          currentPage++
        } else if (horizontalTouchDelta < 0 && currentPage > 1) {
          currentPage--
          nextPosition = (-viewportWidth * (currentPage - 1))
          that[0].style.WebkitTransition = 'all .2s ease-in-out'
          that[0].style.WebkitTransform = "translate3d("  + nextPosition + "px,0,0)"

          that[0].style.msTransition = 'all .2s ease-in-out'
          that[0].style.msTransform = "translate(" + nextPosition + "px, 0)"

          that[0].style.MozTransition = 'all .2s ease-in-out'
          that[0].style.MozTransform = "translateX("  + nextPosition + "px)"

          that[0].style.OTransition = 'all .2s ease-in-out'
          that[0].style.OTransform = "translateX(" + nextPosition + "px)"

          if (jQuery.browser.version == "8.0") {
            that[0].style.left = nextPosition
          }
        }
        showOrHidePageNav()
        initializeCurrentPage()
      }
    })
    }

    function showOrHidePageNav() {

      if(currentPage == 1) {
        $('#previous_page_nav').fadeOut()
      } else {
        $('#previous_page_nav').fadeIn()
      }

      if(currentPage == numberOfPages) {
        $('#next_page_nav').fadeOut()
      } else {
        $('#next_page_nav').fadeIn()
      }

    }

    function initializeCurrentPage(callback) {
      var current_page = $('.pages > .page').get(currentPage - 1);

      loadPage(current_page)

      if(history.pushState) {
        history.pushState({}, "Article", $(current_page).attr('data-page-url'))
      }

      document.title = $(current_page).attr('data-page-title')

      if ($(current_page).next('.page').length > 0) {
        next_page = loadPage($(current_page).next('.page'))
      }

      if ($(current_page).prev('.page').length > 0) {
        prev_page = loadPage($(current_page).prev('.page'))
      }

      current_page_in_loaded = $('.pages > .page[data-loaded=loaded]').index(current_page)
      if (current_page_in_loaded > 1) {
        clearPages($('.pages > .page[data-loaded=loaded]:lt(' + (current_page_in_loaded - 1) + ')'))
        clearPages($('.pages > .page[data-loaded=loaded]:gt(' + (current_page_in_loaded + 1) + ')'))
      }
    }

    function clearPages(elements) {
      $.each(elements, function() {
        new_page = $('<div></div>')
        new_page.addClass('page')
        new_page.css({"float": "left", "width": viewportWidth, "height": viewportHeight, "position": "relative"})
        new_page.attr('data-page-url', $(this).attr('data-page-url'))
        new_page.attr('data-link-to', $(this).attr('data-link-to'))
        new_page.attr('data-page-title', $(this).attr('data-page-title'))
        new_page.attr('id', $(this).attr('id'))
        $(this).replaceWith(new_page)
      })
    }

    function loadPage(page_element, callback) {
      page_url = $(page_element).attr('data-page-url')
      var callback = callback

      var page = page_element;
      if($(page).attr('data-loaded') != "loaded") {
        $.get(page_url, function(data) {
          $(page).attr('class', $(data).attr('class'))
          $(page).attr('data-link-to', $(data).attr('data-link-to'))
          $(page).css('background-image', $(data).css('background-image'))
          $(page).css({"overflow-y": "scroll", "-webkit-overflow-scrolling": "touch"})
          $(page).html($(data).html())
          matchdata = data.match('<script.*>(.*)</script>')
          if (matchdata) {
            $(page).append(matchdata[0])
          }
          $(page).attr('data-loaded', 'loaded')

          $(document).trigger('pageswipe:pageload', page)
        })
      }

      return page
    }

    function slideToPosition(nextPosition, withAnimation) {
      if(withAnimation !== false) {
        that[0].style.MozTransition = 'all .2s ease-in-out'
        that[0].style.WebkitTransition = 'all .2s ease-in-out'
        that[0].style.msTransition = 'all .2s ease-in-out'
      }

      if (jQuery.browser.version == "8.0" || jQuery.browser.version == "7.0") {
        that[0].style.left = nextPosition
      }


      that[0].style.msTransform = "translate(" + nextPosition + "px, 0)"
      that[0].style.WebkitTransform = "translate3d("  + nextPosition + "px,0,0)"
      that[0].style.MozTransform = "translateX("  + nextPosition + "px)"
    }

    return this
  };
})( jQuery )
