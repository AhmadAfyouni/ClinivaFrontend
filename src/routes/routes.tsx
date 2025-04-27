import { RouteObject } from "react-router-dom";
import AddDoctor from "../pages/Doctor/AddDoctor";
import Dashboard from "../pages/Dashboard";
import AddPatient from "../pages/Patient/AddPatient";
import { Login } from "../pages/auth/Login/Login";
import Appointments from "../pages/Appointments";
import AddEmployee from "../pages/Employee/AddEmployee";
import PatientsPage from "../pages/Patient/PatientsPage";
import PatientDetails from "../pages/Patient/PatientDetails";
import MedicalComplexPage from "../pages/MedicalComplex/MedicalComplexPage";
import DoctorDetails from "../pages/Doctor/DoctorDetails";
import DoctorsPage from "../pages/Doctor/DoctorsPage";
import StaffPage from "../pages/Staff/StaffPage";
import UsersPage from "../pages/Users/UsersPage";
import MainLayout from "../layout/MainLayout";
import MedicalComplexDetails from "../pages/MedicalComplex/MedicalComplexDetails";
import DepartementsPage from "../pages/Departement/DepartementsPage";
import DepartementDetails from "../pages/Departement/DepartementDetails";
import ClinicsPage from "../pages/Clinic/ClinicsPage";
import ClinicDetails from "../pages/Clinic/ClinicDetails";
import SpecialitiesPage from "../pages/Specialities/SpecialitiesPage";
import AppointmentsPage from "../pages/appointment/AppiontmentsPage";
import SelectPlan from "../pages/auth/Register/SelectPlan";
import Register from "../pages/auth/Register/Register";
import AddClinic from "../pages/Clinic/AddClinic";
import AddService from "../pages/Service/AddService";
import ServiceDetails from "../pages/Service/ServiceDetails";
import ServicesPage from "../pages/Service/ServicesPage";
import AddUser from "../pages/Users/AddUser";
import AddMedicalComplex from "../pages/MedicalComplex/AddMedicalComplex";
import AddDepartment from "../pages/Department/AddDepartment";
import UpdateService from "../pages/Service/UpdateService";
import StaffDetails from "../pages/Staff/StaffDetails";
import UserDetails from "../pages/Users/UserDetails";
import CompanyDetails from "../pages/Company/CompanyDetails";

// Define route types for better type safety
export type AppRoute = RouteObject & {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
};

export const routes: AppRoute[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/SelectPlan",
    element: <SelectPlan />,
  },
  {
    path: "/patients",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <PatientsPage />,
      },
      {
        path: "add",
        element: <AddDoctor />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "details/:id",
        element: <PatientDetails />,
      },
    ],
  },
  {
    path: "/doctors",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <DoctorsPage />,
      },
      {
        path: "add/",
        element: <AddPatient />,
      },
      {
        path: "details/:id",
        element: <DoctorDetails />,
      },
    ],
  },

  {
    path: "/employees",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <StaffPage />,
      },
      {
        path: "add",
        element: <AddEmployee />,
      },
      {
        path: "details/:id",
        element: <StaffDetails />,
      },
    ],
  },
  {
    path: "/users",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <UsersPage />,
      },
      {
        path: "add",
        element: <AddUser />,
      },
      {
        path: "details/:id",
        element: <UserDetails />,
      },
    ],
  },
  {
    path: "/company",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <CompanyDetails />,
      },
    ],
  },
  {
    path: "/medicalComplexes",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <MedicalComplexPage />,
      },
      {
        path: "add",
        element: <AddMedicalComplex />,
      },
      {
        path: "details/:id",
        element: <MedicalComplexDetails />,
      },
    ],
  },
  {
    path: "/departements",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <DepartementsPage />,
      },
      {
        path: "add",
        element: <AddDepartment />,
      },
      {
        path: "details/:id",
        element: <DepartementDetails />,
      },
    ],
  },
  {
    path: "/clinics",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <ClinicsPage />,
      },
      {
        path: "add",
        element: <AddClinic />,
      },
      {
        path: "details/:id",
        element: <ClinicDetails />,
      },
    ],
  },
  {
    path: "/services",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <ServicesPage />,
      },
      {
        path: "add",
        element: <AddService />,
      },
      {
        path: "update",
        element: <UpdateService />,
      },
      {
        path: "details/:id",
        element: <ServiceDetails />,
      },
    ],
  },
  {
    path: "/specialities",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <SpecialitiesPage />,
      },
      {
        path: "add",
        element: <ClinicsPage />, //// add speciality Page
      },
      {
        path: "details/:id",
        element: <ClinicsPage />, //// there is no specialty details V2
      },
    ],
  },
  {
    path: "/appointments",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <AppointmentsPage />,
      },
      {
        path: "add",
        element: <Appointments />,
      },
    ],
  },

  {
    path: "*",
    element: <Dashboard />,
  },
];
