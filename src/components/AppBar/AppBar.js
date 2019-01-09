import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { styles } from "./style";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import AvatarComponent from "../Avatar/avatar";
import IconButton from "@material-ui/core/IconButton";
import Person from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

function AppBarComponent(props) {
  const { classes } = props;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {
            props.state.activeChat && (
              <>
                <AvatarComponent name={props.chatname} />
                <Typography variant="h6" color="inherit" noWrap>
                  {props.chatname}
                </Typography>
              </>
            )
          }
          <div className={classes.right}>
            <IconButton className={classes.button} aria-label="Person">
              <Person />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default withStyles(styles)(AppBarComponent);