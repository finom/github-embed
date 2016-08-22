function embed(urlData, embedSettings) {
    var el = $('main'),
        nav = $('nav'),
        frames = $('.frames'),
        loadedCount = 0,
        hasActive;

    let active;

    o.embed.forEach(function(item) {
        let frame;
        let link;
        let load;

        if(item.type == 'htmlpage') {
            frame = frames.appendChild(create('iframe', {
                className: 'frame'
            }));

            link = nav.appendChild(create('a', {
                innerHTML: item.label || 'HTML Page'
            }));

            load = () => {
                el.classList.add('loading');
                frame.src = item.url;
                frame.onload = () => el.classList.remove('loading')
            }
        } else {
            link = nav.appendChild(create('a', {
                innerHTML: item.label || item.path
            }));

            frame = frames.appendChild(create('pre', {
                className: 'frame'
            }));

            load = () => {
                el.classList.add('loading');
                getFile(item, item.path, function(data) {
					frame.classList.add('prettyprint', 'lang-' + item.type);
					if(o.linenums !== false) {
						frame.classList.add('linenums');
					}

					frame.textContent = data.error ? 'Error' : data;
				});
                frame.onload = () => el.classList.remove('loading')
            }
        }

        item.link = link;
        item.frame = frame;
        item.load = load;

        link.addEventListener('click', evt => {
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
}
