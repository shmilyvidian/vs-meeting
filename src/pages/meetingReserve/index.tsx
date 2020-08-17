import React, { useState, useEffect } from "react";
import { View, Picker, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { gennerateTaroNavigateParams } from "@/utils/urlParam";
import { AtInput, AtList, AtListItem } from "taro-ui";
import { formFields, fillFormFields } from "./formFields";
import { BtnViews } from "@/components/BtnViews/index";
import arrow from "@/asstes/images/arrow.svg";
import "./index.scss";

const remindRanges = [
  "会前30分钟",
  "会前25分钟",
  "会前20分钟",
  "会前15分钟",
  "会前10分钟",
  "会前5分钟",
];

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
        value: "取消会议",
        disabled: false,
        hidden: false,
        class: "default-btn",
        click: onBackViewClick,
      },
    ],
    3: [],
  };

  // 完成默认event
  function onDefaultClick() {
    let localData = Taro.getStorageSync("localData") || [];
    localData = localData ? localData : [];
    localData.push(meetingMessageObj);
    Taro.setStorageSync("localData", localData);
    Taro.reLaunch({
      url: "/pages/index/index",
    });
  }

  // 分享会议
  function onShareMeeting() {
    console.log("分享会议......");
  }

  const [btns, setBtn] = useState(btnList["0"]);

  // 设置meetingMessage
  const [meetingMessageObj, setMeetingMessageObj] = useState(formFields);
  // 取消会议
  function onBackViewClick() {
    let isRemoves = Taro.getStorageSync("isRemove") || [];
    isRemoves = isRemoves ? isRemoves : [];
    const temporaryData3 = Taro.getStorageSync("temporaryData") || {};
    const number = temporaryData3.number || "";
    if (number && !isRemoves.includes(number + "")) {
      isRemoves.push(number + "");
    }
    Taro.setStorageSync("isRemove", isRemoves);
    Taro.navigateBack({
      delta: 1,
    });
  }

  // 初始化路由参数
  const [param, setParam] = useState({});

  // 设置picker默认选中
  const [remindRangeed, setremindRangeed] = useState(remindRanges[4]);

  // 设置初始状态
  const [fromStatus, setFromStatus] = useState("");

  const [fromType, setFromType] = useState("");

  const classNames = {
    0: "overflow-height-0",
    1: "overflow-height-1",
    2: "overflow-height-2",
  };
  const [overflowClass, setOverflowClass] = useState("");

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
        const temporaryData1 = Taro.getStorageSync("temporaryData");
        const lFillFormFields1 = JSON.parse(JSON.stringify(fillFormFields));
        if (temporaryData1) {
          const paramKeys = Object.keys(temporaryData1);
          if (paramKeys.length) {
            paramKeys.forEach((pKey) => {
              if (meetingMessageObjkeys.includes(pKey)) {
                lFillFormFields1[pKey].value = temporaryData1[pKey];
              }
            });
          }
        }
        setMeetingMessageObj(lFillFormFields1);
        Taro.setNavigationBarTitle({
          title: "我预约的会议",
        });
        break;
      case "2":
        const temporaryData2 = Taro.getStorageSync("temporaryData");
        const lFillFormFields2 = JSON.parse(JSON.stringify(fillFormFields));
        if (temporaryData2) {
          const paramKeys = Object.keys(temporaryData2);
          if (paramKeys.length) {
            paramKeys.forEach((pKey) => {
              if (meetingMessageObjkeys.includes(pKey)) {
                lFillFormFields2[pKey].value = temporaryData2[pKey];
              }
            });
          }
        }
        setMeetingMessageObj(lFillFormFields2);
        Taro.setNavigationBarTitle({
          title: "我参与的会议",
        });
        break;
      case "3":
        const temporaryData3 = Taro.getStorageSync("temporaryData");
        const lFillFormFields = JSON.parse(JSON.stringify(fillFormFields));
        if (temporaryData3) {
          const paramKeys = Object.keys(temporaryData3);
          if (paramKeys.length) {
            paramKeys.forEach((pKey) => {
              if (meetingMessageObjkeys.includes(pKey)) {
                lFillFormFields[pKey].value = temporaryData3[pKey];
              }
            });
          }
        }
        setMeetingMessageObj(lFillFormFields);
        Taro.setNavigationBarTitle({
          title: "过去的会议",
        });
        break;
      default:
        setMeetingMessageObj(JSON.parse(JSON.stringify(formFields)));
    }
    // Taro.removeStorageSync("temporaryData");
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
        if (fromStatus === "1") {
          btnList["1"][1].value = "取消会议";
          btnList["2"][1].value = "取消会议";
        } else if (fromStatus === "2") {
          btnList["1"][1].value = "退出会议";
          btnList["2"][1].value = "退出会议";
        } else {
          btnList["1"][1].hidden = true;
          btnList["2"][1].hidden = true;
        }
        break;
      case "meeting":
        btnList["1"][1].hidden = true;
        btnList["2"][1].hidden = true;
        break;
      case "end":
        btnList["1"][1].hidden = true;
        btnList["2"][1].hidden = true;
        break;
    }
    let count = 0;
    btnList[fromStatus].forEach((item) => {
      if (!item.hidden) {
        count += 1;
      }
    });
    setOverflowClass(classNames[count]);
    setBtn(btnList[fromStatus]);
  }, [fromStatus, fromType]);

  // 输入框变化
  function iptChange(key, val) {
    meetingMessageObj[key].value = val.slice(0, 15);
    setMeetingMessageObj(JSON.parse(JSON.stringify(meetingMessageObj)));
  }
  // piaker选择change
  function remindChange(e) {
    const selectedRemind = remindRanges[Number(e.detail.value)];
    setremindRangeed(selectedRemind);
  }

  // 页面跳转
  function routeClick(route, value) {
    var pages = Taro.getCurrentPages();
    var curPage = pages[pages.length - 1]; //当前页面
    curPage.data.query = {
      takePartInPerson: meetingMessageObj.takePartInPerson.value,
    };
    const query: any = { introduce: value, disabled: fromStatus !== "0" };
    Taro.navigateTo(gennerateTaroNavigateParams(route, query));
  }

  return (
    <View>
      <View className={overflowClass}>
        {Object.keys(formFields).map((key) => {
          const item = meetingMessageObj[key];
          switch (item.showType) {
            case "input":
              return (
                !item.hidden && (
                  <AtInput
                    className={[item.class, "meeting-input"]}
                    key={key}
                    type="text"
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

                      <Image className="icon-arrow-right" src={arrow}></Image>
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
                    value="4"
                    onChange={remindChange.bind(this)}
                  >
                    <AtList>
                      <AtListItem
                        title={item.label}
                        value="1"
                        extraText={remindRangeed}
                      />
                    </AtList>
                    <Image className="icon-arrow-right" src={arrow}></Image>
                  </Picker>
                )
              );
            default:
              return null;
          }
        })}
      </View>
      <BtnViews btnList={btns}></BtnViews>
    </View>
  );
}
export default index;
