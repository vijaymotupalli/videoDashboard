import {SET_SUBJECTS,SET_STANDARDS,SET_SCHOOLS} from '../actions/types'

export default function VideoReducer(state = {
    subjects: [],
    standards: [],
    schools: []
}, action) {
    switch (action.type) {

        case SET_SUBJECTS:
            return state = {
                ...state,
                subjects: action.payload
            };
            break;
        case SET_STANDARDS:
            return state = {
                ...state,
                standards: action.payload
            };
            break;
        case SET_SCHOOLS:
            return state = {
                ...state,
                schools: action.payload
            };
            break;
        default:
            return state;
    }
}