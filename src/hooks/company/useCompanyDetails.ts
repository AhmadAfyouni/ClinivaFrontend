import axiosInstance from "../../api/ApiCore";
import { useQuery } from "@tanstack/react-query";
import ResponseDetailsType from "../../types/Responsedetail";
import CompanyDetailsType from "../../types/company/CompanyDetailsType";
const useCompanyDetails = (id: string) => {
  return useQuery({
    queryKey: ["companyDetails"],
    queryFn: () => {
      const url = `/companies/` + id;
      return axiosInstance
        .get<ResponseDetailsType<CompanyDetailsType>>(url)
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
export default useCompanyDetails;
