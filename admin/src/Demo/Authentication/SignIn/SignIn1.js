import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../../../src/store/actions";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { fetchLoginData, fetchOTP } from "../../../store/logginActions";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Row, Col, Card } from "react-bootstrap";

import notify from "devextreme/ui/notify";
class SignUp1 extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  OnNotification = (message, type) => {
    notify({
      message: message,
      type: type,
      displayTime: 3000,
      position: { at: "top right", offset: "50" },
    });
  };

  render() {
    if (this.props.data.logginStatusCode === 503) {
      return (
        <Aux>
          <Breadcrumb />
          <div className="auth-wrapper">
            <div className="auth-content">
              <div className="auth-bg">
                <span className="r" />
                <span className="r s" />
                <span className="r s" />
                <span className="r" />
              </div>
              <div className="card">
                <div className="card-body text-center">
                  <div className="mb-4">
                    <i className="feather icon-unlock auth-icon" />
                  </div>
                  <h3 className="mb-4">Email Variication</h3>
                  <Row>
                    <Col md={2} xl={2}></Col>
                    <Col md={4} xl={4}>
                      <div className="timer-wrapper mb-4">
                        <CountdownCircleTimer
                          isPlaying
                          duration={1600}
                          colors={[
                            ["#004777", 0.33],
                            ["#F7B801", 0.33],
                            ["#A30000"],
                          ]}
                        >
                          {renderTime}
                        </CountdownCircleTimer>
                      </div>
                    </Col>
                  </Row>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Your OTP"
                      name="OTP"
                      onChange={this.onChange}
                    />
                  </div>

                  <button
                    className="btn btn-primary shadow-2 mb-4"
                    onClick={() =>
                      this.props.fetchOTP(
                        this.props.data.user.data.userId,
                        this.state.OTP
                      )
                    }
                  >
                    Verify
                  </button>

                  <p className="mb-0 text-muted"></p>
                  <p className="mb-0 text-muted">Version 2.6.0</p>
                </div>
              </div>
            </div>
          </div>
        </Aux>
      );
    } else {
      if (!this.props.data.logginStatus) {
        return (
          <Aux>
            <Breadcrumb />
            <div className="auth-wrapper">
              <div className="auth-content">
                <div className="auth-bg">
                  <span className="r" />
                  <span className="r s" />
                  <span className="r s" />
                  <span className="r" />
                </div>
                <div className="card">
                  <div className="card-body text-center">
                    <div className="mb-4">
                      <i className="feather icon-unlock auth-icon" />
                    </div>
                    <h3 className="mb-4">Shop More Login</h3>
                    {/* <p>{this.props.data.error}</p> */}

                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group text-left"></div>
                    <button
                      className="btn btn-primary shadow-2 mb-4"
                      onClick={() =>
                        this.props.fetchLoginData(
                          this.state.email,
                          this.state.password
                        )
                      }
                    >
                      Login
                    </button>

                    <p className="mb-0 text-muted"></p>
                    <p className="mb-0 text-muted">Version 2.6.0</p>
                  </div>
                </div>
              </div>
            </div>
          </Aux>
        );
      } else {
        return <Redirect to={"/forms/home/dashboard"} />;
      }
    }
  }
}

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.loggedReducer);
  return {
    data: state.loggedReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLoginData: (email, password) => {
      dispatch(fetchLoginData(email, password));
    },
    fetchOTP: (userId, otp) => {
      dispatch(fetchOTP(userId, otp));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp1);
