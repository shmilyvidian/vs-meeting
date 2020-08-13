export default {
  pages: ["pages/index/index"],
  // 分包
  subPackages: [
    {
      // 预约会议
      root: "pages/meetingReserve",
      pages: ["index"],
    },
    {
      // 查看会议室
      root: "pages/viewConferenceRoom",
      pages: ["index"],
    },
    {
      // 预约记录
      root: "pages/mettingHistroy",
      pages: ["index"],
    },
    {
      // 会议介绍
      root: "pages/meetingIntroduce",
      pages: ["index"],
    },
    {
      // 联系人
      root: "pages/contactPerson",
      pages: ["index"],
    },
    {
      // 选择会议室
      root: "pages/meetingRoomSelect",
      pages: ["index"],
    },
    {
      // 会议时间
      root: "pages/meetingTime",
      pages: ["index"],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#2069FE",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white",
  },
};
