// import axiosInstance from "../../api/ApiCore";
// import ResponseType from "../../types/ResponseList";
// import { useQuery } from "@tanstack/react-query";
// import PatientDetailsType from "../../types/patient/PatientDetailsType";
// const usePatientsList = (
//   page = 1,
//   limit = 10,
//   allData = false,
//   sortBy = "_id",
//   order = "asc"
// ) => {
//   console.log("Sorted By " + sortBy);
//   console.log("order By  " + order);
//   // console.log("useGetUsers per_page", per_page);
//   //   const countryStore = useCountriesPaginationStore();
//   return useQuery({
//     queryKey: ["patients"],
//     queryFn: () => {
//       const url = `/patients?${
//         "&page=" +
//         page +
//         "&limit=" +
//         limit +
//         "&allData=" +
//         allData +
//         "&sortBy=" +
//         sortBy +
//         "&order=" +
//         order
//       }`;
//       return axiosInstance
//         .get<ResponseType<PatientDetailsType>>(url)
//         .then((res) => {
//           //   countryStore.setMeta(res.data.data.meta);
//           //   countryStore.setLinks(res.data.data.links);
//           //   countryStore.setReFetch(true);
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
// export default usePatientsList;

import axiosInstance from "../../api/ApiCore";
import ResponseType from "../../types/ResponseList";
import { useQuery } from "@tanstack/react-query";
import PatientDetailsType from "../../types/patient/PatientDetailsType";

const usePatientsList = (
  page = 1,
  limit = 10,
  allData = false,
  sortBy = "_id",
  order = "asc"
) => {
  return useQuery({
    queryKey: ["patients", page, limit, allData, sortBy, order], // تعتمد على جميع القيم
    queryFn: () => {
      const url = `/patients?page=${page}&limit=${limit}&allData=${allData}&sortBy=${sortBy}&order=${order}`;
      return axiosInstance
        .get<ResponseType<PatientDetailsType>>(url)
        .then((res) => res.data.data)
        .catch((error) => {
          console.error("Error fetching patients:", error);
          throw error;
        });
    },
    // keepPreviousData: true, // خيار جيد إذا عندك pagination
  });
};

export default usePatientsList;
