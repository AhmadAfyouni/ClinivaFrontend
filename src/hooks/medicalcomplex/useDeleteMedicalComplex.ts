import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";

const useDeleteMedicalComplex = () => {
  return useMutation({
    mutationKey: ["MedicalComplexDelete"],
    mutationFn: (id: string) => {
      return axiosInstance
        .delete(`/cliniccollections/${id}`)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};

export default useDeleteMedicalComplex;
