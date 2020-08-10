import React from "react";
import { Provider } from "mobx-react";
import "taro-ui/dist/style/index.scss";
import store from "./store";

import "./app.scss";

class App extends React.Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
