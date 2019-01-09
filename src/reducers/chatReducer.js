import { combineReducers } from 'redux';
import * as types from '../actions/actionTypes';

const initialState = {
    activeId: '',
    allIds: [],
    myIds: [],
    byIds: {},
}

function activeId(state = initialState.activeId, action) {
    switch(action.type) {
        case types.SET_ACTIVE_CHAT:
            return action.payload.chat._id
        case types.UNSET_ACTIVE_CHAT:
            return '';
        default:
            return state;
    }
}
function allIds(state = initialState.allIds, action) {
    switch( action.type) {
        case types.FETCH_ALL_CHATS_FULFILLED:
            return action.payload.chats.map(getChatId)
        case types.CREATE_CHAT_FULFILLED:
            return [
                ...state,
                action.payload.chat._id
            ]
    default:
        return state;
    }
}
function myIds( state = initialState.myIds, action) {
    switch( action.type) {
        case types.FETCH_MY_CHATS_FULFILLED:
            return action.payload.chats.map(getChatId)
        case types.CREATE_CHAT_FULFILLED:
            return [
                ...state,
                action.payload.chat._id
            ]
        default:
            return state;
    }

}
function byIds(state = initialState.byIds, action) {
    switch( action.type) {
        case types.FETCH_ALL_CHATS_FULFILLED:
        case types.FETCH_MY_CHATS_FULFILLED:
            return {
                ...state,
                ...action.payload.chats.reduce((ids, chat) => ({
                    ...ids,
                    [chat._id]: chat,
                }), {})
            }
        case types.CREATE_CHAT_FULFILLED:
            return {
                ...state,
                [action.payload.chat._id]: {
                    ...action.payload.chat
                }
            }
        default:
            return state;
    }
}

export default combineReducers({
    activeId,
    allIds,
    myIds,
    byIds
})

export const getChatId = (chat) => chat._id
export const getByIds = (state, ids) => ids.map( id => state.byIds[id])