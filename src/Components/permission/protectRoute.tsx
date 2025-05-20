import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useHasPermission } from "../../hooks/permission/useHasPermission";

type ProtectedRouteProps = {
  permission: string | string[]; // Can be one or many
  children: JSX.Element;
};

export const ProtectedRoute = ({
  permission,
  children,
}: ProtectedRouteProps) => {
  const hasAccess = useHasPermission(permission);
  console.log("hasAccess " + hasAccess.toString());
  console.log("permission " + permission);
  if (!hasAccess) {
    console.log("hasAccess " + hasAccess);
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};
