import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import "./index.scss";
interface IProps {
  onChange: (a: any, b: any) => void;
}
const timeTablesData = [
  {
    status: "0",
  },
  {
    status: "0",
  },
  {
    status: "0",
  },
  {
    status: "0",
  },
  {
    status: "0",
  },
  {
    status: "0",
  },
  {
    status: "2",
    startTime: "15:00",
    endTime: "15:30",
  },
  {
    status: "2",
    startTime: "15:30",
    endTime: "16:00",
  },
  {
    status: "2",
    startTime: "16:00",
    endTime: "16:30",
  },
  {
    status: "3",
    text: `资管评审会议\n预订人:张床\n16:30-19:00 2.5h`,
  },
  {
    status: "3",
    text: `资管评审会议\n预订人:张床\n16:30-19:00 2.5h`,
  },
  {
    status: "3",
    text: `资管评审会议\n预订人:张床\n16:30-19:00 2.5h`,
  },
  {
    status: "3",
    text: `资管评审会议\n预订人:张床\n16:30-19:00 2.5h`,
  },
  {
    status: "3",
    text: `资管评审会议\n预订人:张床\n16:30-19:00 2.5h`,
  },
  {
    status: "3",
    text: "同业评审会议\n预订人:陈红\n19:00-21:00 2.0h",
  },
  {
    status: "3",
    text: "同业评审会议\n预订人:陈红\n19:00-21:00 2.0h",
  },
  {
    status: "3",
    text: "同业评审会议\n预订人:陈红\n19:00-21:00 2.0h",
  },
  {
    status: "3",
    text: "同业评审会议\n预订人:陈红\n19:00-21:00 2.0h",
  },
  {
    status: "2",
    startTime: "09:00",
    endTime: "09:30",
  },
  {
    status: "2",
    startTime: "09:30",
    endTime: "10:00",
  },
  {
    status: "3",
    text: "财务评审会议\n预订人:李丹\n10:00-12:00 2.0h",
  },
  {
    status: "3",
    text: "财务评审会议\n预订人:李丹\n10:00-12:00 2.0h",
  },
  {
    status: "3",
    text: "财务评审会议\n预订人:李丹\n10:00-12:00 2.0h",
  },
  {
    status: "3",
    text: "财务评审会议\n预订人:李丹\n10:00-12:00 2.0h",
  },
];

export const TimeLine = function ({ onChange }: IProps) {
  // 颜色状态 0:不可预约，1:选中，2:可预约,3:已预约
  const bgColors = {
    0: "cant-make-color", //不可预约 #eaeaea
    1: "selete-color", //选中 #3476FE
    2: "can-make-color", //可预约 #00B853
    3: "seleted-color", //已预约 #F9BB4C
  };
  const [timeTables, setTimeTables] = useState(
    JSON.parse(JSON.stringify(timeTablesData))
  );
  const [startIndex, setStartIndex] = useState(9999);
  const [endIndex, setEndIndex] = useState(9999);
  const [currentText, setCurrentText] = useState("");

  function onPieItemClick(status, index, text) {
    // setTimeTables()
    if (["2", "1"].includes(status)) {
      //可预约
      if (status === "2") {
        if (startIndex !== 999 && endIndex !== 9999) return;
        // 没有起点值
        if (startIndex === 9999) {
          timeTables[index].status = "1";
          setStartIndex(index);
        } else {
          // 有起点
          //设置终点

          let flat = true; //假设连接上了
          timeTables.forEach((tItem, tIndex) => {
            if (
              (tIndex > startIndex && tIndex <= index) ||
              (tIndex < startIndex && tIndex >= index)
            ) {
              if (tItem.status !== "2") {
                flat = false;
                return;
              }
            }
          });
          if (flat) {
            setEndIndex(index);
            timeTables.forEach((tItem, tIndex) => {
              if (
                (tIndex > startIndex && tIndex <= index) ||
                (tIndex < startIndex && tIndex >= index && tItem.status === "2")
              ) {
                tItem.status = "1";
              }
            });
          }
        }
      } else {
        // 选中
        timeTables.forEach((tItem) => {
          if (tItem.status === "1") {
            tItem.status = "2";
          }
        });
        setStartIndex(9999);
        setEndIndex(9999);
      }
      setTimeTables(JSON.parse(JSON.stringify(timeTables)));
    } else if (status === "3" && startIndex === 9999) {
      setCurrentText(text);
    } else {
      initCurrentText();
    }
  }

  function initCurrentText() {
    // 存在起点起点终点
    if (startIndex !== 9999 && endIndex !== 9999) {
      // 起点大于终点
      if (startIndex > endIndex) {
        const timeInterval = (startIndex - endIndex + 1) / 2;
        const timeIntervalStr =
          timeInterval % 1 === 0 ? timeInterval + ".0" : timeInterval;
        setCurrentText(
          `点击完成确定会议时间\n${timeTablesData[endIndex].startTime} - ${timeTablesData[startIndex].endTime}   ${timeIntervalStr}h`
        );
      } else {
        const timeInterval = (endIndex - startIndex + 1) / 2;
        const timeIntervalStr =
          timeInterval % 1 === 0 ? timeInterval + ".0" : timeInterval;
        setCurrentText(
          `点击完成确定会议时间\n${timeTablesData[startIndex].startTime} - ${timeTablesData[endIndex].endTime}   ${timeIntervalStr}h`
        );
      }
    } else if (startIndex !== 9999 && endIndex === 9999) {
      // 只存在起点
      setCurrentText(
        `点击完成确定会议时间\n${timeTablesData[startIndex].startTime} - ${timeTablesData[startIndex].endTime}  0.5h`
      );
    } else {
      setCurrentText("请选择时间");
    }
  }

  useEffect(() => {
    onChange &&
      onChange(
        startIndex === 9999 ? "" : startIndex,
        endIndex === 9999 ? "" : endIndex
      );
    initCurrentText();
  }, [startIndex, endIndex]);

  useDidShow(() => {
    setTimeTables(JSON.parse(JSON.stringify(timeTablesData)));
    setStartIndex(9999);
    setEndIndex(9999);
    setCurrentText("");
  });
  function createMarkup(val) {
    return { __html: "First &middot; Second" };
  }

  return (
    <View className="pie-box">
      <View className="pie-content ">
        <View className="pie-base-1">
          <View className="pie-base-shade-1"></View>
          <View className="pie-sign-1">
            {timeTables.map((_, index) => {
              return (
                <View
                  className={`slice-${index + 1} slice ${bgColors["0"]}`}
                ></View>
              );
            })}
          </View>
          <View className="pie-base-shade-2"></View>
          <View className="pie-base-shade-3"></View>
        </View>
        <View className="pie-base-2">
          <View className="pie-sign-2">
            {timeTables.map((item, index) => {
              return (
                <View
                  onClick={onPieItemClick.bind(
                    null,
                    item.status,
                    index,
                    item.text
                  )}
                  className={`slice-${index + 1} slice ${
                    ["1", "2", "3"].includes(item.status)
                      ? bgColors[item.status]
                      : ""
                  }`}
                ></View>
              );
            })}
          </View>
          <View className="pie-base-shade-4">
            <View className="text-content">
              <Text>{currentText}</Text>
              {/* <div dangerouslySetInnerHTML={createMarkup(currentText)}></div> */}

              <View></View>
            </View>
          </View>
        </View>
        <View className="pie-base-3">
          <View className="pie-sign-3">
            {timeTables.map((_, index) => {
              return <View className={`line-${index + 1} line`}></View>;
            })}
          </View>
        </View>
      </View>
      <View className="scale-top">12</View>
      <View className="scale-right">15</View>
      <View className="scale-bottom">18</View>
      <View className="scale-left">
        <View className="morning">9</View>
        <View className="evening">21</View>
      </View>
    </View>
  );
};
