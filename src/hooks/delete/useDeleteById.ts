import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import { useNavigate } from "react-router";

interface Props {
  endpoint: string;
  mutationKey: string;
  navigationUrl: string;
  reFetch: () => void;
}
const useDeleteById = ({
  endpoint,
  mutationKey,
  navigationUrl,
  reFetch,
}: Props) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: (id: string) => {
      return axiosInstance
        .delete(`/${endpoint}/${id}`)
        .then((res) => {
          navigate(navigationUrl);
          reFetch();
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};

export default useDeleteById;
