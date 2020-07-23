import * as React from "react";
import { ClipLoader } from "react-spinners";

interface IProps {
  size?: number;
  color?: string;
}

const Loader = (props: IProps) => (
  <div className="sweet-loading">
    <ClipLoader size="100" color={"#123abc"} loading />
  </div>
);

export default Loader;
