import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import AddCompanyType from "../../types/company/AddCompanyType";

const useEditCompany = (id: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["editCompany"],
    mutationFn: (company: AddCompanyType) => {
      return axiosInstance
        .put("/companies/" + id, company)
        .then((res) => {
          navigate(`/Employee`);

          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useEditCompany;
