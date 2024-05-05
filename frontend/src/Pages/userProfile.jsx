import React, { useEffect, useState } from "react";
import AdminMenu from "../Components/AdminMenu";
import { Button, Form, Input } from "antd";
import { GrUpdate } from "react-icons/gr";
import { useAuth } from "../contexts/authContext";
const UserProfile = () => {
  const [auth, setAuth] = useAuth();
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
  return (
    <>
      <div>
        <AdminMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className="mt-5 p-5">
        <div className="grid grid-cols-2">
          <div className="col-span-1 p-10">
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
          <div className="col-span-1 p-10"></div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
