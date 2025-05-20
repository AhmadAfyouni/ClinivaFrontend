import PaginationType from "../PaginationControl";

export default interface CustomListType {
  TableFields: TableFields[];
  TableName: string;
  FiltersTable: Filter[];
  UrlAdd: string;
  TitleAdd: string;
  UrlEdit: string;
  UrlDetails: string;
  isFetching: boolean;
  isEmpty: boolean;
  HasPermissionToAdd: boolean;
  HasPermissionToEdit: boolean;
  HasPermissionToDelete: boolean;
  hasPagination: boolean;
  pagination?: PaginationType;
  handleDelete: (id: string) => void;
  handelSearch: (search: string) => void;
}

interface TableFields {
  Thead: string;
  Tbody: string[];
  Color: string;
  width: string;
}

interface Filter {
  title: string;
  values: string[];
  key: string;
  setFilterValue: (valueSelected: string) => void;
}
