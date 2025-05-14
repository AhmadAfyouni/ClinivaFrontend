import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import CompanyDetailsType from "../../types/company/CompanyDetailsType";
import ResponseType from "../../types/ResponseList";
// const useCompanyDetails = () => {
//   return useQuery({
//     queryKey: ["companyDetails"],
//     queryFn: () => {
//       const url = `/companies/`;
//       return axiosInstance
//         .get<ResponseType<CompanyDetailsType>>(url)
//         .then((res) => {
//           console.log(res.data);
//           console.log(res.status);
//           return res.data.data;
//         })
//         .catch((error) => {
//           console.log(error);
//           throw error;
//         });
//     },
//   });
// };
const useCompanyDetails = (options = {}) => {
  return useQuery({
    queryKey: ["companyDetails"],
    queryFn: () => {
      return axiosInstance
        .get<ResponseType<CompanyDetailsType>>("/companies/")
        .then((res) => res.data.data);
    },
    ...options,
  });
};

export default useCompanyDetails;
