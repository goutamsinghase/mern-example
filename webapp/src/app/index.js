import React, { Component } from "react";
import { Switch } from "react-router-dom";

import "./style.css";
import Progress from "react-progress-2";
import "react-progress-2/main.css";

import { ToastContainer, ToastStore } from "react-toasts";

import AuthGuard from "../containers/auth-guard";
import { routes } from "../routes/index";
import RouteWithSubRoutes from "../routes/routeWithSubRoutes";

import Grid from "@material-ui/core/Grid";
import { AUTH_DATA } from "../config/local-storage-keys";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    // if user is logged in, his details can be found from local storage
    try {
      let userJsonString = localStorage.getItem(AUTH_DATA);
      if (userJsonString) {
        let data = JSON.parse(userJsonString);
        if (data.token) {
          this.state = {
            isLoggedIn: true
          };
        } else {
          this.state = {
            isLoggedIn: false
          };
        }
      } else {
        this.state = {
          isLoggedIn: false
        };
      }
    } catch (exception) {
      this.state = {
        isLoggedIn: false
      };
      console.log("exception", exception);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data.authReducer.isAuthenticated) {
        this.setState({
          ...this.state,
          isLoggedIn: true
        });
      }
    }
  }

  render() {
    const routesDom = routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ));

    return (
      <div className="App">
        <Progress.Component />
        <ToastContainer store={ToastStore} />
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Switch>
              {routesDom}
              <AuthGuard />
            </Switch>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { data: state };
};

export default connect(mapStateToProps)(App);
