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
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const [kimonosPerPage] = useState<number>(10); // Number of kimonos to display per page

  // Fetch kimono data from the API and update the kimonos state
  useEffect(() => {
    // Make an API request here and update the kimonos state
    // Example: fetch('your_api_endpoint_here')
    //   .then((response) => response.json())
    //   .then((data) => setKimonos(data))
    //   .catch((error) => console.error('Error fetching data:', error));
    setKimonos(getKimonoList);
  }, []);

  // Filter kimonos based on search query
  const filteredKimonos = kimonos.filter(
    (kimono) =>
      kimono.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kimono.price.some((price) => price.toString().includes(searchQuery)),
  );

  // Calculate the index of the last kimono to display on the current page
  const indexOfLastKimono = currentPage * kimonosPerPage;
  // Calculate the index of the first kimono to display on the current page
  const indexOfFirstKimono = indexOfLastKimono - kimonosPerPage;
  // Get the kimonos to display on the current page
  const currentKimonos = filteredKimonos.slice(
    indexOfFirstKimono,
    indexOfLastKimono,
  );

  // Function to handle kimono card click and display price history
  const handleKimonoCardClick = (kimono: Kimono) => {
    setSelectedKimono(kimono);
  };

  // Function to handle pagination page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
        {currentKimonos.map((kimono) => (
          <KimonoCard
            key={kimono._id}
            kimono={kimono}
            onClick={handleKimonoCardClick}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <Pagination
          itemsPerPage={kimonosPerPage}
          totalItems={filteredKimonos.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
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
