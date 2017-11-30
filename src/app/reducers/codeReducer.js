import {SET_CODES,SELECTED_CODE_GROUP} from '../actions/types'

export default function CodeReducer(state = {
    codes: [],selectedCodeGroup:""
}, action) {
    switch (action.type) {

        case SET_CODES:
            return state = {
                ...state,
                codes: action.payload
            };
            break;
            case SELECTED_CODE_GROUP:
            return state = {
                ...state,
                selectedCodeGroup: action.payload
            };
            break;
        default:
            return state;
    }
}