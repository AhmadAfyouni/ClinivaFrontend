import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddCompanyType from "../../types/company/AddCompanyType";
import ResponseDetailsType from "../../types/ResponseDetails";
import CompanyDetailsType from "../../types/company/CompanyDetailsType";

const useAddCompany = () => {
  return useMutation({
    mutationKey: ["AddCompany"],
    mutationFn: (Company: AddCompanyType) => {
      return axiosInstance
        .post<ResponseDetailsType<CompanyDetailsType>>("/companies", Company)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddCompany;
