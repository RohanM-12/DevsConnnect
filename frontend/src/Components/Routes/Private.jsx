import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/user/userAuth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? (
    <Outlet />
  ) : (
    <>
      <div className="flex justify-center items-center h-screen">
        <Spinner Size={50} Timer={1} />
      </div>
    </>
  );
}
