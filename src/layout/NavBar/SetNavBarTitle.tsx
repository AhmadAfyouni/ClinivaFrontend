import { useLocation } from "react-router-dom";
import usePageTitleStore from "../../store/usePageTitleStore";

const SetNavBarTitle = () => {
  const location = useLocation();
  // console.log(location.pathname);
  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/employees": "Staff",
    "/employees/add": "Add Staff",
    "/patients": "Patients",
    "/patients/add": "Add Patient",
    "/doctors": "Doctors",
    "/doctors/add": "Add Doctor",
    "/users": "Users",
    "/users/add": "AddUser",
    "/companies": "Companies",
    "/companies/add": "Add Company",
    "/medicalComplexes": "Medical Complexes",
    "/medicalComplexes/add": "Add MedicalComplex",
    "/departements": "Departements",
    "/departements/add": "Add Departement",
    "/clinics": "Clinic",
    "/clinics/add": "AddClinic",
    "/services": "Services",
    "/services/add": "Add Service",
    "/specialities": "Specialties",
    "/specialities/add": "Add Speciality",
    "/settings": "Settings",
    "/security": "Security",
  };

  const title = pageTitles[location.pathname] || "";
  const setTitle = usePageTitleStore((state) => state.setTitle);
  setTitle(title);
  return null;
};
export default SetNavBarTitle;
