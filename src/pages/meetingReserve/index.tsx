import React, { Component } from "react";
// import { View, Image } from "@tarojs/components";
import { AtInput } from "taro-ui";
console.log(AtInput);

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange() {}
  render() {
    return (
      <div>
        <AtInput
          name="value"
          title="标准五个字"
          type="text"
          placeholder="标准五个字"
          // value={this.state.value}
          onChange={this.handleChange.bind(this)}
        ></AtInput>
      </div>
    );
  }
}

export default index;
