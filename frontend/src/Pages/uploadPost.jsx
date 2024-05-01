import { Button, Form, Input, Select, Tag } from "antd";
import IMGUpload from "../Components/IMGupload";
import TextArea from "antd/es/input/TextArea";
import TechSelect from "../Components/TechSelect";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UploadPost = () => {
  const [techList, setTechList] = useState([]);
  const [thumbImg, setThumbImg] = useState(null);

  const onFinish = async (values) => {
    try {
      const result = await axios.post("/api/v1/posts/createPost", {
        ...values,
        thumbIMG: thumbImg,
        technologiesUsed: techList,
      });
      if (result?.data?.status == 200) {
        toast.success("Post uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-6">
        <h1 className="text-center text-3xl text-blue-500 font-bold">
          UPLOAD POST
        </h1>
        <div className=" mt-4 w-screen border-t-2 border-gray-400"></div>

        <Form layout="vertical" size="large" onFinish={onFinish}>
          <div className=" grid grid-cols-2 ">
            <div className="p-16 pt-2">
              <Form.Item
                name={"thumbIMG"}
                label={" Thumbnail Image :"}
                // rules={[
                //   {
                //     required: true,
                //     message: "PLease select thumbnail image for project",
                //   },
                // ]}
              >
                <IMGUpload setThumbImg={setThumbImg} />
              </Form.Item>
              <Form.Item
                label="Enter Project Title :"
                name={"Title"}
                className="w-80"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Enter Project Description : "
                name="Description"
                className="w-80"
                rules={[{ required: true }]}
              >
                <TextArea rows={5} cols={5} />
              </Form.Item>
            </div>
            <div className="p-16  pt-2">
              <Form.Item
                className="w-80"
                label="Paste GitHub Repo. URL :"
                name={"gitHubLink"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="w-80"
                label="Paste public URL  (if deployed) :"
                name={"deployedLink"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="w-80"
                label="Paste Demo video URL  :"
                name={"demoVideoLink"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"technologiesUsed"}
                className="w-80"
                label="Select Technologies used : "
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select Technologies used",
                //   },
                // ]}
              >
                <TechSelect techList={{ techList }} setTechList={setTechList} />
              </Form.Item>
              <Form.Item className="my-6">
                <Button
                  htmlType="submit"
                  className="bg-blue-600 text-white hover:bg-blue-400"
                  onSubmit={onFinish}
                >
                  Post Project
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UploadPost;
