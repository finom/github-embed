# Github Embedder 0.0.0

This script nicely embedds HTML pages and some sources from Github onto your webpage. Syntax highlighting is based on [Prettyprint](https://github.com/google/code-prettify).

![](http://i.imgur.com/APSrkC6.png)

## How to use
- Include Prettyprint CSS file.
- Include Prettyprint CSS theme. You can find one [there](http://jmblog.github.io/color-themes-for-google-code-prettify/).
- Include embedder CSS file (**github-embedder.css**).
- Include Prettyprint script.
- Include Github Embedder (**github-embedder.js**).
- Call ``githubEmbedder(options)``

Please, open an issue if you'd like get this project be better. I don't know how many people need this.

## API
The embedder provides a single function ``githubEmbedder`` that accepts options as one argument.
```js
githubEmbedder(options);
```

### Options 
- ``el`` - an element where embedder needs to be initialized.
- ``linenums`` - show line numbers or not.
- ``embed`` - what to embed

``embed`` is an array of objects. Every object can include several options:
- ``type`` - an embedding type it could be "result" which means resulting HTML page or any Prettyprint-specific language (``"js"``, ``"css"`` etc).
- ``url`` - URL to resulting HTML page in case if ``type`` is ``"result"``
- ``repo`` - repository path (owner/repo for example: octocat/Spoon-Knife)
- ``branch`` - a branch where embedded file is listed (eg. "master")
- ``path`` - a path to the target file (eg "css/styles.css")
- ``label`` - by default ``path`` is used as a label or "Result" if embedding type is "result"

