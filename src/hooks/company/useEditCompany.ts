import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/ApiCore";
import AddCompanyType from "../../types/company/AddCompanyType";

const useEditCompany = (id: string) => {

  
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["editCompany"],
    mutationFn: (company: AddCompanyType) => {
      console.log("inside");
      
      return axiosInstance
        .put("/companies/" + id, company)
        .then((res) => {
          navigate("/company", { state: { updated: true } });


          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useEditCompany;
