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
      {btnList.map((_) => {
        return _.hidden ? null : (
          <AtButton
            className="footer-view-btn"
            key={_.value}
            onClick={_.click && _.click.bind(this)}
            disabled={_.disabled}
            type="primary"
          >
            {_.value}
          </AtButton>
        );
      })}
    </View>
  );
});
