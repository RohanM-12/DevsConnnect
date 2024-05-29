import React, { useEffect, useState } from "react";
import AdminMenu from "../Components/AdminMenu";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import PostCard from "../Components/PostCard";
import Spinner from "../Components/Spinner";
import showDeleteConfirm from "../Components/confirmModal";
import toast from "react-hot-toast";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { BsPostcardHeartFill } from "react-icons/bs";
const MyUploads = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState({
    current: "myPosts",
  });
  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/v1/posts/getPosts", {
      params: { userId: auth?.user?.id },
    });
    setPosts(data?.data);
    setLoading(false);
  };
  const [auth, setAuth] = useAuth();
  const [posts, setPosts] = useState([]);
  const deletePost = async ({ id }) => {
    try {
      const status = await showDeleteConfirm();
      if (id && status) {
        const { data } = await axios.delete(`/api/v1/posts/deletePost/${id}`);
        fetchData();
        if (data?.status == 200) {
          toast.success("Post deleted");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <AdminMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className=" flex justify-center items-center text-lg font-semibold text-center mt-10 text-gray-500">
        <BsPostcardHeartFill size={26} className="mx-2 text-blue-400" />
        <span>MY UPLOADS </span>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  p-8 border-2 m-1 rounded-xl shadow-md ">
        {posts &&
          posts.length > 0 &&
          posts?.map((post) => (
            <PostCard
              post={post}
              key={post?.id}
              isMyProfile={post?.id}
              deletePost={deletePost}
              edit
            />
          ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-48">
          <Spinner Size={70} />
        </div>
      )}
      {posts?.length < 1 && (
        <>
          <div className="flex justify-center">
            <div className="p-10 border-2 rounded-md w-1/2 shadow-md">
              <span>
                <Empty description={""} />
              </span>
              <div className="text-center text-gray-500 text-lg font-semibold">
                YOU HAVE NOT UPLOADED ANYTHING YET
              </div>
              <div className="flex justify-center p-5">
                <Button
                  onClick={() => navigate("/createPost")}
                  className="text-blue-500 border-blue-500 hover:bg-blue-600"
                >
                  Upload Now
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyUploads;
