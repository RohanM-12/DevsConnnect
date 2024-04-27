import { Button, Input } from "antd";
import Password from "antd/es/input/Password";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className=" flex justify-center items-center h-screen bg-indigo-500">
        <div className=" bg-white rounded-2xl h-auto w-80 shadow-2xl border-2 border-gray-200">
          <h1 className="text-indigo-600 text-center font-bold text-xl font-mono my-4 ">
            <span className="flex justify-center">
              <FaUser fontSize={22} className="mx-2" /> REGISTER
            </span>
          </h1>
          <div className=" border-t-2 border-gray-400 my-2"></div>
          <div className="p-3 ">
            <Input className="p-2 mb-4" placeholder=" Enter Registration No" />
            <Input className="p-2 mb-4" placeholder=" Enter Email" />
            <Password className="p-2 mb-4" placeholder="Enter Password" />
            <div className="flex justify-center mt-2">
              <Button
                type="submit"
                className="  bg-indigo-500 text-white font-bold w-28 hover:bg-indigo-300 "
              >
                REGISTER
              </Button>
            </div>
            <Link to={"/login"}>
              <p className="text-blue-400 text-sm text-center mt-2">
                Already registered? Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
