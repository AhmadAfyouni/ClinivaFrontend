import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import StaffDetailsType from "../../types/staff/StaffDetailsType";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
const useStaffList = (allData = false, sortBy = "_id", order = "desc") => {
  const pagination = usePaginationtStore();
  // console.log("useGetUsers per_page", per_page);
  //   const countryStore = useCountriesPaginationStore();
  return useQuery({
    queryKey: [
      "staff",
      pagination.current_page,
      pagination.items_per_page,
      allData,
      sortBy,
      order,
      pagination.paramKey,
      pagination.filter,
      pagination.date,
    ],
    queryFn: () => {
      const url = `/employees?${
        "&page=" +
        pagination.current_page +
        "&limit=" +
        pagination.items_per_page +
        "&sortBy=" +
        sortBy +
        "&order=" +
        order +
        "&search=" +
        pagination.paramKey +
        "&isActive=" +
        pagination.filter +
        "&dateOfBirth=" +
        pagination.date
      }`;
      return axiosInstance
        .get<ResponseType<StaffDetailsType>>(url)
        .then((res) => {
          //   countryStore.setMeta(res.data.data.meta);
          //   countryStore.setLinks(res.data.data.links);
          //   countryStore.setReFetch(true);
          console.log(res.data);
          console.log(res.status);
          pagination.setCurrent_page(res.data.pagination.current_page);
          pagination.setItems_per_page(res.data.pagination.items_per_page);
          pagination.setHas_next_page(res.data.pagination.has_next_page);
          pagination.setTotal_items(res.data.pagination.total_items);
          pagination.setTotal_pages(res.data.pagination.total_pages);
          pagination.setHas_previous_page(
            res.data.pagination.has_previous_page
          );

          // pagination.(res.data.pagination.meta);
          return res.data.data;
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    },
  });
};
export default useStaffList;
