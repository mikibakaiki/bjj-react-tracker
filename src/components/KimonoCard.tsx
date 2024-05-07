import React from "react";
import "./KimonoCard.css";
import { Kimono } from "../types";

interface KimonoCardProps {
  kimono: Kimono;
  onClick: (kimono: Kimono) => void;
}

const KimonoCard: React.FC<KimonoCardProps> = ({ kimono, onClick}) => {
  // Simulated loading state for demonstration. In a real app, you might manage this state differently.
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading completion. You would replace this with actual loading logic.
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800); // Simulate a fetch time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="kimono-card" onClick={() => onClick(kimono)}>
      {isLoading ? (
        <div className="shimmer"></div>
      ) : (
      <>
        <img src={kimono.img} alt={kimono.name} />
        <h3>{kimono.name}</h3>
        <p>Latest Price: {kimono.price[kimono.price.length - 1]}€</p>
        <p>Last Update: {kimono.timestamp[kimono.timestamp.length - 1]}</p>
        <p>Discount: {kimono.discount[kimono.discount.length - 1]}%</p>
      </>
    )}
    </div>
  );
};

export default KimonoCard;
