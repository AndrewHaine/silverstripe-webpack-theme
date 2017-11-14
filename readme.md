# Base SilverStripe theme with a webpack build system

## Installation

### Composer
This theme can be installed through composer, simply add the following line to your project's composer.json file.
```
require: "andrewhaine/silverstripe-webpack-theme": "~1.0"
```

### Manual Installation
Copy this theme into a subdirectory of your themes folder.

## Usage
This theme is designed to optimise your production build by minifying assets and optimising images. Any assets referenced (explicitly or implicitly) in index.js will be compiled.

### CSS
This theme supports both SCSS and Sass syntax.

The recommended entry point for all CSS is sass/style.sass, any files imported will be bundled into a single CSS file which can be included in the way you choose (Requirements API, link tag etc..).

The setup will also produce an editor.css file which is used by SilverStripe to style the TinyMCE fields in the CMS, styles imported into sass/editor.sass will be included in this file.

### JavaScript
Javascript is included in the bundle in much the same way as CSS, the entry point for javascript in this theme is javascript/src/main.js.

The theme comes set up for development using ES6 Syntax but this can be adjusted accordingly by installing babel presets and changing the settings in .eslintrc.yml.

### Images
Any images imported into the bundle, either directly or through a URL reference will be optimised, where possible files will be inlined using Data URIs, if an image is above 10kb it will be compressed using the image-webpack-loader and placed in the images directory (Names and extensions are preserved). Images need to be placed in the 'images' directory.

### Development
The build system uses webpack dev server which allows hot reloading for speedy testing. To start the server run `npm run watch`. The server will start on port 3000 you will also get a nice terminal interface courtesy of [FormidableLabs](https://github.com/FormidableLabs/webpack-dashboard).

With the server started you should then see your site updating live on localhost:3000 when any asset files are changed.

Once development is complete eject your css and minify the bundle using `npm run build`. This will create the main CSS file (css/style.css) and your JS bundle (javascript/dist/bundle.js) which can then be included in your templates.

## Prerequisites
The theme makes of assumptions about you development environment:
* You are using a php server with a virtual host on \*.test (editable in the variables file).

## Signature
The system gives the ability to add a signature to the top of your css and js files, to edit the information shown or disable this feature edit the options in variables.js.
