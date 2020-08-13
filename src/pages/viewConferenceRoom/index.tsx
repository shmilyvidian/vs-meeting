import React from "react";
import { Image, View } from "@tarojs/components";

import "./index.scss";


import room from "@/asstes/images/room.svg";
import people from "@/asstes/images/people.svg";
import vrImg from "@/asstes/images/vr.svg";

function Index() {

  return (
    <View className="index-main">

      {/* 会议室信息 */}
      <View className="bg-fff">
        <View className="room-wrapper">
          <Image className="room-img" src={room}></Image>
          <View className="room-info">
            <View className="room-info-top">
              <View className="room-number">308</View>
              <View className="room-length">
                <Image src={people} className="people-icon"></Image>
                可容纳20人
                </View>
            </View>
            <View className="room-info-bottom">
              <View className="room-other">
                <View className="room-feature">智能语音</View>
                <View>
                  投影/电视/电话/白板/视频
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* end of 会议室信息 */}
      {/* 会议室内容 */}
      <View className="bg-fff conference-room">
        <View className="conference-room-title">会议室308</View>
        <View className="conference-room-second">
          <View className="conference-room-second-vr">
            <Image src={vrImg} className="vr-img"></Image>
            VR查看
          </View>
          <View className="conference-room-date">8月6号</View>
        </View>
        <View className="conference-room-vr">
          VR画面
        </View>
        <View className="conference-room-draw">
          <View className="conference-room-plan">会议室平面图</View>
          <View className="conference-room-legend">
            <View className="conference-room-legend-item">
              <View className="conference-room-legend-icon icon-blue"></View>
              投影仪
            </View>
            <View className="conference-room-legend-item">
              <View className="conference-room-legend-icon icon-green"></View>
              摄影机
            </View>
            <View className="conference-room-legend-item">
              <View className="conference-room-legend-icon icon-sky"></View>
              显示器
            </View>
          </View>
        </View>
      </View>
      {/* end of 会议室内容 */}
    </View>
  );
}

export default Index;
