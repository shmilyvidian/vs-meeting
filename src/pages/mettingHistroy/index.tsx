import React, { useState } from "react";
import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { gennerateTaroNavigateParams } from "@/utils/urlParam";

import "./index.scss";

import LastestMeetingListItem from "./item/index";

import manHeadPortrait from "@/asstes/images/headPortrait/man.svg";
import calendarIcon from "@/asstes/images/calendar.svg";

function Index() {
  const [userName] = useState("张宏兵");
  let [tabsType, setTabsType] = useState("1");

  const [tabsMap] = useState([
    {
      label: "全部",
      index: "1",
    },
    {
      label: "我的预约",
      index: "2",
    },
    {
      label: "我参与的",
      index: "3",
    },
  ]);

  const [meetingList, setMeetingList] = useState([
    {
      date: "8月9号",
      time: "09:30-10:00",
      fromStatus: "2",
      status: "meeting",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "8",
      fromStatusText: "参与的会议",
    },
    {
      date: "8月10号",
      time: "09:30-10:00",
      fromStatus: "1",
      type: "1",
      status: "wait",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "6",
      fromStatusText: "我预约的会议",
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
      date: "8月11号",
      time: "09:30-10:00",
      fromStatus: "1",
      type: "1",
      status: "end",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "10",
      fromStatusText: "我预约的会议",
    },
  ]);

  const [meetingListCopy, setMeetingListCopy] = useState(meetingList);

  // 1.我预约的会议 2.参与会议 3.查看过去的会议
  function goMeetingReserve(status, fromStatus) {
    Taro.navigateTo(
      gennerateTaroNavigateParams("meetingReserve", {
        fromStatus,
        fromType: status,
      })
    );
  }

  // 切换预约列表
  function onChangeTabs(status) {
    setTabsType((tabsType = status));
    setMeetingList(
      meetingListCopy.filter((_item, i) => {
        switch (status) {
          case "2":
            return i % 2;
          case "3":
            return !(i % 2);
          default:
            return true;
        }
      })
    );
  }

  // 渲染最近会议列表
  const meetingListView = meetingList.map((item, index) => {
    return (
      <LastestMeetingListItem
        onClick={goMeetingReserve.bind(null, item.status, item.fromStatus)}
        item={item}
        key={index}
      ></LastestMeetingListItem>
    );
  });

  return (
    <View className="index-main">
      {/* 用户 */}
      <View className="bg-fff">
        <View className="user-wrapper">
          <View className="user-wrapper-left">
            <Image className="user-img" src={manHeadPortrait}></Image>
            <View className="user-name">嗨，{userName}</View>
          </View>
          <View className="user-wrapper-right">
            <View className="user-wrapper-date">7月20日</View>
            <Image src={calendarIcon} className="calendar-icon"></Image>
          </View>
        </View>
        {/* tabs切换 */}
        <View className="tabs">
          {tabsMap.map((item, index) => {
            return (
              <View
                key={index}
                className={`tabs-item + ${
                  tabsType === item.index ? "tabs-active" : ""
                } `}
                onClick={() => onChangeTabs(item.index)}
              >
                {item.label}
              </View>
            );
          })}
        </View>
        {/* end of tabs切换 */}
      </View>
      {/* end of 用户 */}
      {/* 会议记录 */}
      <View className="bg-fff lastest-meeting">
        <View className="lastest-meeting-flex">
          <View className="lastest-meeting-title">会议记录</View>
        </View>
        <View className="lastest-meeting-list">{meetingListView}</View>
      </View>
      {/* end of 会议记录 */}
    </View>
  );
}

export default Index;
