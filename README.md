# Bootstrap Image Gallery

## Demo
[Bootstrap Image Gallery Demo](http://blueimp.github.com/Bootstrap-Image-Gallery/)

## Description
Bootstrap Image Gallery is an extension to the [Modal](http://twitter.github.com/bootstrap/javascript.html#modal) dialog of Twitter's [Bootstrap](http://twitter.github.com/bootstrap/) toolkit, to ease navigation between a set of gallery images.  
It features mouse and keyboard navigation, transition effects, fullscreen mode and slideshow functionality.

## Usage

### Preparation
Add the following HTML snippet to the head section of your webpage:

```html
<link rel="stylesheet" href="http://twitter.github.com/bootstrap/1.4.0/bootstrap.min.css">
<link rel="stylesheet" href="bootstrap-image-gallery.min.css">
<!--[if lt IE 7]>
<style type="text/css">
/* The following is required for Modals to work on IE6 */
.modal {
    position: absolute;
    top: 50%;
    filter: none;
}
#gallery-modal.fullscreen {
    overflow: hidden;
}
</style>
<![endif]-->
```

Add the following HTML snippet to the body of your webpage:

```html
<!-- gallery-loader is the loading animation container -->
<div id="gallery-loader"></div>
<!-- gallery-modal is the modal dialog used for the image gallery -->
<div id="gallery-modal" class="modal hide fade">
    <div class="modal-header">
        <a href="#" class="close">&times;</a>
        <h3 class="title"></h3>
    </div>
    <div class="modal-body"></div>
    <div class="modal-footer">
        <a class="btn primary next">Next</a>
        <a class="btn info prev">Previous</a>
        <a class="btn success download" target="_blank">Download</a>
    </div>
</div>
```

Include the following scripts:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="vendor/jquery.ui.widget.min.js"></script>
<script src="http://twitter.github.com/bootstrap/1.4.0/bootstrap-modal.min.js"></script>
<script src="http://blueimp.github.com/JavaScript-Load-Image/load-image.min.js"></script>
<script src="bootstrap-image-gallery.min.js"></script>
```

Note that you don't need to include the [jQuery UI widget factory](http://wiki.jqueryui.com/w/page/12138135/Widget%20factory) if you already use [jQuery UI](http://jqueryui.com/) on your webpage.

### Initialization
Initialize the Image Gallery widget by calling the **imagegallery()** method on a [jQuery](http://jquery.com/) container element containing a set of links to image files with the attribute **rel="gallery"**:

```html
<div id="gallery">
    <a href="banana.jpg" title="Banana" rel="gallery">Banana</a>
    <a href="apple.jpg" title="Apple" rel="gallery">Apple</a>
    <a href="orange.jpg" title="Orange" rel="gallery">Orange</a>
</div>
```

```js
$('#gallery').imagegallery();
```

Note that you can also add links to the container element at a later stage, as the Image Gallery widget makes use of [jQuery's delegate method](http://api.jquery.com/delegate/) to bind its click event handler to the link elements.

## API

### Options
It is possible to use different selectors for the modal and the image files and to change a number of other settings by passing a map of options to the **imagegallery()** method:

```js
$('#gallery').imagegallery({
    // Event handler namespace:
    namespace: 'imagegallery',
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
});
```

### Fullscreen mode
Fullscreen mode is enabled by adding the CSS class "fullscreen" to the modal element:

```js
$('#gallery-modal').addClass('fullscreen');
```

Please refer to the demo source code on how to enable real fullscreen mode on supported browsers.

### Widget deinitialization
To remove the widget and its event handlers, call it with the string "destroy" as parameter:

```js
$('#gallery').imagegallery('destroy');
```

## Requirements
* [jQuery](http://jquery.com/) v. 1.6+
* [jQuery UI widget factory](http://wiki.jqueryui.com/w/page/12138135/Widget%20factory) v. 1.8.16+ (included)
* [Bootstrap Modal](http://twitter.github.com/bootstrap/javascript.html#modal) v. 1.4+
* [JavaScript Load Image](http://blueimp.github.com/JavaScript-Load-Image) v. 1.1.3+

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
