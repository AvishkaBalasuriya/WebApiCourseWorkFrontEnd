import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../../../src/store/actions";
import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { fetchLoginData } from "../../../store/logginActions";
import notify from "devextreme/ui/notify";
class OTPVerification extends Component {
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
                {/* <p>{this.props.data.error}</p> */}

                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter "
                    name="OTP"
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group text-left"></div>

                <button
                  className="btn btn-primary shadow-2 mb-4"
                  onClick={() => this.OnClickVerify()}
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
  }
}

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPVerification);
