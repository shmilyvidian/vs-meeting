import React from "react";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";

type btnType = {
  value: string;
  disabled: boolean;
  hidden: boolean;
  click: () => void;
};

interface IProps {
  btnList: Array<btnType>; //会议介绍
}

export const BtnViews = React.memo(({ btnList = [] }: IProps) => {
  return (
    <View className="footer-view">
      {btnList.map((btnItem) => {
        return btnItem.hidden ? null : (
          <AtButton
            className="footer-view-btn"
            key={btnItem.value}
            onClick={btnItem.click && btnItem.click.bind(this)}
            disabled={btnItem.disabled}
            type="primary"
          >
            {btnItem.value}
          </AtButton>
        );
      })}
    </View>
  );
});
