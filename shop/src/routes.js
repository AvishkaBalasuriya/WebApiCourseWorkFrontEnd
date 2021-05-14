import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const ShopHome = React.lazy(() => import("./component/ShopHome"));
const Profile = React.lazy(() => import("./component/Profile"));
const CheckList = React.lazy(() => import("./component/CheckList/CheckList"));
const Order = React.lazy(() => import("./component/Transactions/Order"));

const routes = [
  {
    path: "/",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/shop",
    exact: true,
    name: "shop",
    component: ShopHome,
  },
  {
    path: "/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
  {
    path: "/check-list",
    exact: true,
    name: "Check List",
    component: CheckList,
  },
  {
    path: "/order",
    exact: true,
    name: "Order List",
    component: Order,
  },

];

export default routes;
