import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Restore from '@material-ui/icons/Restore';
import Explore from '@material-ui/icons/Explore';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InputBase from '@material-ui/core/InputBase';
import ChatList from '../ChatList/chatList';
import { styles } from './style';
import NewChatButton from '../NewChatButton/NewChatButton';

class SideBar extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    chats: PropTypes.shape({
      active: PropTypes.object,
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired,
    }).isRequired,
    createChat: PropTypes.func.isRequired,
    isConnected: PropTypes.bool.isRequired,
    setActiveChat: PropTypes.func.isRequired,
  };

  state = {
    tab: 0,
    searchValue: '',
  };

  filterChats = (chats) => {
    const { searchValue } = this.state;
    return chats
      .filter(chat =>
        chat.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .sort((one, two) =>
        one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1,
      );
  };

  render() {
    const {
      classes,
      chats,
      isConnected,
      setActiveChat,
      createChat,
    } = this.props;
    const { tab, searchValue } = this.state;

    const source = tab === 0 ? chats.my : chats.all;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <div className={classes.search}>
            <InputBase
              value={searchValue}
              onChange={e => this.setState({ searchValue: e.target.value })}
              placeholder="Search chats…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </div>
        <Divider />
        <div className={classes.chatlist}>
          <ChatList
            isConnected={isConnected}
            chatlist={this.filterChats(source)}
            setActiveChat={setActiveChat}
          />
        </div>
        <NewChatButton disabled={!isConnected} createChat={createChat} />
        <AppBar
          position="fixed"
          color="inherit"
          className={classes.tabContainer}
        >
          <Tabs
            className={classes.tabsSizes}
            value={tab}
            onChange={(e, v) => this.setState({ tab: v })}
            textColor="primary"
            fullWidth
          >
            <Tab
              icon={<Restore />}
              label="My chats"
              className={classes.tabSize}
            />
            <Tab
              icon={<Explore />}
              label="Explore"
              className={classes.tabSize}
            />
          </Tabs>
        </AppBar>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideBar);
