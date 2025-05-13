import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/ApiCore";
import AddEmployeeType from "../../types/Employee/AddEmployeeType";

const useAddEmployee = () => {
  return useMutation({
    mutationKey: ["AddEmployee"],
    mutationFn: (Employee: AddEmployeeType) => {
      const formData = new FormData();
      Object.entries(Employee).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === "object") {
              Object.entries(item).forEach(([subKey, subValue]) => {
                formData.append(
                  `${key}[${index}][${subKey}]`,
                  String(subValue)
                );
              });
            } else {
              formData.append(`${key}[]`, String(item));
            }
          });
        } else if (typeof value === "object") {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue !== null && subValue !== undefined) {
              formData.append(`${key}[${subKey}]`, String(subValue));
            }
          });
        } else {
          formData.append(key, String(value));
        }
      });

      return axiosInstance
        .post("/employees", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // navigate(`/Employee`);

          return res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
  });
};
export default useAddEmployee;
