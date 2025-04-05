import { create } from "zustand";

interface RoleStore {
  role: string | null;
  roles: string[];
  setRoles: (roles: string[]) => void;
  setRole: (role: string, rememberMe: boolean) => void;
  clearRole: () => void;
  hasRole: (role: string) => boolean;
}

const useRoleStore = create<RoleStore>((set) => ({
  // Initialize role and roles from storage
  role:
    localStorage.getItem("currentRole") ||
    sessionStorage.getItem("currentRole"),
  roles: JSON.parse(
    localStorage.getItem("availableRoles") ||
      sessionStorage.getItem("availableRoles") ||
      "[]"
  ),

  // Set roles from backend and store them
  setRoles: (roles) => {
    localStorage.setItem("availableRoles", JSON.stringify(roles));
    sessionStorage.setItem("availableRoles", JSON.stringify(roles));
    set({ roles });
  },

  // Check if user has a specific role
  hasRole: (role) => {
    const currentRole =
      localStorage.getItem("currentRole") ||
      sessionStorage.getItem("currentRole");
    return currentRole === role;
  },

  // Set the role and persist it in storage
  setRole: (role, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("currentRole", role);
    set({ role });
  },

  // Clear the role from state and storage
  clearRole: () => {
    localStorage.removeItem("currentRole");
    sessionStorage.removeItem("currentRole");
    set({ role: null });
  },
}));

export default useRoleStore;
