import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import { LoginType } from "../../types/Login/LoginType";
import LoginResponse from "../../types/Login/LoginResponse";
import { usePermissionStore } from "../../store/usePermissionStore";

const useLogin = (saveToken?: boolean, loginToRegister?: boolean) => {
  const navigate = useNavigate();
  console.log("savetoken", saveToken);

  const login = async (data: LoginType): Promise<LoginResponse> => {
    console.log(data);

    const res = await axiosInstance.post<LoginResponse>("/auth/login", data);

    // localStorage.setItem("token", res.data.data.accessToken);d
    if (saveToken) {
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      localStorage.setItem("token", res.data.data.accessToken);
    }
    sessionStorage.setItem("token", res.data.data.accessToken);

    const userName = res.data.data.user.name;
    const roles = res.data.data.user.roles;

    if (userName) {
      localStorage.setItem("userName", userName);
    }
    if (roles) {
      localStorage.setItem("role", roles[0]);
    }
    const email = res.data.data.user.email;
    if (email) {
      const encodedEmail = btoa(email);
      localStorage.setItem("userEmail", encodedEmail);
    }
    const id = res.data.data.user._id;
    if (id) {
      localStorage.setItem("userId", id);
    }
    const plan = res.data.data.user.plan;
    if (plan) {
      localStorage.setItem("plan", plan);
    }

    if (loginToRegister) {
      localStorage.setItem("loginToRegister", "true");
    } else {
      localStorage.removeItem("loginToRegister");
      // navigate(`/dashboard`);
      navigate(`/users`);
    }

    const permissions = res.data.data.user.permissions;
    if (Array.isArray(permissions)) {
      localStorage.setItem("permissions", JSON.stringify(permissions));
      usePermissionStore.getState().setPermissions(permissions);
    }
    return res.data;
  };

  return useMutation<LoginResponse, Error, LoginType>({
    mutationKey: ["login"],
    mutationFn: login,
    onError: (error) => {
      const errorMessage = error.message;
      console.error("Login error:", errorMessage);
    },
  });
};

export default useLogin;
