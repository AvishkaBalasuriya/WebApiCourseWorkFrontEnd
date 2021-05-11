export default {
  items: [
    {
      id: "home",
      title: "Home",
      type: "group",
      icon: "feather icon-home",
      DocumentName: "Home",
      children: [
        {
          id: "dashboard",
          title: "Home",
          type: "item",
          status: "Home",
          icon: "feather icon-home",
          url: "/forms/home/dashboard",
          DocumentName: "Dashboard",
        },
      ],
    },
    {
      id: "MainCategoryHeader",
      title: "Category",
      type: "group",
      icon: "icon-navigation",
      status: "NotCategory",
      DocumentName: "Masters",
      children: [
        {
          id: "general-master",
          title: "Main Category",
          type: "collapse",
          status: "NotCategory",
          icon: "feather icon-grid",
          url: "/forms/home/dashboard?category=0",
          DocumentName: "Masters",
          children: [
            {
              id: "student",
              title: "Sub 1",
              type: "item",
              status: "category",
              url: "/forms/home/dashboard?category=1",
              DocumentName: "Student",
            },
            {
              id: "people",
              title: "Sub 2",
              type: "item",
              status: "category",
              url: "/forms/home/dashboard?category=2",
              DocumentName: "People",
            },
          ],
        },
      ],
    },
  ],
};
