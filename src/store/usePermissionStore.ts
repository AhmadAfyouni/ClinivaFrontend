import { create } from "zustand";

interface PermissionStore {
  permissions: string[];
  setPermissions: (perms: string[]) => void;
  hasPermission: (required: string | string[]) => boolean;
  loadPermissions: () => void;
}

export const usePermissionStore = create<PermissionStore>((set, get) => ({
  permissions: [],

  loadPermissions: () => {
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions) {
      set({ permissions: JSON.parse(storedPermissions) });
    }
  },

  setPermissions: (perms) => {
    set({ permissions: perms });
    localStorage.setItem("permissions", JSON.stringify(perms));
  },

  hasPermission: (required) => {
    const { permissions } = get();
    
    if (Array.isArray(required)) {
      return required.some((perm) => permissions.includes(perm));
    }
    return permissions.includes(required);
  },
}));
