import React, { useState, useEffect } from "react";
import axios from "axios";

const KimonoList = () => {
  const [kimonos, setKimonos] = useState([]);

  useEffect(() => {
    axios.get("/api/kimonos").then((response) => {
      setKimonos(response.data);
    });
  }, []);

  return (
    <ul>
      {kimonos.map((kimono) => (
        <li key={kimono._id}>
          <h2>{kimono.name}</h2>
          <p>Current price: {kimono.price[0]}</p>
          <p>Previous price: {kimono.former_price[0]}</p>
          <p>Last checked timestamp: {kimono.timestamp[0]}</p>
          {kimono.img && <img src={kimono.img} alt={kimono.name} />}
        </li>
      ))}
    </ul>
  );
};

export default KimonoList;
