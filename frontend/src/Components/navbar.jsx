import { Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircleFill, PiUserListBold } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "../contexts/authContext";
import { RiLoginCircleLine } from "react-icons/ri";
import { BsFilePost } from "react-icons/bs";
const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const items = [
    {
      label: "LogOut",
      icon: <RiLogoutCircleLine size={20} />,
      onClick: () => {
        navigate("/login");
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
      },
    },
    {
      label: "Profile",
      icon: <PiUserListBold size={20} />,
      onClick: () => {
        navigate("/profile");
      },
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center  p-4 bg-indigo-500 rounded-sm shadow-sm shadow-gray-800 mb-4 ">
        <Link to="/">
          <span className=" drop-shadow-3xl ">
            <span className="text-black font-bold text-2xl">{"Devs"}</span>
            <span className="text-white font-mono font-extrabold text-2xl ">
              CONNECT
            </span>
          </span>
        </Link>
        <div className="flex items-center space-x-8">
          <Link
            to="/explorePosts"
            className="text-white text-lg flex items-center font-bold mb-2 "
          >
            <BsFilePost className="mr-1" size={23} /> Explore
          </Link>
          {!auth.user && (
            <Link
              to="/login"
              className="text-white text-lg flex items-center font-bold mb-2 "
            >
              <RiLoginCircleLine className="mr-1" size={23} /> Login
            </Link>
          )}

          <Dropdown
            className="float-end mx-2"
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span
                  className="flex items-center hover:cursor-pointer "
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <PiUserCircleFill fontSize={35} className="text-white" />
                  <p className="text-white font-mono font-bold">
                    {auth && auth?.user?.name.trim().split(" ")[0]}
                  </p>
                </span>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Navbar;
