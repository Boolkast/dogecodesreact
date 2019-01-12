/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { styles } from './style';
import ChatListItem from '../ChatListItem/ChatListItem';

function ChatList(props) {
  const { chatlist, isConnected, setActiveChat } = props;
  return (
    <React.Fragment>
      <List>
        {chatlist
          && chatlist.map((chat, i) => (
            <ChatListItem
              disabled={!isConnected}
              indx={i}
              title={chat.title}
              id={chat._id}
              setActiveChat={setActiveChat}
            />
          ))}
      </List>
    </React.Fragment>
  );
}

ChatList.propTypes = {
  chatlist: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  setActiveChat: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

ChatList.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(ChatList);
