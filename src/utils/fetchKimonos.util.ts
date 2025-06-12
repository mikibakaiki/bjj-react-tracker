import { getKimonos } from "../services/api.service";
import {
  FetchKimonosDto,
  FetchKimonosResponse,
  GetKimonosResponse,
} from "../types";
import { GetKimonosParamsType } from "../types/GetKimonosParamsType";
import { preprocessKimonosDates } from "./preprocessKimonosDates.util";

export const fetchKimonos = async ({
  searchQuery = "",
  pageParam = 1,
  timePeriod = "today",
  sortDirection = "asc",
}: FetchKimonosDto): Promise<FetchKimonosResponse> => {
  const queryObj: GetKimonosParamsType = {
    endpoint: "kimonos",
    pageNumber: pageParam,
    searchQuery,
    timePeriod,
    sortDirection,
  };

  const response = await getKimonos<GetKimonosResponse>(queryObj);
  return {
    kimonos: preprocessKimonosDates(response.kimonos),
    nextPage: response.hasMore ? pageParam + 1 : undefined,
  };
};
