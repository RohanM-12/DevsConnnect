import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";

const RequestContribModal = ({ open, setOpen, postData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();
  const [auth] = useAuth();
  console.log(auth?.user?.id);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values && postData) {
        console.log("Form Data:", values, postData);
      }
      setConfirmLoading(true);
      try {
        const { data } = await axios.post(
          "/api/v1/posts/contributionRequests/createRequest",
          {
            requesterId: auth?.user?.id,
            postId: postData?.id,
            status: "requested",
            interestDescription: values?.why,
            wishesToWorkOn: values?.specificFeature,
          }
        );
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields();
          data?.status == 200
            ? toast.success(
                "Contribution Request created , Please check your profile to confirm about status 🔃"
              )
            : toast.error(data?.message);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.error("Validation Error:", err);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    form.resetFields(); // Reset form fields when modal is closed
  };

  return (
    <>
      <Modal
        title="📩 Request owner for contribution"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name={"specificFeature"}
            label="Any specific feature you'd like to work on ?"
          >
            <Input placeholder="Any specific feature you'd like to work on ?" />
          </Form.Item>
          <Form.Item
            name={"why"}
            label="why are you interested in this project ?"
            rules={[
              {
                required: true,
                message:
                  "Show your interest towards contributing, it'll increase chances of getting approved",
              },
            ]}
          >
            <TextArea
              placeholder="why are you interested in this project ?"
              rows={5}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RequestContribModal;