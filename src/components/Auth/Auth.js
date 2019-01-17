import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn, register } from '../../actions/auth';
import { styles } from './style';
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar';

class Auth extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    state: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    tab: 0,
    login: '',
    password: '',
    confPassword: '',
    isPassComplete: true,
    isLoginComplete: true,
  };

  submitRegister = () => {
    const { login, password, confPassword } = this.state;
    const { register } = this.props;
    if (password === confPassword) {
      if (login.length !== 0) {
        register(login, password);
        this.setState({ isLoginComplete: true, isPassComplete: true });
      } else {
        this.setState({ isLoginComplete: false });
      }
    } else {
      this.setState({ isPassComplete: false });
    }
  };

  submitLogin = () => {
    const { login, password } = this.state;
    const { logIn } = this.props;

    if (password.length !== 0) {
      if (login.length !== 0) {
        logIn(login, password);
        this.setState({ isLoginComplete: true, isPassComplete: true });
      } else {
        this.setState({ isLoginComplete: false });
      }
    } else {
      this.setState({ isPassComplete: false });
    }
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const { classes, state } = this.props;
    console.log(this.props)
    const {
      tab, name, password, confPassword, isLoginComplete, isPassComplete,
    } = this.state;
    return (
      <React.Fragment>
        {state.auth.isAuth && <Redirect to="/chat" />}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Boolka React Chat
            </Typography>
            <div className={classes.right} />
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <div className={classes.authForm}>
            <Paper square>
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, value) => this.handleChange('tab', value)}
                fullWidth
              >
                <Tab label="LOGIN" selected />
                <Tab label="SIGN UP" />
              </Tabs>
            </Paper>
            <Paper square className={classes.inputsContainer}>
              <TextField
                id="standard-name"
                label="Name"
                className={classes.input}
                error={!isLoginComplete}
                value={name}
                onChange={e => this.handleChange('login', e.target.value)}
                margin="normal"
              />
              <TextField
                id="standard-password-input"
                label="Password"
                className={classes.input}
                type="password"
                error={!isPassComplete}
                autoComplete="current-password"
                value={password}
                onChange={e => this.handleChange('password', e.target.value)}
                margin="normal"
              />

              {tab === 1 && (
                <TextField
                  id="standard-password-input"
                  label="Repeat password"
                  className={classes.input}
                  type="password"
                  error={!isPassComplete}
                  autoComplete="current-password"
                  value={confPassword}
                  onChange={e => this.handleChange('confPassword', e.target.value)}
                  margin="normal"
                />
              )}
              <Button
                variant="contained"
                onClick={tab === 0 ? this.submitLogin : this.submitRegister}
                color="primary"
                className={classes.loginButton}
              >
                {tab === 0 ? 'LOGIN' : 'SIGN UP'}
              </Button>
            </Paper>
          </div>
        </div>
        <ErrorSnackbar error={state.services.errors.auth} />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({ state }),
  { logIn, register },
)(withStyles(styles)(Auth));
