import React, { useEffect, useState } from "react";
import AdminMenu from "../Components/AdminMenu";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import PostCard from "../Components/PostCard";
import Spinner from "../Components/Spinner";

const MyUploads = () => {
  const [selectedTab, setSelectedTab] = useState({
    current: "myPosts",
  });
  const [auth, setAuth] = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/v1/posts/getPosts", {
        params: { userId: auth?.user?.id },
      });
      console.log(data.data);
      setPosts(data?.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <AdminMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className="text-3xl font-semibold text-center mt-10">My Uploads</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 md: sm:grid-cols-1 mt-10">
        {posts ? (
          posts?.map((post) => (
            <PostCard post={post} key={post?.id} del={post?.id} />
          ))
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Spinner Size={50} />
          </div>
        )}
      </div>
    </>
  );
};

export default MyUploads;
