# grunt-filerev-assets [![Build Status](https://travis-ci.org/richardbolt/grunt-filerev-assets.png?branch=master)](https://travis-ci.org/richardbolt/grunt-filerev-assets)

> Record asset paths from grunt-filerev to a json file.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filerev-assets --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filerev-assets');
```

## The "filerev_assets" task

### Overview
This task will take the summary from the [`grunt.filerev`](https://github.com/yeoman/grunt-filerev) task and write it to disk. This is useful if you wish to load it into templates dynamically with, for example, an express middleware in this manner:

```node
var assets = require('assets.json');
app.locals({
	assets: assets
})
```

Then, in your templates you can access the `assets` object.

In your project's Gruntfile, optionally add a section named `filerev_assets` to the data object passed into `grunt.initConfig()`. You can safely omit this if you want the default options to be used. Default options will cause grunt.filerev.summary to be written to `assets.json` in the root of your project.

### Options

#### options.dest
Type: `String`
Default value: `'assets.json'`

A string value that is used as the filepath to write the contents of [`grunt.filerev.summary`](https://github.com/yeoman/grunt-filerev#summary) to disk.

#### options.cwd
Type: `String`
Default value: `''`

A string value that is used as a prefix to strip off the resulting paths in `grunt.filerev.summary`.

#### options.prefix
Type: `String`
Default value: `''`

A string value that is used as a prefix to append to all the resulting paths in `grunt.filerev.summary`.

#### options.prettyPrint
Type: `Boolean`
Default value: `false`

Format the resulting json file into a human-readable format.

### Usage Examples

#### Default Options
If you do not set any options the default options are used to do write `grunt.filerev.summary` to `assets.json`.

#### Custom Options
In this example, custom options are used to strip `public/` from the beginning of the paths and add /static/ so they can be used as urls in your templates.

```js
grunt.initConfig({
  filerev_assets: {
    dist: {
      options: {
        dest: 'assets/assets.json',
        cwd: 'public/',
        prefix: '/static/'
      }
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
