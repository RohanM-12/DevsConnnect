import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FaCodePullRequest } from "react-icons/fa6";
import { HeartTwoTone } from "@ant-design/icons";
import { Avatar, Card, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
const { Meta } = Card;
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div key={post.id} className="mb-5">
      <Card
        style={{ width: 300 }}
        className="shadow-md hover:drop-shadow-2xl"
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
            <span className="text-lg ">
              <HeartTwoTone key={"like"} twoToneColor="#eb2f96" />
            </span>
          </>,
          <>
            <span className="flex justify-center items-center mt-2 text-blue-500 ">
              <FaCodePullRequest key={"request"} size={14} />
            </span>
          </>,
          <>
            <span className="text-2xl">
              <EllipsisOutlined key="ellipsis" />
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
                {post?.name}
              </span>
            </>
          }
          description={post?.technologiesUsed?.split(",").map((item, i) => (
            <Tag key={i} color="orange" className="p-1 m-1">
              {item.toUpperCase()}
            </Tag>
          ))}
        />
      </Card>
    </div>
  );
};

export default PostCard;
