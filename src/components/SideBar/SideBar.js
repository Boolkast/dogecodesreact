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
import NewChatButton from "../NewChatButton/NewChatButton";

class SideBar extends React.Component {

    state = {
        tab: 0,
        searchValue:""
    }

    filterChats = (chats) => {
        const { searchValue } = this.state;
        return chats
          .filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
          .sort((one, two) => (one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1));
      };

    render() {
        console.log(this.props)
        const { classes } = this.props;
        const source = this.state.tab == 0 ? this.props.chats.my : this.props.chats.all;

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
                            value={this.state.searchValue}
                            onChange={(e) => this.setState({searchValue: e.target.value})}
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
                    <ChatList isConnected={this.props.isConnected} chatlist={this.filterChats(source)} type={this.state.tab} setActiveChat={this.props.setActiveChat} />
                </div>
                <NewChatButton disabled={!this.props.isConnected} createChat={this.props.createChat} />
                <AppBar
                    position="static"
                    color="inherit"
                    className={classes.tabContainer}
                >
                    <Tabs
                        className={classes.tabsSizes}
                        value={this.state.tab}
                        onChange={(e,v) => this.setState({ tab: v })}
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
}

export default withStyles(styles)(SideBar);