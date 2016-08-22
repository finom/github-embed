/*
embedHithub('.foo', 'https://github.com/matreshkajs/matreshka_examples/blob/gh-pages/soundcloud_search/.gh-embed.json');
*/
import parse from 'github-url-parse';

module.exports = function embedGithub(element, pathToGhEmbed) {
    const parsedURL = parse(pathToGhEmbed);
    if(!parsedURL) {
        return error('Cannot parse path to Github Embed settings');
    }

    getFile(urlData, pathToGhEmbed, function(d) {
		if(d.error) {
			return error('Cannot load Github Embed settings: ' + d.error);
		}

		try {
			d = JSON.parse(d);
		} catch(e) {
			return error('Cannot parse Github Embed settings: ' + e);
		}

		embed(parsedURL, d);
	});
}
