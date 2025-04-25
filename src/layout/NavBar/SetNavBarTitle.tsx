import { useLocation } from "react-router-dom";
import usePageTitleStore from "../../store/usePageTitleStore";
import { useEffect } from "react";

const SetNavBarTitle = () => {
  const location = useLocation();
  // console.log(location.pathname); const location = useLocation();
  const setTitle = usePageTitleStore((state) => state.setTitle);
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
    "/appointments": "Appointments",
    "/appointments/add": "Add Appointment",
    "/companies": "Companies",
    "/companies/add": "Add Company",
    "/medicalComplexes": "Medical Complexes",
    "/medicalComplexes/add": "Add MedicalComplex",
    "/departements": "Departements",
    "/departements/add": "Add Departement",
    "/clinics": "Clinics",
    "/clinics/add": "AddClinic",
    "/clinics/details": "Clinic Details",
    "/services": "Services",
    "/services/add": "Add Service",
    "/services/update": "Update Service",
    "/specialities": "Specialties",
    "/specialities/add": "Add Speciality",
    "/settings": "Settings",
    "/security": "Security",
  };

  const dynamicPaths: { path: string; title: string }[] = [
    { path: "/patients/details", title: "Patient Details" },
    { path: "/staff/details", title: "staff Details" },
    { path: "/doctors/details", title: "Doctor Details" },
    { path: "/users/details", title: "User Details" },
    { path: "/companies/details", title: "Company Details" },
    { path: "/medicalComplexes/details", title: "medicalComplex Details" },
    { path: "/departements/details", title: "Departement Details" },
    { path: "/clinics/details", title: "Clinic Details" },
    { path: "/specialities/details", title: "Speciality Details" },
    { path: "/services/details", title: "Service Details" },
    // add more as needed
  ];

  useEffect(() => {
    const exactTitle = pageTitles[location.pathname];
    if (exactTitle) {
      setTitle(exactTitle);
    } else {
      const matched = dynamicPaths.find((item) =>
        location.pathname.startsWith(item.path)
      );
      setTitle(matched?.title || "");
    }
  }, [location.pathname]);

  return null;
};
export default SetNavBarTitle;
