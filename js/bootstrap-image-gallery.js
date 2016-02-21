/*
 * Bootstrap Image Gallery
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*global define, window */

;(function (factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    define([
      'jquery',
      './blueimp-gallery'
    ], factory)
  } else {
    factory(
      window.jQuery,
      window.blueimp.Gallery
    )
  }
}(function ($, Gallery) {
  'use strict'

  $.extend(Gallery.prototype.options, {
    useBootstrapModal: true
  })

  var close = Gallery.prototype.close
  var imageFactory = Gallery.prototype.imageFactory
  var videoFactory = Gallery.prototype.videoFactory
  var textFactory = Gallery.prototype.textFactory

  $.extend(Gallery.prototype, {
    modalFactory: function (obj, callback, factoryInterface, factory) {
      if (!this.options.useBootstrapModal || factoryInterface) {
        return factory.call(this, obj, callback, factoryInterface)
      }
      var that = this
      var modalTemplate = this.container.children('.modal')
      var modal = modalTemplate.clone().show().on('click', function (event) {
        // Close modal if click is outside of modal-content:
        if (event.target === modal[0] ||
          event.target === modal.children()[0]) {
          event.preventDefault()
          event.stopPropagation()
          that.close()
        }
      })
      var element = factory.call(this, obj, function (event) {
        callback({
          type: event.type,
          target: modal[0]
        })
        modal.addClass('in')
      }, factoryInterface)
      modal.find('.modal-title').text(element.title || String.fromCharCode(160))
      modal.find('.modal-body').append(element)
      return modal[0]
    },

    imageFactory: function (obj, callback, factoryInterface) {
      return this.modalFactory(obj, callback, factoryInterface, imageFactory)
    },

    videoFactory: function (obj, callback, factoryInterface) {
      return this.modalFactory(obj, callback, factoryInterface, videoFactory)
    },

    textFactory: function (obj, callback, factoryInterface) {
      return this.modalFactory(obj, callback, factoryInterface, textFactory)
    },

    close: function () {
      this.container.find('.modal').removeClass('in')
      close.call(this)
    }

  })
}))
