import React, { ComponentType, ReactElement } from "react";
import { View } from "@tarojs/components";

import "./index.scss";
import { ViewProps } from "@tarojs/components/types/View";

interface itemType {
  date: string;
  time: string;
  status: string;
  address: string;
  mettingNumber: string;
  people: string;
}

interface propsType {
  item: itemType;
  key: any;
  onClick: () => void;
}

function LastestMeetingListItem(props: propsType) {
  const { item, onClick } = props;

  const statusMap = {
    wait: "未开始",
    meeting: "进行中",
    end: "已结束",
  };

  // 渲染状态
  function handleStatus(status) {
    return (
      <View className={`"histroy-list-common" + ${status}`}>
        {statusMap[status]}
      </View>
    );
  }

  return (
    <View className="histroy-list" onClick={onClick}>
      <View className="histroy-list-item">
        <View className="histroy-list-common">{item.date}</View>
        {handleStatus(item.status)}
      </View>
      <View className="histroy-list-item">
        <View className="histroy-list-common">{item.time}</View>
        <View className="histroy-list-common">{item.address}</View>
      </View>
      <View className="histroy-list-item">
        <View className="histroy-list-common-second">我预定的会议</View>
        <View className="histroy-list-common-second">
          会议号：{item.mettingNumber}
        </View>
      </View>
      <View className="histroy-list-item histroy-list-item-second">
        <View className="histroy-list-common-second">共{item.people}人</View>
      </View>
    </View>
  );
}

export default LastestMeetingListItem;
