import { Button, Form, Input } from "antd";

import Password from "antd/es/input/Password";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/register", values);
      if (res.data.status == 200) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-white rounded-2xl h-auto w-96 shadow-2xl border-2 border-gray-300">
          <h1 className="text-indigo-600 text-center font-bold text-xl font-mono my-4 ">
            <span className="flex justify-center">
              <FaUser fontSize={22} className="mx-2" /> REGISTER
            </span>
          </h1>
          <div className=" border-t-4 border-gray-200 my-2"></div>
          <div className="p-5">
            <Form onFinish={onFinish}>
              <Form.Item
                name={"registrationNo"}
                rules={[{ required: true, message: "Please provide input" }]}
              >
                <Input className="p-2" placeholder=" Enter Registration No" />
              </Form.Item>
              <Form.Item
                name={"email"}
                rules={[{ required: true, message: "Please provide input" }]}
              >
                <Input className="p-2" placeholder=" Enter Email" />
              </Form.Item>
              <Form.Item
                name={"name"}
                rules={[{ required: true, message: "Please provide input" }]}
              >
                <Input className="p-2" placeholder=" Enter Name" />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[
                  { required: true, message: "Please provide input" },
                  {
                    len: 6,
                    message: "Password Length must be greater than 6",
                  },
                ]}
              >
                <Password
                  autoComplete="current-password"
                  className="p-2"
                  placeholder="Enter Password"
                />
              </Form.Item>
              <div className="flex justify-center ">
                <Button
                  htmlType="submit"
                  size="large"
                  className=" flex bg-indigo-500 text-white font-bold w-32 hover:bg-indigo-300 "
                  onSubmit={onFinish}
                >
                  <FaCirclePlus fontSize={24} className="mx-1" />
                  REGISTER
                </Button>
              </div>
            </Form>
          </div>

          <Link to={"/login"}>
            <p className="text-blue-400 text-sm text-center my-2 hover:text-blue-800">
              Already registered? Login
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
