import React from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import manHeadPortrait from "@/asstes/images/headPortrait/man.svg";
import { RoomTimeLine } from "../indexSty";
import { gennerateTaroNavigateParams } from "@/utils/urlParam";

import "./index.scss";

interface itemType {
  sum: string;
  numb: string;
  features: string;
  functionDetails: string;
  statusOfUseArr: Array<string>;
}

interface propsType {
  item: itemType;
  key: any;
}

function roomItem(props: propsType) {
  const { item } = props;
  const TimeList = [
    "8",
    "8:30",
    "9",
    "9:30",
    "10",
    "10:30",
    "11",
    "11:30",
    "12",
    "12:30",
    "13",
    "13:30",
    "14",
    "14:30",
    "15",
    "15:30",
    "16",
    "16:30",
    "17",
    "17:30",
    "18",
    "18:30",
    "19",
    "19:30",
    "20",
    "20:30",
    "21",
    "21:30",
    "22",
    "22:30",
    "23",
  ];

  // 会议室时间安排线
  const TimeLineList = TimeList.map((_item, i) => {
    const starTime = "13:30";
    const disable = i < TimeList.indexOf(starTime);
    const type = (item.statusOfUseArr[i] || "4").toString();
    const isEnd = i === TimeList.length - 1;
    return (
      <RoomTimeLine
        key={i}
        item={_item}
        i={i}
        disable={disable}
        type={type}
        isEnd={isEnd}
      >
        <View className="room-time-line-numb">{i % 2 === 0 ? _item : ""}</View>
      </RoomTimeLine>
    );
  });

  // 点击会议卡片进入详情
  function goMeetingTime() {
    Taro.navigateTo(gennerateTaroNavigateParams("meetingTime", {}));
  }

  return (
    <View className="room-item-box" onClick={goMeetingTime}>
      {/* 会议卡片详情 */}
      <View className="room-item-title">
        <Image className="room-item-title-img" src={manHeadPortrait}></Image>
        <View className="room-item-title-text">
          <View className="room-item-title-numb">{item.numb}</View>
          <View className="room-item-title-f">
            <View className="room-item-title-f-l">{item.features}</View>
            <View>{item.functionDetails}</View>
          </View>
        </View>
        <View className="room-item-title-sum">
          <View className="room-item-title-icon at-icon at-icon-user"></View>
          <View className="">可容纳{item.sum}人</View>
        </View>
      </View>
      {/* end 会议卡片详情 */}
      {/* 时间区间 */}
      <View className="room-item-time-line">{TimeLineList}</View>
      {/* end 时间区间 */}
    </View>
  );
}

export default roomItem;
