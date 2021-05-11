import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const ShopHome = React.lazy(() => import('./component/ShopHome'));
const Profile =  React.lazy(() => import('./component/Profile'));

const routes = [
  {
    path: "/forms/home/dashboard",
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
];

export default routes;
