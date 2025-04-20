import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import PatientDetailsType from "../../types/patient/PatientDetailsType";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";

const usePatientsList = (allData = false, sortBy = "_id", order = "desc") => {
  const pagination = usePaginationtStore();
  return useQuery({
    queryKey: [
      "patients",
      pagination.current_page,
      pagination.items_per_page,
      allData,
      sortBy,
      order,
      pagination.paramKey,
      pagination.filter,
      // pagination.date,
    ],
    queryFn: () => {
      const url = `/patients?${
        "&page=" +
        pagination.current_page +
        "&limit=" +
        pagination.items_per_page +
        "&sortBy=" +
        sortBy +
        "&order=" +
        order +
        "&search=" +
        pagination.paramKey
        // "&isActive=" +
        // pagination.filter +
        // "&dateOfBirth=" +
        // "1990-05-30"
      }`;
      return axiosInstance
        .get<ResponseType<PatientDetailsType>>(url)
        .then((res) => {
          //   countryStore.setMeta(res.data.data.meta);
          //   countryStore.setLinks(res.data.data.links);
          //   countryStore.setReFetch(true);
          console.log(res.data);
          // console.log(res.status);
          console.log(res.data.pagination.paramKey);
          pagination.setCurrent_page(res.data.pagination.current_page);
          pagination.setItems_per_page(res.data.pagination.items_per_page);
          pagination.setHas_next_page(res.data.pagination.has_next_page);
          pagination.setTotal_items(res.data.pagination.total_items);
          pagination.setTotal_pages(res.data.pagination.total_pages);
          pagination.setHas_previous_page(
            res.data.pagination.has_previous_page
          );
          // pagination.setFilter(res.data.pagination.filter);
          // pagination.(res.data.pagination.meta);
          return res.data.data;
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
          throw error;
        });
    },
    // keepPreviousData: true, // خيار جيد إذا عندك pagination
  });
};

export default usePatientsList;
