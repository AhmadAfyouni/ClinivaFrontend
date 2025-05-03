import axiosInstance from "../../api/ApiCore";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import DepartmentDetailsType from "../../types/department/DepartmentDetailsType";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDepatementsList = (
  allData = false,
  sortBy = "_id",
  order = "desc"
) => {
  const pagination = usePaginationtStore();

  return useQuery({
    queryKey: [
      "departments",
      pagination.current_page,
      pagination.items_per_page,
      allData,
      sortBy,
      order,
      pagination.paramKey,
    ],
    queryFn: async ({ signal }) => {
      let url = `/departments?sortBy=${sortBy}&order=${order}`;

      if (!allData) {
        url += `&page=${pagination.current_page}&limit=${pagination.items_per_page}&search=${pagination.paramKey}`;
      }

      try {
        const res = await axiosInstance.get<
          ResponseType<DepartmentDetailsType>
        >(url, {
          signal,
        });

        if (!allData) {
          pagination.setCurrent_page(res.data.pagination.current_page);
          pagination.setItems_per_page(res.data.pagination.items_per_page);
          pagination.setHas_next_page(res.data.pagination.has_next_page);
          pagination.setTotal_items(res.data.pagination.total_items);
          pagination.setTotal_pages(res.data.pagination.total_pages);
          pagination.setHas_previous_page(
            res.data.pagination.has_previous_page
          );
        }

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

export default useDepatementsList;
