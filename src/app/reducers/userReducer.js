const userReducer = (state = {
    users: [],error:"",userDataClear:false,selectedUser:"",userTasks:"",roles:"",selectedUserLog:""
}, action) => {
    switch (action.type) {
        case "SET_USERS_DATA":
            state = {
                ...state,
                users: action.payload
            };
            break;
        case "SET_USER_ERROR":
            state = {
                ...state,
                error: action.payload
            };
            break;
        case "CLEAR_USER_DATA":
        state = {
            ...state,
            userDataClear: action.payload
        };
        break;
        case "SELECTED_USER_DATA":
            state = {
                ...state,
                selectedUser: action.payload
            };
            break;
        case "SELECTED_USER_LOG":
            state = {
                ...state,
                selectedUserLog: action.payload
            };
            break;
        case "SET_USER_TASKS":
            state = {
                ...state,
                userTasks: action.payload
            };
            break;
        case "SET_ROLES_DATA":
            state = {
                ...state,
                roles: action.payload
            };
            break;
        case "SET_MODAL_STATUS":
            state = {
                ...state,
                boardAddModalShow: action.payload
            };
            break;
    }
    return state;
};

export default userReducer;