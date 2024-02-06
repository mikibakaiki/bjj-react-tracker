// Reading from a file
// import kimonoData from "../data.json";

// export const getKimonoList: Kimono[] = kimonoData;

const getApiUrl = (endpoint: string) => new URL(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/${endpoint}`);

export const getKimonos = async <T>(endpoint: string, page: number, limit: number, options?: RequestInit): Promise<T> => {
    // Construct query parameters for pagination: limit = # of kimonos/page; offset=page
    const url = getApiUrl(endpoint);
    console.log(`PAGE = ${page} | OFFSET = ${(page - 1) * limit} | LIMIT = ${limit}`)
    url.searchParams.append('offset', `${(page - 1) * limit}`);
    url.searchParams.append('limit', `${limit}`);
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  };