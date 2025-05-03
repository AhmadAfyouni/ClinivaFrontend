import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import StaffDetailsType from "../../types/staff/StaffDetailsType";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import axios from "axios";

const useStaffList = (allData = false, sortBy = "_id", order = "desc",employeeType="") => {
  const pagination = usePaginationtStore();

  return useQuery({
    queryKey: [
      "staff",
      pagination.current_page,
      pagination.items_per_page,
      sortBy,
      allData,
      order,
      pagination.paramKey,
      pagination.filter,
      pagination.date,
    ],
    queryFn: async ({ signal }) => {
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
        pagination.date +
        (employeeType ? "&employeeType=" + employeeType : "")
      }`;
      try {
        const res = await axiosInstance.get<ResponseType<StaffDetailsType>>(
          url,
          { signal }
        );

        // Update pagination state
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

export default useStaffList;
