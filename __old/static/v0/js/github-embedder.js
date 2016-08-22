(function(win) {
	"use strict";
	var urlData = readURL();

	getFile(urlData, urlData.pathToMeta +'.gh-embed.json', function(d) {
		if(d.error) {
			return error('Cannot load .gh-embed.json: ' + d.error);
		}

		try {
			d = JSON.parse(d);
		} catch(e) {
			return error('Cannot parse .gh-embed.json: ' + e);
		}

		embed(d);

	});

	$('.on-github').href='//github.com/'+urlData.owner+'/'+urlData.repo+'/tree/'+urlData.ref+'/'+urlData.pathToMeta;

	function error(err) {
		$('main').classList.add('error');
		$('.error-text').textContent = err;
	}

    function embed(o) {
		var el = $('main'),
			nav = $('nav'),
			frames = $('.frames'),
			loadedCount = 0,
			hasActive;

		o.embed.forEach(function(item) {
			var frame,
				link;

			item.owner = item.owner || urlData.owner;
			item.repo = item.repo || urlData.repo;
			item.ref = item.ref || urlData.ref;
			item.type = item.type || item.path.match(/.*\.(\S+)$/);

			if(item.type == 'htmlpage') {
				frame = frames.appendChild(create('iframe', {
					src: item.url,
					onload: loaded,
					onerror: loaded,
					className: 'frame'
				}));

				link = nav.appendChild(create('a', {
					innerHTML: item.label || 'HTML Page'
				}));

			} else {
				link = nav.appendChild(create('a', {
					innerHTML: item.label || item.path
				}));

				frame = frames.appendChild(create('pre', {
					className: 'frame'
				}));

				getFile(item, item.path, function(data) {
					frame.classList.add('prettyprint', 'lang-' + item.type);
					if(o.linenums !== false) {
						frame.classList.add('linenums');
					}

					frame.textContent = data.error ? 'Error' : data;

					loaded();
				});
			}

			link.classList.add('l');

			if(item.active && !hasActive) {
				link.classList.add('active');
				frame.classList.add('active');
				hasActive = true;
			}

			link.addEventListener('click', function(evt) {
				var activeLink = $('a.active', nav),
					activeFrame = $('.frame.active', frames)

				if(activeLink) {
					activeLink.classList.remove('active');
				}

				if(activeFrame) {
					activeFrame.classList.remove('active');
				}

				link.classList.add('active');
				frame.classList.add('active');
			});
		});

		if(!hasActive) {
			$('a.l', nav).classList.add('active');
			$('.frame', frames).classList.add('active');
		}

		function loaded() {
			if(++loadedCount == o.embed.length) {
				el.classList.remove('loading');
				prettyPrint();
			}
		}
	}

	function readURL() {
		var loc = document.location,
			path = loc.pathname.match(/\/v(\d+)\/([^\/]+)\/([^\/]+)\/([^\/]+)?/);

		return {
			owner: path[2],
			repo: path[3],
			pathToMeta: path[4] ? (path[4] + '/') : '',
			ref: (loc.search.match(/\S*(\?|&)ref=(\S+)\S*/) || [])[2] || 'master'
		};
	}

	function getFile(data, path, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/repos/'+data.owner+'/'+data.repo+'/contents/'+path+'?ref=' + data.ref, true);

		xhr.onload = function() {
			var resp = JSON.parse(xhr.responseText);
			if(resp.content) {
				callback(atob(resp.content.replace(/\s/g, '')));
			} else {
				xhr.onerror();
			}
		}

		// fallback in case if API limmit is exceeded
		xhr.onerror = function() {
			var xhr2 = new XMLHttpRequest();
			xhr2.open('GET', 'https://raw.githubusercontent.com/'+data.owner+'/'+data.repo+'/'+data.ref+'/'+path, true);
			xhr2.onload = function() {
				if(xhr2.status !== 200) {
					callback({ error: xhr2.statusText })
				} else {
					callback(xhr2.responseText);
				}
			}

			xhr2.onerror = function() {
				callback({ error: xhr2.statusText });
			}

			xhr2.send();
		}

		xhr.send();
	}


	function create(tagName, props, el, i, hasOwn) {
		el = document.createElement(tagName);
		hasOwn = 'hasOwnProperty';
		if (props) {
			for (i in props) {
				el[i] = props[i];
			}
		}
		return el;
	};

	function $(s, ctx) {
		return (ctx || document).querySelector(s);
	}
})(window);
