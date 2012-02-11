.PHONY: default css js

default: css js

css:
	lessc --compress css/bootstrap-image-gallery.css > css/bootstrap-image-gallery.min.css

js:
	uglifyjs -nc js/bootstrap-image-gallery.js > js/bootstrap-image-gallery.min.js
