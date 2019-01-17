import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import MessageList from '../MessageList/messageList';
import { styles } from './style';
import AppBarComponent from '../AppBar/AppBar';
import SideBar from '../SideBar/SideBar';
import {
  createChat, setActiveChat, leaveChat, deleteChat, joinChat,
} from '../../actions/chats';
import { logout, editUser } from '../../actions/auth';
import { sendMessage } from '../../actions/sockets';
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar';

class ChatPage extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    fetchAllChats: PropTypes.func.isRequired,
    fetchMyChats: PropTypes.func.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    socketsConnect: PropTypes.func.isRequired,
    mountChat: PropTypes.func.isRequired,
    unmountChat: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    chats: PropTypes.shape({
      active: PropTypes.object,
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired,
    }).isRequired,
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    createChat: PropTypes.func.isRequired,
    joinChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    deleteChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        chatId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sender: PropTypes.object.isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
    ).isRequired,
    editUser: PropTypes.func.isRequired,
    error: PropTypes.instanceOf(Error),
    isConnected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    error: null,
  };

  componentDidMount() {
    const {
      fetchAllChats, fetchMyChats, socketsConnect, match, mountChat, setActiveChat
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => {
        socketsConnect();
      })
      .then(() => {
        const { chatId } = match.params;

        if (chatId) {
          setActiveChat(chatId);
          mountChat(chatId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
      unmountChat,
      mountChat,
      setActiveChat,
    } = this.props;
    const { params: nextParams } = nextProps.match;
    if (params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
      unmountChat(params.chatId);
      mountChat(nextParams.chatId);
    }
  }

  render() {
    const {
      activeUser,
      chats,
      classes,
      state,
      createChat,
      setActiveChat,
      joinChat,
      sendMessage,
      leaveChat,
      deleteChat,
      editUser,
      logout,
      messages,
      activeChat,
      isConnected
    } = this.props;

    const appBarPack = {
      leaveChat,
      deleteChat,
      isConnected,
      activeUser,
      activeChat: activeChat,
      logout,
      editUser,
    };

    const sideBarPack = {
      isConnected,
      chats,
      createChat,
      setActiveChat,
    };

    const messageListPack = {
      activeChat: activeChat,
      isConnected,
      joinChat,
      messages: messages,
      activeUser,
      sendMessage,
    };
    return (
      <div className={classes.root}>
        <AppBarComponent {...appBarPack} />
        <SideBar {...sideBarPack} />
        <MessageList {...messageListPack} />
        <ErrorSnackbar error={state.services.errors.chat} />
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  {
    createChat,
    logout,
    setActiveChat,
    sendMessage,
    leaveChat,
    deleteChat,
    joinChat,
    editUser,
  },
)(withStyles(styles)(ChatPage));
