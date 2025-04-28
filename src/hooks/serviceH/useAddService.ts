import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddServiceType from "../../types/serviceT/AddServiceType";
import { useNavigate } from "react-router";

const useAddService = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["AddService"],
    mutationFn: (Service: AddServiceType) => {
      return axiosInstance
        .post("/services", Service)
        .then((res) => {
          navigate(`/services`);
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddService;
