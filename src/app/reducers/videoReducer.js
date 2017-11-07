import {SET_VIDEOS, SELECTED_VIDEO, SET_PROGRESS,SET_VIDEO_ERROR,SET_DEMO_VIDEOS} from '../actions/types'

export default function VideoReducer(state = {
    videos: [],
    demoVideos:[],
    selectedVideo: "",
    progress: 0,
    videoError:"",
    loader:false
}, action) {
    switch (action.type) {
        case SELECTED_VIDEO:
            return state = {
                ...state,
                selectedVideo: action.payload
            }
            break;
        case "SET_LOADER":
            return state = {
                ...state,
                loader: action.payload
            }
            break;
        case SET_PROGRESS:
            return state = {
                ...state,
                progress: action.payload
            };
            break;
        case SET_VIDEO_ERROR:
            return state = {
                ...state,
                videoError: action.payload
            };
            break;
        case SET_VIDEOS:
            return state = {
                ...state,
                videos: action.payload
            };
            break;
        case SET_DEMO_VIDEOS:
            return state = {
                ...state,
                demoVideos: action.payload
            };
            break;
        default:
            return state;
    }
}