import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAllChats, fetchMyChats, setActiveChat } from "../actions/chats";
import * as fromChats from '../reducers/chatReducer';
import * as fromState from '../reducers';
import { sendMessage, mountChat, unmountChat, socketsConnect} from "../actions/sockets";

import ChatPage from '../components/ChatPage/ChatPage';

const mapStateToProps = state => {
    const activeChat = fromChats.getById(state.chat, state.chat.activeId)
    return ({
        chats: {
            activeChat,
            my: fromChats.getByIds(state.chat, state.chat.myIds),
            all: fromChats.getByIds(state.chat, state.chat.allIds)
        },
        activeUser: {
            ...state.auth.user,
            isMember: fromState.isMember(state, activeChat),
            isCreator: fromState.isCreator(state, activeChat),
            isChatMember: fromState.isChatMember(state, activeChat),
        },
    })
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAllChats,
    fetchMyChats,
    setActiveChat,
    sendMessage,
    mountChat,
    unmountChat,
    socketsConnect
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPage)