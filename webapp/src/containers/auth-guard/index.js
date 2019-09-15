import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { AUTH_DATA } from "../../config/local-storage-keys";
import { connect } from "react-redux";
import AuthLayout from "../auth-layout";

class AuthGuard extends Component {
  constructor(props) {
    super(props);

    // initially assuming that user is logged out
    let user = {
      isLoggedIn:
        (this.props.data.authReducer.userData &&
          this.props.data.authReducer.userData.success) ||
        false
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
    // updating the state
    this.state = {
      user: user
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.authReducer !== this.props.data.authReducer) {
      if (this.props.data.authReducer.userData) {
        this.setState({
          user: { isLoggedIn: this.props.data.authReducer.userData.success }
        });
      }
    }
  }

  render() {
    return this.state.user.isLoggedIn ? (
      <Route path={this.props.location.pathname} component={AuthLayout} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: this.props.location }
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

export default connect(mapStateToProps)(AuthGuard);
