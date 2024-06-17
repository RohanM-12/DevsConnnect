import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  useEffect(() => {
    const tempAuth = JSON.parse(localStorage.getItem("auth"));
    if (tempAuth) {
      setAuth({
        user: tempAuth?.user,
        token: tempAuth?.token,
      });
    }
  }, []);
  axios.defaults.headers.common["Authorization"] = auth?.token;
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
