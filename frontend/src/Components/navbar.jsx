import { Avatar, Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PiUserListBold } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "../contexts/authContext";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaCompass } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const items = [
    {
      label: "Profile",
      icon: <PiUserListBold size={25} className="my-3" />,
      onClick: () => {
        navigate("/myProfile");
      },
    },
    {
      label: "LogOut",
      icon: <RiLogoutCircleLine size={25} className="my-3" />,
      onClick: () => {
        navigate("/login");
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
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
            className="text-white text-lg flex items-center font-bold mb-0 "
          >
            {/* <BsFilePost size={35} /> */}
            <FaCompass size={35} />
            <p
              style={{ fontSize: "12px" }}
              className="text-white ml-1 hidden lg:flex "
            >
              Explore
            </p>
          </Link>
          {auth?.user && (
            <Link
              className="text-white text-lg flex items-center font-bold mb-0 "
              to={"/connect"}
            >
              <IoIosPeople className="text-white" size={35} />
              <p
                style={{ fontSize: "12px" }}
                className="text-white ml-1 font-bold hidden lg:flex "
              >
                Connect
              </p>
            </Link>
          )}
          {!auth?.user && (
            <Link
              to="/login"
              className="text-white text-sm flex items-center  font-bold  "
            >
              <RiLoginCircleLine className="mr-1" size={25} /> Login
            </Link>
          )}

          <Dropdown
            className="float-end mx-2 "
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span
                  className="flex items-center hover:cursor-pointer "
                  // onClick={() => {
                  //   navigate("/profile");
                  // }}
                >
                  {/* <PiUserCircleFill fontSize={35} className="text-white" /> */}
                  {auth?.user && (
                    <>
                      <div>
                        <Avatar
                          className="mx-1 font-bold"
                          style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                            padding: "18px",
                            fontSize: "20px",
                          }}
                        >
                          {auth?.user?.name?.substring(0, 1).toUpperCase()}
                        </Avatar>
                      </div>
                    </>
                  )}
                  <p
                    style={{ fontSize: "13px" }}
                    className="text-white font-mono font-bold hidden lg:flex "
                  >
                    {auth &&
                      auth?.user?.name?.trim()?.split(" ")[0]?.toUpperCase()}
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
