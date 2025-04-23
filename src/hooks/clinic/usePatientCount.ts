import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ResponseDetailsType from "../../types/ResponseDetails";
const usePatientCount = (id: string) => {
  return useQuery({
    queryKey: ["PatientCount", id],
    queryFn: () => {
      const url = `/clinics/` + id + `/patient-count`;
      return axiosInstance
        .get<ResponseDetailsType<{ patientCount: number }>>(url)
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
export default usePatientCount;
