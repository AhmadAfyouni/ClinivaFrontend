import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import GetEmployeeType from "../../types/Employee/GetEmployee";

const useEditEmployee = (id: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["EditEmployee"],
    mutationFn: (Employee: GetEmployeeType) => {
      return axiosInstance
        .put("/employees/" + id, Employee)
        .then((res) => {
          setTimeout(() => {
            navigate(`/Employee`);
          }, 1000);
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useEditEmployee;
