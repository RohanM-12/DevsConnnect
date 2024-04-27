import { Button, Input } from "antd";
import Password from "antd/es/input/Password";
import { IoMdLogIn } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Form, Link } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
const Login = () => {
  const onFinish = () => {};
  return (
    <>
      <div className=" flex justify-center items-center h-screen bg-indigo-100">
        <div className=" bg-white rounded-2xl h-auto w-80 w- shadow-2xl border-2 border-gray-300">
          <Form onSubmit={onFinish}>
            <h1 className="text-indigo-600 text-center font-bold text-xl font-mono my-4 ">
              <span className="flex justify-center">
                <FaUser fontSize={22} className="mx-2" /> LOGIN
              </span>
            </h1>
            <div className=" border-t-4 border-gray-200 my-2"></div>
            <div className="p-5 ">
              <FormItem>
                <Input className="p-2 s" placeholder=" Enter Registration No" />
              </FormItem>
              <FormItem>
                <Password className="p-2 " placeholder="Enter Password" />
              </FormItem>
              <div className="flex justify-center mt-2">
                <Button
                  type="submit"
                  className="flex bg-indigo-500 text-white font-bold w-28 hover:bg-indigo-300"
                  size="large"
                >
                  <IoMdLogIn fontSize={20} className="mx-1" /> LOGIN
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
