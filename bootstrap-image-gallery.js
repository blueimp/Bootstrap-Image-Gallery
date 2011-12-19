/*
 * Bootstrap Image Gallery 1.0.2
 * https://github.com/blueimp/Bootstrap-Image-Gallery
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true */
/*global window, document, jQuery */

(function ($) {
    'use strict';
    // Bootstrap Image Gallery is an extension to the Modal dialog of Twitter's
    // Bootstrap toolkit, to ease navigation between a set of gallery images.
    // It features transition effects, fullscreen mode and slideshow functionality.
    $.widget('blueimp.imagegallery', {
        options: {
            // Event handler namespace (defaults to the widget name):
            namespace: undefined,
            // Selector for the gallery images:
            selector: 'a[rel=gallery]',
            // Selector for the modal dialog:
            modalSelector: '#gallery-modal',
            // Selector for the loading animation:
            loaderSelector: '#gallery-loader',
            // Enables or disables the modal backdrop:
            backdrop: true,
            // Enables or disables the modal ESC key support:
            keyboard: true,
            // Offset of image width to viewport width:
            offsetWidth: 100,
            // Offset of image height to viewport height:
            offsetHeight: 200,
            // Set to true to display images as canvas elements:
            canvas: false,
            // Shows the next image after the given time in ms (0 = disabled):
            slideshow: 0
        },
        _load: function (e) {
            var gallery = e.data.gallery,
                options = gallery.options,
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                fullscreen = gallery._modal.hasClass('fullscreen'),
                loadImageOptions;
            e.preventDefault();
            // Prevent multiple modals to open:
            gallery._abortHandler();
            window.clearTimeout(gallery._slideShow);
            gallery.defer = $.Deferred();
            gallery._isModalLink = $(this).parent().hasClass('modal-footer');
            if (gallery._isModalLink) {
                if ($(this).hasClass('next')) {
                    gallery._currentLink = $(gallery._currentLink).data('next');
                } else {
                    gallery._currentLink = $(gallery._currentLink).data('prev');
                }
                gallery._modal.removeClass('in');
            } else {
                gallery._initLinks();
                gallery._currentLink = this;
                gallery._initAbortHandlers();
            }
            if (gallery._isModalLink && gallery._transition &&
                    gallery._modal.hasClass('fade')) {
                gallery._modal.bind(
                    gallery._transitionEnd + '.' + options.namespace,
                    function (e) {
                        // Make sure we don't respond to other transitions events
                        // in the modal container, e.g. from the button elements:
                        if (e.target === gallery._modal[0]) {
                            gallery._modal.unbind(
                                gallery._transitionEnd + '.' + options.namespace
                            );
                            gallery._initModal();
                            gallery.defer.resolve();
                        }
                    }
                );
            } else {
                gallery._modal.hide();
                gallery._initModal();
                gallery.defer.resolve();
            }
            if (fullscreen) {
                loadImageOptions = {
                    minWidth: windowWidth,
                    minHeight: windowHeight,
                    maxWidth: windowWidth,
                    maxHeight: windowHeight,
                    canvas: options.canvas
                };
            } else {
                loadImageOptions = {
                    maxWidth: windowWidth - options.offsetWidth,
                    maxHeight: windowHeight - options.offsetHeight,
                    canvas: options.canvas
                };
            }
            // The timeout prevents the loading animation to show
            // when the image has already been loaded:
            gallery._loadingImageTimeout = window.setTimeout(function () {
                gallery._loader.addClass('in');
            }, 100);
            gallery._loadingImage = window.loadImage(
                gallery._currentLink.href,
                function (img) {
                    gallery._loadHandler(img);
                },
                loadImageOptions
            );
            gallery._preload();
        },
        _loadHandler: function (img) {
            var gallery = this;
            this._abortHandler();
            if (this._isModalLink) {
                this.defer.done(function () {
                    gallery._modal.show();
                    gallery._modal.addClass('in');
                    gallery._initModalBody(img);
                });
            } else {
                this._initModalBody(img);
                this._modal
                    .modal('show');
            }
            if (this.options.slideshow) {
                this._slideShow = window.setTimeout(
                    function () {
                        gallery._next();
                    },
                    this.options.slideshow
                );
            }
        },
        _initLinks: function () {
            var links = $(this.element).find(this.options.selector);
            links.each(function (i, current) {
                // Check the two previous and the two next links, to account
                // for thumbnail and name linking twice to the same image:
                var prev = links[i - 1],
                    next = links[i + 1];
                if (!prev || prev.href === current.href) {
                    prev = links[i - 2];
                    if (!prev || prev.href === current.href) {
                        prev = links[links.length - 1];
                    }
                }
                if (!next || next.href === current.href) {
                    next = links[i + 2];
                    if (!next || next.href === current.href) {
                        next = links[0];
                    }
                }
                $(current).data('prev', prev);
                $(current).data('next', next);
            });
        },
        _initModal: function () {
            var prev = $(this._currentLink).data('prev'),
                next = $(this._currentLink).data('next');
            this._modalTitle.text(this._currentLink.title);
            this._modalDownload.prop('href', this._currentLink.href);
            this._modalPrev
                .prop('href', prev.href)
                .prop('title', prev.title);
            this._modalNext
                .prop('href', next.href)
                .prop('title', next.title);
        },
        _initModalBody: function (img) {
            this._modalBody.empty().append(img);
            this._modal
                .css('margin-top', -(this._modal.outerHeight() / 2))
                .css('margin-left', -(this._modal.outerWidth() / 2));
        },
        _preload: function () {
            // Preload the next and previous images:
            $('<img>').prop('src', $(this._currentLink).data('next').href);
            $('<img>').prop('src', $(this._currentLink).data('prev').href);
        },
        _abortHandler: function () {
            window.clearTimeout(this._loadingImageTimeout);
            this._destroyAbortHandlers();
            if (this._loadingImage) {
                this._loadingImage.onload = this._loadingImage.onerror = null;
            }
            this._loader.removeClass('in');
        },
        _escapeHandler: function (e) {
            var gallery = e.data.gallery;
            if (e.keyCode === 27) { // ESC key
                gallery._abortHandler();
            }
        },
        _documentClickHandler: function (e) {
            var gallery = e.data.gallery;
            // The closest() test prevents the click event
            // bubbling up from aborting the image load:
            if (!$(e.target).closest(gallery._currentLink).length) {
                gallery._abortHandler();
            }
        },
        _initAbortHandlers: function () {
            var eventData = {gallery: this};
            $(document)
                .bind(
                    'keydown.' + this.options.namespace,
                    eventData,
                    this._escapeHandler
                )
                .bind(
                    'click.' + this.options.namespace,
                    eventData,
                    this._documentClickHandler
                );
        },
        _destroyAbortHandlers: function () {
            $(document)
                .unbind(
                    'keydown.' + this.options.namespace,
                    this._escapeHandler
                )
                .unbind(
                    'click.' + this.options.namespace,
                    this._documentClickHandler
                );
        },
        _prev: function () {
            this._modalPrev.click();
        },
        _next: function () {
            this._modalNext.click();
        },
        _keyHandler: function (e) {
            var gallery = e.data.gallery;
            switch (e.which) {
            case 37: // left
            case 38: // up
                gallery._prev();
                return false;
            case 39: // right
            case 40: // down
                gallery._next();
                return false;
            }
        },
        _wheelHandler: function (e) {
            var gallery = e.data.gallery;
            e = e.originalEvent;
            gallery._wheelCounter = gallery._wheelCounter || 0;
            gallery._wheelCounter += (e.wheelDelta || e.detail || 0);
            if ((e.wheelDelta && gallery._wheelCounter >= 120) ||
                    (!e.wheelDelta && gallery._wheelCounter < 0)) {
                gallery._prev();
                gallery._wheelCounter = 0;
            } else if ((e.wheelDelta && gallery._wheelCounter <= -120) ||
                        (!e.wheelDelta && gallery._wheelCounter > 0)) {
                gallery._next();
                gallery._wheelCounter = 0;
            }
            return false;
        },
        _showHandler: function (e) {
            var gallery = e.data.gallery,
                options = gallery.options,
                eventData = {gallery: gallery};
            $(document)
                .bind(
                    'keydown.' + options.namespace,
                    eventData,
                    gallery._keyHandler
                )
                .bind(
                    'mousewheel.' + options.namespace +
                        ', DOMMouseScroll.' + options.namespace,
                    eventData,
                    gallery._wheelHandler
                );
        },
        _hideHandler: function (e) {
            var gallery = e.data.gallery,
                options = gallery.options;
            $(document)
                .unbind(
                    'keydown.' + options.namespace,
                    gallery._keyHandler
                )
                .unbind(
                    'mousewheel.' + options.namespace +
                        ', DOMMouseScroll.' + options.namespace,
                    gallery._wheelHandler
                );
            gallery._abortHandler();
            window.clearTimeout(gallery._slideShow);
        },
        _initEventHandlers: function () {
            var gallery = this,
                eventData = {gallery: this};
            $(this.element).delegate(
                this.options.selector,
                'click.' + this.options.namespace,
                eventData,
                this._load
            );
            this._modalPrev.bind(
                'click.' + this.options.namespace,
                eventData,
                this._load
            );
            this._modalNext.bind(
                'click.' + this.options.namespace,
                eventData,
                this._load
            );
            this._modalBody.bind(
                'click.' + this.options.namespace,
                eventData,
                function (e) {
                    if (e.altKey) {
                        gallery._prev();
                    } else {
                        gallery._next();
                    }
                }
            );
            this._modal
                .bind(
                    'show.' + this.options.namespace,
                    eventData,
                    this._showHandler
                )
                .bind(
                    'hide.' + this.options.namespace,
                    eventData,
                    this._hideHandler
                );
        },
        _destroyEventHandlers: function () {
            this._modalPrev.unbind('click.' + this.options.namespace);
            this._modalNext.unbind('click.' + this.options.namespace);
            this._modalBody.unbind('click.' + this.options.namespace);
            this._modal
                .unbind('show.' + this.options.namespace)
                .unbind('hide.' + this.options.namespace);
            $(this.element).undelegate(
                this.options.selector,
                'click.' + this.options.namespace
            );
        },
        _initTransitionSupport: function () {
            var that = this,
                style = (document.body || document.documentElement).style,
                suffix = '.' + that.options.namespace;
            that._transition = style.transition !== undefined ||
                style.WebkitTransition !== undefined ||
                style.MozTransition !== undefined ||
                style.MsTransition !== undefined ||
                style.OTransition !== undefined;
            if (that._transition) {
                that._transitionEnd = [
                    'TransitionEnd',
                    'webkitTransitionEnd',
                    'transitionend',
                    'oTransitionEnd'
                ].join(suffix + ' ') + suffix;
            }
        },
        _create: function () {
            this.options.namespace = this.options.namespace || this.widgetName;
            this._modal = $(this.options.modalSelector).modal({
                backdrop: this.options.backdrop,
                keyboard: this.options.keyboard
            });
            this._loader = $(this.options.loaderSelector);
            this._modalTitle = this._modal.find('.modal-header .title');
            this._modalBody = this._modal.find('.modal-body');
            this._modalDownload = this._modal.find('.modal-footer .download');
            this._modalPrev = this._modal.find('.modal-footer .prev');
            this._modalNext = this._modal.find('.modal-footer .next');
            this._initTransitionSupport();
            this._initEventHandlers();
        },
        destroy: function () {
            window.clearTimeout(this._slideShow);
            this._destroyEventHandlers();
            $.Widget.prototype.destroy.call(this);
        }
    });
}(jQuery));
