const getApiUrl = (endpoint: string) => new URL(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/${endpoint}`);

export const getKimonos = async <T>(endpoint: string, page: number, limit: number, filter: string, options?: RequestInit): Promise<T> => {
    // Construct query parameters for pagination: limit = # of kimonos/page; offset=page
    const url = getApiUrl(endpoint);
    url.searchParams.append('offset', `${(page - 1) * limit}`);
    url.searchParams.append('limit', `${limit}`);
    filter !== "" ?  url.searchParams.append('filter', filter) : url.searchParams.delete('filter');
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  };