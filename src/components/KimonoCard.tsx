import React, { useEffect } from "react";
import "./KimonoCard.css";
import { Kimono } from "../types";

interface KimonoCardProps {
  kimono: Kimono | null; // Allow null for loading state
  onClick: (kimono: Kimono) => void;
}

const KimonoCard: React.FC<KimonoCardProps> = ({ kimono, onClick}) => {
  // Simulated loading state for demonstration. In a real app, you might manage this state differently.
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading completion. You would replace this with actual loading logic.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200); // Simulate a fetch time
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !kimono) {
    return (
      <div className="kimono-card loading">
        <div className="shimmer"></div>
      </div>
    );
  }

  return (
    <div className="kimono-card" onClick={() => onClick?.(kimono)}>
      <div className="image-container">
        {kimono.img ? (
          <img src={kimono.img} alt={kimono.name} />
        ) : (
          <div className="placeholder">No Image Available</div>
        )}
      </div>
        <div className="kimono-card-details">
          <div className="kimono-card-title">{kimono.name}</div>
          <div className="kimono-card-price">Latest Price: {kimono.price[kimono.price.length - 1]}€</div>
          <div className="kimono-card-meta">Last Update: {kimono.timestamp[kimono.timestamp.length - 1]}</div>
          <div className="kimono-card-meta">Discount: {kimono.discount[kimono.discount.length - 1]}%</div>
        </div>
    </div>
  );
};

export default KimonoCard;
