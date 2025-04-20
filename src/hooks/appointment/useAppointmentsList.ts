import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import AppointementDetailsType from "../../types/Appointment/AppointementDetailsType";

const useAppointmentsList = (
  allData = false,
  sortBy = "_id",
  order = "desc"
) => {
  const pagination = usePaginationtStore();
  return useQuery({
    queryKey: [
      "appointments",
      pagination.current_page,
      pagination.items_per_page,
      allData,
      sortBy,
      order,
      pagination.paramKey,
      // pagination.filter,
    ],
    queryFn: () => {
      const url = `/appointments?${
        "&page=" +
        pagination.current_page +
        "&limit=" +
        pagination.items_per_page +
        "&sortBy=" +
        sortBy +
        "&order=" +
        order
        // "&search=" +
        // pagination.paramKey
        // "&status=" +
        // pagination.filter
      }`;
      return axiosInstance
        .get<ResponseType<AppointementDetailsType>>(url)
        .then((res) => {
          //   countryStore.setMeta(res.data.data.meta);
          //   countryStore.setLinks(res.data.data.links);
          //   countryStore.setReFetch(true);
          console.log(res.data);
          // console.log(res.status);
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
          console.error("Error fetching appointments:", error);
          throw error;
        })
        .finally(() => {});
    },
    // keepPreviousData: true, // خيار جيد إذا عندك pagination
  });
};

export default useAppointmentsList;
