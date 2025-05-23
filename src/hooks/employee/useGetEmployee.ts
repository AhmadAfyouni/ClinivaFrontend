import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import GetEmployeeType from "../../types/Employee/GetEmployee";
import ResponseDetailsType from "../../types/ResponseDetails";
const useGetEmployee = (id = "67e50dea191e5b9428a7474f") => {
  return useQuery({
    queryKey: ["employeesGet"],
    queryFn: () => {
      const url = `/employees/` + id;
      return axiosInstance
        .get<ResponseDetailsType<GetEmployeeType>>(url)
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
export default useGetEmployee;
