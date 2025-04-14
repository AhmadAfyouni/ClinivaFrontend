import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import RolesType from "../../types/Role/Role";
const useRoles = (
  limit = 5,
  page = 1,
  allData = false,
  sortBy = "_id",
  order = "desc"
) => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => {
      const url = `/roles?${
        "&page=" +
        page +
        "&limit=" +
        limit +
        "&allData=" +
        allData +
        "&sortBy=" +
        sortBy +
        "&order=" +
        order
      }`;
      return axiosInstance
        .get<ResponseType<RolesType>>(url)
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
export default useRoles;
