import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const Register = React.lazy(() => import("./component/Admin/Register"));

const MainCategory = React.lazy(() =>
  import("./component/Category/MainCategory")
);
const SubCategory = React.lazy(() =>
  import("./component/Category/SubCategory")
);
const Items = React.lazy(() => import("./component/Item/Items"));

const Vender = React.lazy(() => import("./component/Vender/Vender"));
const Order = React.lazy(() => import("./component/Transactions/Order"));

const routes = [
  {
    path: "/forms/home/dashboard",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/Register",
    exact: true,
    name: "User Registration",
    component: Register,
  },
  {
    path: "/main-category",
    exact: true,
    name: "Main Category",
    component: MainCategory,
  },
  {
    path: "/sub-category",
    exact: true,
    name: "Sub Category",
    component: SubCategory,
  },
  {
    path: "/item",
    exact: true,
    name: "Item",
    component: Items,
  },
  {
    path: "/vender",
    exact: true,
    name: "Vender",
    component: Vender,
  },
  {
    path: "/order",
    exact: true,
    name: "Order List",
    component: Order,
  },
];

export default routes;
