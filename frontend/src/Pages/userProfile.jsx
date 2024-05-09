import React, { useEffect, useState } from "react";
import AdminMenu from "../Components/AdminMenu";
import { Alert, Button, Form, Input } from "antd";
import { GrUpdate } from "react-icons/gr";
import { useAuth } from "../contexts/authContext";
import { Avatar, List } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LoadingCard from "../Components/loadingCard";
const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [requests, setRequests] = useState([]);
  const [initValues, setInitValues] = useState({});
  const [selectedTab, setSelectedTab] = useState({
    current: "myProfile",
  });

  useEffect(() => {
    setInitValues({
      name: auth?.user?.name,
      email: auth?.user?.email,
      collageName: auth?.user?.collegeName,
    });
  }, [auth]);
  const onFinish = (values) => {
    console.log(values);
    try {
      if (values?.userName || values?.email || values?.collageName) {
        console.log("Hello");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/posts/contributionRequests/getMyRequests",
        { params: { userId: auth?.user?.id } }
      );

      setRequests(data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [auth?.user]);

  return (
    <>
      <div>
        <AdminMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className="mt-5 p-5">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
          <div className="col-span-1 p-5 shadow-lg ">
            <div className="p-5 shadow-lg border-gray-200 border-2  rounded-lg">
              <Form
                layout="vertical"
                className="font-semibold"
                size="large"
                onFinish={onFinish}
                initialValues={initValues}
              >
                <Form.Item name={"userName"} label="Your Name :">
                  <Input placeholder="Enter name " />
                </Form.Item>
                <Form.Item
                  name={"email"}
                  key={"email"}
                  label="Email :"
                  rules={[{ type: "email", message: "Enter valid Email" }]}
                >
                  <Input placeholder=" Email to update" />
                </Form.Item>
                <Form.Item name={"collageName"} label="Collage Name :">
                  <Input placeholder="Enter Collage Name" />
                </Form.Item>
                {/* <Form.Item name={""} label="">
                <Input />
              </Form.Item> */}
                <Form.Item className="p-5 flex justify-center ">
                  <Button
                    htmlType="submit"
                    className=" p-5 flex items-center font-bold"
                    type="primary"
                    onClick={(e) => onFinish(e.target.values)}
                  >
                    <GrUpdate size={20} className="mx-2 " /> Update Data
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="col-span-1 p-5 shadow-lg">
            <div className="p-5 drop-shadow-xl shadow-lg border-gray-200 border-2  rounded-lg">
              {requests?.length > 0 ? (
                <>
                  <List
                    itemLayout="horizontal"
                    dataSource={requests}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              className="mx-1 font-bold"
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                                padding: "20px",
                                fontSize: "20px",
                              }}
                            >
                              {item?.post?.user?.substring(0, 1)?.toUpperCase()}
                            </Avatar>
                          }
                          title={
                            <>
                              <Link to={`/detailsPost/${item?.post?.id}`}>
                                {item?.post?.name}
                              </Link>{" "}
                              <span className="float-end">
                                {item?.created_at
                                  ? dayjs(item?.created_at)?.format(
                                      "DD-MM-YYYY"
                                    )
                                  : "N/A"}
                              </span>
                            </>
                          }
                          description={
                            <>
                              <p>
                                <span>{item?.post?.description}</span>
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {" "}
                                  Uploaded by:{" "}
                                </span>
                                {item?.post?.user}
                                <span className="float-end">
                                  <Button
                                    className={`text-white font-bold w-32 hover:bg-slate-600 bg-${
                                      item?.status == "Accepted"
                                        ? "green"
                                        : "red"
                                    }-400 `}
                                  >
                                    {item?.status}
                                  </Button>
                                </span>
                              </p>

                              <p className="float-start mt-2">
                                {item?.status == "Rejected" && (
                                  <Alert
                                    message="Rejection is not a reflection of your worth; it's merely a redirection to something better suited for you."
                                    type="info"
                                    showIcon
                                  />
                                )}
                              </p>
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </>
              ) : (
                <LoadingCard />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
