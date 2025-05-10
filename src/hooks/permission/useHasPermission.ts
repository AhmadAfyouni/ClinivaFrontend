import { usePermissionStore } from "../../store/usePermissionStore";

export const useHasPermission = (required: string | string[]) => {
  return usePermissionStore((state) => state.hasPermission(required));
};
