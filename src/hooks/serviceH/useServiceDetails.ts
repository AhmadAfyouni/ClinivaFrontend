import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ResponseDetailsType from "../../types/Responsedetail";
import ServiceDetailsType from "../../types/serviceT/ServiceDetailsType";
const useServiceDetails = (id: string) => {
  return useQuery({
    queryKey: ["service"],
    queryFn: () => {
      const url = `/departements/` + id;
      return axiosInstance
        .get<ResponseDetailsType<ServiceDetailsType>>(url)
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
export default useServiceDetails;
