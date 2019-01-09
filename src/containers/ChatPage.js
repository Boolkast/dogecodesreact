import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchAllChats, fetchMyChats, setActiveChat } from "../actions/chats";
import * as fromChats from '../reducers/chatReducer';
import ChatPage from '../components/ChatPage/ChatPage';

const mapStateToProps = state => {
    return ({
    chats: fromChats.getByIds(state.chat, state.chat.allIds)
})};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAllChats,
    fetchMyChats,
    setActiveChat
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPage)