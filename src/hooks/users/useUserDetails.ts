import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ResponseDetailsType from "../../types/ResponseDetails";
import UserDetailType from "../../types/users/UserDetailType";
const useUserDetails = (id: string) => {
  return useQuery({
    queryKey: ["useDetails", id],
    queryFn: () => {
      const url = `/users/` + id;
      return axiosInstance
        .get<ResponseDetailsType<UserDetailType>>(url)
        .then((res) => {
          console.log(res.data);
          console.log(res.status);
          return res.data.data;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    },
  });
};
export default useUserDetails;
