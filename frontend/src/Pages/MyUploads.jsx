import React, { useEffect, useState } from "react";
import AdminMenu from "../Components/AdminMenu";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import PostCard from "../Components/PostCard";
import Spinner from "../Components/Spinner";
import showDeleteConfirm from "../Components/confirmModal";
import toast from "react-hot-toast";
const MyUploads = () => {
  const [loading, setLoading] = useState(false);
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
      {/* <div className="text-2xl font-bold text-center mt-10 text-blue-600">
        My Uploads
      </div> */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-10 p-8  ">
        {posts &&
          posts.length > 0 &&
          posts?.map((post) => (
            <PostCard
              post={post}
              key={post?.id}
              del={post?.id}
              deletePost={deletePost}
            />
          ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-48">
          <Spinner Size={70} />
        </div>
      )}
    </>
  );
};

export default MyUploads;
