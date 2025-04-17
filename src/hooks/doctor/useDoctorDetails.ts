import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import DoctorDetailsType from "../../types/doctor/DoctorDetailsType";
import ResponseDetailsType from "../../types/Responsedetail";
const useDoctorDetails = (id: string) => {
  return useQuery({
    queryKey: ["doctorDetails"],
    queryFn: () => {
      const url = `/employees/` + id;
      return axiosInstance
        .get<ResponseDetailsType<DoctorDetailsType>>(url)
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
export default useDoctorDetails;
