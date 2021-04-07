import React from "react";
import { Spin } from "antd";

interface ILoadingProps {
  size?: "small" | "default" | "large";
}
// class Loading extends React.Component<ILoadingProps>
export default (ILoadingProps: ILoadingProps) => {
  const { size = "default" } = ILoadingProps;
  return (
    <div className="loading-looks" style={{}}>
      <Spin size={size} />
    </div>
  );
};
