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

const IsAddToCart = (item) => {
  return {
    type: actionTypes.ADD_CART_ITEM,
    cartItem: item,
    message: "Cart Success",
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
    if (email != null && password != null) {
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
    }
  };
};

export const addToCart = (item) => {
  return (dispatch) => {
  
    let oldData = [];
    if (JSON.parse(localStorage.getItem("cart")) != null) {
      oldData = JSON.parse(localStorage.getItem("cart"));
    }

    console.log("Oldqty", oldData);
    let oldqty = 1;

    if (oldData.length > 0) {
      oldData
        .filter((element) => element._id == item._id)
        .map((filterData) => (oldqty = filterData.qty + 1));

      console.log("Oldqty", oldqty);
    }

    if (oldqty > 1) {
      oldData.map((items) => {
        if (items._id == item._id) {
          items.qty = oldqty;
        }
      });

   
    } else {
      oldData.push({
        _id: item._id,
        name: item.name,
        price: item.price,
        qty: oldqty,
        discount: item.discount,
        image: item.images.length == 0 ? "Avatar1" : item.images[0].imageUrl,
      });
    }

    localStorage.setItem("cart", JSON.stringify(oldData));
    dispatch(IsAddToCart(item));
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

export const fetchOTP = (user, otp) => {
  console.log("user", user);
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
