import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import "./index.scss";

// interface IProps {
//   btnViewst: Array<btnType>; //会议介绍
// }

interface IProps {
  onChange: (a: any, b: any) => void;
}
const timeTablesData = [
  {
    status: "3",
  },
  {
    status: "3",
  },
  {
    status: "3",
  },
  {
    status: "3",
  },
  {
    status: "3",
  },
  {
    status: "3",
  },
  {
    status: "2",
  },
  {
    status: "2",
  },
  {
    status: "2",
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
  },
  {
    status: "2",
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
];

export const TimeLine = function ({ onChange }: IProps) {
  // 颜色状态 0:不可预约，1:选中，2:可预约,3:已预约
  const bgColors = {
    0: "cant-make-color", //不可预约 #eaeaea
    1: "selete-color", //选中 #3476FE
    2: "can-make-color", //可预约 #00B853
    3: "seleted-color", //已预约 #F9BB4C
  };
  const [timeTables, setTimeTables] = useState(timeTablesData);
  const [startIndex, setStartIndex] = useState(9999);
  const [endIndex, setEndIndex] = useState(9999);

  function onPieItemClick(status, index) {
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
          setEndIndex(index);
          // 有起点
          timeTables.forEach((tItem, tIndex) => {
            if (
              ((tIndex > startIndex && tIndex <= index) ||
                (tIndex < startIndex && tIndex >= index)) &&
              tItem.status === "2"
            ) {
              tItem.status = "1";
            }
          });
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
    }
  }

  useEffect(() => {
    onChange &&
      onChange(
        startIndex === 9999 ? "" : startIndex,
        endIndex === 9999 ? "" : endIndex
      );
  }, [startIndex, endIndex]);

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
                  onClick={onPieItemClick.bind(null, item.status, index)}
                  className={`slice-${index + 1} slice ${
                    ["1", "2", "3"].includes(item.status)
                      ? bgColors[item.status]
                      : ""
                  }`}
                ></View>
              );
            })}
          </View>
          <View className="pie-base-shade-4"></View>
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
      <View className="scale-right">3</View>
      <View className="scale-bottom">6</View>
      <View className="scale-left">9</View>
    </View>
  );
};
