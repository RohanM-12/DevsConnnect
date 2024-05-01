import { Select, Tag } from "antd";
import React, { lazy } from "react";

// eslint-disable-next-line react/prop-types
const TechSelect = ({ techList, setTechList }) => {
  const options = [
    {
      value: "react",
      label: "React",
    },
    {
      value: "javascript",
      label: "JavaScript",
    },
    {
      value: "html",
      label: "HTML",
    },
    {
      value: "css",
      label: "CSS",
    },
    {
      value: "mern",
      label: "MERN",
    },
    {
      value: "java",
      label: "Java",
    },
    {
      value: "angular",
      label: "Angular",
    },
    {
      value: "csharp",
      label: "C#",
    },
    {
      value: "sql",
      label: "SQL",
    },
    {
      value: "mongodb",
      label: "MongoDB",
    },
    {
      value: "python",
      label: "Python",
    },
  ];

  const tagRender = (props) => {
    // eslint-disable-next-line react/prop-types
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={"blue"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        className="p-1 m-1"
        onClose={onClose}
        style={{
          marginInlineEnd: 4,
        }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <>
      <Select
        mode="multiple"
        tagRender={tagRender}
        options={options}
        onChange={(value) => setTechList(value)}
      />
    </>
  );
};

export default TechSelect;
