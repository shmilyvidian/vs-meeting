import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { AtInput } from "taro-ui";
import "./index.scss";

// 会议提醒时间
const Reminds = ["提前30分钟", "提前10分钟", "提前5分钟"];

interface IProps {
  param: object;
  callback: () => void;
}

const index = React.memo(({ callback = () => {}, param = {} }: IProps) => {
  console.log(Reminds);
  // 定义label
  const messagesObj = {
    theme: "会议主题",
    time: "会议时间", //时间
    house: "会议室", //会议室
    contractPerson: "预约人", //预约人
    phone: "联系电话", //联系电话
    number: "会议号", //会议号
    takePartInPerson: "参会人", //参会人
    introduce: "会议介绍", //会议介绍
    remind: "会议提醒" //会议提醒
  };
  // 配置margin-bottom项
  const marginIndexs = [0, 2, 4, 5];
  // 初始化组件项
  const messagesArr: Array<any> = [];
  Object.keys(messagesObj).forEach(_ => {
    const mObj = {};
    mObj["key"] = _;
    mObj["label"] = messagesObj[_];
    mObj["value"] = "";
    mObj["disabled"] = false;
    mObj["hidden"] = false;
    messagesArr.push(mObj);
  });
  // 设置meetingMessage
  const [meetingMessage, setMeetingMessage] = useState(messagesArr);

  useEffect(() => {
    const paramKeys = Object.keys(param);
    if (paramKeys.length) {
      meetingMessage.forEach(_ => {
        if (paramKeys.includes(_)) {
          _.value = param[_];
        }
      });
      setMeetingMessage(JSON.parse(JSON.stringify(meetingMessage)));
    }
  });

  useEffect(() => {
    const flat = meetingMessage.every(_ => _.value);
    console.log("是否全部选择或输入", flat);
    typeof callback === "function" && callback();
  }, [meetingMessage]);

  // 输入框变化
  function iptChange(i, val, e) {
    meetingMessage[i].value = val;
    setMeetingMessage(JSON.parse(JSON.stringify(meetingMessage)));
    console.log(meetingMessage[i]);
  }

  return (
    <View>
      {meetingMessage.map((_, i) => (
        <AtInput
          className={[marginIndexs.includes(i) ? "mb-15" : "", "ml-0"]}
          size="small"
          key={_.key}
          name={_.key}
          title={_.label}
          type="text"
          value={_.value}
          onChange={iptChange.bind(this, i)}
          placeholder="请输入"
        ></AtInput>
      ))}
    </View>
  );
});

export default index;
