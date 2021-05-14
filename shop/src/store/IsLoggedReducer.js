import * as actionTypes from "./actions";

export const initialState = {
  loading: false,
  user: [],
  error: "",
  logginStatus: false,
  cart: [],
  logginStatusCode:""
};

const loggedReducer = (state = initialState, action) => {
  let user = [];
  switch (action.type) {
    case actionTypes.USER_REQUEST_TO_LOGGIN:
      return {
        ...state,
        loading: true,
        cart: JSON.parse(localStorage.getItem("cart")),
        logginStatusCode:""
      };
    case actionTypes.SET_USER:
      return {
        loading: false,
        user: action.payLoad,
        error: "",
        logginStatus: true,
        cart: JSON.parse(localStorage.getItem("cart")),
        logginStatusCode:""
      };

    case actionTypes.ERRROR_LOGGIN:
      return {
        loading: false,
        user: action.payLoad,
        error: "",
        logginStatus: false,
        cart: JSON.parse(localStorage.getItem("cart")),
        logginStatusCode:""
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
      if (JSON.parse(localStorage.getItem("user")) != null) {
        return {
          loading: false,
          user: JSON.parse(localStorage.getItem("user")),
          error: "",
          logginStatus: true,
          cart: JSON.parse(localStorage.getItem("cart")),
          logginStatusCode:""
        };
      } else {
        if (state.cart != undefined || state.cart != null) {
          return {
            loading: false,
            user: [],
            cart: state.cart,
            error: action.payLoad,
            logginStatus: false,
            cart: JSON.parse(localStorage.getItem("cart")),
            logginStatusCode:""
          };
        } else {
          return {
            loading: false,
            user: [],
            cart: [],
            error: action.payLoad,
            logginStatus: false,
            cart: JSON.parse(localStorage.getItem("cart")),
            logginStatusCode:""
          };
        }
      }
  }
};

export default loggedReducer;
