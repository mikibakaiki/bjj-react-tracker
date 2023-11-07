import React from "react";
import { Kimono } from "../types"; // Import the Kimono interface
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"; // You may need to install the 'recharts' library

interface KimonoGraphProps {
  kimono: Kimono;
  onClose: () => void;
}

const KimonoGraph: React.FC<KimonoGraphProps> = ({ kimono, onClose }) => {
  return (
    <div className="kimono-graph">
      <button onClick={onClose}>Close</button>
      <h2>Price History Graph for {kimono.name}</h2>
      <LineChart
        width={400}
        height={300}
        data={kimono.price.map((price: number, index: number) => ({
          date: kimono.timestamp[index],
          price,
        }))}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default KimonoGraph;
