import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import usePageinationtStore from "../../store/Pagination/usePaginationtStore";
import AppointmentType from "../../types/Appointment/AppointmentType";

const useAppointmentsList = (
  allData = false,
  sortBy = "_id",
  order = "desc"
): UseQueryResult<AppointmentType[], Error> => {
  const pagination = usePageinationtStore();
  return useQuery<AppointmentType[], Error>({
    queryKey: [
      "appointments",
      pagination.current_page,
      pagination.items_per_page,
      allData,
      sortBy,
      order,
      pagination.paramKey,
      pagination.filter,
      pagination.GeneralFilter,
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
        order +
        "&search=" +
        pagination.paramKey +
        "&status=" +
        pagination.filter +
        pagination.GeneralFilter
      }`;
      return axiosInstance
        .get<ResponseType<AppointmentType>>(url)
        .then((res) => {
          console.log(res.data);
          pagination.setCurrent_page(res.data.pagination.current_page);
          pagination.setItems_per_page(res.data.pagination.items_per_page);
          pagination.setHas_next_page(res.data.pagination.has_next_page);
          pagination.setTotal_items(res.data.pagination.total_items);
          pagination.setTotal_pages(res.data.pagination.total_pages);
          pagination.setHas_previous_page(
            res.data.pagination.has_previous_page
          );
          return res.data.data;
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
          throw error;
        })
        .finally(() => {});
    },
  });
};

export default useAppointmentsList;
