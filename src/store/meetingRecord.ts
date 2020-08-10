import { observable, computed } from "mobx";

type meetingType = {
  zhuti: String;
  sex: String;
};

class HomeStore {
  @observable meetingMessage: meetingType = {
    zhuti: "",
    sex: "",
  };

  @computed get isCreatMeeting() {
    return Object.values(this.meetingMessage).every((o) => o || o === 0);
  }
}
export { HomeStore };

export default new HomeStore();
