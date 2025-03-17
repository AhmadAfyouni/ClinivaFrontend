import filterData from "./FilterData";

export default function sortData<T extends Record<string, any>>(
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
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return payload.reversed 
            ? bValue.localeCompare(aValue) 
            : aValue.localeCompare(bValue);
        }
        
        return 0; 
      }),
      payload.search
    );
  }
  