import { ActionSheet } from "devextreme-react";
import * as actionTypes from "./actions";
import axios from "axios";
import notify from "devextreme/ui/notify";
import APIURl from "../APIConfig";
import jwt from "jsonwebtoken";

export const IsLogginReuqest = () => {
  return {
    type: actionTypes.USER_REQUEST_TO_LOGGIN,
    payLoad: [],
    logginUserCode: 0,
    message: "Error Loggin",
  };
};
export const getData = () => {
  return {
    type: actionTypes.GET_USER_LOGGIN_DATA,
    payLoad: [],
    logginUserCode: 0,
    message: "Error Loggin Attempt",
  };
};

const IsLoggedSuccess = (userData, logginType) => {
  return {
    type: actionTypes.SET_USER,
    payLoad: userData,
    logginUserCode: logginType,
    message: "Loggin Success",
  };
};

const IsVerfyingOTP = (userData, logginType) => {
  return {
    type: actionTypes.OTP_VERIFICATION,
    payLoad: userData,
    logginUserCode: logginType,
    message: "Need to verficate OTP",
  };
};

export const IsRoundData = (userData) => {
  return {
    type: actionTypes.SET_USER,
    payLoad: userData,
    logginUserCode: 0,
    message: "Loggin Success",
  };
};

const IsLogginError = (error) => {
  return {
    type: actionTypes.ERRROR_LOGGIN,
    payLoad: error,
    logginUserCode: 0,
    message: "Error Loggin",
  };
};

export const loggout = () => {
  localStorage.setItem("accessToken", null);
  return (dispatch) => {
    dispatch(IsLogginError(""));
  };
};

const OnNotification = (message, type) => {
  notify({
    message: message,
    type: type,
    displayTime: 3000,
    position: { at: "top right", offset: "50" },
  });
};

export const fetchLoginData = (email, password) => {
  return (dispatch) => {
    dispatch(IsLogginReuqest);

    axios
      .post("" + APIURl.URL + "auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("accessToken", response.data.data.accessToken);
          response.data.data.accessToken = jwt.decode(
            response.data.data.accessToken
          );
          localStorage.setItem("user", JSON.stringify(response.data));

          dispatch(IsLoggedSuccess(response.data, response.data.code));
        } else {
          console.log("user", response.data);
          if (response.data.code == 503) {
            dispatch(IsVerfyingOTP(response.data, response.data.code));
          }
          OnNotification(response.data.error, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        OnNotification("Login Fails", "error");
      });
  };
};

export const fetchOTP = (user, otp) => {
  console.log("user", user)
  return (dispatch) => {
    dispatch(IsLogginReuqest);

    axios
      .post("" + APIURl.URL + "otp/verify", {
        userId: user,
        otpCode: otp,
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(IsVerfyingOTP(response.data, response.data.code));
        } else {
          OnNotification(response.data.error, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        OnNotification("Login Fails", "error");
      });
  };
};
