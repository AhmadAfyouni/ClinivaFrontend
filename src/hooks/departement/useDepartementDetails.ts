import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ResponseDetailsType from "../../types/Responsedetail";
import DepartmentDetailsType from "../../types/department/DepartmentDetailsType";
const useDepartmentDetails = (id: string) => {
  return useQuery({
    queryKey: ["departement"],
    queryFn: () => {
      const url = `/departements/` + id;
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
