import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AvatarComponent from "./avatar";

const styles = theme => ({
    chatItem: {
      display: "flex",
      width: `100%`,
      height: `60px`,
    },
    info: {
        height: `100%`,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        flex: 1,

    },
  });

function ChatList(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            {
                props.chatlist.map( (chat, i) => {
                    const update_label = +new Date() - (+chat.last_update)
                    console.log(update_label)
                    return (
                        <div key={i} className={classes.chatItem}>
                            <AvatarComponent name={chat.name} />
                            <div className={classes.info}>
                                <p className={classes.noMarginBottom}>{chat.name}</p>
                                <p className={classes.noMarginTop}>{update_label}</p>
                            </div>
                        </div>

                    )
                })
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(ChatList);