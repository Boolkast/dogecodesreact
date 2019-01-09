import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Restore from "@material-ui/icons/Restore";
import Explore from "@material-ui/icons/Explore";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ChatList from "../ChatList/chatList";
import { styles } from "./style";
import InputBase from '@material-ui/core/InputBase';

function SideBar(props) {
    const { classes } = props;

    return (
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

                <ChatList chatlist={props.chats} />
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
    )
}

export default withStyles(styles)(SideBar);