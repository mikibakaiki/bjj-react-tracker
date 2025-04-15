import { getKimonos } from "../services/api.service";
import { FetchKimonosDto, FetchKimonosResponse, Kimono } from "../types";
import { preprocessKimonosDates } from "./preprocessKimonosDates.util";

export const fetchKimonos = async ({
  searchQuery = "",
  pageParam = 1,
}: FetchKimonosDto): Promise<FetchKimonosResponse> => {
  const res = await getKimonos<Kimono[]>("kimonos", pageParam, 20, searchQuery);
  return {
    kimonos: preprocessKimonosDates(res),
    nextPage: res.length === 20 ? pageParam + 1 : undefined,
  } as FetchKimonosResponse;
};
