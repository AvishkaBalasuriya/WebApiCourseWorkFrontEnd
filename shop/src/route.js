import React from "react";

const SignUp1 = React.lazy(() =>
  import("./Demo/Authentication/SignUp/SignUp1")
);
const Signin1 = React.lazy(() =>
  import("./Demo/Authentication/SignIn/SignIn1")
);
const OTPVerification = React.lazy(() =>
  import("./Demo/Authentication/SignIn/OTPVerfication")
);
const Register = React.lazy(() => import("./component/User/Register"));
const ForgetPassword = React.lazy(() => import("./Demo/Authentication/SignIn/ForgetPassword"));
const route = [
  { path: "/auth/signup-1", exact: true, name: "Signup 1", component: SignUp1 },
  { path: "/login", exact: true, name: "Signin", component: Signin1 },
  { path: "/register", exact: true, name: "register", component: Register },
  { path: "/forget-password", exact: true, name: "register", component: ForgetPassword },
];
export default route;
