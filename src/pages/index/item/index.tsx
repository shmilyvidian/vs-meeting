import React from "react";
import { View } from "@tarojs/components";

import "./index.scss";

interface itemType {
  title: string;
  date: string;
  user: string;
  status: string;
}

interface propsType {
  item: itemType;
  key: any;
  onClick: () => void;
}

function LastestMeetingListItem(props: propsType) {
  const { item, onClick } = props;

  return (
    <View className="metting-list-item" onClick={onClick}>
      <View className="metting-item-top">
        <View className="metting-item-top-title">
          {item.title}
          {item.status === "wait" ? (
            <View className="wait">待开始</View>
          ) : (
            <View className="metting">进行中</View>
          )}
        </View>
        <View className="metting-item-top-date">{item.date}</View>
      </View>
      <View className="metting-item-bottom">{item.user}</View>
    </View>
  );
}

export default LastestMeetingListItem;
