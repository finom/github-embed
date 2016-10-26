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

    try {
        resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`);
    } catch (e) {
        // fallback in case if API limmit is exceeded
        return makeDirectRequest(reqInfo);
    }

    if (resp.status !== 200) {
        return makeDirectRequest(reqInfo);
    }

    const data = await resp.json();

    if (!data.content) {
        throw Error('Github API is returned wrong data');
    }

    return atob(data.content.replace(/\s/g, ''));
}
