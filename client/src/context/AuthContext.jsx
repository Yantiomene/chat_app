import { createContext, useState, useCallback, useEffect } from "react";
import { postRequest, baseUrl } from "../utils/services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  console.log("User: ", user);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));

    if (user) {
      setUser(user);
    }
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(
          `${baseUrl}/users/register`,
          JSON.stringify(registerInfo)
        );

        setIsRegisterLoading(false);

        if (response.error) {
          return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      } catch (error) {
        setRegisterError(error.message);
        setIsRegisterLoading(false);
      }
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(
          `${baseUrl}/users/login`,
          JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false);

        if (response.error) {
          return setLoginError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      } catch (error) {
        setLoginError(error.message);
        setIsLoginLoading(false);
      }
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        updateLoginInfo,
        loginUser,
        loginError,
        loginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
