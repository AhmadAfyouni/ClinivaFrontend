import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddEmployeeType from "../../types/Employee/AddEmployeeType";

const useAddEmployee = () => {
  return useMutation({
    mutationKey: ["AddEmployee"],
    mutationFn: (Employee: AddEmployeeType) => {
      const formData = new FormData();
      Object.keys(Employee).forEach((key) => {
        formData.append(key, (Employee as any)[key]);
      });

      return axiosInstance
        .post("/employees", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // navigate(`/Employee`);

          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddEmployee;
