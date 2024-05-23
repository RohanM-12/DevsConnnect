import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Spinner = ({ Size, Timer }) => {
  const [count, setCount] = useState(3);
  const [auth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (Timer) {
      const interval = setTimeout(() => {
        setCount((prev) => --prev);
      }, 1000);
      count === 0 && !auth?.user && navigate("/login");
      return () => clearInterval(interval);
    }
  }, [count, navigate]);

  return (
    <LoadingOutlined
      className="text-blue-500"
      style={{
        fontSize: `${Size}px`,
      }}
      spin
    />
  );
};

export default Spinner;
