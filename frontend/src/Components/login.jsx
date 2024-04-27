import { Button, Input } from "antd";
import Password from "antd/es/input/Password";
import { IoMdLogIn } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className=" flex justify-center items-center h-screen bg-indigo-500">
        <div className=" bg-white rounded-2xl h-1/2 w-80 w- shadow-2xl border-2 border-gray-600">
          <h1 className="text-indigo-600 text-center font-bold text-xl font-mono my-4 ">
            <span className="flex justify-center">
              <FaUser fontSize={22} className="mx-2" /> LOGIN
            </span>
          </h1>
          <div className=" border-t-2 border-gray-200 my-2"></div>
          <div className="p-3 ">
            <Input className="p-2 mb-4" placeholder=" Enter Registration No" />
            <Password className="p-2 my-4" placeholder="Enter Password" />
            <div className="flex justify-center mt-2">
              <Button
                type="submit"
                className="flex bg-indigo-500 text-white font-bold w-28 hover:bg-indigo-300"
                size="medium"
              >
                <IoMdLogIn fontSize={20} className="mx-1" /> LOGIN
              </Button>
            </div>
            <Link to={"/register"}>
              <p className="text-blue-400 text-sm text-center mt-2">
                New user? Reigster
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
