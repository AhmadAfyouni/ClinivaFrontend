import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import { UserDetailType } from "../../types/user/UserDetailType";
const useUsersList = (
  limit = 500,
  page = 1,
  allData = false,
  sortBy = "_id",
  order = "desc"
) => {
  // console.log("useGetUsers per_page", per_page);
  //   const countryStore = useCountriesPaginationStore();
  return useQuery({
    queryKey: ["users", page, limit, allData, sortBy, order],
    queryFn: () => {
      const url = `/users?${
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
        .get<ResponseType<UserDetailType>>(url)
        .then((res) => {
          //   countryStore.setMeta(res.data.data.meta);
          //   countryStore.setLinks(res.data.data.links);
          //   countryStore.setReFetch(true);
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
export default useUsersList;
