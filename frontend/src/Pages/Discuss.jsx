import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Avatar, List } from "antd";
import { Link } from "react-router-dom";
import { IoMdChatbubbles } from "react-icons/io";
const Discuss = () => {
  const [chatList, setChatList] = useState([]);
  const [auth] = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/${auth?.user?.id}/discuss/getChatRooms`,
        { params: { userId: auth?.user?.id } }
      );
      if (data) {
        setChatList(data.data);
        console.log(data.data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <div className="grid grid-cols-3 m-5">
          <div className="rounded-lg border-2 mx-2 col-span-1 drop-shadow-md shadow-md ">
            <div className=" p-2 m-3 font-bold text-gray-600 flex justify-center items-center">
              <span>
                <IoMdChatbubbles size={24} className="mx-3" />
              </span>
              Chat list
            </div>

            <List
              itemLayout="horizontal"
              dataSource={chatList}
              className="mb-10"
              renderItem={(item, index) => (
                <div className="border-2 border-gray-400 rounded-lg mx-5 bg-gray-50 hover:bg-blue-100 mb-2 hover:cursor-pointer">
                  <List.Item className="mx-2 ">
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          className="border-2 border-blue-300"
                          size={45}
                          src={`http://localhost:5000${item?.post?.thumbnailImgURL}`}
                        />
                      }
                      title={
                        <Link
                          className="font-semibold"
                          to={`/detailsPost/${item?.post?.id}`}
                        >
                          {item?.post?.name}
                        </Link>
                      }
                    />
                  </List.Item>
                </div>
              )}
            />
          </div>
          <div className="p-10 text-center  rounded-lg border-2 mx-2 col-span-2 shadow-md ">
            Chatbox
          </div>
        </div>
      </div>
    </>
  );
};

export default Discuss;
