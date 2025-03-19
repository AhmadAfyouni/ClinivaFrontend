import { RouteObject } from "react-router-dom";
import AddDoctor from "../pages/Doctor/AddDoctor";
import PatientsTables from "../pages/Patients";
import Dashboard from "../pages/Dashboard";
import AddPatient from "../pages/Patient/AddPatient";
import DoctorLayout from "../layout/DoctorLayout";
import PatientLayout from "../layout/PatientLayout";
import AddCompany from "../pages/Company/AddCompany";

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
    path: "/patients",
    element: <PatientLayout />,
    children: [
      {
        path: "",
        element: <PatientsTables />,
      },
      {
        path: "add",
        element: <AddPatient />,
      },
      {
        path: "all",
        element: <PatientsTables />,
      },
      {
        path: "appointments",
        element: <PatientsTables />,
      },
      {
        path: "records",
        element: <PatientsTables />,
      },
    ],
  },
  {
    path: "/doctors",
    element: <DoctorLayout />,
    children: [
      {
        path: "",
        element: <PatientsTables />,
      },
      {
        path: "add",
        element: <AddDoctor />,
      },
      {
        path: "all",
        element: <PatientsTables />,
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
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
];
