import { FcIdea } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BsPostcardHeartFill } from "react-icons/bs";
import { useAuth } from "../contexts/authContext";

const HomePage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  return (
    <div className="">
      <h1>{JSON.stringify(auth)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-20">
        <div className=" p-6 rounded-xl shadow-md shadow-gray-400 md:col-span-1">
          <span className=" text-5xl   font-semibold  text-black-600 ">
            <p className="my-5 mx-1 font-mono"> WELOCOME TO</p>
            <span className="lg:text-6xl md:text-5xl sm:text-xl  text-blue-600 drop-shadow-xl font-mono   ">
              DEVSCONNECT
            </span>
          </span>
          <br />
          <p className="my-3">
            <span className="text-black font-mono text-3xl font-bold">
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
              className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2 my-5 "
            >
              <span className="flex items-center">
                <BsPostcardHeartFill size={30} className="mx-2" /> POST YOUR
                PROJECT
              </span>
            </button>
          </div>
        </div>
        <div>
          <img
            className="p-1 ml-10 w-2/3 rounded-xl"
            alt="Banner"
            src="/images/banner2.gif"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
