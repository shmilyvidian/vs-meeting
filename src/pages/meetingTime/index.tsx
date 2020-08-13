import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { TimeLine } from "@/components/TimeLine/index";
import { BtnViews } from "@/components/BtnViews/index";
import room from "@/asstes/images/room.svg";
import people from "@/asstes/images/people.svg";
import VrActive from "@/asstes/images/VrActive.svg";
import "./index.scss";

function Index() {
  const timeLines = [
    { title: "选中", color: "#3476FE" },
    { title: "已预约", color: "#F9BB4C" },
    { title: "可预约", color: "#09BB07" },
    { title: "不可预约", color: "#C0C4CC" },
  ];

  //按钮状态,0预约会议，1我预约的会议，2参与会议，3查看过去的会议
  const btnList = [
    {
      value: "完成",
      disabled: true,
      hidden: false,
      class: "",
      click: onDefaultClick,
    },
  ];
  const [btns, setBtn] = useState(btnList);
  const [start, setStart] = useState("");
  // 完成默认event
  function onDefaultClick() {
    var pages = Taro.getCurrentPages();
    var prevPage = pages[pages.length - 3]; //上2个页面
    //直接使用上一个页面的data，把数据存到上一个页面中去
    prevPage.data.query = {
      time: "7月8日 18:00-19:00",
      house: "保税区职场 303",
    };
    Taro.navigateBack({
      delta: 2,
    });
  }

  function checkVR() {
    Taro.navigateTo({
      url: "/pages/viewConferenceRoom/index",
    });
  }

  function timeLineChange(start) {
    setStart(start);
  }

  useEffect(() => {
    btnList[0].disabled = !start;
    setBtn(btnList);
  }, [start]);

  return (
    <View>
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
                <View>投影/电视/电话/白板/视频</View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* 会议室信息  end*/}

      {/* 会议室套餐 */}
      <View className="meetting-configuration">
        <View className="header">
          <View className="header-room">会议室308</View>
          <View className="header-date">8月6号</View>
        </View>
        <View className="content">
          <View className="content-item">投影仪</View>
          <View className="content-item">摄像机</View>
          <View className="content-item">显示器</View>
          <View className="content-item">25人</View>
        </View>
        {/* 时间段选择 */}
        <TimeLine onChange={timeLineChange}></TimeLine>
        <View className="meetting-configuration-vr">
          <Image
            className="meetting-configuration-vr-icon"
            src={VrActive}
          ></Image>
          <View onClick={checkVR} className="meetting-configuration-vr-check">
            VR查看
          </View>
        </View>
        <View className="time-position">
          {timeLines.map((tItem) => {
            return (
              <View className="time-position-item">
                <View
                  className="time-position-item-circle"
                  style={{ backgroundColor: tItem.color }}
                ></View>
                <View className="time-position-item-title">{tItem.title}</View>
              </View>
            );
          })}
        </View>
      </View>
      {/* 会议室套餐 end */}
      {/* 按钮 */}

      <BtnViews btnList={btns}></BtnViews>

      {/* 按钮 end*/}
    </View>
  );
}

export default Index;
