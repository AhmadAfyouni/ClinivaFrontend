import { useLocation } from "react-router-dom";
import usePageTitleStore from "../../store/usePageTitleStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SetNavBarTitle = () => {
  const location = useLocation();
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const { t } = useTranslation();

  const pageTitles: Record<string, string> = {
    "/": "Users",
    "/employees": "staff",
    "/employees/add": "addStaff",
    "/patients": "patients",
    "/patients/add": "addPatient",
    "/doctors": "doctors",
    "/doctors/add": "addDoctor",
    "/users": "users",
    "/users/add": "addUser",
    "/appointments": "appointments",
    "/appointments/add": "addAppointment",
    "/companies": "Companies",
    "/company": "Company",
    "/companies/add": "addCompany",
    "/medicalComplexes": "medicalComplexes",
    "/medicalComplexes/add": "addMedicalComplex",
    "/departements": "departements",
    "/departements/add": "addDepartement",
    "/clinics": "clinics",
    "/clinics/add": "addClinic",
    "/clinics/details": "clinicDetails",
    "/services": "services",
    "/services/add": "addService",
    "/services/update": "updateService",
    "/specialities": "specialities",
    "/specialities/add": "addSpeciality",
    "/settings": "settings",
    "/security": "security",
  };

  const dynamicPaths: { path: string; key: string }[] = [
    { path: "/patients/details", key: "patientDetails" },
    { path: "/employees/details", key: "staffDetails" },
    { path: "/doctors/details", key: "doctorDetails" },
    { path: "/users/details", key: "userDetails" },
    { path: "/companies/details", key: "companyDetails" },
    { path: "/medicalComplexes/details", key: "medicalComplexDetails" },
    { path: "/departements/details", key: "departementDetails" },
    { path: "/clinics/details", key: "clinicDetails" },
    { path: "/specialities/details", key: "specialityDetails" },
    { path: "/services/details", key: "serviceDetails" },
  ];

  useEffect(() => {
    const exactKey = pageTitles[location.pathname];
    if (exactKey) {
      setTitle(t(exactKey));
    } else {
      const matched = dynamicPaths.find((item) =>
        location.pathname.startsWith(item.path)
      );
      setTitle(matched ? t(matched.key) : "");
    }
  }, [location.pathname, t, setTitle]);

  return null;
};

export default SetNavBarTitle;
