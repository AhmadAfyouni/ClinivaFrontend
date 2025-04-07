import axiosInstance from "../../api/ApiCore";
import SpecializationListType from "../../types/Specialization/SpecializationType";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
const useSpecialization = (
  limit = 500,
  page = 1,
  allData = false,
  sortBy = "_id",
  order = "desc"
) => {
  // console.log("useGetUsers per_page", per_page);
  //   const countryStore = useCountriesPaginationStore();
  return useQuery({
    queryKey: ["specializations"],
    queryFn: () => {
      const url = `/specializations?${
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
        .get<ResponseType<SpecializationListType>>(url)
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
export default useSpecialization;
