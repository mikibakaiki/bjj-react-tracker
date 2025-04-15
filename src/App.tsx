import { useState } from "react";
import KimonoGraph from "./components/KimonoGraph";
import SearchBar from "./components/SearchBar";
import "./App.scss";
import { Kimono, SortDirection, TimePeriod } from "./types";
import BeltLoader from "./components/BeltLoader";
import Modal from "./components/Modal";
import FilterBar from "./components/FilterBar";
import { KimonoList } from "./components/KimonoList";
import { useKimonoData } from "./hooks/useKimonoData";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

function App() {
  const [selectedKimono, setSelectedKimono] = useState<Kimono | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const {
    kimonos,
    inputValue,
    handleInputChange,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useKimonoData({ timePeriod, sortDirection });

  useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  if (status === "pending") {
    return (
      <div className="loader-container">
        <BeltLoader />
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <div className="header-title">Brazilian Jiu-Jitsu Kimonos</div>
        <div className="search-bar-container">
          <SearchBar value={inputValue} onChange={handleInputChange} />
        </div>
        <FilterBar
          timePeriod={timePeriod}
          onTimePeriodChange={(period) => setTimePeriod(period as TimePeriod)}
          sortDirection={sortDirection}
          onSortChange={setSortDirection}
        />
      </header>

      <KimonoList
        kimonos={kimonos}
        onKimonoClick={setSelectedKimono}
        isFetchingNextPage={isFetchingNextPage}
      />

      {isFetchingNextPage && (
        <div className="loader-overlay">
          <BeltLoader />
        </div>
      )}

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
