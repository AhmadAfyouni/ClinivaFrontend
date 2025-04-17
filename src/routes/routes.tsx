import { RouteObject } from "react-router-dom";
import AddDoctor from "../pages/Doctor/AddDoctor";
import Dashboard from "../pages/Dashboard";
import AddPatient from "../pages/Patient/AddPatient";
import DoctorLayout from "../layout/DoctorLayout";
import PatientLayout from "../layout/PatientLayout";
import AddCompany from "../pages/Company/AddCompany";
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
import UserDetails from "../pages/Users/UserDetails";
import MainLayout from "../layout/MainLayout";
import MedicalComplexDetails from "../pages/MedicalComplex/MedicalComplexDetails";
import DepartementsPage from "../pages/Departement/DepartementsPage";
import DepartementDetails from "../pages/Departement/DepartementDetails";
import ClinicsPage from "../pages/Clinic/ClinicsPage";
import ClinicDetails from "../pages/Clinic/ClinicDetails";
import SpecialitiesPage from "../pages/Specialities/SpecialitiesPage";
import SelectPlan from "../pages/auth/Register/SelectPlan";
import Register from "../pages/auth/Register/Register";

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
    element: <PatientLayout />,
    children: [
      {
        path: "",
        element: <PatientsPage />,
      },
      {
        path: "add",
        element: <AddPatient />,
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
    element: <DoctorLayout />,
    children: [
      {
        path: "",
        element: <DoctorsPage />,
      },
      {
        path: "add/",
        element: <AddDoctor />,
      },
      {
        path: "details/:id",
        element: <DoctorDetails />,
      },
    ],
  },

  {
    path: "/employee",
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
        element: <UsersPage />, /// add use page
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
        element: <AddCompany />,
      },
      {
        path: "add",
        element: <AddCompany />,
      },
    ],
  },
  {
    path: "/medicalComplex",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <MedicalComplexPage />,
      },
      {
        path: "add",
        element: <MedicalComplexPage />, //// add medicalComlpex Page
      },
      {
        path: "details/:id",
        element: <MedicalComplexDetails />,
      },
    ],
  },
  {
    path: "/departement",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <DepartementsPage />,
      },
      {
        path: "add",
        element: <DepartementsPage />, //// add Departement Page
      },
      {
        path: "details/:id",
        element: <DepartementDetails />,
      },
    ],
  },
  {
    path: "/clinic",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <ClinicsPage />,
      },
      {
        path: "add",
        element: <ClinicsPage />, //// add Clinic Page
      },
      {
        path: "details/:id",
        element: <ClinicDetails />,
      },
    ],
  },
  {
    path: "/speciality",
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
    ],
  },

  {
    path: "*",
    element: <Dashboard />,
  },
];
