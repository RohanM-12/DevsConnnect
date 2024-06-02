import React, { useEffect, useState } from "react";
import AdminMenu from "../Components/AdminMenu";
import { Avatar, List, Radio, Rate } from "antd";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import LoadingCard from "../Components/loadingCard";
import { FaClipboardList } from "react-icons/fa6";
const ContributionRequests = () => {
  const [auth] = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState({
    current: "contributionRequests",
  });
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/api/v1/posts/contributionRequests/getRequests",
        { params: { userId: auth?.user?.id } }
      );
      if (data) {
        setLoading(false);
      }
      setRequests(data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (status, item) => {
    console.log(item);
    try {
      const result = await axios.put(
        "api/v1/posts/ContributionRequests/updateStatus",
        {
          requesterId: item?.requesterId,
          postId: item?.postId,
          status: status,
          id: item?.id,
        }
      );
      if (result?.data?.status == 200) {
        toast.success("Status updated ... ");
        fetchData();
      }

      if (result?.data?.chatRoomUserStatus == 200) {
        toast.success("User added to chatroom");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingChange = async (value, reqId) => {
    try {
      const res = await axios.put(
        "/api/v1/posts/ContributionRequests/updateRating",
        { value, reqId }
      );
      if (res?.status == 200) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === reqId ? { ...request, rating: value } : request
          )
        );

        toast.success("Rating Updated");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <AdminMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className="flex justify-center items-center text-center pb-5 p-10 text-xl font-semibold text-gray-500">
        <FaClipboardList className="mx-2 text-blue-400" size={26} />
        <span>CONTRIBUTION REQUESTS ON YOUR POSTS </span>
      </div>
      <div className="flex justify-center">
        <div className="p-5 drop-shadow-2xl w-2/3">
          <div className="p-10 drop-shadow-xl shadow-lg border-gray-200 border-2 rounded-lg">
            {requests?.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={requests}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <>
                          <Avatar
                            className="mx-1 font-bold"
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                              padding: "25px",
                              fontSize: "20px",
                            }}
                          >
                            {item?.requester?.name
                              ?.substring(0, 1)
                              ?.toUpperCase()}
                          </Avatar>
                          <div className=" flex justify-center mt-2  ">
                            <span className="text-orange-500 font-semibold  ">
                              {item?.requester?.name
                                ?.split(" ")[0]
                                ?.toUpperCase()}
                            </span>
                          </div>
                        </>
                      }
                      title={
                        <Link
                          className="font-bold"
                          to={`/detailsPost/${item?.postId}`}
                        >
                          Title : {item?.postName}
                          <span className="float-end font-semibold mr-3">
                            {item?.created_at
                              ? dayjs(item?.created_at).format("DD-MM-YYYY")
                              : "N/A"}
                          </span>
                        </Link>
                      }
                      description={
                        <span className="text-black">
                          <p>
                            <span className="font-semibold text-gray-900 ">
                              {"Requester's"} Interest :
                            </span>

                            {item?.interestDescription}
                            {item.status === "Requested" ? (
                              <Radio.Group
                                onChange={(val) =>
                                  handleStatusChange(val.target.value, item)
                                }
                                className="float-end p-2"
                              >
                                <Radio.Button
                                  value="Accepted"
                                  className="bg-green-400  hover:text-white hover:bg-green-300"
                                >
                                  Accept
                                </Radio.Button>
                                <Radio.Button
                                  value="Rejected"
                                  className="bg-red-400 hover:text-white hover:bg-red-300"
                                >
                                  Reject
                                </Radio.Button>
                              </Radio.Group>
                            ) : item.status === "Accepted" ? (
                              <>
                                <div>
                                  <CheckCircleTwoTone
                                    className="float-end px-10 text-3xl"
                                    twoToneColor="#52c41a"
                                  />
                                  <div className="float-end"></div>
                                </div>
                                <div className=" drop-shadow-2xl float-end">
                                  <span>Rate Contribution : </span>
                                  <Rate
                                    onChange={(e) =>
                                      handleRatingChange(e, item?.id)
                                    }
                                    value={item?.rating}
                                    className="  ant-rate-star-primary"
                                  />
                                </div>
                              </>
                            ) : (
                              <IoMdCloseCircleOutline className="float-end mr-9 text-4xl text-red-600" />
                            )}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-900 mr-2 ">
                              {"Requester's"} Full Name :
                            </span>
                            {item?.requester?.name}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-900 mr-2 ">
                              College Name :
                            </span>
                            {item?.collegeName}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-900">
                              Wishes to work on :
                            </span>
                            {item?.wishesToWorkOn}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-900">
                              Contact me here {" : "}
                            </span>
                            {item?.requester?.email}
                          </p>
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p className="text-center text-gray-500 font-semibold text-md">
                NO REQUESTS
              </p>
            )}
            {loading && <LoadingCard />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContributionRequests;
