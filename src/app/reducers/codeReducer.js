import {SET_CODES} from '../actions/types'

export default function CodeReducer(state = {
    codes: []
}, action) {
    switch (action.type) {

        case SET_CODES:
            return state = {
                ...state,
                codes: action.payload
            };
            break;
        default:
            return state;
    }
}