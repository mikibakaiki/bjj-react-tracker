import React from "react";
import { Kimono } from "../types";
import KimonoCard from "./KimonoCard";

interface KimonoListProps {
  kimonos: Kimono[];
  onKimonoClick: (kimono: Kimono) => void;
  isFetchingNextPage: boolean;
}

export const KimonoList: React.FC<KimonoListProps> = ({
  kimonos,
  onKimonoClick,
  isFetchingNextPage,
}) => (
  <div className="kimono-card-list">
    {kimonos.map((kimono) => (
      <KimonoCard key={kimono._id} kimono={kimono} onClick={onKimonoClick} />
    ))}
    {isFetchingNextPage &&
      Array.from({ length: 20 }).map((_, index) => (
        <KimonoCard
          key={`loading-${index}`}
          kimono={null}
          onClick={() => null}
        />
      ))}
  </div>
);
