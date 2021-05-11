import { ActionSheet } from "devextreme-react";
import * as actionTypes from "./actions";
import axios from "axios";
import notify from "devextreme/ui/notify";
export const IsLogginReuqest = () => {
  return {
    type: actionTypes.USER_REQUEST_TO_LOGGIN,
    payLoad: [],
    message: "Error Loggin",
  };
};
export const getData = () => {
  return {
    type: actionTypes.GET_USER_LOGGIN_DATA,
    payLoad: [],
    message: "Error Loggin Attempt",
  };
};

const IsLoggedSuccess = (userData) => {
  return {
    type: actionTypes.SET_USER,
    payLoad: userData,
    message: "Loggin Success",
  };
};

export const IsRoundData = (userData, schools, authorization) => {
  return {
    type: actionTypes.SET_USER,
    payLoad: userData,
    message: "Loggin Success",
    School: schools,
    Authorization: authorization,
  };
};

const IsLogginError = (error) => {
  return {
    type: actionTypes.ERRROR_LOGGIN,
    payLoad: error,
    message: "Error Loggin",
  };
};

export const loggout = () => {
  localStorage.setItem("user", null);
  localStorage.setItem("School", null);
  localStorage.setItem("Authorization", null);
  localStorage.setItem("ApprovalDocument", null);
  localStorage.setItem("ApprovalDocumentAuth", null);
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

    dispatch(IsLoggedSuccess("user", "UserWiseSchool"));
  };
};
