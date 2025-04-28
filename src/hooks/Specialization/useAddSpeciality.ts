import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddSpecialityType from "../../types/Specialization/AddSpecialityType";

const useAddSpeciality = () => {
  // const navigate = useNavigate();
  return useMutation({
    mutationKey: ["AddSpeciality"],
    mutationFn: (specialty: AddSpecialityType) => {
      return axiosInstance
        .post("/specializations", specialty)
        .then((res) => {
          // navigate(`/services`);
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddSpeciality;
