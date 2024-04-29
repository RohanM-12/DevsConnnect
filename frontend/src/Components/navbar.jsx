import { Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircleFill } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
// import { PiUserListBold } from "react-icons/pi";
const Navbar = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "LogOut",
      icon: <RiLogoutCircleLine size={20} />,
      onClick: () => {
        navigate("/login");
      },
    },
    // {
    //   label: "Users",
    //   icon: <PiUserListBold size={20} />,
    // },
  ];
  return (
    <>
      <div className="h-auto p-5 bg-blue-600 rounded-sm shadow-sm shadow-gray-800 ">
        <Link to="/">
          <span className=" drop-shadow-2xl ">
            <span className="text-black font-bold text-2xl">{"Devs"}</span>
            <span className="text-white font-mono font-extrabold text-2xl ">
              CONNECT
            </span>
          </span>
        </Link>
        <Dropdown
          className="float-end  mx-2"
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <PiUserCircleFill fontSize={35} className="text-white" />
            </Space>
          </a>
        </Dropdown>
      </div>
    </>
  );
};

export default Navbar;
