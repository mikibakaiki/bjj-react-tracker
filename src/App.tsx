import React, { useState, useEffect } from "react";
import KimonoCard from "./components/KimonoCard"; // Create a KimonoCard component for displaying kimono details
import KimonoGraph from "./components/KimonoGraph";
import SearchBar from "./components/SearchBar"; // Create a KimonoGraph component for displaying price history
import "./App.css";
import { debounce } from 'lodash';
import { getKimonos } from "./services/api.service";

function App() {
  const [kimonos, setKimonos] = useState<Kimono[]>([]); // State to store kimono data
  const [selectedKimono, setSelectedKimono] = useState<Kimono | null>(null); // State for selected kimono
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreKimonos, setHasMoreKimonos] = useState(true);


  // Fetch kimono data from the API and update the kimonos state
  useEffect(() => {
    // Fetch next set of kimonos based on the page number
    // Append them to the existing kimonos list
    const fetchMoreKimonos = async () => {
      setIsLoading(true);
      try {
        const data = await getKimonos<Kimono[]>('kimonos', page, 20, searchQuery);
        if (data.length < 20) {
          setHasMoreKimonos(false); // When there are no more items to fetch
        } else {
          // this has to be here, otherwise, when clearing the search, the flag is never set
          setHasMoreKimonos(true);
        }
        if (page === 1) {
          setKimonos(data);
        } else {
          setKimonos(prevKimonos => [...prevKimonos, ...data]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoreKimonos();
  }, [page, searchQuery]);

  const loadMoreItems = () => {
    if (!isLoading && hasMoreKimonos) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  
  // Debounce the loadMoreItems function so it only triggers once after a specified delay
  const debouncedLoadMoreItems = debounce(loadMoreItems, 100);
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

  // Filter kimonos based on search query
  const filteredKimonos = kimonos.filter(
    (kimono) =>
      kimono.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kimono.price.some((price) => price.toString().includes(searchQuery)),
  );

  // Function to handle kimono card click and display price history
  const handleKimonoCardClick = (kimono: Kimono) => {
    setSelectedKimono(kimono);
  };

  // Function to handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="App">
      {/* Header */}
      <header>
        <h1>Brazilian Jiu-Jitsu Kimonos</h1>
        {/* Search bar and filter options */}
        {/* Search bar */}
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
      </header>
      {/* Kimono Cards */}
      <div className="kimono-card-list">
        {filteredKimonos.map((kimono) => (
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
        <KimonoGraph
          kimono={selectedKimono}
          onClose={() => setSelectedKimono(null)}
        />
      )}
    </div>
  );
}

export default App;
