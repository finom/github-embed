import {
    SET_LOADED,
    ERROR,
    EMBED,
    SHOW_FRAME,
    LOAD_FRAME,
    SET_CODE_CONTENT,
    SET_SETTINGS
} from '../constants';

const initialState = {
    settingsPathData: null,
    loaded: false,
    error: null,
    lineNumbers: null,
    frames: []
};

export default function application(state = initialState, action) {
    switch (action.type) {
        case SET_LOADED: {
            const { loaded } = action;
            return {
                ...state,
                loaded
            };
        }
        case ERROR: {
            const { error } = action;
            return {
                ...state,
                error
            };
        }
        case SET_SETTINGS: {
            const { settings } = action;
            return {
                ...state,
                settings
            };
        }
        case EMBED: {
            const { lineNumbers = true, embed } = state.settings;
            return {
                ...state,
                lineNumbers,
                frames: embed.map(item => {
                    const newValue = {
                        loaded: false,
                        shown: false,
                        ...item
                    };

                    if (item.type !== 'htmlpage') {
                        const splittedPath = item.path.split('.');
                        newValue.type = item.type || splittedPath[splittedPath.length - 1];
                        newValue.code = '';
                    }

                    return newValue;
                })
            };
        }
        case LOAD_FRAME: {
            return {
                ...state,
                frames: state.frames.map((item, index) => ({
                    ...item,
                    loaded: action.index === index ? true : item.loaded
                }))
            };
        }
        case SHOW_FRAME: {
            return {
                ...state,
                frames: state.frames.map((item, index) => ({
                    ...item,
                    shown: action.index === index
                }))
            };
        }
        case SET_CODE_CONTENT: {
            return {
                ...state,
                frames: state.frames.map((item, index) => ({
                    ...item,
                    code: action.index === index ? action.code : item.code
                }))
            };
        }
        default: {
            return state;
        }
    }
}
