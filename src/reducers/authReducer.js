import * as t from "../actions/actionTypes";

const {} = require('redux');

const token = localStorage.getItem('token');
const initialState = {
    isAuth: !!token,
    token: token,
    user: {
        _id: "",
        createdAt: undefined,
        username: "",
        chats: [],
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case t.AUTH_FULFILLED:
            return {
                ...state,
                isAuth: true,
                user: action.payload.user
            }
        case t.LOGOUT_FULFILLED:
            return {
                isAuth: false
            };
        case t.RECIEVE_AUTH_FULFILLED:
            return {
                ...state,
                isAuth: true,
                user: action.payload.user
            }
        default:
            return state;
    }
}

export default reducer;