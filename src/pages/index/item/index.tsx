import React, { ComponentType, ReactElement } from "react";
import { View } from "@tarojs/components";

import "./index.scss";
import { ViewProps } from "@tarojs/components/types/View";

interface itemType {
  theme: string;
  time: string;
  status: string;
  house: string;
  number: string;
  takePartInPerson: string;
  fromStatusText: string;
  hidden?: false;
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
        <View className="histroy-list-common">{item.time.split(" ")[0]}</View>
        {handleStatus(item.status)}
      </View>
      <View className="histroy-list-item">
        <View className="histroy-list-common">{item.time.split(" ")[1]}</View>
        <View className="histroy-list-common">{item.house}</View>
      </View>
      <View className="histroy-list-item">
        <View className="histroy-list-common-second">
          {item.fromStatusText}
        </View>
        <View className="histroy-list-common-second">
          会议号：{item.number}
        </View>
      </View>
      <View className="histroy-list-item histroy-list-item-second">
        <View className="histroy-list-common-second">
          共{item.takePartInPerson.split("，").length}人
        </View>
      </View>
    </View>
  );
}

export default LastestMeetingListItem;
