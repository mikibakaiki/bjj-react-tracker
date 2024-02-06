import React, { useState, useEffect } from "react";
import KimonoCard from "./components/KimonoCard"; // Create a KimonoCard component for displaying kimono details
import KimonoGraph from "./components/KimonoGraph";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar"; // Create a KimonoGraph component for displaying price history
import { getKimonoList } from "./services/api.service";
import "./App.css";

function App() {
  const [kimonos, setKimonos] = useState<Kimono[]>([]); // State to store kimono data
  const [selectedKimono, setSelectedKimono] = useState<Kimono | null>(null); // State for selected kimono
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  // const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  // const [kimonosPerPage] = useState<number>(10); // Number of kimonos to display per page
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Fetch kimono data from the API and update the kimonos state
  useEffect(() => {
    const fetchMoreKimonos = async () => {
      setIsLoading(true);
      // Fetch next set of kimonos based on the page number
      // Append them to the existing kimonos list
      setIsLoading(false);
    };
    fetchMoreKimonos();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <div className="kimono-cards">
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
        <KimonoGraph
          kimono={selectedKimono}
          onClose={() => setSelectedKimono(null)}
        />
      )}
    </div>
  );
}

export default App;
