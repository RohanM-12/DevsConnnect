import { Button, Form, Input, Select, Tag, Upload } from "antd";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaLaptopCode, FaImage, FaUpload } from "react-icons/fa";
import { PlusOutlined } from "@ant-design/icons";
import urlRegex from "url-regex";
import { DiGithubBadge } from "react-icons/di";
import { useAuth } from "../contexts/authContext";
const UploadPost = () => {
  const [techList, setTechList] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [auth] = useAuth();
  const onFinish = async (values) => {
    try {
      if (techList.length === 0) {
        toast("Select at least one technology", {
          icon: <FaLaptopCode size={25} className="text-blue-500" />,
        });
        return;
      }
      if (thumbnailImage == null) {
        toast("Please select thumbnail image", {
          icon: <FaImage size={25} className="text-blue-500" />,
        });
        return;
      }
      if (!urlRegex().test(values.gitHubLink)) {
        console.log(values);
        toast("PLease enter a valid URL", {
          icon: <DiGithubBadge size={25} className="text-blue-500" />,
        });
        return;
      }
      const formData = new FormData();
      formData.append("Title", values.Title);
      formData.append("Description", values.Description);
      formData.append("gitHubLink", values.gitHubLink);
      formData.append("deployedLink", values.deployedLink || "");
      formData.append("demoVideoLink", values.demoVideoLink || "");
      formData.append("technologiesUsed", techList);
      formData.append("userId", auth?.user?.id);
      formData.append("thumbnailImage", thumbnailImage);

      const result = await axios.post("/api/v1/posts/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result?.data?.status === 200) {
        toast.success("Post uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (file) => {
    console.log(file);
    setThumbnailImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const tagColors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  return (
    <>
      <div className="mt-6">
        <h1 className="text-center text-xl text-gray-900 font-bold font-mono">
          UPLOAD POST
        </h1>
        <div className=" mt-4 w-screen border-t-2 border-gray-400"></div>

        <Form
          layout="vertical"
          size="large"
          enctype="multipart/form-data"
          className="p-10"
          onFinish={onFinish}
          // className="flex justify-center items-center "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-lg">
            <div>
              <div className="flex flex-col items-center mb-8">
                <Upload
                  beforeUpload={(file) => handleImageUpload(file)}
                  showUploadList={false}
                  maxCount={1}
                  className="drop-shadow-lg border-gray-100 "
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Thumbnail"
                      className="w-64 h-64 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center rounded-lg bg-gray-100 mb-4">
                      <PlusOutlined className="text-3xl text-gray-400" />
                    </div>
                  )}
                </Upload>
                <p className="text-gray-500">Thumbnail Image</p>
              </div>
              <Form.Item
                label="Project Title"
                name={"Title"}
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter title of your project" />
              </Form.Item>
              <Form.Item name={"technologiesUsed"} label="Technologies Used">
                <Select
                  placeholder="Select the technologies used in your project"
                  mode="multiple"
                  showArrow
                  tagRender={(props) => (
                    <Tag
                      className="p-1 text-md m-2"
                      color={tagColors[props.value.length % tagColors.length]}
                      closable={true}
                      onClose={() => {
                        setTechList(
                          techList.filter((tech) => tech !== props.value)
                        );
                      }}
                      style={{
                        marginRight: 3,
                      }}
                    >
                      {props.label}
                    </Tag>
                  )}
                  optionLabelProp="label"
                  options={[
                    { label: "REACT", value: "React" },
                    { label: "NODE.JS", value: "NODE.JS" },
                    { label: "EXPRESS", value: "EXPRESS" },
                    { label: "MONGODB", value: "MONGODB" },
                    { label: "JAVASCRIPT", value: "JAVASCRIPT" },
                    { label: "HTML", value: "HTML" },
                    { label: "CSS", value: "CSS" },
                    { label: "PYTHON", value: "PYTHON" },
                    { label: "DJANGO", value: "DJANGO" },
                    { label: "FLASK", value: "FLASK" },
                    { label: "JAVA", value: "JAVA" },
                    { label: "SPRING BOOT", value: "SPRING BOOT" },
                    { label: "C++", value: "C++" },
                    { label: "C#", value: "C#" },
                    { label: ".NET", value: ".NET" },
                    { label: "RUBY", value: "RUBY" },
                    { label: "RUBY ON RAILS", value: "RUBY ON RAILS" },
                    { label: "PHP", value: "PHP" },
                    { label: "LARAVEL", value: "LARAVEL" },
                    { label: "SWIFT", value: "SWIFT" },
                    { label: "KOTLIN", value: "KOTLIN" },
                    { label: "FLUTTER", value: "FLUTTER" },
                    { label: "REACT NATIVE", value: "REACT NATIVE" },
                    { label: "ANGULAR", value: "ANGULAR" },
                    { label: "VUE.JS", value: "VUE.JS" },
                  ]}
                  onChange={(value) => setTechList(value)}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Project Description"
                name="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  placeholder="Describe in short what your project is about..."
                  rows={5}
                />
              </Form.Item>

              <Form.Item
                label="Deployed URL (if available)"
                name={"deployedLink"}
              >
                <Input placeholder="Paste URL of your project deployed " />
              </Form.Item>
              <Form.Item label="Demo Video URL" name={"demoVideoLink"}>
                <Input placeholder="Do you have Demo Video?" />
              </Form.Item>
              <Form.Item label="GitHub Repository URL" name={"gitHubLink"}>
                <Input placeholder="Paste your GitHub repository URL" />
              </Form.Item>
              <Form.Item className="my-6 flex justify-center py-4 ">
                <Button
                  htmlType="submit"
                  className="bg-blue-600 text-white hover:bg-blue-400  "
                  icon={<FaUpload className="mr-2" />}
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
