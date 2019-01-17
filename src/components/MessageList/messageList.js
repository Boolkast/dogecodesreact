/* eslint-disable no-underscore-dangle */
import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import AvatarComponent from '../Avatar/avatar';
import { styles } from './style';
import ChatMessageInput from '../ChatMessageInput/ChatMessageInput';

class MessageList extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        chatId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sender: PropTypes.object.isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
    ).isRequired,
    activeChat: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
    joinChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    activeChat: null,
  };

  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const messagesWrapper = this.refs.messagesWrapper;
    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  } 

  render() {
    const {
      classes,
      messages,
      activeChat,
      isConnected,
      joinChat,
      sendMessage,
      activeUser,
    } = this.props;
    return (
      <div
        className={classes.content}
      >
        <div className={classes.toolbar} />
        <div className={classes.messagesContainer} ref='messageWraper'>
          {messages.map((item) => {
            const isMe = activeUser._id === item.sender._id;
            return (
              <div
                className={classNames(
                  classes.messageWrapper,
                  isMe && classes.messageWrappperFromMe,
                )}
              >
                {!isMe && <AvatarComponent name={item.sender.username} />}
                <Paper
                  className={classNames(classes.messages, isMe ? classes.messageFromMe : null)}
                >
                  <Typography variant="h5" component="h4">
                    {item.sender.username}
                  </Typography>
                  <Typography component="p">{item.content}</Typography>
                </Paper>
                {isMe && <AvatarComponent name={item.sender.username} />}
              </div>
            );
          })}
        </div>
        {activeChat && (
          <ChatMessageInput
            disabled={!isConnected}
            joinChat={joinChat}
            activeUser={activeUser}
            sendMessage={sendMessage}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MessageList);
