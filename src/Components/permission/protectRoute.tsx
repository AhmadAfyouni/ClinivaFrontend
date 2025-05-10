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

  if (!hasAccess) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};
