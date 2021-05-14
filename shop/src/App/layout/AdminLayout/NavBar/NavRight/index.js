import React, { Component, Redirect } from "react";
import { Dropdown } from "react-bootstrap";

import ChatList from "./ChatList";
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from "../../../../../assets/images/user/avatar-1.jpg";
import Avatar2 from "../../../../../assets/images/user/avatar-2.jpg";
import Avatar3 from "../../../../../assets/images/user/avatar-3.jpg";
import Avatar4 from "../../../../../assets/images/user/avatar-4.jpg";

import { connect } from "react-redux";
import { loggout } from "../../../../../store/logginActions";

class NavRight extends Component {
  state = {
    listOpen: false,
  };

  logOut() {
    localStorage.setItem("user", null);
    alert(localStorage.getItem("user"));
  }
  componentDidMount() {
    console.log("this.props", this.props);
  }
  render() {
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li>
            {this.props.login.user.length != 0 ? (
              <a href="/order">
                <i className="icon feather icon-list" /> 
              </a>
            ) : (
              <div></div>
            )}
          </li>
          <li>
            <Dropdown alignRight={!this.props.rtlLayout}>
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <div>
                  {this.props.login.cart != null
                    ? this.props.login.cart.length
                    : 0}
                  <i className="icon feather icon-shopping-cart" />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="notification">
                <div className="noti-head">
                  <h6 className="d-inline-block m-b-0">Shoping Cart</h6>
                  <div className="float-right">
                    <a href={DEMO.BLANK_LINK} className="m-r-10">
                      mark as read
                    </a>
                    <a href={DEMO.BLANK_LINK}>clear all</a>
                  </div>
                </div>
                <ul className="noti-body">
                  {this.props.login.cart != null ? (
                    this.props.login.cart.map((item) => (
                      <li className="notification">
                        <div className="media">
                          <img className="img-radius" src={item.image} alt="" />
                          <div className="media-body">
                            <p>
                              <strong>{item.name}</strong>
                              <span className="n-time text-muted">
                                <i className="icon feather icon-clock m-r-10" />
                                30 min
                              </span>
                            </p>
                            <p>Price :{item.price}</p>
                            <p>Qty :{item.qty}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div></div>
                  )}
                </ul>
                <div className="noti-footer">
                  <a href="/check-list">Check Out</a>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          {/* <li className={this.props.rtlLayout ? "m-r-15" : "m-l-15"}>
            <a
              href={DEMO.BLANK_LINK}
              className="displayChatbox"
              onClick={() => {
                this.setState({ listOpen: true });
              }}
            >
              <i className="icon feather icon-mail" />
            </a>
          </li> */}
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <img
                    src="https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png"
                    className="img-radius"
                    alt="User Profile"
                  />
                  <span>
                    {this.props.login.user.length != 0
                      ? this.props.login.user.data.accessToken.email
                      : "Login/Signup"}
                  </span>
                  <a
                    style={{ color: "red" }}
                    href="/login"
                    className="dud-logout"
                    title="Logout"
                    onClick={() => this.props.loggout()}
                  >
                    <i className="feather icon-log-out" />
                  </a>
                </div>
                <ul className="pro-body">
                  <li>
                    <a href={DEMO.BLANK_LINK} className="dropdown-item">
                      <i className="feather icon-settings" /> Settings
                    </a>
                  </li>
                  <li>
                    <a href="/profile" className="dropdown-item">
                      <i className="feather icon-user" /> Profile
                    </a>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <ChatList
          listOpen={this.state.listOpen}
          closed={() => {
            this.setState({ listOpen: false });
          }}
        />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.reducers,
    login: state.loggedReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loggout: () => {
      dispatch(loggout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavRight);

//Edit By Lasitha
