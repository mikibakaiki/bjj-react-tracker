import React, { useState, useEffect } from "react";
import KimonoCard from "./components/KimonoCard"; // Create a KimonoCard component for displaying kimono details
import KimonoGraph from "./components/KimonoGraph";
import SearchBar from "./components/SearchBar"; // Create a KimonoGraph component for displaying price history
import "./App.scss";
import { debounce } from 'lodash';
import { getKimonos } from "./services/api.service";
import { DateTime } from "luxon";
import { Kimono } from "./types";
import Modal from "./components/Modal";

function App() {
  const [kimonos, setKimonos] = useState<Kimono[]>([]); // State to store kimono data
  const [selectedKimono, setSelectedKimono] = useState<Kimono | null>(null); // State for selected kimono
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const [page, setPage] = useState(1); // State for pagination
  const [hasMoreKimonos, setHasMoreKimonos] = useState(true); // State for checking if there are more kimonos to fetch
  

  const preprocessKimonosDates = (kimonos: Kimono[]) => {
    return kimonos.map((kimono) => {
      const formattedDates = kimono.timestamp.map((timestampString) => {
        return DateTime.fromISO(timestampString).toFormat('dd/MM/yyyy');
      });
      return { ...kimono, timestamp: formattedDates };
    });
  };

  const fetchKimonos = async () => {
    setIsLoading(true);
    try {
      const data = await getKimonos<Kimono[]>('kimonos', page, 20, searchQuery);
      const processedData = preprocessKimonosDates(data);
      if (page === 1) {
        setKimonos(processedData);
      } else {
        setKimonos(prevKimonos => [...prevKimonos, ...processedData]);
      }
      setHasMoreKimonos(data.length === 20);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  // Debounce Kimonos search query to avoid making too many requests in a short period of time
  const debouncedFetch = debounce(fetchKimonos, 300);
  
  const loadMoreItems = () => {
    if (!isLoading && hasMoreKimonos) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  
  // Debounce the loadMoreItems function so it only triggers once after a specified delay
  const debouncedLoadMoreItems = debounce(loadMoreItems, 100);

  const handleKimonoCardClick = (kimono: Kimono) => {
    setSelectedKimono(kimono);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  useEffect(() => {
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchQuery, page]);
  
  useEffect(() => {
    const handleScroll = () => {
      // Checks if the user is within 100px from the bottom
      const bottom = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 100;
      if (bottom) {
        debouncedLoadMoreItems();
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      debouncedLoadMoreItems.cancel();
    }
  }, [isLoading, hasMoreKimonos]);

  return (
    <div className="App">
      {/* Header */}
      <header>
        <div className="header-title">Brazilian Jiu-Jitsu Kimonos</div>
        {/* Search bar and filter options */}
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
      </header>
      {/* Kimono Cards */}
      
        <div className="kimono-card-list">
          {kimonos.map((kimono) => (
            <KimonoCard
              key={kimono._id}
              kimono={kimono}
              onClick={handleKimonoCardClick}
            />
          ))}
        </div>
      
      {isLoading && <div>Loading more kimonos...</div>}
      {/* Kimono Price History */}
      {selectedKimono && (
        <Modal onClose={() => setSelectedKimono(null)}>
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
