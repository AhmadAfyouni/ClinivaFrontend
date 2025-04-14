import filterData from "./FilterData";

export default function sortData<T extends Record<string, string | number>>(
  data: T[],
  payload: { sortBy: keyof T | null; reversed: boolean; search: string }
): T[] {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const aParsed = isNaN(Number(aValue)) ? aValue : Number(aValue);
        const bParsed = isNaN(Number(bValue)) ? bValue : Number(bValue);

        if (typeof aParsed === "number" && typeof bParsed === "number") {
          return payload.reversed ? bParsed - aParsed : aParsed - bParsed;
        }

        return payload.reversed
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return payload.reversed ? bValue - aValue : aValue - bValue;
      }

      return 0;
    }),
    payload.search
  );
}
