.PHONY: default css js

MINIFY_CSS_IN=css/bootstrap-image-gallery.css
MINIFY_CSS_OUT=css/bootstrap-image-gallery.min.css

MINIFY_JS_IN=js/bootstrap-image-gallery.js
MINIFY_JS_OUT=js/bootstrap-image-gallery.min.js

default: css js

css:
	cat ${MINIFY_CSS_IN} | node_modules/.bin/lessc --clean-css - ${MINIFY_CSS_OUT}

js:
	node_modules/.bin/uglifyjs ${MINIFY_JS_IN} -c -m -o ${MINIFY_JS_OUT}
