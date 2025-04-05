import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import { LoginType } from "../../types/LoginType";

const useLogin = () => {
  const navigate = useNavigate();

  const login = async (data: LoginType) => {
    const res = await axiosInstance.post("/auth/login", data);
    localStorage.setItem("token", res.data.data.accessToken);
    localStorage.setItem("refreshToken", res.data.data.refreshToken);
    setTimeout(() => {
      navigate(`/dashboard`);
    }, 1000);
    return res.data;
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};

export default useLogin;
