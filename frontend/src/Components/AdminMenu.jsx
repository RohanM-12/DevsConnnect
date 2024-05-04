import { Menu } from "antd";
import { FaUser } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa6";

import { BsPostcardHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const AdminMenu = ({ selectedTab, setSelectedTab }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log("click ", e);
    setSelectedTab({
      current: e.key,
    });
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[selectedTab.current]}
      mode="horizontal"
      className="flex justify-center"
    >
      <Menu.Item key="myProfile" onClick={() => navigate("/myProfile")}>
        <span className="flex items-center text-md font-bold mx-1">
          <FaUser size={25} className="m-1" />
          My Profile
        </span>
      </Menu.Item>
      <Menu.Item key="myPosts" onClick={() => navigate("/myPosts")}>
        <span className="flex items-center text-md font-bold mx-1">
          <BsPostcardHeart size={30} className="m-1" />
          My Posts
        </span>
      </Menu.Item>
      <Menu.Item
        key="contributionRequests"
        onClick={() => navigate("/contributionRequests")}
      >
        <span className="flex items-center text-md font-bold mx-1">
          <FaCodeBranch size={25} className="m-1" />
          Requests
        </span>
      </Menu.Item>
    </Menu>
  );
};

export default AdminMenu;
