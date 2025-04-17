import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ClinicDetailsType from "../../types/clinic/ClinicDetailsType";
import ResponseDetailsType from "../../types/Responsedetail";
const useClinicDetails = (id: string) => {
  return useQuery({
    queryKey: ["clinicDetails"],
    queryFn: () => {
      const url = `/clinics/` + id;
      return axiosInstance
        .get<ResponseDetailsType<ClinicDetailsType>>(url)
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
export default useClinicDetails;
