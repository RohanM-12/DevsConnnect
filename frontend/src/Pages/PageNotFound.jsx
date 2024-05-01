import React from "react";

const PageNotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img
          src="/images/404.gif"
          loading="lazy"
          className=" w-1/2 h-1/2"
          alt="404"
        />
      </div>
    </>
  );
};

export default PageNotFound;
