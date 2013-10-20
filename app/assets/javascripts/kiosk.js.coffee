# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  $('[data-behavior=manage_issues]').click (event) ->
    $('.issue_actions').toggle('blind')
    $(this).toggleClass('toggled')
    event.preventDefault()