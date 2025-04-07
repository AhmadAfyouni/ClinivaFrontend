import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import AddEmployeeType from "../../types/Employee/AddEmployeeType";

const useAddEmployee = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["AddEmployee"],
    mutationFn: (Employee: AddEmployeeType) => {
      return axiosInstance
        .post("/employees", Employee)
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
export default useAddEmployee;
