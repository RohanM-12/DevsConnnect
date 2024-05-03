import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = ({ Size, Timer }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    if (Timer) {
      const interval = setTimeout(() => {
        setCount((prev) => --prev);
      }, 1000);
      count === 0 && navigate("/login");
      return () => clearInterval(interval);
    }
  }, [count, navigate]);

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
