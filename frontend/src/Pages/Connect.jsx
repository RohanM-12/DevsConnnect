import { Input } from "antd";
import { FaSearch } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
const Connect = () => {
  return (
    <>
      <div>
        <div className="flex justify-center items-center font-mono text-lg font-semibold p-5">
          <span>
            <FaPeopleGroup className="mx-2" size={26} />
          </span>
          <span>
            GROUP CHAT FOR PROJECTS WITH MEMEBERS OF CHAT WHOSE REQUESTS ARE
            ACCEPTED FOR THIS PROJECT - THEY CAN COMMUNICATE AND DISCUSS
          </span>
        </div>
        <div className="p-10 border-2 mx-5 rounded-lg shadow-md ">
          {/* <div className="flex justify-start">
            <div className="w-96 mx-10">
              <Input
                placeholder="Find people using name/email/contact"
                suffix={<FaSearch />}
                size="large"
              />
            </div>
          </div> */}
          <div className="grid grid-cols-3 m-10">
            <div className="rounded-lg border-2 mx-2 col-span-1">
              <div className=" p-2 mx-3 font-bold text-gray-600">Chat list</div>
            </div>
            <div className="p-10 text-center  rounded-lg border-2 mx-2 col-span-2 ">
              Chatbox
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connect;
