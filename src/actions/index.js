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

export function activateFrame(index) {
    return async (dispatch, getState) => {
        const { frames, settingsPathData } = getState();
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
                    owner: item.owner || settingsPathData.owner,
                    repo: item.repo || settingsPathData.repo,
                    ref: item.ref || settingsPathData.ref
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

export function initialize(settingsPath) {
    return async (dispatch, getState) => {
        dispatch(parseSettingsPath(settingsPath));
        dispatch(setLoaded(false));

        const { settingsPathData } = getState();

        let settingsString;
        let settingsObject;

        try {
            settingsString = await getGithubFile(settingsPathData);
        } catch (e) {
            dispatch(setLoaded(true));
            dispatch(error(e));
            throw e;
        }

        try {
            settingsObject = JSON.parse(settingsString);
        } catch (e) {
            dispatch(setLoaded(true));
            dispatch(error(`Cannot parse settings file (${e})`));
            throw e;
        }


        settingsObject.embed.forEach(item => {
            item.loaded = false; // eslint-disable no-param-reassign
            item.shown = false; // eslint-disable no-param-reassign
            if(item.type !== 'htmlpage') {
                item.code = ''; // eslint-disable no-param-reassign
            }
        });

        dispatch(embed(settingsObject));
        const { frames } = getState();

        let activeIndex = frames.findIndex(item => item.active);
        activeIndex = activeIndex === -1 ? 0 : activeIndex;
        dispatch(activateFrame(activeIndex));
    };
}
