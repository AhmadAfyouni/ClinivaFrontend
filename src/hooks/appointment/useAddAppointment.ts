import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddAppointmentType from "../../types/Appointment/AddAppointment";

const useAddAppointment = () => {
  return useMutation({
    mutationKey: ["AddAppointment"],
    mutationFn: (appointment: AddAppointmentType) => {
      return axiosInstance
        .post("/appointments", appointment)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddAppointment;
