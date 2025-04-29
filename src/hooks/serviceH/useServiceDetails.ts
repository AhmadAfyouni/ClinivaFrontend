import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ServiceDetailsType from "../../types/serviceT/ServiceDetailsType";
import ResponseDetailsType from "../../types/ResponseDetails";

const useServiceDetails = (id: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => {
      const url = `/services/` + id;
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
