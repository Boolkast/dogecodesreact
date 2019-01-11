import React from 'react';
import { withStyles } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Modal from 'material-ui/Modal';
import Person from "@material-ui/icons/Person";
import { styles } from "./style";

class UserMenu extends React.Component {

    state = {
        modal: false,
        anchor: null
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes.right}>
                    <IconButton 
                    disabled={this.props.disabled}
                    className={classes.button} 
                    aria-label="Person" 
                    onClick={ (e) => this.setState({anchor: e.currentTarget})}
                    aria-owns={this.state.anchor ? 'menu' : null}
                    aria-haspopup="true"
                    >
                        <Person />
                    </IconButton>
                <Menu
                    id="menu"
                    open={this.state.anchor}
                    anchorEl={this.state.anchor}
                    onClose={() => this.setState({ anchor: null })}
                    >
                    <MenuItem onClick={this.toggleEditProfileModal}>Edit Profile</MenuItem>
                    <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                </Menu>
                    </div>
            </>
        )
    }
}

export default withStyles(styles)(UserMenu)