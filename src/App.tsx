import React, { useState, useEffect, useCallback, useRef } from "react";
import KimonoCard from "./components/KimonoCard"; // Create a KimonoCard component for displaying kimono details
import KimonoGraph from "./components/KimonoGraph";
import SearchBar from "./components/SearchBar"; // Create a KimonoGraph component for displaying price history
import "./App.scss";
import { debounce, throttle } from "lodash";
import { getKimonos } from "./services/api.service";
import { DateTime } from "luxon";
import { Kimono } from "./types";
import BeltLoader from "./components/BeltLoader";
import { preprocessKimonosDates } from "./utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import Modal from "./components/Modal";
import FilterBar from "./components/FilterBar";

interface FetchKimonosResponse {
  kimonos: Kimono[];
  nextPage?: number;
}

type SortDirection = "asc" | "desc";
type TimePeriod = "today" | "1month" | "3months" | "6months" | "1year" | "all";
function App() {
  const [selectedKimono, setSelectedKimono] = useState<Kimono | null>(null); // State for selected kimono
  const [inputValue, setInputValue] = useState<string>(""); // For immediate UI updates
  const [searchQuery, setSearchQuery] = useState<string>(""); // For debounced API calls
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const fetchKimonos = async ({
    pageParam = 1,
  }): Promise<FetchKimonosResponse> => {
    const res = await getKimonos<Kimono[]>(
      "kimonos",
      pageParam,
      20,
      searchQuery
    );
    return {
      kimonos: preprocessKimonosDates(res),
      nextPage: res.length === 20 ? pageParam + 1 : undefined,
    } as FetchKimonosResponse;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["kimonos", searchQuery],
    queryFn: fetchKimonos,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Debounced query for API calls
  const debouncedQuery = useRef(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 300)
  ).current;

  const filterByTimePeriod = (kimonos: Kimono[]) => {
    if (timePeriod === "all") return kimonos;

    const now = DateTime.now();
    const periods = {
      today: now.minus({ day: 1 }),
      "1month": now.minus({ months: 1 }),
      "3months": now.minus({ months: 3 }),
      "6months": now.minus({ months: 6 }),
      "1year": now.minus({ years: 1 }),
    };

    return kimonos.filter((kimono) => {
      const latestDate = DateTime.fromFormat(
        kimono.timestamp[kimono.timestamp.length - 1],
        "dd/MM/yyyy"
      );
      return latestDate >= periods[timePeriod];
    });
  };

  // Add sorting function
  const sortKimonos = (kimonos: Kimono[]): Kimono[] => {
    return [...kimonos].sort((a, b) => {
      const priceA = a.price[a.price.length - 1];
      const priceB = b.price[b.price.length - 1];
      return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
    });
  };

  // Handle input change with immediate UI update
  const handleInputChange = (value: string) => {
    // Immediate update for the input field
    setInputValue(value); // Immediate update for UI
    debouncedQuery(value); // Debounced API call
  };

  const handleKimonoCardClick = (kimono: Kimono) => {
    setSelectedKimono(kimono);
  };

  const handleScroll = useCallback(() => {
    const bottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 200;

    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (status === "pending") {
    return (
      <div className="loader-container">
        <BeltLoader />
      </div>
    );
  }

  const allKimonos = sortKimonos(
    filterByTimePeriod(data?.pages.flatMap((page) => page.kimonos) ?? [])
  );

  return (
    <div className="App">
      {/* Header */}
      <header>
        <div className="header-title">Brazilian Jiu-Jitsu Kimonos</div>
        {/* Search bar and filter options */}
        <div className="search-bar-container">
          <SearchBar value={inputValue} onChange={handleInputChange} />
        </div>
        <FilterBar
          timePeriod={timePeriod}
          onTimePeriodChange={(period) =>
            setTimePeriod(period as typeof timePeriod)
          }
          sortDirection={sortDirection}
          onSortChange={setSortDirection}
        />
      </header>

      {/* Kimono Cards */}
      <div className="kimono-card-list">
        {allKimonos.map((kimono) => (
          <KimonoCard
            key={kimono._id}
            kimono={kimono}
            onClick={handleKimonoCardClick}
          />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 20 }).map((_, index) => (
            <KimonoCard
              key={`loading-${index}`}
              kimono={null}
              onClick={() => null}
            />
          ))}
      </div>

      {isFetchingNextPage && (
        <div className="loader-overlay">
          <BeltLoader />
        </div>
      )}

      {/* Kimono Price History */}
      {selectedKimono && (
        <Modal
          onClose={() => setSelectedKimono(null)}
          title={`Price History - ${selectedKimono.name}`}
        >
          <KimonoGraph
            kimono={selectedKimono}
            onClose={() => setSelectedKimono(null)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
