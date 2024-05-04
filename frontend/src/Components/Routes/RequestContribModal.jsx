import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const RequestContribModal = ({ open, setOpen }) => {
  //   const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
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
        <Form layout="vertical">
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
          {/* <Form.Item name={""} label="">
            <Input />
          </Form.Item>
          <Form.Item name={""} label="">
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
export default RequestContribModal;
