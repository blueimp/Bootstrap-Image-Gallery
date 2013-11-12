# Bootstrap Image Gallery

- [Demo](#demo)
- [Description](#description)
- [Setup](#setup)
- [Documentation](#documentation)
- [Requirements](#requirements)
- [License](#license)

## Demo
[Bootstrap Image Gallery Demo](http://blueimp.github.io/Bootstrap-Image-Gallery/)

## Description
Bootstrap Image Gallery is an extension to [blueimp Gallery](http://blueimp.github.io/Gallery/), a touch-enabled, responsive and customizable image &amp; video gallery.  
It displays images and videos in the modal dialog of the [Bootstrap](http://getbootstrap.com/) framework, features swipe, mouse and keyboard navigation, transition effects, fullscreen support and on-demand content loading and can be extended to display additional content types.

## Setup
Copy the **css**, **img** and **js** directories to your website.

Add the following HTML snippet to the head section of your webpage:

```html
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css">
<link rel="stylesheet" href="http://blueimp.github.io/Gallery/css/blueimp-gallery.min.css">
<link rel="stylesheet" href="css/bootstrap-image-gallery.min.css">
```

Add the following HTML snippet with the Gallery widget to the body of your webpage:

```html
<!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->
<div id="blueimp-gallery" class="blueimp-gallery">
    <!-- The container for the modal slides -->
    <div class="slides"></div>
    <!-- Controls for the borderless lightbox -->
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
    <!-- The modal dialog, which will be used to wrap the lightbox content -->
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" aria-hidden="true">&times;</button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body next"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default pull-left prev">
                        <i class="glyphicon glyphicon-chevron-left"></i>
                        Previous
                    </button>
                    <button type="button" class="btn btn-primary next">
                        Next
                        <i class="glyphicon glyphicon-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
```

Include the following scripts at the bottom of the body of your webpage:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="http://blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>
<script src="js/bootstrap-image-gallery.min.js"></script>
```

Create a list of links to image files with the attribute **data-gallery** (optionally with enclosed thumbnails) and add them to the body of your webpage:

```html
<div id="links">
    <a href="images/banana.jpg" title="Banana" data-gallery>
        <img src="images/thumbnails/banana.jpg" alt="Banana">
    </a>
    <a href="images/apple.jpg" title="Apple" data-gallery>
        <img src="images/thumbnails/apple.jpg" alt="Apple">
    </a>
    <a href="images/orange.jpg" title="Orange" data-gallery>
        <img src="images/thumbnails/orange.jpg" alt="Orange">
    </a>
</div>
```

## Documentation
For information regarding Keyboard shortcuts, Gallery Options, API methods, Video Gallery setup, Gallery extensions and Browser support, please refer to the [blueimp Gallery documentation](https://github.com/blueimp/Gallery/blob/master/README.md).

## Requirements
* [jQuery](http://jquery.com/) v. 1.9.0+
* [Bootstrap](http://getbootstrap.com/) v. 3.0.0+
* [blueimp Gallery](https://github.com/blueimp/Gallery) v. 2.12.0+

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
