// components/EmptyCard.tsx
import React from "react";
import "./EmptyCard.scss";

const EmptyCard: React.FC = () => {
  return (
    <div className="empty-card">
      <div className="empty-card-image"></div>
      <div className="empty-card-details">
        <div className="empty-card-title"></div>
        <div className="empty-card-subtitle"></div>
      </div>
    </div>
  );
};

export default EmptyCard;
