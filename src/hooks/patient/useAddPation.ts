import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import AddPationType from "../../types/AddPationType";

const useAddPation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["AddPation"],
    mutationFn: (Pation: AddPationType) => {
      return axiosInstance
        .post("/patients", Pation)
        .then((res) => {
          
          navigate(`/patients`);

          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};

export default useAddPation;
