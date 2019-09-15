import React, { Component } from "react";

import { BrowserRouter as Router } from "react-router-dom";

import PropTypes from "prop-types";

import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Grid from "@material-ui/core/Grid";
import TopBarMenu from "../../components/TopBarMenu";

import ScrollArea from "react-scrollbar";
import LeftMenu from "./left-menu/LeftMenu";
import AuthRoutes from "./auth-routes/AuthRoutes";

import { styles } from "./styles";

import { connect } from "react-redux";
import { logout, logoutSuccess } from '../../store/actions/profile';
import { ToastContainer, ToastStore } from "react-toasts";

class AuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      toastMessage: false
    };
  }


  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  logoutHandler = () => {
    this
      .props.logout();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data.profileAPIData.logout) {
        this.props.logoutSuccess();
        this.props.history.push("/login");
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Router>
          <div className={classes.root}>
            <ToastContainer store={ToastStore} />
            <CssBaseline />
            <AppBar
              position="absolute"
              style={{ backgroundColor: "#fff", color: "#000" }}
              className={classNames(
                classes.appBar,
                this.state.open && classes.appBarShift
              )}
            >
              <Toolbar
                disableGutters={!this.state.open}
                className={classes.toolbar}
              >
                <Grid container spacing={16}>
                  <Grid item xs={6}>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerOpen}
                      className={classNames(
                        classes.menuButton,
                        this.state.open && classes.menuButtonHidden
                      )}
                    >
                      <ArrowForwardIcon className={classes.arrowMenuOpen} />
                    </IconButton>
                    {this.state.open ? (
                      <IconButton onClick={this.handleDrawerClose}>
                        <MenuIcon className={classes.menuOpen} />
                      </IconButton>
                    ) : null}
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      className={classes.title}
                    >
                      {/* {new Date().toString()} */}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={16}>
                      <Grid item xs={2} />
                      <Grid item xs={2}>
                      
                      </Grid>
                      <Grid item xs={8} className={classes.menuWrapper}>
                        <TopBarMenu logout={this.logoutHandler} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              style={{ height: "100vh" }}
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose
                )
              }}
              open={this.state.open}
            >
              {this.state.open ? (
                <div
                  className={classes.toolbarIcon}
                  style={{ background: "#fff" }}
                >
                  <div className={classes.sidePanelHeader}>
                    MERN Example
                  </div>
                </div>
              ) : null}
              {this.state.open ? (
                <div> 
                </div>
              ) : (
                <div
                  style={{
                    marginTop: "65px",
                    textAlign: "center",
                    padding: "25px 0"
                  }}
                >
                  MERN
                </div>
              )}
              <Divider />
              {this.state.open ? (
                <List className={classes.sidePanelWrapper}>
                  <LeftMenu open={this.state.open} />
                </List>
              ) : (
                <List className={classes.sidePanelWrapperClosed}>
                  <LeftMenu open={this.state.open} />
                </List>
              )}
            </Drawer>
            <ScrollArea
              speed={0.8}
              className={classes.scrollContent}
              contentClassName="content"
              horizontal={false}
            >
              <main className={classes.content}>
                <AuthRoutes />
              </main>
            </ScrollArea>
          </div>
        </Router>
      </div>
    );
  }
}

AuthLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { data: state };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    logout: ()=> dispatch(logout()),
    logoutSuccess: ()=> dispatch(logoutSuccess())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(AuthLayout));
