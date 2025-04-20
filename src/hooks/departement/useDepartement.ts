import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddDepartmentType from "../../types/department/AddDepartment";

const useAddDepartment = () => {
  return useMutation({
    mutationKey: ["AddDepartment"],
    mutationFn: (Department: AddDepartmentType) => {
      return axiosInstance
        .post("/departments", Department)
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
export default useAddDepartment;
