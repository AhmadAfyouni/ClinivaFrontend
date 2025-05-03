import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import StaffDetailsType from "../../types/staff/StaffDetailsType";
import axios from "axios";

const useStaffListWithoutUser = (allData = true, sortBy = "_id", order = "desc") => {

  return useQuery({
    queryKey: [
      "useStaffListWithoutUser",
      sortBy,
      allData,
      order,
    ],
    queryFn: async ({ signal }) => {
      const url = `/employees/without-user?${
              sortBy +
        "&order=" +
        order       
      }`;
      try {
        const res = await axiosInstance.get<ResponseType<StaffDetailsType>>(
          url,
          { signal }
        );


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

export default useStaffListWithoutUser;
