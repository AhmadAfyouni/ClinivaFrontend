import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";

const useUpdateProfile = () => {
  //   const navigate = useNavigate();
  return useMutation({
    mutationKey: ["UpdateProfile"],
    mutationFn: (profile: object) => {
      return axiosInstance
        .put("/profile", profile)
        .then((res) => {
          //   navigate(`/Employee`);
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useUpdateProfile;
