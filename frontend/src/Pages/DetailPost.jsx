import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Image, List, Rate, Tag } from "antd";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { FaGithub, FaHeart } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { VscLiveShare } from "react-icons/vsc";
import RequestContribModal from "../Components/RequestContribModal";
import { FaCodeMerge } from "react-icons/fa6";
import dayjs from "dayjs";
const DetailPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  console.log(postData);
  const [ContributionRequestStatus, setContributionRequestStatus] = useState(1);
  const [open, setOpen] = useState(false);

  const tagColors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "gray",
    "cyan",
    "magenta",
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/api/v1/posts/getPost/${id}`, {
          //  params: { currentUserId: auth?.user?.id },
        });
        if (data?.status === 200) {
          setPostData(data?.data);
          setContributionRequestStatus(
            data.data[0].contributionRequests?.length
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="container  mt-8 ">
      {postData ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-center ">
              <Image
                width={600}
                src={`http://localhost:5000${
                  postData?.thumbnailImgURL?.split("/")?.length > 1
                    ? postData?.thumbnailImgURL
                    : "/uploads/default.gif"
                }`}
              />
            </div>
            <div className="p-2">
              <h2 className="text-2xl font-bold mb-4">
                <> {postData?.name}</>
              </h2>
              <p className="text-gray-600 mb-4">{postData?.description}</p>
              <div className="flex items-center mb-4">
                <span className="font-semibold mr-2">Uploaded By:</span>
                <span>{postData?.user}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold mr-2">College Name:</span>
                <span>{postData?.collegeName}</span>
              </div>
              <div className="flex  justify-start items-center">
                <FaHeart
                  key={"liked"}
                  className="text-red-600 mx-2 "
                  size={23}
                />

                <span className="mx-1">{postData?.likes?.length}</span>
              </div>

              <div className="flex items-center mb-4">
                <span className="font-semibold mr-2">Technologies Used:</span>
                <div>
                  {postData?.technologiesUsed?.map((item, i) => (
                    <Tag
                      key={i}
                      color={
                        tagColors[Math.floor(Math.random() * tagColors.length)]
                      }
                      className="m-1 p-2"
                    >
                      {item.toUpperCase().trim()}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className=" flex items-center justify-center p-10">
                <Link to={postData?.gitHubLink}>
                  <Tag
                    className="p-3 w-36 "
                    icon={<FaGithub size={20} />}
                    color="black"
                  >
                    GITHUB
                  </Tag>
                </Link>
                <Link to={postData?.demoVideoLink}>
                  <Tag
                    className="p-3 w-36"
                    icon={<MdOndemandVideo size={20} />}
                    color="#55acee"
                  >
                    DEMO VIDEO
                  </Tag>
                </Link>

                <Link to={postData?.deployedLink}>
                  <Tag
                    className="p-3 w-36"
                    icon={<VscLiveShare size={20} />}
                    color="indigo"
                  >
                    DEPLOYED URL
                  </Tag>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-10 border-2 m-10 rounded-lg shadow-lg">
            {/* <div className="p-10 border-2 mx-10 rounded-xl shadow-sm"> */}
            <div className=" drop-shadow-xl mb-5 text-lg font-semibold text-gray-700 flex justify-center items-center">
              <FaCodeMerge className="mx-4 text-green-300 " size={25} />
              <span>CONTRIBUTORS OF {postData?.name?.toUpperCase()} </span>
            </div>

            <div>
              <List
                itemLayout="vertical"
                dataSource={postData.contributionRequests}
                size="small"
                renderItem={(item, index) => (
                  <div className="flex justify-center">
                    <List.Item className="py-0  w-4/5">
                      <List.Item.Meta
                        avatar={
                          <>
                            <Avatar
                              className="drop-shadow-2xl"
                              style={{
                                backgroundColor: "#fde3cf",
                                color: "#f56a00",
                                padding: "20px",
                              }}
                            >
                              {item?.requester?.name
                                ?.slice(0, 1)
                                ?.toUpperCase()}
                            </Avatar>
                            <div className="flex justify-center">
                              <div className="border-r-2 mt-1 border-blue-300 p-5 px-0 "></div>
                            </div>
                          </>
                        }
                        title={
                          <>
                            <p>
                              <span>{item?.requester?.name} </span>
                              <span className="lg:float-right md:float-right sm:float-none sm:mx-2">
                                {dayjs(item?.created_at)?.format("DD-MM-YYYY")}
                              </span>
                            </p>
                            <div>
                              <span className=" flex items-center float-right p-3">
                                <span className="text-gray-400 mr-1">
                                  Rating :{" "}
                                </span>
                                <Rate disabled value={item?.rating} />
                              </span>
                            </div>
                          </>
                        }
                        description={
                          <>
                            <div>
                              <p>
                                {" "}
                                <span className="font-semibold">
                                  Worked On :{" "}
                                </span>
                                {item?.wishesToWorkOn}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  College name :{" "}
                                </span>
                                {item?.requester?.collegeName}
                              </p>
                            </div>
                          </>
                        }
                      />
                    </List.Item>
                  </div>
                )}
              />
            </div>

            {/* {postData?.contributionRequests?.map((item) => (
                <>
                  <div>
                    <Avatar
                      style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                    >
                      {item?.requester?.name?.slice(0, 1)?.toUpperCase()}
                    </Avatar>
                  </div>
                </>
              ))} */}
            {/* </div> */}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner Size={50} />
        </div>
      )}
      <div>
        <RequestContribModal
          open={open}
          setOpen={setOpen}
          postData={postData}
          setContributionRequestStatus={setContributionRequestStatus}
        />
      </div>
    </div>
  );
};

export default DetailPost;
