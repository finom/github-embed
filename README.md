# github-embed

The tool allows to embed code from Github on a webpage.

![](http://i.imgur.com/LmUAogr.png)

## Usage

### CommonJS
```
npm install --save github-embed
```

```js
const githubEmbed = require('github-embed');
githubEmbed('.element', settings);
```
CSS file is placed at **node_modules/css/github-embed.css**.

### Direct usage

Bundled (downloadable) version of the tool lives at [gh-pages branch](https://github.com/finom/github-embed/tree/gh-pages)
```html
<script src="github-embed.min.js"></script>
<script>
    githubEmbed('.element', settings);
</script>
```


### API

``githubEmbed`` function accepts two arguments: an element where embedding block will be mount (a selector, a node, jQuery instance etc) and settings object.

Settings object should include the following properties:

- ``repo: STRING`` a name of a repository whose files will be embedded
- ``owner: STRING`` an owner of thr repo
- ``ref: STRING`` a branch, a tag or commit SHA
- ``embed: ARRAY`` a list of embedded files
	- ``path: STRING`` - a path to embedded file relative to root of the repo
	- ``type: STRING`` - a type of the file you need to embed (programming language)
	- ``label: STRING`` - what to display in navigation. By default it's a name of embedded file
	- ``active: BOOLEAN`` - is the item shown by default
	- ``repo: STRING`` a name of a repository where current file lives (in case if you want to embed a file from another repo)
	- ``owner: STRING`` an owner of a repo where current file lives (in case if you want to embed a file from another repo)
	- ``ref: STRING`` a branch, a tag or commit SHA of a repo where current file lives (in case if you want to embed a file from another branch or repo)

There is one more thing: you can add to your embedding list any webpage. It could be useful if you want to show how does your web tool works. You need to set type option as ``"htmlpage"`` and assign webpage URL to ``"url"`` property

Example:
```js
githubEmbed('#root', {
	"owner": "matreshkajs",
	"repo": "matreshka_examples",
	"ref": "gh-pages",
	"embed": [{
		"type": "htmlpage",
		"label": "Result",
		"url": "//matreshkajs.github.io/matreshka_examples/treeview/"
	}, {
		"type": "html",
		"label": "index.html",
		"path": "treeview/index.html"
	}, {
		"type": "js",
		"label": "app.js",
		"path": "treeview/js/app.js"
	}, {
		"type": "js",
		"label": "tree.class.js",
		"path": "treeview/js/tree.class.js"
	}, {
		"type": "js",
		"label": "tree-leaf.class.js",
		"path": "treeview/js/tree-leaf.class.js"
	}]
});
```

### Remote settings

In case if you want to embed your code on few places and you don't want to break something when a file path is changed (eg you have renamed ``app.js`` to ``index.js``) you can store embedding settings remotely inside a file next to the embedded files.

```js
githubEmbed('.embed', 'https://github.com/matreshkajs/examples/blob/gh-pages/treeview/.gh-embed.json');
```

Usually I call settings file **.gh-embed.json``**. It allows to get your embedding always up to date and you'll need to modify it when paths are changed.

It should contain valid JSON object with data described above. The only difference you don't need to specify ``owner``, ``repo`` and ``ref`` because these properties will be read from settings URL.

```js
{
	"embed": [{
		"type": "htmlpage",
		"url": "//matreshkajs.github.io/matreshka_examples/treeview/"
	}, {
		"type": "js",
		"label": "app.js",
		"path": "treeview/js/app.js"
	}, {
		"type": "js",
		"label": "tree.class.js",
		"path": "treeview/js/tree.class.js"
	}, {
		"type": "js",
		"label": "tree-leaf.class.js",
		"path": "treeview/js/tree-leaf.class.js"
	}]
}
```

## Todo
- Split dev and prod envs
- On Github link
