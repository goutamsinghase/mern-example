import React from "react";
import { NavLink } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import leftMenuConfig from "./left-menu-config";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMusic
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faMusic);

const LeftMenu = props => (
  <div>
    {leftMenuConfig.map((eachMenu, index) => {
      return (
        <NavLink
          activeClassName="is-active"
          to={eachMenu.to}
          key={index}
          style={{ textDecoration: "none" }}
        >
          {props.open ? (
            <ListItem
              button
              style={{ padding: "15px" }}
              className="left-menu-item"
            >
              <ListItemIcon
                style={{
                  marginRight: 0,
                  marginLeft: "7px"
                }}
              >
                <FontAwesomeIcon
                  icon={eachMenu.menuIcon}
                  style={{ fontSize: "20px" }}
                />
              </ListItemIcon>
              <ListItemText primary={eachMenu.menuText} />
            </ListItem>
          ) : (
            <ListItem
              button
              style={{ padding: "15px" }}
              className="left-menu-item-closed"
            >
              <ListItemIcon
                style={{
                  marginRight: 0,
                  marginLeft: "7px"
                }}
              >
                <FontAwesomeIcon
                  icon={eachMenu.menuIcon}
                  style={{ fontSize: "20px" }}
                />
              </ListItemIcon>
            </ListItem>
          )}
        </NavLink>
      );
    })}
  </div>
);

export default LeftMenu;
