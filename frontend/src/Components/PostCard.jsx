import React, { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { FaCodePullRequest } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { Avatar, Card, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
const { Meta } = Card;
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState();
  const [auth] = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    setLiked(post?.likes?.includes(auth?.user?.id?.toString()));
  }, [post.likes, auth.user.id]);

  const handleLike = async (id, status) => {
    if (status == 1) {
      const res = await axios.put("/api/v1/posts/addlike", {
        userID: auth?.user?.id,
        id,
      });
      setLiked(true);
    } else {
      await axios.put("/api/v1/posts/removeLike", {
        userID: auth?.user?.id,
        id,
      });
      setLiked(false);
    }
  };

  return (
    <div key={post?.id} className="mb-5">
      <Card
        style={{ width: 300 }}
        className="shadow-md hover:drop-shadow-xl"
        cover={
          <>
            <img
              alt="example"
              className="hover:cursor-pointer"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              onClick={() => navigate(`/detailsPost/${post?.id}`)}
            />
          </>
        }
        actions={[
          <>
            <span className="flex justify-center items-center mt-1 text-red-500   ">
              {liked ? (
                <FaHeart
                  key={"liked"}
                  onClick={() => handleLike(post?.id, 0)}
                  className="text-red-600   "
                  size={17}
                />
              ) : (
                <FaRegHeart
                  key={"unliked"}
                  onClick={() => handleLike(post?.id, 1)}
                  className="text-red-600"
                  size={17}
                />
              )}
            </span>
          </>,
          <>
            <span className="flex justify-center items-center mt-2 text-blue-500 ">
              <FaCodePullRequest key={"request"} size={14} />
            </span>
          </>,
          <>
            <span className="flex justify-center items-center mt-1 text-gray-600">
              <BiDetail
                onClick={() => navigate(`/detailsPost/${post?.id}`)}
                key="ellipsis"
                size={19}
              />
            </span>
          </>,
        ]}
      >
        <Meta
          avatar={
            <Avatar
              className="font-bold"
              style={{
                backgroundColor: "#B9D9EB",
                color: "#0070FF",
              }}
            >
              {post?.user?.toString().slice(0, 1)}
            </Avatar>
          }
          title={
            <>
              <span
                className="hover:cursor-pointer hover:text-blue-300"
                onClick={() => navigate(`/detailsPost/${post?.id}`)}
              >
                {post?.name?.length > 20
                  ? post?.name?.substring(0, 20) + "..."
                  : post?.name}
              </span>
            </>
          }
          description={post?.technologiesUsed
            ?.split(",")
            .slice(0, 3)
            .map((item, i) => (
              <Tag key={i} color={"red"} className="p-1 m-1">
                {item.toUpperCase()}
              </Tag>
            ))}
        />
      </Card>
    </div>
  );
};

export default PostCard;
