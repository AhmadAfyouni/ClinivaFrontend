import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddMedicalComplexType from "../../types/medicalComplex/MedicalComplexAdd";

const useAddMedicalComplex = () => {
  return useMutation({
    mutationKey: ["MedicalComplex"],
    mutationFn: (MedicalComplex: AddMedicalComplexType) => {
      return axiosInstance
        .post("/cliniccollections", MedicalComplex)
        .then((res) => {
          // navigate(`/Employee`);

          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddMedicalComplex;
