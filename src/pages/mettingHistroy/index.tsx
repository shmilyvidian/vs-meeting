import React, { useState } from "react";
import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { gennerateTaroNavigateParams } from "@/utils/urlParam";

import "./index.scss";

import LastestMeetingListItem from "./item/index";

import manHeadPortrait from "@/asstes/images/headPortrait/man.svg";

function Index() {
  const [userName] = useState("张宏兵");
  let [tabsType,setTabsType] = useState('1')

  const [meetingList] = useState([
    {
      date: "8月9号",
      time: "09:30-10:00",
      status: "meeting",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "8",
    },
    {
      date: "8月10号",
      time: "09:30-10:00",
      status: "wait",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "6",
    },
    {
      date: "8月09号",
      time: "09:30-10:00",
      status: "end",
      address: "荣超大厦1301",
      mettingNumber: "82910321",
      people: "10",
    },
  ]);

  // 1.我预约的会议 2.参与会议 3.查看过去的会议
  function goMeetingReserve() {
    Taro.navigateTo(
      gennerateTaroNavigateParams("meetingReserve", { fromStatus: tabsType })
    );
  }

  // 切换预约列表
  function onChangeTabs(status){
    setTabsType(tabsType = status)
    console.log(tabsType)
  }

  // 渲染最近会议列表
  const meetingListView = meetingList.map((item, index) => {
    return (
      <LastestMeetingListItem
        onClick={goMeetingReserve}
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
            <View className="at-icon at-icon-calendar"></View>
          </View>
        </View>
        <View className="tabs">
          <View className={`tabs-item + ${tabsType === '1' ? 'tabs-active' : ''} `} onClick={() => onChangeTabs('1')}>全部</View>
          <View className={`tabs-item + ${tabsType === '2' ? 'tabs-active' : ''} `} onClick={() => onChangeTabs('2')}>我预约的</View>
          <View className={`tabs-item + ${tabsType === '3' ? 'tabs-active' : ''} `} onClick={() => onChangeTabs('3')}>我参加的</View>
        </View>
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
