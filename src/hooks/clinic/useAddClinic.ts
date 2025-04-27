import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddClinicType from "../../types/clinic/AddClinic";

const useAddClinic = () => {
  return useMutation({
    mutationKey: ["AddClinic"],
    mutationFn: (clinic: AddClinicType) => {
      return axiosInstance
        .post("/clinics", clinic)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddClinic;
