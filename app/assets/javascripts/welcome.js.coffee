# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$ ->
  $('[data-behavior=start_magazine]').click (event) ->
    $('#registration_overlay').show()
    $('input#organisation_name').focus()
    event.preventDefault()

  $('[data-behavior=cancel_start_magazine]').click (event) ->
    $('#registration_overlay').hide()
    event.preventDefault()