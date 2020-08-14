import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { Image, View, Button } from "@tarojs/components";
import { gennerateTaroNavigateParams } from "@/utils/urlParam";
import "./index.scss";

import LastestMeetingListItem from "./item/index";

import manHeadPortrait from "@/asstes/images/headPortrait/man.svg";
import more from "@/asstes/images/more.svg";

function Index() {
  const [userName] = useState("张宏兵");
  // 1.我预约的会议 2.参与会议 3.查看过去的会议
  const [meetingList] = useState([
    {
      date: "8月14号",
      time: "09:30-10:00",
      fromStatus: "1",
      status: "meeting",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "8",
      fromStatusText: "我预约的会议",
    },
    {
      date: "8月15号",
      time: "09:30-10:00",
      fromStatus: "1",
      type: "1",
      status: "wait",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "6",
      fromStatusText: "参与的会议",
    },
    {
      date: "8月09号",
      time: "09:30-10:00",
      fromStatus: "2",
      status: "end",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "10",
      fromStatusText: "参与的会议",
    },
    {
      date: "8月01号",
      time: "09:30-10:00",
      fromStatus: "3",
      status: "end",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "10",
      fromStatusText: "过去的会议",
    },
  ]);

  // 预约会议跳转
  function goMeetingReserve(fromStatus, status) {
    Taro.navigateTo(
      gennerateTaroNavigateParams("meetingReserve", {
        fromStatus,
        fromType: status,
      })
    );
  }

  // 渲染最近会议列表
  const meetingListView = meetingList.map((item, index) => {
    return (
      <LastestMeetingListItem
        onClick={goMeetingReserve.bind(null, item.fromStatus, item.status)}
        item={item}
        key={index}
      ></LastestMeetingListItem>
    );
  });

  // 会议记录跳转
  function goMeetingHistroy() {
    Taro.navigateTo(gennerateTaroNavigateParams("mettingHistroy", {}));
  }
  return (
    <View className="index-main">
      {/* 用户 */}
      <View className="bg-fff">
        <View className="user-wrapper">
          <Image className="user-img" src={manHeadPortrait}></Image>
          <View className="user-name">嗨，{userName}</View>
        </View>
        <View
          className="appointment-button"
          onClick={goMeetingReserve.bind(null, "0")}
        >
          预约会议
        </View>
      </View>
      {/* end of 用户 */}
      {/* 最近会议 */}
      <View className="bg-fff lastest-meeting">
        <View className="lastest-meeting-flex">
          <View className="lastest-meeting-title">最近会议</View>
          <View className="lastest-meeting-more" onClick={goMeetingHistroy}>
            全部
            <Image src={more} className="lastest-meeting-more-icon"></Image>
          </View>
        </View>
        <View className="lastest-meeting-list">{meetingListView}</View>
      </View>
      {/* end of 最近会议 */}
    </View>
  );
}

export default Index;
