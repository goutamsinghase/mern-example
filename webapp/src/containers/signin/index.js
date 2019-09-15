import React, {Component} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {withStyles, MuiThemeProvider} from "@material-ui/core/styles";
import {Redirect} from "react-router-dom";

import {styles} from "./styles";

import {connect} from "react-redux";
import {login} from "../../store/actions/auth";
import {AUTH_DATA} from "../../config/local-storage-keys";

import Grid from "@material-ui/core/Grid";

import classNames from "classnames";

import TextField from "@material-ui/core/TextField";

import theme from "../../app/theme";

class SignIn extends Component {
    constructor(props) {
        super(props);

        // initially assuming that user is logged out
        let user = {
            isLoggedIn: false
        };

        // if user is logged in, his details can be found from local storage
        try {
            let userJsonString = localStorage.getItem(AUTH_DATA);
            if (userJsonString) {
                user.data = JSON.parse(userJsonString);
                if (user.data.token) {
                    user.isLoggedIn = true;
                }
            }
        } catch (exception) {
            console.log("exception", exception);
        }

        this.state = {
            fields: {
                email: "",
                password: ""
            },
            errors: {},
            isLoggedIn: user.isLoggedIn,
            toastMessage: false
        };
    }

    handleClickShowPassword = () => {
        this.setState((state) => ({
            showPassword: !state.showPassword
        }));
    };

    handleChange = event => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;

        let errors = {};

        if (!fields[event.target.name]) {
            errors[event.target.name] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf("@@") === -1 && lastDotPos > 2 && fields["email"].length - lastDotPos > 2)) {
                errors["email"] = "Email is not valid";
            }
        }

        this.setState({fields, errors});
    };

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf("@@") === -1 && lastDotPos > 2 && fields["email"].length - lastDotPos > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        this.setState({errors: errors});
        return formIsValid;
    };

    submitHandler = event => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.login(this.state.fields);
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            // if success
            if (this.props.data.authReducer.userData.token) {
                this.setState({isLoggedIn: true});
            }
        }
    }

    render(props) {
        const {classes} = this.props;

        if (this.state.isLoggedIn) {
            return (<Redirect
                to={{
                pathname: "/auth/item/list",
                state: {
                    from: this.props.location
                }
            }}/>);
        } else {
            return (
                <MuiThemeProvider theme={theme}>
                    <div
                        className={classes.root}
                        style={{
                        backgroundColor: "#2cbd74"
                    }}>
                        <Grid container spacing={24} className={classes.signInWrapper}>
                           
                            <Grid item xs={12} sm={12} className={classes.signinBox}>
                                <Paper className={classes.signinBoxPaper}>
                                    <Typography component="h1" variant="h5" className={classes.formHeaderLogo}>
                                        MERN Example
                                    </Typography>
                                    <Typography component="h1" variant="h5" className={classes.formHeader}>
                                        {this.props.data.literalsReducer.Home.SignInHeader}
                                    </Typography>
                                    <form className={classes.form} onSubmit={this.submitHandler}>
                                        <TextField
                                            className={classes.textField}
                                            margin="normal"
                                            autoComplete="email"
                                            label={this.props.data.literalsReducer.Home.UserNameOrEmailAddress}
                                            name="email"
                                            value={this.state.fields["email"]}
                                            onChange={this.handleChange}
                                            error={this.state.errors.email
                                            ? true
                                            : false}/>
                                        <TextField
                                            className={classNames(classes.textField, classes.passwordInput)}
                                            type={this.state.showPassword
                                            ? "text"
                                            : "password"}
                                            label={this.props.data.literalsReducer.Home.Password}
                                            name="password"
                                            autoComplete="new-password"
                                            value={this.state.fields["password"]}
                                            onChange={this.handleChange}
                                            error={this.state.errors.password
                                            ? true
                                            : false}/>

                                        <div className={classes.formFooter}>
                                            <div className={classes.formFooterRight}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}>
                                                    {this.props.data.literalsReducer.Home.Login}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </MuiThemeProvider>
            );
        }
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {data: state};
};

const mapDispatchToProps = (dispatch)=>{
    return {
        login: (data)=> dispatch(login(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
