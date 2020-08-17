import { styled } from "linaria/react";
import { View } from "@tarojs/components";

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

function getColor(type, isEnd) {
  if (isEnd) {
    return "transparent";
  }
  switch (type) {
    case "1":
      return "#00B853";
    case "2":
      return "#F9BB4C";
    case "3":
      return "#00B853";
    case "4":
      return "#E9EBED";
    default:
      return "#fff";
  }
}

export const RoomValBtn = styled(View)<{ active: boolean; disable: boolean }>`
  background-color: ${(props) => (props.active ? "#3476FE" : "#fff")};
  color: ${(props) =>
    props.active ? "#fff" : props.disable ? "#C0C4CC" : "#303133"};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 0 auto;
  font-size: 24px;
  ${center};
`;

export const RoomTimeLine = styled(View)<{
  disable: boolean;
  type: string;
  isEnd: boolean;
  item: string;
  i: number;
}>`
  flex: auto;
  position: relative;
  height: ${(props) => (props.type === "4" ? "6px" : "10px")};
  color: ${(props) => (props.disable ? "#C0C4CC" : "#303133")};
  background: ${(props) => getColor(props.type, props.isEnd)};
  ${center};
`;
