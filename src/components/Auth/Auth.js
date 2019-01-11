import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { styles } from "./style";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { logIn, register } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar';

class Auth extends Component {

    state = {
        tab: 0,
        login: '',
        password: '',
        confPassword: '',
        isPassComplete: true,
        isLoginComplete: true
    };

    submitRegister = () => {
        if (this.state.password === this.state.confPassword) {
            if (this.state.login.length !== 0) {
                this.props.register(this.state.login, this.state.password)
                this.setState({isLoginComplete: true, isPassComplete: true})
            } else {
                this.setState({isLoginComplete: false})
            }
        } else {
            this.setState({isPassComplete: false})
        }
    }

    submitLogin = () => {
        if (this.state.password.length !== 0) {
            if (this.state.login.length !== 0) {
                this.props.logIn(this.state.login, this.state.password)
                this.setState({isLoginComplete: true, isPassComplete: true})
            } else {
                this.setState({isLoginComplete: false})
            }
        } else {
            this.setState({isPassComplete: false})
        }
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value });
    };

    render() {
        const { classes } = this.props;
        return (
            <>
            {
                this.props.state.auth.isAuth && <Redirect to="/chat" />
            }
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Boolka React Chat
          </Typography>
          <div className={classes.right}>
          </div>
        </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <div className={classes.authForm}>
                    <Paper square>
                        <Tabs
                            value={this.state.tab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(e, value) => this.handleChange("tab", value)}
                            fullWidth={true}
                        >
                            <Tab label="LOGIN" selected={true}/>
                            <Tab label="SIGN UP" />
                        </Tabs>
                    </Paper>
                    <Paper square className={classes.inputsContainer}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.input}
                            error={!this.state.isLoginComplete}
                            value={this.state.name}
                            onChange={(e) => this.handleChange('login', e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            className={classes.input}
                            type="password"
                            error={!this.state.isPassComplete}
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={(e) => this.handleChange('password', e.target.value)}
                            margin="normal"
                        />

                        { 
                            this.state.tab == 1 && 
                            <TextField
                            id="standard-password-input"
                            label="Repeat password"
                            className={classes.input}
                            type="password"
                            error={!this.state.isPassComplete}
                            autoComplete="current-password"
                            value={this.state.confPassword}
                            onChange={(e) => this.handleChange('confPassword', e.target.value)}
                            margin="normal"
                        />
                        }
                        <Button variant="contained" onClick={this.state.tab === 0 ? this.submitLogin : this.submitRegister} color="primary" className={classes.loginButton}>
                            { this.state.tab === 0 ? "LOGIN" : "SIGN UP"}
                        </Button>
                    </Paper>
                </div>
            </div>
            <ErrorSnackbar error={this.props.state.services.errors.auth}></ErrorSnackbar>
            </>
        );
    }
}

export default connect(
    state => ({ state: state}),
    { logIn, register }
)(withStyles(styles)(Auth));