import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { styles } from "./style";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import AvatarComponent from "../Avatar/avatar";
import Typography from "@material-ui/core/Typography";
import UserMenu from "../UserMenu/UserMenu";
import ChatMenu from '../ChatMenu/ChatMenu';

function AppBarComponent(props) {
  const { classes } = props;
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {
            props.activeChat && (
              <>
                <AvatarComponent name={props.activeChat.title} />
                <Typography variant="h6" color="inherit" noWrap>
                  {props.activeChat.title}
                  <ChatMenu
                    disabled={!props.isConnected}
                    activeUser={props.activeUser}
                    onLeaveClick={() => props.leaveChat(props.activeChat._id)}
                    onDeleteClick={() => props.deleteChat(props.activeChat._id)}
                  />
                </Typography>
              </>
            )
          }
          <UserMenu editUser={props.editUser} user={props.user} logout={props.logout} disabled={!props.isConnected}/>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default withStyles(styles)(AppBarComponent);