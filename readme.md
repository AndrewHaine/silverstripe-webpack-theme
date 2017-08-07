# Base SilverStripe theme with a webpack build system

## Installation
Copy this theme into a subdirectory of your themes folder and run `npm install`.

## Usage
This theme is designed to optimise your production build by minifying assets and optimising images. Any files imported into src/bundle.js will be processed.

### CSS
The recommended entry point for all CSS is src/sass/style.sass, any files imported will be bundled into a single CSS file which can be included in the way you choose (Requirements API, link tag etc..).

The setup will also produce an editor.css file which is used by SilverStripe to style the TinyMCE fields in the CMS, styles imported into /src/sass/editor.sass will be included in this file.

(Linting is coming soon)

### JavaScript
Javascript is included in the bundle in much the same way as CSS, with a single entry point which contains all your imports.

The theme comes set up for development using ES6 Syntax but this can be adjusted accordingly by installing babel presets and changing the settings in .eslintrc.yml.


### Images
Any images imported into the bundle, either directly or through a URL reference will be optimised, where possible files will be inlined using Data URIs, if an image is above 30kb it will be compressed using the image-webpack-loader and placed in dist/images (Names and extensions are preserved).

### Development
The build system uses webpack dev server which allows for hot reloading for speedy testing. To start the server run `npm run watch`. The server will start on port 3000 you will also get a nice terminal interface courtesy of [FormidableLabs](https://github.com/FormidableLabs/webpack-dashboard).

With the server started you should then see your site updating live on localhost:3000.

Once development is complete eject your css and minify the bundle using `npm run build`. This will create dist/css/style.css and dist/bundle.js which can then be included in your templates.

## Prerequisites
The theme makes of assumptions about you development environment:
* You are using a php server with a virtual host on \*.dev (editbale in the variables file).

## Signature
The system gives the ability to add a signature to the top of your css and js files, to edit the information shown or disable this feature edit the options in variables.js.
