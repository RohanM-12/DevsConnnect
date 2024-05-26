import { FcIdea } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BsPostcardHeartFill } from "react-icons/bs";
import { useAuth } from "../contexts/authContext";
import { FaFileUpload } from "react-icons/fa";
import { PiBrowsersFill } from "react-icons/pi";
import { FaLaptopCode } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { RiTeamFill } from "react-icons/ri";
const HomePage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  return (
    <div className="">
      {/* <h1>{JSON.stringify(auth)}</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 items-center">
        <div className=" p-6 rounded-xl shadow-md shadow-gray-400 md:col-span-1">
          <span className="  font-semibold  text-black-600 ">
            <div>
              <span className=" text-3xl my-5 mx-1 font-mono lg:text-4xl md:text-3xl sm:text-2xl ">
                WELOCOME TO
              </span>
            </div>

            <span className=" text-3xl lg:text-5xl  md:text-3xl text-blue-600 drop-shadow-xl font-mono ">
              DevsCONNECT
            </span>
          </span>
          <br />
          <p className="my-3">
            <span className="text-black font-mono text-xl font-bold">
              A platform to Showcase <br />
              <div className="flex">
                your projects ... <FcIdea size={30} />
              </div>
            </span>{" "}
          </p>
          <div className="mt-5 ">
            <button
              type="button"
              onClick={() => navigate("/createPost")}
              className=" text-white hover:drop-shadow-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2 my-5 "
            >
              <span className="flex items-center">
                <BsPostcardHeartFill size={30} className="mx-2" /> | POST YOUR
                PROJECT
              </span>
            </button>
            <button
              onClick={() => navigate("/explorePosts")}
              type="button"
              className="text-white hover:drop-shadow-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-auto"
            >
              <span className="flex items-center p-0.5 w-auto">
                <PiBrowsersFill size={30} className="mx-2" /> | EXPLORE PROJECTS
              </span>
            </button>
          </div>
        </div>
        <div>
          <img
            className="p-1 ml-20 w-2/3 rounded-xl pointer-events-none "
            alt="Banner"
            src="/images/banner2.gif"
            draggable="false"
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full h-44 bg-blue-100 my-5 lg:grid md:grid grid-cols-5 items-center text-center hidden ">
        <div className="bg-blue-400 rounded-full p-6 w-1/2 mx-20 font-semibold font-mono text-white drop-shadow-2xl">
          <span className="flex justify-center items-center">
            <FaFileUpload size={30} className="my-2" />
          </span>
          <span className="hidden text-sm lg:block ">UPLOAD YOUR PROJECT </span>
        </div>
        <div className="bg-blue-400 rounded-full p-6 w-1/2 mx-20 font-semibold font-mono text-white drop-shadow-2xl">
          <span className="flex justify-center items-center">
            <RiTeamFill size={30} className="my-2 " />
          </span>
          <span className="lg:block md:hidden sm:hidden text-sm  ">
            REQUEST CONTRIBUTION{" "}
          </span>
        </div>
        <span className="text-center font-extrabold drop-shadow-2xl text-lg text-blue-500 ">
          WHAT IS DEVSCONNECT?
        </span>
        <div className="bg-blue-400 rounded-full p-6 w-1/2 mx-20 font-semibold font-mono text-white drop-shadow-2xl">
          <span className="flex justify-center items-center">
            <FaLaptopCode size={30} className="my-2 " />
          </span>
          <span className=" lg:block md:hidden sm:hidden text-sm">
            COLLABORATE WITH DEVS{" "}
          </span>
        </div>
        <div className="bg-blue-400 rounded-full p-6 w-1/2 mx-20 font-semibold font-mono text-white drop-shadow-2xl">
          <span className="flex justify-center items-center">
            <FaSquareGithub size={30} className="my-2 " />
          </span>
          <span className=" lg:block md:hidden sm:hidden text-sm">
            BUILD TOGETHER
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
