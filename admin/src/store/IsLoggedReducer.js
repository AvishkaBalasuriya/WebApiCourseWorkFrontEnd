import * as actionTypes from "./actions";

export const initialState = {
  loading: false,
  user: [],
  error: "",
  logginStatus: false,
  logginStatusCode: "",
};

const loggedReducer = (state = initialState, action) => {
  let user = [];
  console.log("action.type ---------------", action);
  switch (action.type) {
    case actionTypes.USER_REQUEST_TO_LOGGIN:
      console.log("action.type", "USER_REQUEST_TO_LOGGIN");
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_USER:
      console.log("action.type", "SET_USER");
      return {
        loading: false,
        user: action.payLoad,
        error: "",
        logginStatus: true,
      };

    case actionTypes.ERRROR_LOGGIN:
      console.log("action.type", "ERRROR_LOGGIN");
      return {
        loading: false,
        user: action.payLoad,
        error: "",
        logginStatus: false,
      };

    case actionTypes.OTP_VERIFICATION:
      return {
        loading: false,
        user: action.payLoad,
        logginStatusCode: action.logginUserCode,
        error: "",
        logginStatus: false,
      };

    default:
      if (localStorage.getItem("accessToken") != "null") {
        console.log("userd1");
        console.log("action.type", "Default");
        return {
          loading: false,
          user: JSON.parse(localStorage.getItem("user")),
          error: "",
          logginStatus: true,
        };
      } else {
        console.log("userd2");
        console.log("action.type", "return");
        return {
          loading: false,
          user: [],
          error: action.payLoad,
          logginStatus: false,
        };
      }
  }
};

export default loggedReducer;
