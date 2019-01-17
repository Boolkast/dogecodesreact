import React from 'react';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Modal from 'material-ui/Modal';
import Person from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styles } from './style';

class UserMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    editUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  state = {
    modal: false,
    anchor: null,
    username: '',
    firstName: '',
    lastName: '',
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSave = () => {
    const { username, firstName, lastName } = this.state;
    const { editUser } = this.props;

    editUser(username, firstName, lastName).then(() => this.setState({ modal: false }));
  };

  handleOpenModal = () => {
    const { username, firstName, lastName } = this.props.activeUser;
    this.setState({
      modal: true,
      username,
      firstName,
      lastName,
    });
  };

  render() {
    const { classes, disabled, logout } = this.props;
    const {
      anchor, modal, username, firstName, lastName,
    } = this.state;
    return (
      <>
        <div className={classes.right}>
          <IconButton
            disabled={disabled}
            className={classes.button}
            aria-label="Person"
            onClick={e => this.setState({ anchor: e.currentTarget })}
            aria-owns={anchor ? 'menu' : null}
            aria-haspopup="true"
          >
            <Person />
          </IconButton>
          <Menu
            id="menu"
            open={anchor}
            anchorEl={anchor}
            onClose={() => this.setState({ anchor: null })}
          >
            <MenuItem onClick={this.handleOpenModal}>Edit Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
          <Modal
            open={modal}
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
                value={username}
                onChange={this.handleInputChange}
              />
              <TextField
                fullWidth
                name="firstName"
                label="First name"
                placeholder="Enter you first name..."
                type="text"
                margin="normal"
                value={firstName}
                onChange={this.handleInputChange}
              />
              <TextField
                fullWidth
                name="lastName"
                label="Last name"
                placeholder="Enter you last name..."
                type="text"
                margin="normal"
                value={lastName}
                onChange={this.handleInputChange}
              />
              <Button color="primary" onClick={this.handleSave}>
                Save
              </Button>
              <Button onClick={() => this.setState({ modal: false })}>Close</Button>
            </Paper>
          </Modal>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(UserMenu);
