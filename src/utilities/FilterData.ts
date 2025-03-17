export default function filterData<T extends Record<string, any>>(data: T[], search: string): T[] {
    const query = search.toLowerCase().trim();
  
    if (data.length === 0) return []; 
  
    return data.filter((item) =>
      Object.keys(data[0]).some(
        (key) =>
          typeof item[key] === 'string' && 
          item[key].toLowerCase().includes(query)
      )
    );
  }
  