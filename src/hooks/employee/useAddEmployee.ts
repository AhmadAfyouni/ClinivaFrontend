import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";

const useAddEmployee = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["AddEmployee"],
    mutationFn: (Employee: object) => {
      return axiosInstance
        .post("/employees", Employee)
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
export default useAddEmployee;
