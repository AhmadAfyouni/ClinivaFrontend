import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ResponseDetailsType from "../../types/Responsedetail";
import PatientDetailsType from "../../types/patient/PatientDetailsType";
const usePatientDetails = (id: string) => {
  return useQuery({
    queryKey: ["patient"],
    queryFn: () => {
      const url = `/patients/` + id;
      return axiosInstance
        .get<ResponseDetailsType<PatientDetailsType>>(url)
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
export default usePatientDetails;
