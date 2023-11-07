import React from "react";
import { Kimono } from "../types"; // Import the Kimono interface
import "./KimonoCard.css";

interface KimonoCardProps {
  kimono: Kimono;
  onClick: (kimono: Kimono) => void;
}

const KimonoCard: React.FC<KimonoCardProps> = ({ kimono, onClick }) => {
  return (
    <div className="kimono-card" onClick={() => onClick(kimono)}>
      <img src={kimono.img} alt={kimono.name} />
      <h3>{kimono.name}</h3>
      <p>Latest Price: ${kimono.price[kimono.price.length - 1]}</p>
      <p>Last Update: {kimono.timestamp[kimono.timestamp.length - 1]}</p>
      <p>Discount: {kimono.discount[kimono.discount.length - 1]}%</p>
    </div>
  );
};

export default KimonoCard;
