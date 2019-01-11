import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { styles } from "./style";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import AvatarComponent from "../Avatar/avatar";
import Typography from "@material-ui/core/Typography";
import UserMenu from "../UserMenu/UserMenu";

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
                </Typography>
              </>
            )
          }
          <UserMenu logout={props.logout}/>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default withStyles(styles)(AppBarComponent);