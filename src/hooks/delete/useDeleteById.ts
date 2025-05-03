import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import { useNavigate } from "react-router";

interface Props {
  endpoint: string;
  mutationKey: string;
  navigationUrl: string;
}
const useDeleteById = ({ endpoint, mutationKey, navigationUrl }: Props) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: (id: string) => {
      return axiosInstance
        .delete(`/${endpoint}/${id}`)
        .then((res) => {
          navigate(navigationUrl);
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};

export default useDeleteById;
