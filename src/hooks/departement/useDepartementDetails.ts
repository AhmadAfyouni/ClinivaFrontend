import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import DepartmentDetailsType from "../../types/department/DepartmentDetailsType";
import ResponseDetailsType from "../../types/ResponseDetails";
const useDepartmentDetails = (id: string) => {
  return useQuery({
    queryKey: ["departement", id],
    queryFn: () => {
      const url = `/departments/` + id;
      return axiosInstance
        .get<ResponseDetailsType<DepartmentDetailsType>>(url)
        .then((res) => {
          console.log(res.data);
          console.log(res.status);
          return res.data.data;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    },
  });
};
export default useDepartmentDetails;
