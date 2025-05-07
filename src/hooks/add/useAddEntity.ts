import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
interface Props {
  mutationKey: string;
  postUrl: string;
  navigationUrl: string;
}
const useAddEntity = ({ mutationKey, navigationUrl, postUrl }: Props) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [mutationKey],
    // mutationKey: ["AddUser"],
    mutationFn: (Entity: object) => {
      return axiosInstance
        .post(`/${postUrl}`, Entity)
        .then((res) => {
          navigate(`/${navigationUrl}`);
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddEntity;
