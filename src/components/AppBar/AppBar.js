/* eslint-disable no-underscore-dangle */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AvatarComponent from '../Avatar/avatar';
import { styles } from './style';
import UserMenu from '../UserMenu/UserMenu';
import ChatMenu from '../ChatMenu/ChatMenu';

function AppBarComponent(props) {
  const {
    classes, activeChat, isConnected, activeUser, editUser, logout,
  } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {activeChat && (
            <React.Fragment>

              <AvatarComponent name={activeChat.title} />
              <Typography variant="h6" color="inherit" noWrap>
                {activeChat.title}
                <ChatMenu
                  disabled={!isConnected}
                  activeUser={activeUser}
                  onLeaveClick={() => props.leaveChat(props.activeChat._id)}
                  onDeleteClick={() => props.deleteChat(props.activeChat._id)}
                />
              </Typography>
            </React.Fragment>
          )}
          <UserMenu editUser={editUser} activeUser={activeUser} logout={logout} disabled={!isConnected} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

AppBarComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  activeUser: PropTypes.shape({
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
    isChatMember: PropTypes.bool.isRequired,
  }).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  deleteChat: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

AppBarComponent.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(AppBarComponent); 
