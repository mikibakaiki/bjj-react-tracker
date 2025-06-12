import { GetKimonosParamsType } from "../types/GetKimonosParamsType";

const getApiUrl = (endpoint: string) =>
  new URL(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/${endpoint}`);

export const getKimonos = async <T>({
  endpoint,
  pageNumber = 1,
  searchQuery = "",
  timePeriod = "today",
  sortDirection = "asc",
}: GetKimonosParamsType): Promise<T> => {
  // Construct query parameters for pagination: limit = # of kimonos/page; offset=page
  const url = getApiUrl(endpoint);

  const queryParams = new URLSearchParams({
    search: searchQuery,
    offset: String((pageNumber - 1) * 20),
    limit: "20",
    timePeriod,
    sortDirection,
  });

  const response = await fetch(`${url}?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  // Ensure we're returning the expected structure
  if (!Array.isArray(data.kimonos)) {
    throw new Error("Server response format is invalid");
  }

  return data;
};
