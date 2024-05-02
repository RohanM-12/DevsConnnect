import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = ({ Size }) => {
  return (
    <LoadingOutlined
      style={{
        fontSize: `${Size}px`,
      }}
      spin
    />
  );
};

export default Spinner;
