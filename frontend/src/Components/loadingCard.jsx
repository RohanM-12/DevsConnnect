import { Avatar, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

const LoadingCard = () => {
  return (
    <>
      <span className="flex justify-center">
        {/* <Spinner Size={50} /> */}
        <Skeleton loading={true} avatar active>
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
            }
            title="Card title"
            description="This is the description"
          />
        </Skeleton>
      </span>
    </>
  );
};

export default LoadingCard;
