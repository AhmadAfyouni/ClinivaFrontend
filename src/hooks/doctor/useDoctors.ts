import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import ServiceDetailsType from "../../types/serviceT/ServiceDetailsType";
const useDoctors = (
  limit = 5,
  page = 1,
  allData = false,
  sortBy = "_id",
  order = "desc"
) => {
  return useQuery({
    queryKey: ["doctorsS"],
    queryFn: () => {
      const url = `/employees?${
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
        .get<ResponseType<ServiceDetailsType>>(url)
        .then((res) => {
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
export default useDoctors;
