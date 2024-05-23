import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";
import Spinner from "../Components/Spinner";
import { useAuth } from "../contexts/authContext";
import { Input } from "antd";
import { FaSearch } from "react-icons/fa";

const ExplorePosts = () => {
  const [posts, setPosts] = useState([]);
  const [ContributionRequestStatus, setContributionRequestStatus] = useState();
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
        <h1 className="text-center text-xl font-semibold font-sans text-black drop-shadow-2xl">
          <span className="">All Posts </span>
        </h1>
      </div>
      <div>
        <div className="border-t-2 my-5"></div>

        <div className="w-80 mx-10">
          <Input placeholder="Search Post" suffix={<FaSearch />} size="large" />
        </div>
        <div className="border-t-2 my-5"></div>
      </div>
      {posts?.length > 0 ? (
        <div className=" grid xl:grid-cols-4 md:grid-cols-3  sm:grid-cols-1 sm:items-center mt-10 p-3 ">
          {posts?.map((item) => (
            <PostCard key={item?.id} post={item} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spinner Size={60} />
        </div>
      )}
    </>
  );
};

export default ExplorePosts;
