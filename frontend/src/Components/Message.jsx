import React from "react";

const Message = () => {
  return (
    <div className="flex drop-shadow-lg">
      {/* <div className="h-0.5 mt-3 bg-blue-200 w-20 mx-1 "></div> */}
      <div className="border-2 p-5 rounded-3xl w-1/2 bg-yellow-50">
        <div className="text-black font-semibold">SenderName</div>
        <div className="p-3">
          Message Content - Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Hic minus exercitationem animi qui explicabo quia, enim quae
        </div>
      </div>
    </div>
  );
};

export default Message;
