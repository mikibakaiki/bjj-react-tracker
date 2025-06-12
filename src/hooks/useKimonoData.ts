import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { debounce } from "lodash";
import { FetchKimonosResponse, SortDirection, TimePeriod } from "../types";
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
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

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
