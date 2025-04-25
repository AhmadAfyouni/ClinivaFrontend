import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import AddServiceType from "../../types/serviceT/AddServiceType";

type UpdateServiceType = {
  id: string;
} & AddServiceType;

const useUpdateService = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["UpdateService"],
    mutationFn: ({ id, ...data }: UpdateServiceType) => {
      return axiosInstance
        .patch(`/services/${id}`, data)
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

export default useUpdateService;
