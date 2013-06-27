.PHONY: default css js

default: css js

css:
	node_modules/.bin/lessc --yui-compress css/bootstrap-image-gallery.css > css/bootstrap-image-gallery.min.css

js:
	node_modules/.bin/uglifyjs js/load-image.js js/bootstrap-image-gallery.js -c -m -o js/bootstrap-image-gallery.min.js
