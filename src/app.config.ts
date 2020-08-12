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
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#2069FE",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white",
  },
};
