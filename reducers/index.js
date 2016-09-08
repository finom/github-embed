import { SET_LOADED, ERROR, PARSE_SETTINGS_PATH, EMBED, SHOW_FRAME, LOAD_FRAME, SET_CODE_CONTENT } from '../constants';
import gitHubUrlParse from 'github-url-parse';

const initialState = {
    settingsPathData: null,
    loaded: false,
    error: null,
    lineNumbers: null,
    frames: []
};

export default function application(state = initialState, action) {
    switch(action.type) {
        case SET_LOADED:
            const { loaded } = action;
            return {
                ...state,
                loaded
            }

        case ERROR:
            const { error } = action;
            return {
                ...state,
                error
            }
        case PARSE_SETTINGS_PATH:
            const {
                path,
                repo,
                user: owner,
                branch: ref
            } = gitHubUrlParse(action.settingsPath);

            return {
                ...state,
                settingsPathData: {
                    owner,
                    ref,
                    path,
                    repo
                }
            }
        case EMBED:
            const { lineNumbers=true, embed } = action.settings;
            return {
                ...state,
                lineNumbers,
                frames: embed
            }
        case LOAD_FRAME:
            return {
                ...state,
                frames: state.frames.map((item, index) => {
                    return {
                        ...item,
                        loaded: action.index === index ? true : item.loaded
                    };
                })
            }
        case SHOW_FRAME:
            return {
                ...state,
                frames: state.frames.map((item, index) => {
                    return {
                        ...item,
                        shown: action.index === index
                    };
                })
            }
        case SET_CODE_CONTENT:
            return {
                ...state,
                frames: state.frames.map((item, index) => {
                    return {
                        ...item,
                        code: action.index === index ? action.code : item.code
                    };
                })
            }
        default:
            return state;
    }
}
