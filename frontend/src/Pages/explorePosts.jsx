import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import Spinner from "../Components/Spinner";
import { useAuth } from "../contexts/authContext";

const ExplorePosts = () => {
  const [posts, setPosts] = useState([]);
  const [auth] = useAuth();
  async function fetchData() {
    try {
      const { data } = await axios.get("/api/v1/posts/getPosts", {
        params: { currentUserId: auth?.user?.id },
      });

      if (data?.status === 200) {
        setPosts(data?.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold font-sans text-black drop-shadow-2xl">
          <span className="">All Posts </span>
        </h1>
      </div>
      {posts?.length > 0 ? (
        <div className=" grid xl:grid-cols-4 md:grid-cols-3  sm:grid-cols-1 sm:items-center mt-10 p-3 ">
          {posts?.map((item) => (
            <PostCard key={item.id} post={item} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner Size={50} />
        </div>
      )}
    </>
  );
};

export default ExplorePosts;
