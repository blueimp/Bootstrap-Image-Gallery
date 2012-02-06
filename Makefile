.PHONY: default css js

default: css js

css:
	lessc --compress bootstrap-image-gallery.css > bootstrap-image-gallery.min.css

js:
	uglifyjs -nc bootstrap-image-gallery.js > bootstrap-image-gallery.min.js
