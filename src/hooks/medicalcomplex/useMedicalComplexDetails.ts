import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import { MedicalComplexDetailsType } from "../../types/medicalComplex/MedicalComplexDetailsType";
import ResponseDetailsType from "../../types/ResponseDetails";
const useMedicalComplexDetails = (id: string) => {
  return useQuery({
    queryKey: ["medicalComplexDetails"],
    queryFn: () => {
      const url = `/cliniccollections/` + id;
      return axiosInstance
        .get<ResponseDetailsType<MedicalComplexDetailsType>>(url)
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
export default useMedicalComplexDetails;
