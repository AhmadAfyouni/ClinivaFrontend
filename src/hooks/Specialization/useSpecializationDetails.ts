import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ResponseDetailsType from "../../types/Responsedetail";
import SpecializationDetailsType from "../../types/Specialization/SpecializationDetailsType";
const useSpecializationDetails = (id: string) => {
  return useQuery({
    queryKey: ["specializationsDetails"],
    queryFn: () => {
      const url = `/specializations/` + id;
      return axiosInstance
        .get<ResponseDetailsType<SpecializationDetailsType>>(url)
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
export default useSpecializationDetails;
