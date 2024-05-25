import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Image, Tag } from "antd";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { FaGithub, FaHeart } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { VscLiveShare } from "react-icons/vsc";
import { FaCodePullRequest } from "react-icons/fa6";
import RequestContribModal from "../Components/RequestContribModal";
const DetailPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
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
    <div className="container  mt-8 shadow-md ">
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
                {" : "}
                <span className="mx-2">{postData?.likes?.length}</span>
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
              {/* <div className="  grid grid-cols-4">
              <div></div>
              <button
                disabled={postData?.contributionRequests?.length}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-56 "
                type="button"
                onClick={() => setOpen(true)}
              >
                <span className="flex justify-center items-center ">
                  <FaCodePullRequest className="mx-2" />
                  {postData?.contributionRequests[0]?.status ||
                  ContributionRequestStatus
                    ? postData?.contributionRequests[0]?.status
                    : "Request to contribute"}
                </span>
              </button>
              <div></div>
            </div> */}
            </div>
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
