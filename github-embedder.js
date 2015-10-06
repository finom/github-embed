(function(win, $) {
	"use strict";
	
    win.githubEmbedder = function(o) {
		var el = $(o.el)[0],
			nav = el.appendChild(create('div')),
			frames = el.appendChild(create('div')),
			loadedCount = 0;
		
		nav.classList.add('github-embedder-nav');
		frames.classList.add('github-embedder-frames');
		el.classList.add('github-embedder', 'loading');
			
		o.embed.forEach(function(item) {
			var frame,
				link;
				
			if(item.type == 'result') {
				frame = frames.appendChild(create('iframe', {
					src: item.url,
					onload: loaded,
					onerror: loaded
				}));
				
				link = nav.appendChild(create('a', {
					innerHTML: item.label || 'Result'
				}));
			} else {
				frame = frames.appendChild(create('pre'));
				
				link = nav.appendChild(create('a', {
					innerHTML: item.label || item.path
				}));
				
				getFile(item, function(data) {
					if(data.error) {
						frame.textContent = 'Error: ' + data.error;
					} else {
						frame.classList.add('prettyprint', 'lang-' + item.type);
						
						if(o.linenums) {
							frame.classList.add('linenums');
						}
						
						frame.textContent = data;
					}
					
					loaded();
				});
			}
			
			frame.classList.add('github-embedder-frame');
			link.classList.add('github-embedder-nav-link');
			
			if(item.active) {
				link.classList.add('active');
				frame.classList.add('active');
			}			
			
			$(link).on('click', function(evt) {
				var activeLink = $('.github-embedder-nav-link.active', nav)[0],
					activeFrame = $('.github-embedder-frame.active', frames)[0]
				
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
		
		function loaded() {
			if(++loadedCount == o.embed.length) {
				el.classList.remove('loading');
				prettyPrint();
			}
		}
	}
	
	
	function getFile(item, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/repos/'+item.repo+'/contents/'+item.path+'?ref=' + item.branch, true);
		
		xhr.onload = function() {
			var resp = JSON.parse(xhr.responseText);
			if(resp.content) {
				callback(atob(resp.content));
			} else {
				xhr.onerror();
			}
		}
	
		// fallback in case if API limmit is exceeded
		xhr.onerror = function() {
			var xhr2 = new XMLHttpRequest();
			xhr2.open('GET', 'https://raw.githubusercontent.com/'+item.repo+'/'+item.branch+'/'+item.path, true);
			xhr2.onload = function() {
				callback(xhr2.responseText);
			}
			
			xhr2.onerror = function() {
				callback({ error: xhr2.status });
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

	
	// balalaika
})(window, function(t,e,n,i,o,r,s,u,c,f,l,h){return h=function(t,e){return new h.i(t,e)},h.i=function(i,o){n.push.apply(this,i?i.nodeType||i==t?[i]:""+i===i?/</.test(i)?((u=e.createElement(o||"q")).innerHTML=i,u.children):(o&&h(o)[0]||e).querySelectorAll(i):/f/.test(typeof i)?/c/.test(e.readyState)?i():h(e).on("DOMContentLoaded",i):i:n)},h.i[l="prototype"]=(h.extend=function(t){for(f=arguments,u=1;u<f.length;u++)if(l=f[u])for(c in l)t[c]=l[c];return t})(h.fn=h[l]=n,{on:function(t,e){return t=t.split(i),this.map(function(n){(i[u=t[0]+(n.b$=n.b$||++o)]=i[u]||[]).push([e,t[1]]),n["add"+r](t[0],e)}),this},off:function(t,e){return t=t.split(i),l="remove"+r,this.map(function(n){if(f=i[t[0]+n.b$],u=f&&f.length)for(;c=f[--u];)e&&e!=c[0]||t[1]&&t[1]!=c[1]||(n[l](t[0],c[0]),f.splice(u,1));else!t[1]&&n[l](t[0],e)}),this},is:function(t){return u=this[0],(u.matches||u["webkit"+s]||u["moz"+s]||u["ms"+s]).call(u,t)}}),h}(window,document,[],/\.(.+)/,0,"EventListener","MatchesSelector"));

