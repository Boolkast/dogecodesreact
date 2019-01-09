import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AvatarComponent from "../Avatar/avatar";
import { styles } from "./style";

function ChatList(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            {
                props.chatlist &&
                props.chatlist.map( (chat, i) => {
                    return (
                        <div key={i} className={classes.chatItem}>
                            <AvatarComponent name={chat.name} />
                            <div className={classes.info}>
                                <p className={classes.infoItem}>{chat.name}</p>
                                
                            </div>
                        </div>

                    )
                })
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(ChatList);
