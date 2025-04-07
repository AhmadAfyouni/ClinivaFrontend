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
        path: "all",
        element: <PatientsPage />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "records",
        element: <PatientsPage />,
      },
    ],
  },
  {
    path: "/doctors",
    element: <DoctorLayout />,
    children: [
      {
        path: "",
        element: <PatientsPage />,
      },
      {
        path: "add/",
        element: <AddDoctor />,
      },
      {
        path: "all",
        element: <PatientsPage />,
      },
    ],
  },
  {
    path: "/company",
    element: <AddCompany />,
    children: [
      {
        path: "",
        element: <AddCompany />,
      },
      {
        path: "add",
        element: <AddDoctor />,
      },
      {
        path: "all",
        element: <AddCompany />,
      },
    ],
  },
  {
    path: "/Employee",
    element: <AddEmployee />,
    children: [
      {
        path: "",
        element: <AddEmployee />,
      },
      {
        path: "add",
        element: <AddEmployee />,
      },
      {
        path: "all",
        element: <AddCompany />,
      },
    ],
  },
  {
    path: "*",
    element: <Dashboard />,
  },
];
