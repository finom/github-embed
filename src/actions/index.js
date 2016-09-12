import gitHubUrlParse from 'github-url-parse';
import * as types from '../constants';
import getGithubFile from '../lib/get-github-file';

let errorTimeout;

function pureError(errorText) {
    return {
        type: types.ERROR,
        error: errorText
    };
}

function error(errorText) {
    return dispatch => {
        clearTimeout(errorTimeout);
        dispatch(pureError(errorText ? `${errorText}` : ''));
        errorTimeout = setTimeout(() => {
            dispatch(pureError(null));
        }, 5000)
    };
}

function parseSettingsPath(settingsPath) {
    return {
        type: types.PARSE_SETTINGS_PATH,
        settingsPath
    };
}

function embed(settings) {
    return {
        type: types.EMBED,
        settings
    };
}

function setCodeContent(index, code) {
    return {
        type: types.SET_CODE_CONTENT,
        code,
        index
    };
}


function loadFrame(index) {
    return {
        type: types.LOAD_FRAME,
        index
    };
}

function showFrame(index) {
    return {
        type: types.SHOW_FRAME,
        index
    };
}

export function setLoaded(loaded) {
    return {
        type: types.SET_LOADED,
        loaded
    };
}

function setSettings(settings) {
    return {
        type: types.SET_SETTINGS,
        settings
    }
}

export function activateFrame(index) {
    return async (dispatch, getState) => {
        const { frames, settings } = getState();
        const item = frames[index];

        if (item.loaded) {
            return dispatch(showFrame(index));
        }

        dispatch(setLoaded(false));
        dispatch(error(null));

        if (item.type === 'htmlpage') {
            dispatch(loadFrame(index));
            dispatch(showFrame(index));
        } else {
            try {
                const code = await getGithubFile({
                    path: item.path,
                    owner: item.owner || settings.owner,
                    repo: item.repo || settings.repo,
                    ref: item.ref || settings.ref
                });

                dispatch(setCodeContent(index, code));
                dispatch(loadFrame(index));
                dispatch(showFrame(index));
                dispatch(setLoaded(true));
            } catch (e) {
                dispatch(setLoaded(true));
                dispatch(error(e));
                throw e;
            }
        }

        return undefined;
    };
}

function initializeRemoteSettings(settingsPath) {
    return async (dispatch) => {
        const {
            path: relativeSettingsPath,
            repo,
            user: owner,
            branch: ref
        } = gitHubUrlParse(settingsPath);

        dispatch(setLoaded(false));

        let settingsString;
        let settingsObject;

        try {
            settingsString = await getGithubFile({
                owner,
                ref,
                repo,
                path: relativeSettingsPath,
            });
        } catch (e) {
            dispatch(setLoaded(true));
            dispatch(error(e));
            throw e;
        }

        try {
            settingsObject = JSON.parse(settingsString);
            dispatch(setSettings(Object.assign(settingsObject, {
                owner,
                ref,
                repo,
                relativeSettingsPath
            })));
        } catch (e) {
            dispatch(setLoaded(true));
            dispatch(error(`Cannot parse settings file (${e})`));
            throw e;
        }
    }
}

export function initialize(settings) {
    return async (dispatch, getState) => {
        if(typeof settings === 'string') {
            await dispatch(initializeRemoteSettings(settings));
        } else {
            dispatch(setSettings(settings));
        }

        dispatch(embed());

        const { frames } = getState();

        let activeIndex = frames.findIndex(item => item.active);
        activeIndex = activeIndex === -1 ? 0 : activeIndex;
        dispatch(activateFrame(activeIndex));
    };
}
