import React from "react";
import { Provider } from "mobx-react";
import Taro from "@tarojs/taro";
import store from "./store";
import "./app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    Taro.removeStorageSync("localData");
    Taro.removeStorageSync("isRemove");
    Taro.removeStorageSync("temporaryData");
  }

  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
