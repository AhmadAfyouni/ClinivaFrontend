import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";

const useAddUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["AddUser"],
    mutationFn: (User: object) => {
      return axiosInstance
        .post("/users", User)
        .then((res) => {
          setTimeout(() => {
            navigate(`/dashboard`);
          }, 1000);
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddUser;
