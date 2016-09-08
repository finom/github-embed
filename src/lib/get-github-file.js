async function makeDirectRequest(reqInfo) {
    const {
        owner,
        repo,
        path,
        ref
    } = reqInfo;

    const resp = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`);
    return await resp.text();
}

export default async function getGithubFile(reqInfo) {
    const {
        owner,
        repo,
        path,
        ref
    } = reqInfo;

    let resp;
    let data;

    try {
        resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`);
    } catch(e) {
        // fallback in case if API limmit is exceeded
        return makeDirectRequest(reqInfo);
    }

    if(resp.status !== 200) {
        return makeDirectRequest(reqInfo);
    }

    data = await resp.json();

    if(!data.content) {
        throw Error('Guthub API returned wrong data');
    }

    return atob(data.content.replace(/\s/g, ''));
}

/*function getFile(data, path, callback) {
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
}*/
