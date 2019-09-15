import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import DefaultProfilePic from "../assets/images/super-admin.jpg";
import Fab from "@material-ui/core/Fab";
import SignOut from "@material-ui/icons/PowerSettingsNew";

const styles = theme => ({
  root: {
    display: "flex",
    borderRadius: "25px",
    backgroundColor: "#fff"
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  avatar: {
    marginRight: "10px",
    display: "inline-block",
    verticalAlign: "middle"
    // margin: 10
  },
  userWelcomeText: {
    display: "inline-block"
  },
  fab: {
    margin: theme.spacing.unit,
    width: "45%",
    height: "30px",
    fontSize: "10px",
    backgroundColor: "#2cbd74",
    color: "#fff",
    padding: "0"
  },
  signOutIcon: {
    marginRight: theme.spacing.unit,
    width: "15px"
  },
  userName: {
    fontSize: "14px",
    justifyContent: "end",
    color: "#8c8c8c"
  }
});

class TopBarMenu extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleLogout = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.userName}
        >
          <NavLink
            activeClassName="is-active"
            to="/web/auth/profile/account-settings"
            style={{ textDecoration: "none", color: "#8c8c8c" }}
          >
            <Avatar
              alt="User"
              src={DefaultProfilePic}
              className={classes.avatar}
            />
            <div className={classes.userWelcomeText}>Welcome, {this.props.restaurantOwnerName || 'User'}</div>
          </NavLink>
        </Grid>
        <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={this.props.logout}>
          <SignOut className={classes.signOutIcon} />
          SIGN OUT
        </Fab>
      </div>
    );
  }
}

TopBarMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopBarMenu);
