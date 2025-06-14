import { SortDirection } from "./SortDirection";
import { TimePeriod } from "./TimePeriod";

export interface FetchKimonosDto {
  searchQuery: string;
  pageParam: number;
  timePeriod: TimePeriod;
  sortDirection: SortDirection;
}
