import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { debounce } from "lodash";
import { DateTime } from "luxon";
import {
  FetchKimonosDto,
  FetchKimonosResponse,
  Kimono,
  SortDirection,
  TimePeriod,
} from "../types";
import { getKimonos } from "../services/api.service";
import { preprocessKimonosDates } from "../utils";
import { fetchKimonos } from "../utils/fetchKimonos.util";

interface UseKimonoDataProps {
  timePeriod: TimePeriod;
  sortDirection: SortDirection;
}

export const useKimonoData = ({
  timePeriod,
  sortDirection,
}: UseKimonoDataProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const debouncedQuery = useRef(
    debounce((query: string) => setSearchQuery(query), 300)
  ).current;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<FetchKimonosResponse>({
    queryKey: ["kimonos", searchQuery, timePeriod, sortDirection], // Add filters to queryKey
    queryFn: ({ pageParam = 1 }) =>
      fetchKimonos({
        searchQuery,
        pageParam: pageParam as number,
        timePeriod,
        sortDirection,
      }),
    //   const response = fetchKimonos({
    //     searchQuery,
    //     pageParam,
    //     timePeriod,
    //     sortDirection,
    //   });
    //   return {
    //   kimonos: response.kimonos,
    //   nextPage: response.hasMore ? pageParam + 1 : undefined // Use hasMore from backend
    // };

    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // const filterByTimePeriod = (kimonos: Kimono[]) => {
  //   if (timePeriod === "all") return kimonos;

  //   const now = DateTime.now();
  //   const periods = {
  //     today: now.minus({ day: 1 }),
  //     "1month": now.minus({ months: 1 }),
  //     "3months": now.minus({ months: 3 }),
  //     "6months": now.minus({ months: 6 }),
  //     "1year": now.minus({ years: 1 }),
  //   };

  //   return kimonos.filter((kimono) => {
  //     const latestDate = DateTime.fromFormat(
  //       kimono.timestamp[kimono.timestamp.length - 1],
  //       "dd/MM/yyyy"
  //     );
  //     return latestDate >= periods[timePeriod];
  //   });
  // };

  // const sortKimonos = (kimonos: Kimono[]): Kimono[] => {
  //   return [...kimonos].sort((a, b) => {
  //     const priceA = a.price[a.price.length - 1];
  //     const priceB = b.price[b.price.length - 1];
  //     return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
  //   });
  // };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedQuery(value);
  };

  const processedKimonos = data?.pages.flatMap((page) => page.kimonos) ?? [];

  return {
    kimonos: processedKimonos,
    inputValue,
    handleInputChange,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
