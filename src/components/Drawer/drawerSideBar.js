import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Restore from "@material-ui/icons/Restore";
import Explore from "@material-ui/icons/Explore";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/Person";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MessageList from "../MessageList/messageList";
import AvatarComponent from "../Avatar/avatar";
import ChatList from "../ChatList/chatList";
import { styles } from "./style";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

function PermanentDrawerLeft(props) {
  const { classes } = props;

  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <AvatarComponent name={props.chatname} />
          <Typography variant="h6" color="inherit" noWrap>
            {props.chatname}
          </Typography>
          <div className={classes.right}>
            <IconButton className={classes.button} aria-label="Person">
              <Person />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
      <div className={classes.toolbar}>
        <div className={classes.search}>
            <InputBase
              placeholder="Search chats…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              />
          </div>
      </div>
        <Divider />
        <div className={classes.chatlist} >
        
          <ChatList chatlist={props.chatlist} />
        </div>
        <AppBar
          position="static"
          color="inherit"
          className={classes.tabContainer}
        >
          <Tabs
            className={classes.tabsSizes}
            value={0}
            onChange={console.log("tewt")}
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
      <MessageList messages={props.messages} />
    </div>
  );
}

export default withStyles(styles)(PermanentDrawerLeft);
