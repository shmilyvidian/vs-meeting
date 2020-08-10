import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
// import { observer, inject } from "mobx-react";
// import { HomeStore } from "@/store/homeStore";
import { AtButton } from "taro-ui";
console.log(AtButton);
type propsType = {
  store: {
    // homeStore;
  };
};

type stateType = {};

interface Index {
  props: propsType;
  state: stateType;
}

// @inject('store')
// @observer
class Index extends Component {
  // private homeStore: HomeStore;
  constructor(props) {
    super(props);
    // this.homeStore = props.store.homeStore;
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <AtButton>按钮</AtButton>
      </View>
    );
  }
}

export default Index;
