import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MessageList from "../MessageList/messageList";
import { styles } from "./style";
import { connect } from "react-redux";
import AppBarComponent from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import { createChat, setActiveChat, leaveChat, deleteChat, joinChat } from "../../actions/chats";
import { logout, editUser } from "../../actions/auth";
import { sendMessage } from "../../actions/sockets";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";

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
    if (params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
      unmountChat(params.chatId);
      mountChat(nextParams.chatId);
    }
  }

  render() {
    const appBarPack = {
      leaveChat: this.props.leaveChat,
      deleteChat: this.props.deleteChat,
      isConnected: this.props.state.services.isConnected,
      activeUser: this.props.activeUser,
      leaveChat: this.props.leaveChat,
      state: this.props.state,
      activeChat: this.props.chats.activeChat,
      logout: this.props.logout,
      user: this.props.activeUser,
      editUser: this.props.editUser
    }

    const sideBarPack = {
      isConnected: this.props.state.services.isConnected,
      chats: this.props.chats,
      createChat: this.props.createChat,
      setActiveChat: this.props.setActiveChat
    }

    const messageListPack = {
      activeChat: this.props.chats.activeChat,
      isConnected: this.props.state.services.isConnected,
      joinChat: this.props.joinChat, messages: this.props.state.messages,
      activeUser: this.props.activeUser,
      sendMessage: this.props.sendMessage
    }

    return (
      <div className={this.props.classes.root}>
        <AppBarComponent {...appBarPack} />
        <SideBar {...sideBarPack}/>
        <MessageList {...messageListPack}/>
        <ErrorSnackbar error={this.props.state.services.errors.chat} />
      </div>
    );
  }
}

export default connect(
  state => ({ state: state }),
  { createChat, logout, setActiveChat, sendMessage, leaveChat, deleteChat, joinChat, editUser }
)(withStyles(styles)(ChatPage));
