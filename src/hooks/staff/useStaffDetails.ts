import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ResponseDetailsType from "../../types/ResponseDetails";
import StaffDetailsType from "../../types/staff/StaffDetailsType";
const useStaffDetails = (id: string) => {
  return useQuery({
    queryKey: ["staffDetails", id],
    queryFn: () => {
      const url = `/employees/` + id;
      return axiosInstance
        .get<ResponseDetailsType<StaffDetailsType>>(url)
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
    staleTime: 0,
    refetchOnWindowFocus: true,
    enabled: true,
  });
};
export default useStaffDetails;
