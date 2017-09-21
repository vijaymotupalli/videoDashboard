import {SET_VIDEOS, SELECTED_VIDEO, SET_PROGRESS} from '../actions/types'

export default function VideoReducer(state = {
    videos: [],
    selectedVideo: "",
    progress: 0
}, action) {
    switch (action.type) {
        case SELECTED_VIDEO:
            return state = {
                ...state,
                selectedVideo: action.payload
            }
            break;
        case SET_PROGRESS:
            return state = {
                ...state,
                progress: action.payload
            };
            break;
        case SET_VIDEOS:
            return state = {
                ...state,
                videos: action.payload
            };
            break;
        default:
            return state;
    }
}