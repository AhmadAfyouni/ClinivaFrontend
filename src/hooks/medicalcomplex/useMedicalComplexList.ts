import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import MedicalComplexDetailsType from "../../types/medicalComplex/MedicalComplexDetailsType";
import axios from "axios";

const useMedicalComplexList = (
  allData = false,
  sortBy = "_id",
  order = "desc"
) => {
  const pagination = usePaginationtStore();

  return useQuery({
    queryKey: [
      "cliniccollections",
      pagination.current_page,
      pagination.items_per_page,
      allData,
      sortBy,
      order,
      pagination.paramKey,
      pagination.filter,
      pagination.date,
    ],
    queryFn: async ({ signal }) => {
      const url = `/cliniccollections?${
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
      }`;

      try {
        const res = await axiosInstance.get<
          ResponseType<MedicalComplexDetailsType>
        >(url, {
          signal,
        });

        pagination.setCurrent_page(res.data.pagination.current_page);
        pagination.setItems_per_page(res.data.pagination.items_per_page);
        pagination.setHas_next_page(res.data.pagination.has_next_page);
        pagination.setTotal_items(res.data.pagination.total_items);
        pagination.setTotal_pages(res.data.pagination.total_pages);
        pagination.setHas_previous_page(res.data.pagination.has_previous_page);

        return res.data.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log("Error:", error);
        }
        throw error;
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    enabled: true,
  });
};

export default useMedicalComplexList;
