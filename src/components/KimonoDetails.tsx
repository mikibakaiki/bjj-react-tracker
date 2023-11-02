import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import Kimono from "./models/Kimono";

const KimonoDetails = ({ kimono: Kimono }) => {
  const [priceChangeHistory, setPriceChangeHistory] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/kimonos/${kimono._id}/price-change-history`)
      .then((response) => {
        setPriceChangeHistory(response.data);
      });
  }, [kimono]);

  const renderPriceChangeHistoryGraph = () => {
    const ctx = document.getElementById("price-change-history-graph");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: priceChangeHistory.map((price) => price.timestamp),
        datasets: [
          {
            label: "Price",
            data: priceChangeHistory.map((price) => price.price),
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderColor: "rgba(0, 0, 255, 1)",
          },
        ],
      },
    });
  };

  return (
    <div>
      <h2>{kimono.name}</h2>
      <p>Current price: {kimono.price[0]}</p>
      <p>Previous price: {kimono.former_price[0]}</p>
      <p>Last checked timestamp: {kimono.timestamp[0]}</p>
      {kimono.img && <img src={kimono.img} alt={kimono.name} />}
      <canvas id="price-change-history-graph"></canvas>
    </div>
  );
};

export default KimonoDetails;
