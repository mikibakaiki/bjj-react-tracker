import { SortDirection } from "./SortDirection";
import { TimePeriod } from "./TimePeriod";

export type GetKimonosParamsType = {
  endpoint: string;
  pageNumber: number;
  searchQuery: string;
  timePeriod: TimePeriod;
  sortDirection: SortDirection;
  options?: RequestInit;
};
