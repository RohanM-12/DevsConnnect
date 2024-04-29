import { Button, Input, Form } from "antd";
import Password from "antd/es/input/Password";
import { IoMdLogIn } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const result = await axios.get("/api/v1/user/login", {
      params: values,
    });

    if (result.data.status === 200) {
      toast.success(result?.data.message);
      navigate("/");
    } else {
      toast.error(result.data.message);
    }
  };
  return (
    <>
      <div className=" flex justify-center items-center h-screen">
        <div className=" bg-white rounded-2xl h-auto w-80 w- shadow-2xl border-2 border-gray-300">
          <Form onFinish={onFinish}>
            <h1 className="text-indigo-600 text-center font-bold text-xl font-mono my-4 ">
              <span className="flex justify-center">
                <FaUser fontSize={22} className="mx-2" /> LOGIN
              </span>
            </h1>
            <div className=" border-t-4 border-gray-200 my-2"></div>
            <div className="p-5 ">
              <Form.Item
                name={"regNo"}
                rules={[
                  {
                    required: true,
                    message: "Please provide input",
                  },
                ]}
              >
                <Input className="p-2 s" placeholder=" Enter Registration No" />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Please provide input",
                  },
                ]}
              >
                <Password className="p-2 " placeholder="Enter Password" />
              </Form.Item>
              <div className="flex justify-center  mt-2">
                <Button
                  htmlType="submit"
                  className="flex bg-indigo-500 text-white font-bold w-28 hover:bg-indigo-300"
                  size="large"
                  onSubmit={onFinish}
                >
                  <IoMdLogIn fontSize={22} className="mx-1" /> LOGIN
                </Button>
              </div>
              <Link to={"/register"}>
                <p className="text-blue-400 text-sm text-center mt-2 hover:text-blue-800">
                  New user? Reigster
                </p>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
