import { Button, Form, Input, Select, Tag, Upload } from "antd";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaLaptopCode, FaImage, FaUpload } from "react-icons/fa";
import { PlusOutlined } from "@ant-design/icons";

const UploadPost = () => {
  const [techList, setTechList] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
      }
      const result = await axios.post("/api/v1/posts/createPost", {
        ...values,
        thumbnailImage,
        technologiesUsed: techList,
      });
      if (result?.data?.status == 200) {
        toast.success("Post uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = (file) => {
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
        <h1 className="text-center text-3xl text-blue-500 font-bold font-mono">
          UPLOAD POST
        </h1>
        <div className=" mt-4 w-screen border-t-2 border-gray-400"></div>

        <Form
          layout="vertical"
          size="large"
          onFinish={onFinish}
          enctype="multipart/form-data"
          // className="flex justify-center items-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white rounded-lg shadow-lg">
            <div>
              <div className="flex flex-col items-center mb-8">
                <Upload
                  beforeUpload={(file) => handleImageUpload(file)}
                  showUploadList={false}
                  maxCount={1}
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
                <Input />
              </Form.Item>
              <Form.Item
                label="Project Description"
                name="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="GitHub Repo. URL" name={"gitHubLink"}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Deployed URL (if available)"
                name={"deployedLink"}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Demo Video URL" name={"demoVideoLink"}>
                <Input />
              </Form.Item>
              <Form.Item name={"technologiesUsed"} label="Technologies Used">
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={(props) => (
                    <Tag
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
                    { label: "React", value: "React" },
                    { label: "Node.js", value: "Node.js" },
                    { label: "Express", value: "Express" },
                    { label: "MongoDB", value: "MongoDB" },
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "HTML", value: "HTML" },
                    { label: "CSS", value: "CSS" },
                    { label: "Python", value: "Python" },
                    { label: "Django", value: "Django" },
                    { label: "Flask", value: "Flask" },
                    { label: "Java", value: "Java" },
                    { label: "Spring Boot", value: "Spring Boot" },
                    { label: "C++", value: "C++" },
                    { label: "C#", value: "C#" },
                    { label: ".NET", value: ".NET" },
                    { label: "Ruby", value: "Ruby" },
                    { label: "Ruby on Rails", value: "Ruby on Rails" },
                    { label: "PHP", value: "PHP" },
                    { label: "Laravel", value: "Laravel" },
                    { label: "Swift", value: "Swift" },
                    { label: "Kotlin", value: "Kotlin" },
                    { label: "Flutter", value: "Flutter" },
                    { label: "React Native", value: "React Native" },
                    { label: "Angular", value: "Angular" },
                    { label: "Vue.js", value: "Vue.js" },
                  ]}
                  onChange={(value) => setTechList(value)}
                />
              </Form.Item>
              <Form.Item className="my-6">
                <Button
                  htmlType="submit"
                  className="bg-blue-600 text-white hover:bg-blue-400 flex items-center"
                  onClick={onFinish}
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
