export default {
  items: [
    {
      id: "group-home",
      title: "Home",
      type: "group",
      icon: "feather icon-home",
      DocumentName: "Home",
      children: [
        {
          id: "dashboard",
          title: "Home",
          type: "item",
          icon: "feather icon-home",
          url: "/forms/home/dashboard",
          DocumentName: "Dashboard",
        },
      ],
    },
    {
      id: "group-masters",
      title: "Masters",
      type: "group",
      icon: "icon-navigation",
      DocumentName: "Masters",
      children: [
        {
          id: "general-master",
          title: "Category",
          type: "collapse",
          icon: "feather icon-grid",
          DocumentName: "Masters",
          children: [
            {
              id: "student",
              title: "Main Category",
              type: "item",
              url: "/main-category",
              DocumentName: "Student",
            },
            {
              id: "people",
              title: "Sub Category",
              type: "item",
              url: "/sub-category",
              DocumentName: "People",
            },
          ],
        },
        {
          id: "item-master",
          title: "Item",
          type: "item",
          icon: "feather icon-grid",
          url: "/item",
          DocumentName: "Masters",
        
        },
      ],
    },

    {
      id: "group-admin",
      title: "Administration",
      type: "group",
      icon: "feather icon-settings",
      DocumentName: "Dashboard",
      children: [
        {
          id: "admin",
          title: "Administration",
          type: "collapse",
          icon: "feather icon-settings",
          DocumentName: "Administration",
          children: [
            {
              id: "user",
              title: "User Registration",
              type: "item",
              url: "/Register",
              DocumentName: "User",
            },
          ],
        },
      ],
    },
  ],
};
