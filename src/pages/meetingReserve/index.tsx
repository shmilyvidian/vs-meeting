import React, { useState, useEffect } from "react";
import { View, Picker } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { gennerateTaroNavigateParams } from "@/utils/urlParam";
import { AtInput, AtList, AtListItem } from "taro-ui";
import { formFields, fillFormFields } from "./formFields";
import { BtnViews } from "@/components/BtnViews/index";
import "./index.scss";

const remindRanges = ["提前30分钟", "提前10分钟", "提前5分钟"];

function index() {
  let meetingMessageObjkeys = Object.keys(formFields);
  //按钮状态,0预约会议，1我预约的会议，2参与会议，3查看过去的会议
  const btnList = {
    0: [
      {
        value: "完成",
        disabled: true,
        hidden: false,
        class: "",
        click: onDefaultClick,
      },
    ],
    1: [
      {
        value: "分享会议",
        disabled: false,
        hidden: false,
        class: "",
        click: onShareMeeting,
      },
      {
        value: "取消会议",
        disabled: false,
        hidden: false,
        class: "default-btn",
        click: onBackViewClick,
      },
    ],
    2: [
      {
        value: "分享会议",
        disabled: false,
        hidden: false,
        class: "",
        click: onShareMeeting,
      },
      {
        value: "退出会议",
        disabled: false,
        hidden: false,
        class: "default-btn",
        click: onBackViewClick,
      },
    ],
    3: [
      {
        value: "再次预约",
        disabled: false,
        hidden: false,
        class: "",
        click: onAgainReserve,
      },
    ],
  };

  // 完成默认event
  function onDefaultClick() {
    // var pages = Taro.getCurrentPages();
    Taro.reLaunch({
      url: "/pages/index/index",
    });
  }
  function onBackViewClick() {
    Taro.navigateBack({
      delta: 1,
    });
  }

  // 分享会议
  function onShareMeeting() {
    console.log("分享会议......");
  }

  // 再次预约
  function onAgainReserve() {
    setFromStatus("0");
  }

  const [btns, setBtn] = useState(btnList["0"]);

  // 设置meetingMessage
  const [meetingMessageObj, setMeetingMessageObj] = useState(formFields);

  // 初始化路由参数
  const [param, setParam] = useState({});

  // 设置picker默认选中
  const [remindRangeed, setremindRangeed] = useState(remindRanges[0]);

  // 设置初始状态
  const [fromStatus, setFromStatus] = useState("");

  const [fromType, setFromType] = useState("");

  // 从其他页面跳回来带参数的话，得渲染
  useDidShow(() => {
    const currentPagesData =
      Taro.getCurrentPages().slice(-1)[0].data.query || {};
    const queryFromStatus =
      Taro.getCurrentPages().slice(-1)[0].options.fromStatus || "0";
    setFromType(Taro.getCurrentPages().slice(-1)[0].options.fromType);
    setParam(currentPagesData);
    setFromStatus(queryFromStatus);
  });

  // 初始化meetingMessageObj 表单状态,0预约会议，1我预约的会议，2参与会议，3查看过去的会议
  function initMeetingMessageObj() {
    switch (fromStatus) {
      case "0":
        setMeetingMessageObj(JSON.parse(JSON.stringify(formFields)));
        Taro.setNavigationBarTitle({
          title: "预约会议",
        });
        break;
      case "1":
        setMeetingMessageObj(JSON.parse(JSON.stringify(fillFormFields)));
        Taro.setNavigationBarTitle({
          title: "我预约的会议",
        });
        break;
      case "2":
        setMeetingMessageObj(JSON.parse(JSON.stringify(fillFormFields)));
        Taro.setNavigationBarTitle({
          title: "参与会议",
        });
        break;
      case "3":
        setMeetingMessageObj(JSON.parse(JSON.stringify(fillFormFields)));
        Taro.setNavigationBarTitle({
          title: "查看过去的会议",
        });
        break;
      default:
        setMeetingMessageObj(JSON.parse(JSON.stringify(formFields)));
    }
  }

  useEffect(() => {
    const paramKeys = Object.keys(param);
    if (paramKeys.length) {
      paramKeys.forEach((pKey) => {
        if (meetingMessageObjkeys.includes(pKey)) {
          meetingMessageObj[pKey].value = param[pKey];
          if (pKey === "time") {
            meetingMessageObj[pKey].hidden = !meetingMessageObj[pKey].value;
          }
        }
      });
      setMeetingMessageObj(JSON.parse(JSON.stringify(meetingMessageObj)));
    }
  }, [param]);

  useEffect(() => {
    //表单状态,0预约会议，1我预约的会议，2参与会议，3查看过去的会议
    if (fromStatus === "0") {
      const flat = meetingMessageObjkeys.every(
        (key) => meetingMessageObj[key].value
      );
      btnList["0"][0].disabled = !flat;
      setBtn(btnList["0"]);
    }
  }, [meetingMessageObj]);

  useEffect(() => {
    if (!remindRangeed) return;
    meetingMessageObj.remind.value = remindRangeed;
    setMeetingMessageObj(JSON.parse(JSON.stringify(meetingMessageObj)));
  }, [remindRangeed]);

  // fromStatus: number; //表单状态,0预约会议，1我预约的会议，2参与会议，3查看过去的会议
  useEffect(() => {
    if (fromStatus === "") return;
    initMeetingMessageObj();

    // wait: "未开始",meeting: "进行中",end: "已结束",
    switch (fromType) {
      case "wait":
        break;
      case "meeting":
        break;
      case "end":
        btnList["1"][1].hidden = true;
        btnList["2"][1].hidden = true;
        break;
    }

    setBtn(btnList[fromStatus]);
  }, [fromStatus, fromType]);

  // 输入框变化
  function iptChange(key, val) {
    meetingMessageObj[key].value = val;
    setMeetingMessageObj(JSON.parse(JSON.stringify(meetingMessageObj)));
  }
  // piaker选择change
  function remindChange(e) {
    const selectedRemind = remindRanges[Number(e.detail.value)];
    setremindRangeed(selectedRemind);
  }

  // 页面跳转
  function routeClick(route, value) {
    Taro.navigateTo(gennerateTaroNavigateParams(route, { introduce: value }));
  }

  return (
    <View>
      {Object.keys(formFields).map((key) => {
        const item = meetingMessageObj[key];
        switch (item.showType) {
          case "input":
            return (
              !item.hidden && (
                <AtInput
                  className={[item.class, "meeting-input"]}
                  key={key}
                  name={key}
                  title={item.label}
                  value={item.value}
                  disabled={item.disabled}
                  onChange={iptChange.bind(this, key)}
                  placeholder={`请输入${item.label}`}
                ></AtInput>
              )
            );
          case "route":
            return (
              !item.hidden && (
                <AtInput
                  className={[item.class, "meeting-input", "route-input"]}
                  key={key}
                  name={key}
                  disabled={item.disabled}
                  title={item.label}
                  value={item.value}
                  placeholder="请选择"
                >
                  <View
                    className="go-next-route"
                    onClick={routeClick.bind(this, item.route, item.value)}
                  >
                    {item.value ? (
                      <View className="go-next-route-text">{item.value}</View>
                    ) : (
                      <View className="go-next-route-text">请选择</View>
                    )}

                    <View className="at-icon at-icon-chevron-right"></View>
                  </View>
                </AtInput>
              )
            );

          case "picker":
            return (
              !item.hidden && (
                <Picker
                  disabled={item.disabled}
                  className={[
                    "remind-picker",
                    item.disabled ? "remind-picker-disabled" : "",
                  ]}
                  key="remindRangeed"
                  mode="selector"
                  range={remindRanges}
                  onChange={remindChange.bind(this)}
                >
                  <AtList>
                    <AtListItem title={item.label} extraText={remindRangeed} />
                  </AtList>
                  <View className="at-icon at-icon-chevron-right"></View>
                </Picker>
              )
            );
          default:
            return null;
        }
      })}
      <BtnViews btnList={btns}></BtnViews>
    </View>
  );
}
export default index;
