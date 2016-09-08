# github-embed

**in development**

The tool allows to embed code from Github and keep embedding always up to date.

*Currently this project isn't promoted and not tested because of embedding complexity. It's used only for my own purposes for now. If you have some ideas how to make embedding easier, let me know.*

```
npm i -D github-embed
```

```js
const githubEmbed()
```

![](http://i.imgur.com/LmUAogr.png)

## Getting started

As the first step you need to do is to create ``.gh-embed.json`` somewhere in your repo (usually in root). This file means embedding settings file and it must contain valid JSON. It's made to keep file paths always up to date: when you change file structure of a project, you need to change the only gh-embed file, you don't need to worry about all places where your code is embedded. This is the main idea of this tool.

The second step to fill ``.gh-embed.json`` by settings described below.

The third step is to add a script to a page:
```js
githubEmbed(node, pathToSettings);
```
Where ``node`` is a mount node (``Node`` instance, ``jQuery`` instance, selector) and ``pathToSettings`` is a path to ``.gh-embed.json``.

Example:
```js
githubEmbed('.embed', 'https://github.com/matreshkajs/examples/blob/gh-pages/treeview/.gh-embed.json');
```

## .gh-embed.json

The file needs to contain a key ``"embed"`` which contains an array of embedded files (other top-level settings can be added later). An item of this array should include the following keys:

``path: STRING`` - a path to embedded file relative to root of the repo (required).
``type: STRING`` - a type of the file you need to embed (programming language).
``label: STRING`` - what to display in navigation. By default it's a name of embedded file.
``active: BOOLEAN`` - is the item shown by default

There is one more thing: you can add to your embedding list any webpage. It could be useful if you want to show how does your web tool works. You need to set type option as ``"htmlpage"`` and assign weppagee URL to ``"url"`` property


```js
{
	"linenums": true,
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
