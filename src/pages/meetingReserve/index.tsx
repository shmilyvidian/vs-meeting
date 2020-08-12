import React, { useState, useEffect } from "react";
import { View, Picker } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { gennerateTaroNavigateParams } from "@/utils/urlParam";
import { AtInput, AtList, AtListItem } from "taro-ui";
import { formFields, fillFormFields } from "./formFields";
import "./index.scss";

const remindRanges = ["提前30分钟", "提前10分钟", "提前5分钟"];
function index() {
  let meetingMessageObjkeys = Object.keys(formFields);

  // 设置meetingMessage
  const [meetingMessageObj, setMeetingMessageObj] = useState(formFields);

  // 初始化路由参数
  const [param, setParam] = useState({});

  // 设置picker默认选中
  const [remindRangeed, setremindRangeed] = useState(remindRanges[0]);

  // 设置初始状态
  const [fromStatus, setFromStatus] = useState("0");

  // 从其他页面跳回来带参数的话，得渲染
  useDidShow(() => {
    const currentPagesData =
      Taro.getCurrentPages().slice(-1)[0].data.query || {};
    const queryFromStatus =
      Taro.getCurrentPages().slice(-1)[0].options.fromStatus || "0";
    setParam(currentPagesData);
    setFromStatus(queryFromStatus);
  });

  useEffect(() => {
    const paramKeys = Object.keys(param);
    if (paramKeys.length) {
      paramKeys.forEach((_) => {
        if (meetingMessageObjkeys.includes(_)) {
          console.log(meetingMessageObj, _);
          meetingMessageObj[_].value = param[_];
        }
      });
      setMeetingMessageObj(JSON.parse(JSON.stringify(meetingMessageObj)));
    }
  }, [param]);

  useEffect(() => {
    const flat = meetingMessageObjkeys.every((_) => meetingMessageObj[_].value);
    console.log("是否全部选择或输入", flat);
  }, [meetingMessageObj]);

  useEffect(() => {
    meetingMessageObj.remind.value = remindRangeed;
    setMeetingMessageObj(JSON.parse(JSON.stringify(meetingMessageObj)));
  }, [remindRangeed]);

  // fromStatus: number; //表单状态,0预约会议，1我预约的会议，2参与会议，3查看过去的会议
  useEffect(() => {
    switch (fromStatus) {
      case "0":
        setMeetingMessageObj(formFields);
        Taro.setNavigationBarTitle({
          title: "预约会议",
        });
        break;
      case "1":
        setMeetingMessageObj(fillFormFields);
        Taro.setNavigationBarTitle({
          title: "我预约的会议",
        });
        break;
      case "2":
        setMeetingMessageObj(fillFormFields);
        Taro.setNavigationBarTitle({
          title: "参与会议",
        });
        break;
      case "3":
        setMeetingMessageObj(fillFormFields);
        Taro.setNavigationBarTitle({
          title: "查看过去的会议",
        });
        break;
      default:
        setMeetingMessageObj(formFields);
    }
  }, [fromStatus]);

  // 输入框变化
  function iptChange(key, val) {
    meetingMessageObj[key].value = val;
    setMeetingMessageObj(JSON.parse(JSON.stringify(meetingMessageObj)));
    console.log(meetingMessageObj);
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
      {Object.keys(formFields).map((key, i) => {
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
                  placeholder=""
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
                >
                  <View
                    className="go-next-route"
                    onClick={routeClick.bind(this, item.route, item.value)}
                  >
                    <View className="go-next-route-text">{item.value}</View>
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
    </View>
  );
}
export default index;
