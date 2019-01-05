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
import { logIn } from "../../redux/actions";
import { Redirect } from "react-router-dom";

class Auth extends Component {

    state = {
        tab: 0,
        login: '',
        password: '',
        confPassword: ''
    };

    submitRegister = () => {
        if (this.state.password != this.state.confPassword) {
            return
        }
        fetch("http://localhost:8000/v1/signup", { 
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.login,
                password: this.state.password
            })
        }).then( r => r.json())
        .then( r => console.log(r))
        .catch( e => console.log(e))
    }

    submitLogin = () => {
        this.props.logIn(this.state.login, this.state.password)
        .then( r => {

        })
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value });
    };

    render() {
        console.log(this.props)
        const { classes } = this.props;
        return (
            <>
            {
                this.props.state.isAuth && <Redirect to="/chat" />
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
                            value={this.state.name}
                            onChange={(e) => this.handleChange('login', e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            className={classes.input}
                            type="password"
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
            </>
        );
    }
}

export default connect(
    state => ({ state: state}),
    { logIn }
)(withStyles(styles)(Auth));