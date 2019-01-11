import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MessageList from "../MessageList/messageList";
import { styles } from "./style";
import { connect } from "react-redux";
import AppBarComponent from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import { createChat, setActiveChat } from "../../actions/chats";
import { logout } from "../../actions/auth";
import { sendMessage } from "../../actions/sockets";

class ChatPage extends React.Component {

  componentDidMount() {
    const { fetchAllChats, fetchMyChats } = this.props

    Promise.all([
      fetchAllChats(),
      fetchMyChats()
    ])
    .then( () => {
      this.props.socketsConnect()
    })
    .then(() => {
      const { chatId } = this.props.match.params;

      if (chatId) {
        this.props.setActiveChat(chatId);
        this.props.mountChat(chatId);
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params }, setActiveChat, unmountChat, mountChat,
    } = this.props;
    const { params: nextParams } = nextProps.match;
    console.log(nextParams.chatId, params.chatId)
    if (params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
      unmountChat(params.chatId);
      mountChat(nextParams.chatId)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className={this.props.classes.root}>
        <AppBarComponent state={this.props.state} activeChat={this.props.chats.activeChat} logout={this.props.logout}/>
        <SideBar chats={this.props.state.chat} createChat={this.props.createChat} setActiveChat={this.props.setActiveChat}/>
        <MessageList messages={this.props.state.messages} userId={this.props.state.auth.user._id} sendMessage={this.props.sendMessage}/>
      </div>
    );
  }
}

export default connect(
  state => ({ state: state }),
  { createChat, logout, setActiveChat, sendMessage }
)(withStyles(styles)(ChatPage));
