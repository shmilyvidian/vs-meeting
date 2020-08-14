import React, { useState, useEffect } from "react";
import { Image, View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
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
  const tabDataObj = {
    1: [],
    2: [
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
    ],
    3: [
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
      {
        theme: "经分同业",
        time: "8月09号 09:30-10:00",
        fromStatus: "3",
        status: "end",
        house: "荣超大厦1304",
        number: "82911521",
        takePartInPerson: "孔连顺，欧阳娜娜",
        fromStatusText: "参与的会议",
        introduce: "经分同业需求澄清",
      },
      {
        theme: "经分风险",
        time: "8月01号 09:30-10:00",
        fromStatus: "3",
        status: "end",
        house: "荣超大厦1305",
        number: "82910321",
        takePartInPerson: "宋仲基，王俊凯，欧阳娜娜",
        fromStatusText: "参与的会议",
        introduce: "经分风险需求澄清",
      },
    ],
  };
  const localDataF: any = [];
  const [localData, setLocalData] = useState(localDataF);
  const [data, setData] = useState([]);
  const irsType: any = [];
  const [isRemoves, setIsRemoves] = useState(irsType);

  const [meetingList, setMeetingList] = useState([
    ...tabDataObj["2"],
    ...tabDataObj["3"],
  ]);

  // 1.我预约的会议 2.参与会议 3.查看过去的会议
  function goMeetingReserve(status, fromStatus, item) {
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
    setLocalData(Taro.getStorageSync("localData") || []);
    const irs = Taro.getStorageSync("isRemove") || [];
    if (irs.length) {
      setIsRemoves(irs);
    }
  });

  useEffect(() => {
    const fData: any = [];
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
      fData.push(itemObj);
    });
    setData(fData);
    let reTabData: any = [];
    if (tabsType === "1") {
      reTabData = [...tabDataObj["2"], ...fData, ...tabDataObj["3"]];
    } else if (tabsType === "2") {
      reTabData = [...tabDataObj[tabsType], ...fData];
    } else {
      reTabData = tabDataObj[tabsType];
    }

    reTabData.forEach((item) => {
      item.hidden = isRemoves.includes(item.number);
    });

    setMeetingList(reTabData);
  }, [localData, isRemoves]);

  // useEffect(() => {
  //   meetingList.forEach((item) => {
  //     item.hidden = isRemoves.includes(item.number);
  //   });
  //   setMeetingList(meetingList);
  // }, [isRemoves]);

  // 切换预约列表
  function onChangeTabs(status) {
    setTabsType((tabsType = status));
    let reTabData: any = [];
    if (status === "1") {
      reTabData = [...tabDataObj["2"], ...data, ...tabDataObj["3"]];
    } else if (status === "2") {
      reTabData = [...tabDataObj[status], ...data];
    } else {
      reTabData = tabDataObj[status];
    }

    reTabData.forEach((item) => {
      item.hidden = isRemoves.includes(item.number);
    });
    console.log(123456);
    console.log(reTabData);
    setMeetingList(reTabData);
  }

  // 渲染最近会议列表
  const meetingListView = meetingList.map((item, index) => {
    return item.hidden ? null : (
      <LastestMeetingListItem
        onClick={goMeetingReserve.bind(
          null,
          item.status,
          item.fromStatus,
          item
        )}
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
