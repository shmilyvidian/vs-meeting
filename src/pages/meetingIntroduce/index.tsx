import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { AtTextarea } from "taro-ui";
import { BtnViews } from "@/components/BtnViews/index";
import "./index.scss";

interface IProps {
  reserveProp: string; //会议介绍
}

function index({ reserveProp = "" }: IProps) {
  // 设置reserve
  const [reserve, setReserve] = useState(reserveProp);
  const btnList = [
    {
      value: "确定",
      disabled: true,
      hidden: false,
      class: "",
      click: btnConfirm,
    },
  ];
  const [btns, setBtn] = useState(btnList);
  // 输入框变化
  function handleChange(val) {
    setReserve(val);
  }

  // 确认按钮点击
  function btnConfirm() {
    var pages = Taro.getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接使用上一个页面的data，把数据存到上一个页面中去
    prevPage.data.query = {
      introduce: reserve,
    };
    Taro.navigateBack({
      delta: 1,
    });
  }

  useDidShow(() => {
    const val =
      decodeURIComponent(
        Taro.getCurrentPages().slice(-1)[0].options.introduce
      ) || "";
    setReserve(val);
  });

  useEffect(() => {
    btnList[0].disabled = !reserve;
    setBtn(btnList);
  }, [reserve]);

  return (
    <View>
      <AtTextarea
        value={reserve}
        key="reserve"
        onChange={handleChange.bind(this)}
        maxLength={200}
        placeholder="请输入会议介绍"
      ></AtTextarea>
      <BtnViews btnList={btns}></BtnViews>
    </View>
  );
}

export default index;
