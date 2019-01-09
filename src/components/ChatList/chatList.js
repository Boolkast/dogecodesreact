import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AvatarComponent from "../Avatar/avatar";
import { styles } from "./style";

function ChatList(props) {
    const { classes } = props;
    const source = props.type == 0 ? props.chatlist.myIds : props.chatlist.allIds;
    return (
        <React.Fragment>
            {
                source &&
                source.map( (chat, i) => {
                    const gettedChat = props.chatlist.byIds[chat]
                    return (
                        <div key={i} className={classes.chatItem}>
                            <AvatarComponent name={gettedChat.title} />
                            <div className={classes.info}>
                                <p className={classes.infoItem}>{gettedChat.title}</p>
                            </div>
                        </div>

                    )
                })
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(ChatList);
