import axios from "axios";
import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import ResponseType from "../../types/ResponseList";
import PatientDetailsType from "../../types/patient/PatientDetailsType";

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
      pagination.date,
    ],
    queryFn: async () => {
      try {
        let url = `/patients?sortBy=${sortBy}&order=${order}`;

        if (!allData) {
          url += `&page=${pagination.current_page}&limit=${pagination.items_per_page}&search=${pagination.paramKey}&isActive=${pagination.filter}&dateOfBirth=${pagination.date}`;
        }

        const res = await axiosInstance.get<ResponseType<PatientDetailsType>>(
          url
        );

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
          console.error("Error fetching patients:", error);
        }
        throw error;
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: true,
  });
};

export default usePatientsList;
