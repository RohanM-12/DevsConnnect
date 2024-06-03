import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Avatar, Empty, Input, List, Timeline } from "antd";
import { Link } from "react-router-dom";
import { IoMdChatbubbles } from "react-icons/io";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import dayjs from "dayjs";
import { FaUniversity } from "react-icons/fa";
const Discuss = () => {
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState({
    id: null,
    chatName: "",
  });
  const [messageInput, setMessageInput] = useState("");
  const [auth] = useAuth();

  //get The list of chats the user is member of
  const fetchChatListData = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/${auth?.user?.id}/discuss/getChatRooms`,
      { params: { userId: auth?.user?.id } }
    );
    if (data) {
      setChatList(data?.data);
      //  console.log(data.data);
    }
  };

  // plan is to use a state and bind it to the timeLine of messages
  const fetchMessages = async (chatRoomId) => {
    try {
      const { data } = await axios.get(
        `/api/v1/${auth?.user?.id}/discuss/getMessages/${chatRoomId}`,
        { params: { userId: auth?.user?.id } }
      );
      if (data) {
        console.log(data.messages);
        setMessages(data.messages);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // handling message send
  const handleMessageSend = async (chatRoomId) => {
    try {
      const { data } = await axios.post(
        `/api/v1/${auth?.user?.id}/discuss/sendMessage`,
        {
          chatRoomId: chatRoomId,
          senderId: auth?.user?.id,
          content: messageInput,
        }
      );
      console.log(data);
      if (data?.data) {
        fetchMessages(chatRoomId);
        setMessageInput("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchChatListData();
  }, []);
  return (
    <>
      <div>
        <div className="grid grid-cols-1 m-5 lg:grid-cols-3 md:grid-cols-3 ">
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
                <div
                  onClick={() => {
                    fetchMessages(item?.id);
                    setSelectedChatRoom({
                      ...selectedChatRoom,
                      id: item?.id,
                      chatName: item?.post?.name,
                    });
                  }}
                  className="border-2 border-gray-400 rounded-lg mx-5 bg-gray-50 hover:bg-blue-100 mb-2 hover:cursor-pointer"
                >
                  <List.Item className="mx-2 ">
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          className="border-2 border-blue-300"
                          size={45}
                          src={`${import.meta.env.VITE_REACT_APP_API}${
                            item?.post?.thumbnailImgURL
                          }`}
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
          <div className=" rounded-lg border-2 mx-2 col-span-2 shadow-md ">
            <div className=" p-2 m-3 font-bold text-gray-600 flex justify-center items-center">
              <span>
                <BsFillChatSquareTextFill size={24} className="mx-3" />
              </span>
              {selectedChatRoom?.chatName} Discussions
            </div>

            <Timeline className="drop-shadow-lg" mode="alternate">
              {messages?.map((msg) => (
                <Timeline.Item key={msg.id} color="indigo">
                  <div>
                    <div className="border-2 rounded-xl p-2 mx-5 bg-yellow-50 font-semibold ">
                      <div className="grid grid-cols-5">
                        <span
                          style={{ fontSize: "10px" }}
                          className="m-1  bg-rose-50 p-1  w-max border-orange-300 border-2 rounded-full hover:z-0"
                        >
                          {dayjs(msg?.sent_at).format("DD-MMM-YYYY")}
                        </span>
                        <span
                          style={{ fontSize: "10px" }}
                          className="m-1 bg-lime-50 p-1 border-lime-300 border-2 rounded-full w-max flex items-center  space-x-1 hover:z-0"
                        >
                          <FaUserCircle size={15} />
                          <span>{msg?.sender?.name?.split(" ")[0]}</span>
                        </span>
                        <span
                          style={{ fontSize: "10px" }}
                          className="m-1 ml-0 bg-orange-100 p-1 border-orange-300 border-2 rounded-full w-max flex items-center  hover:z-0"
                        >
                          <FaUniversity size={15} />
                          {msg?.sender?.collegeName}
                        </span>
                      </div>
                      <hr />
                      {/* <div className="border-t-2 border-gray-300 m-1"></div> */}
                      <div className="font-normal ">{msg?.content}</div>
                    </div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            <div className="flex justify-center p-5">
              {selectedChatRoom?.id ? (
                <Input
                  placeholder="Message"
                  className="w-3/4 border-2 border-gray-400"
                  size="large"
                  onChange={(e) => setMessageInput(e.target.value)}
                  value={messageInput}
                  suffix={
                    <RiSendPlane2Fill
                      className="text-blue-500 mx-2 rounded-full border-2 border-gray-400 p-2 hover:cursor-pointer hover:animate-pulse"
                      size={38}
                      onClick={() => {
                        // console.log(messageInput);
                        if (messageInput.length > 0) {
                          handleMessageSend(selectedChatRoom?.id);
                          fetchMessages(selectedChatRoom?.id);
                        }
                      }}
                    />
                  }
                />
              ) : (
                <>
                  <Empty />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discuss;
