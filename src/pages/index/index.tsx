import React, { useState, useEffect } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { Image, View, Button } from "@tarojs/components";
import { gennerateTaroNavigateParams } from "@/utils/urlParam";
import "./index.scss";

import LastestMeetingListItem from "./item/index";

import manHeadPortrait from "@/asstes/images/headPortrait/man.svg";
import more from "@/asstes/images/more.svg";

function Index() {
  const [userName] = useState("张宏兵");
  const localDataF: any = [];
  const [localData, setLocalData] = useState(localDataF);

  const irsType: any = [];
  const [isRemoves, setIsRemoves] = useState(irsType);
  const meetingListF = [
    {
      theme: "同业PC",
      time: "8月14号 09:30-10:00",
      fromStatus: "1",
      status: "meeting",
      house: "荣超大厦1303",
      number: "85510321",
      takePartInPerson: "阿瑶，冯绍峰，高圆圆，胡歌",
      fromStatusText: "我预约的会议",
      introduce: "同业PC需求澄清",
    },
    {
      theme: "DATA-API",
      time: "8月16号 10:30-12:00",
      fromStatus: "1",
      status: "wait",
      house: "荣超大厦1302",
      number: "38510321",
      takePartInPerson: "冯绍峰，高圆圆，胡歌",
      fromStatusText: "我预约的会议",
      introduce: "DATA-API需求澄清",
    },
    {
      theme: "经分财务",
      time: "8月15号 09:30-10:00",
      fromStatus: "2",
      type: "1",
      status: "wait",
      house: "荣超大厦1301",
      number: "82950321",
      takePartInPerson: "井柏然，金秀贤",
      fromStatusText: "参与的会议",
      introduce: "经分财务需求澄清",
      hidden: false,
    },
  ];
  // 1.我预约的会议 2.参与会议 3.查看过去的会议
  const [meetingList, setMeetingList] = useState(meetingListF);

  // 预约会议跳转
  function goMeetingReserve(fromStatus, status, item) {
    if (item) {
      Taro.setStorageSync("temporaryData", item);
    }
    Taro.navigateTo(
      gennerateTaroNavigateParams("meetingReserve", {
        fromStatus,
        fromType: status,
      })
    );
  }

  useDidShow(() => {
    setIsRemoves(Taro.getStorageSync("isRemove") || []);
    setLocalData(Taro.getStorageSync("localData") || []);
  });

  useEffect(() => {
    let mlf: any = meetingListF;
    if (localData && localData.length) {
      const data: any = [];
      localData.map((item) => {
        const itemObj = {
          theme: item.theme.value,
          time: item.time.value,
          house: item.house.value,
          number: item.number.value,
          takePartInPerson: item.takePartInPerson.value,
          introduce: item.introduce.value,
          status: "wait",
          fromStatus: "1",
          fromStatusText: "我预约的会议",
        };
        data.push(itemObj);
      });
      mlf = [...meetingListF, ...data];
    }
    mlf.forEach((item) => {
      item.hidden = isRemoves.includes(item.number);
    });
    setMeetingList(mlf);
  }, [localData, isRemoves]);

  // 渲染最近会议列表
  const meetingListView = meetingList.map((item, index) => {
    return item.hidden ? null : (
      <LastestMeetingListItem
        onClick={goMeetingReserve.bind(
          null,
          item.fromStatus,
          item.status,
          item
        )}
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
