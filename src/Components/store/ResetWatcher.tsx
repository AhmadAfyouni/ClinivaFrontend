// src/components/SortResetWatcher.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSortStore from "../../hooks/useSortStore ";
import usePaginationtStore from "../../store/Pagination/usePaginationtStore";
import useDropDownStore from "../../store/Dropdown/useDropDownStore ";

export default function ResetWatcher() {
  const location = useLocation();
  const resetSort = useSortStore((state) => state.resetSort);
  const { resetPagination } = usePaginationtStore();
  const { resetAllDropDownValues } = useDropDownStore();
  useEffect(() => {
    resetSort();
    resetPagination?.();
    resetAllDropDownValues();
    // console.log(location);
  }, [location.pathname]);

  return null; // no UI
}
