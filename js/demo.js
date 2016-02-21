/*
 * Bootstrap Image Gallery JS Demo
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global blueimp, $ */

$(function () {
  'use strict'

  // Load demo images from flickr:
  $.ajax({
    // Flickr API is SSL only:
    // https://code.flickr.net/2014/04/30/flickr-api-going-ssl-only-on-june-27th-2014/
    url: 'https://api.flickr.com/services/rest/',
    data: {
      format: 'json',
      method: 'flickr.interestingness.getList',
      api_key: '7617adae70159d09ba78cfec73c13be3' // jshint ignore:line
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
  }).done(function (result) {
    var linksContainer = $('#links')
    var baseUrl
    // Add the demo images as links with thumbnails to the page:
    $.each(result.photos.photo, function (index, photo) {
      baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
      photo.server + '/' + photo.id + '_' + photo.secret
      $('<a/>')
        .append($('<img>').prop('src', baseUrl + '_s.jpg'))
        .prop('href', baseUrl + '_b.jpg')
        .prop('title', photo.title)
        .attr('data-gallery', '')
        .appendTo(linksContainer)
    })
  })

  $('#borderless-checkbox').on('change', function () {
    var borderless = $(this).is(':checked')
    $('#blueimp-gallery').data('useBootstrapModal', !borderless)
    $('#blueimp-gallery').toggleClass('blueimp-gallery-controls', borderless)
  })

  $('#fullscreen-checkbox').on('change', function () {
    $('#blueimp-gallery').data('fullScreen', $(this).is(':checked'))
  })

  $('#image-gallery-button').on('click', function (event) {
    event.preventDefault()
    blueimp.Gallery($('#links a'), $('#blueimp-gallery').data())
  })

  $('#video-gallery-button').on('click', function (event) {
    event.preventDefault()
    blueimp.Gallery([
      {
        title: 'Sintel',
        href: 'https://archive.org/download/Sintel/sintel-2048-surround_512kb.mp4',
        type: 'video/mp4',
        poster: 'https://i.imgur.com/MUSw4Zu.jpg'
      },
      {
        title: 'Big Buck Bunny',
        href: 'https://upload.wikimedia.org/wikipedia/commons/7/75/' +
          'Big_Buck_Bunny_Trailer_400p.ogg',
        type: 'video/ogg',
        poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/' +
          'Big.Buck.Bunny.-.Opening.Screen.png/' +
          '800px-Big.Buck.Bunny.-.Opening.Screen.png'
      },
      {
        title: 'Elephants Dream',
        href: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/83/' +
          'Elephants_Dream_%28high_quality%29.ogv/' +
          'Elephants_Dream_%28high_quality%29.ogv.360p.webm',
        type: 'video/webm',
        poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
          'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
      },
      {
        title: 'LES TWINS - An Industry Ahead',
        type: 'text/html',
        youtube: 'zi4CIXpx7Bg'
      },
      {
        title: 'KN1GHT - Last Moon',
        type: 'text/html',
        vimeo: '73686146',
        poster: 'https://secure-a.vimeocdn.com/ts/448/835/448835699_960.jpg'
      }
    ], $('#blueimp-gallery').data())
  })
})
