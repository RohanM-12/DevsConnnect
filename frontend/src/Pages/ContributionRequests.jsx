import React, { useEffect, useState } from "react";
import AdminMenu from "../Components/AdminMenu";
import { Avatar, List, Radio, Skeleton } from "antd";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import LoadingCard from "../Components/loadingCard";
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
      console.log(data?.data);
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
        toast.success("Status updated...");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <AdminMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className="text-center pb-5 p-10 text-2xl font-semibold ">
        Contribution Requests on your posts
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
                          <div className="flext justify-center text-center mt-2 mr-5 ">
                            <span className="text-blue-500 font-bold ">
                              {item?.requester?.name?.substring(0, 10)}
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
                            <span className="font-semibold text-gray-600 ">
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
                              <CheckCircleTwoTone
                                className="float-end px-10 text-3xl"
                                twoToneColor="#52c41a"
                              />
                            ) : (
                              <IoMdCloseCircleOutline className="float-end mr-9 text-4xl text-red-600" />
                            )}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-600 mr-2 ">
                              College Name :
                            </span>
                            {item?.collegeName}
                          </p>
                          <p>
                            <span className="font-semibold text-gray-600">
                              Wishes to work on :{" "}
                            </span>
                            {item?.wishesToWorkOn}
                          </p>
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <p className="text-center text-gray-500 font-semibold text-lg">
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
