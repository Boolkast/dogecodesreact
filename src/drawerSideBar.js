import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Icon from "@material-ui/core/Icon";
import Restore from "@material-ui/icons/Restore";
import Explore from "@material-ui/icons/Explore";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/Person";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import classNames from 'classnames';

const drawerWidth = 320;

const styles = theme => ({
  root: {
    display: "flex"
  },
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  messageWrappperFromMe: {
    justifyContent: 'flex-end',
  },
  chatlist: {
    height: `calc(100% - 20px)`
  },
  tabContainer: {
    height: "56px"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  messages: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    maxWidth: "70%",
    minWidth: "10%"
  },
  messageFromMe: {
    padding: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff',
  },
  tabsSizes: {
    height: "100%"
  },
  tabSize: {
    padding: "5px"
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  right: {
    position: "absolute",
    right: 0,
    marginRight: 20
  }
});

function PermanentDrawerLeft(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Boolka Chat
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
        <div className={classes.toolbar} />
        <Divider />
        <div className={classes.chatlist} />
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.messageWrapper}>
          <Paper className={classes.messages}>
            <Typography variant="h5" component="h3">
              This is a sheet of paper.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
          </Paper>
        </div>
        <div className={classNames(classes.messageWrapper, classes.messageWrappperFromMe)}>
          <Paper className={classes.messages, classes.messageFromMe}>
            <Typography variant="h5" component="h3">
              This is a sheet of paper.
            </Typography>
            <Typography component="p">
              Paper can be used to build surface or other elements for your
              application.
            </Typography>
          </Paper>
        </div>
      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);
