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
<link rel="stylesheet" href="http://blueimp.github.com/cdn/css/bootstrap.min.css">
<!--[if lt IE 7]><link rel="stylesheet" href="http://blueimp.github.com/cdn/css/bootstrap-ie6.min.css"><![endif]-->
<link rel="stylesheet" href="css/bootstrap-image-gallery.min.css">
```

Add the following HTML snippet to the body of your webpage:

```html
<!-- modal-gallery is the modal dialog used for the image gallery -->
<div id="modal-gallery" class="modal modal-gallery hide fade" tabindex="-1">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">&times;</a>
        <h3 class="modal-title"></h3>
    </div>
    <div class="modal-body"><div class="modal-image"></div></div>
    <div class="modal-footer">
        <a class="btn btn-primary modal-next">Next <i class="icon-arrow-right icon-white"></i></a>
        <a class="btn btn-info modal-prev"><i class="icon-arrow-left icon-white"></i> Previous</a>
        <a class="btn btn-success modal-play modal-slideshow" data-slideshow="5000"><i class="icon-play icon-white"></i> Slideshow</a>
        <a class="btn modal-download" target="_blank"><i class="icon-download"></i> Download</a>
    </div>
</div>
```

Include the following scripts:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="http://blueimp.github.com/cdn/js/bootstrap.min.js"></script>
<script src="http://blueimp.github.com/JavaScript-Load-Image/load-image.min.js"></script>
<script src="js/bootstrap-image-gallery.min.js"></script>
```

### Initialization
Initialize the Image Gallery widget by adding the following **data-attributes** to a container element containing a set of links to image files with the attribute **rel="gallery"**:

```html
<div id="gallery" data-toggle="modal-gallery" data-target="#modal-gallery">
    <a href="banana.jpg" title="Banana" rel="gallery">Banana</a>
    <a href="apple.jpg" title="Apple" rel="gallery">Apple</a>
    <a href="orange.jpg" title="Orange" rel="gallery">Orange</a>
</div>
```

No additional JavaScript snippets are required. Note that you can also add links to the container element at a later stage.

It is also possible to use different elements than links for the gallery functionality, by storing the url to the images as **data-href** attribute and setting **data-selector** on the gallery container:

```html
<div id="gallery" data-toggle="modal-gallery" data-target="#modal-gallery" data-selector="div.gallery-item">
    <div class="gallery-item" data-href="banana.jpg" title="Banana">Banana</div>
    <div class="gallery-item" data-href="apple.jpg" title="Apple">Apple</div>
    <div class="gallery-item" data-href="orange.jpg" title="Orange">Orange</div>
</div>
```

## API

### Options
The Image Gallery follows the guideline of the Bootstrap JavaScript collection. Options can be passed along as **data-attributes**, either set on the gallery container or on the modal dialog. The following example sets the slideshow timer to 5 seconds:

```html
<div id="gallery" data-toggle="modal-gallery" data-target="#modal-gallery"
    data-slideshow="5000">
    ...
</div>
```

More Options are documented at the start of the Image Gallery source file.

### Events
In addition to the modal events provided by [Bootstrap Modal](http://twitter.github.com/bootstrap/javascript.html#modals), the Image Gallery provides four additional events:

* **beforeLoad**:  
Triggered when the next (or previous) image in the gallery is about to be loaded.
* **load**:  
Triggered when the next (or previous) image in the gallery has been loaded.
* **display**:  
Triggered when the next (or previous) image in the gallery is about to be displayed.
* **displayed**:  
Triggered when the next (or previous) image in the gallery has been displayed.

Inside of the event callbacks, it is possible to access the list of (filtered) element nodes, the current index and (except for the *beforeLoad* event) also the loaded image:

```js
$('#modal-gallery').on('load', function () {
    var modalData = $(this).data('modal');
    // modalData.$links is the list of (filtered) element nodes as jQuery object
    // modalData.img is the img (or canvas) element for the loaded image
    // modalData.options.index is the index of the current link
});
```

### Fullscreen mode
Fullscreen mode is enabled by adding the CSS class "modal-fullscreen" to the modal element:

```js
$('#modal-gallery').addClass('modal-fullscreen');
```

To automatically stretch images smaller then the window size, also add the class "modal-fullscreen-stretch":

```js
$('#modal-gallery').addClass('modal-fullscreen modal-fullscreen-stretch');
```

Please refer to the demo source code on how to enable real fullscreen mode on supported browsers.

### Deinitialize the click event listener
To deinitialize the Modal Gallery event listener, the following code snippet can be used:

```js
$(document.body).off('.modal-gallery.data-api')
```
Please also have a look at the [Bootstrap JS Guidelines](https://github.com/twitter/bootstrap/blob/master/js).

## Requirements
* [jQuery](http://jquery.com/) v. 1.7+
* [Bootstrap Modal](http://twitter.github.com/bootstrap/javascript.html#modal) v. 2.2.2+
* [JavaScript Load Image](https://github.com/blueimp/JavaScript-Load-Image) v. 1.2.3+

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
