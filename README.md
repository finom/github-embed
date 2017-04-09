# github-embed [![npm version](https://badge.fury.io/js/github-embed.svg)](https://badge.fury.io/js/github-embed)

The tool allows to embed code from Github on a webpage.

![](http://i.imgur.com/d6Ysdpg.png)

[Demo](http://finom.github.io/github-embed/demo.html)

## Usage

### CommonJS
```
npm install --save github-embed babel-polyfill
```

```js
require('babel-polyfill');
const githubEmbed = require('github-embed');
githubEmbed('.element', settings);
```
CSS is placed at **node_modules/github-embed/npm/css/github-embed.css**.

### Direct use

Bundled (downloadable) version and the demo of the tool lives at [gh-pages branch](https://github.com/finom/github-embed/tree/gh-pages).
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js"></script>
<script src="github-embed.min.js"></script>
<script>
    githubEmbed('.element', settings);
</script>
```


### API

``githubEmbed`` function accepts two arguments: an element where embedding block will be mount (a selector, a node, jQuery instance etc) and settings object.

Settings object should include the following properties:

- ``repo: STRING`` a name of a repository whose files will be embedded
- ``owner: STRING`` an owner of the repo
- ``ref: STRING`` a branch, a tag or commit SHA
- ``embed: ARRAY`` a list of embedded files
	- ``path: STRING`` - a path to embedded file relative to the root of the repo
	- ``type: STRING`` - a type of file you want to embed (a programming language)
	- ``label: STRING`` - what to display in navigation. By default it's a name of embedded file
	- ``active: BOOLEAN`` - is the item shown by default
	- ``repo: STRING`` - a name of a repository where current file lives (in case if you want to embed a file from another repo)
	- ``owner: STRING`` - an owner of a repo where current file lives (in case if you want to embed a file from another repo)
	- ``ref: STRING`` - a branch, a tag or commit SHA of a repo where current file lives (in case if you want to embed a file from another branch or repo)

There is one more thing: you can add to your embedding list any webpage. It could be useful if you want to show how does your web tool works. You need to set type option as ``"htmlpage"`` and assign webpage URL to ``"url"`` property

Example:
```js
githubEmbed('#root', {
    "owner": "finom",
    "repo": "github-embed",
    "ref": "master",
    "embed": [
        {
            "type": "htmlpage",
            "label": "Embedded HTML page",
            "url": "http://example.com/"
        },
        {
    		"type": "js",
    		"label": "Webpack config",
    		"path": "webpack.config.js"
    	}, {
    		"type": "js",
    		"label": "Entry point",
    		"path": "src/index.js"
    	}, {
    		"type": "json",
    		"path": ".gh-embed.json"
    	}
    ]
});
```

### Remote settings

In case if you want to embed your code on few places and you don't want to break something when a file path is changed (eg you have renamed ``app.js`` to ``index.js``) you can store embedding settings remotely inside a file next to embedded files. It allows to get your embedding always up to date and you'll need to modify it when paths are changed.

```js
githubEmbed('.embed', 'https://github.com/finom/github-embed/blob/master/.gh-embed.json');
```

Usually I call settings file **.gh-embed.json**.

It should contain valid JSON object with data described above. The only difference: you don't need to specify ``owner``, ``repo`` and ``ref`` because these properties will be extracted from settings URL.

```js
{
    "embed": [
        {
            "type": "htmlpage",
            "label": "Embedded HTML page",
            "url": "http://example.com/"
        },
        {
    		"type": "js",
    		"label": "Webpack config",
    		"path": "webpack.config.js"
    	}, {
    		"type": "js",
    		"label": "Entry point",
    		"path": "src/index.js"
    	}, {
    		"type": "json",
    		"path": ".gh-embed.json"
    	}
    ]
}
```
