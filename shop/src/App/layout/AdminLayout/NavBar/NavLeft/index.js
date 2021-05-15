import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import windowSize from "react-window-size";

import NavSearch from "./NavSearch";
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import * as actionTypes from "../../../../../store/actions";

class NavLeft extends Component {
  render() {
    let iconFullScreen = ["feather"];
    iconFullScreen = this.props.isFullScreen
      ? [...iconFullScreen, "icon-minimize"]
      : [...iconFullScreen, "icon-maximize"];

    let navItemClass = ["nav-item"];
    if (this.props.windowWidth <= 575) {
      navItemClass = [...navItemClass, "d-none"];
    }
    let dropdownRightAlign = false;
    if (this.props.rtlLayout) {
      dropdownRightAlign = true;
    }

    return (
      <Aux>
        <ul className="navbar-nav mr-auto">
          <li>
            <a href="/" className="full-screen">
              <i className="feather icon-home" />
            </a>
          </li>
          <li className={navItemClass.join(" ")}>
            <a href="/" className="full-screen">
              Home
            </a>
          </li>
          <li className="nav-item"></li>
        </ul>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFullScreen: state.reducers.isFullScreen,
    rtlLayout: state.reducers.rtlLayout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreen: () => dispatch({ type: actionTypes.FULL_SCREEN }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(NavLeft));

//Edit By Lasitha
