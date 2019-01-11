import React from 'react';
import { withStyles } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Modal from 'material-ui/Modal';
import Person from "@material-ui/icons/Person";
import { styles } from "./style";
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"


class UserMenu extends React.Component {

    state = {
        modal: false,
        anchor: null,
        username: this.props.user.username,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSave = () => {
        this.props.editUser(this.state.username, this.state.firstName, this.state.lastName)
        .then( () => this.setState({modal: false}))
    }

    handleOpenModal = () => {
        this.setState({
            modal: true,
            username: this.props.user.username,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName
        })
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
                        onClick={(e) => this.setState({ anchor: e.currentTarget })}
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
                        <MenuItem onClick={this.handleOpenModal}>Edit Profile</MenuItem>
                        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                    </Menu>
                    <Modal
                        open={this.state.modal}
                        className={classes.modalWrapper}
                        onClose={() => this.setState({ modal: false })}
                    >
                        <Paper className={classes.modal}>
                            <Typography variant="title" id="modal-title">
                                Edit profile
            </Typography>
                            <TextField
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                placeholder="Enter you username..."
                                type="text"
                                margin="normal"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                fullWidth
                                name="firstName"
                                label="First name"
                                placeholder="Enter you first name..."
                                type="text"
                                margin="normal"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                fullWidth
                                name="lastName"
                                label="Last name"
                                placeholder="Enter you last name..."
                                type="text"
                                margin="normal"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                            />
                            <Button color="primary" onClick={this.handleSave}>
                                Save
            </Button>
                            <Button onClick={() => this.setState({modal: false})}>Close</Button>
                        </Paper>
                    </Modal>
                </div>
            </>
        )
    }
}

export default withStyles(styles)(UserMenu)