import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"; // You may need to install the 'recharts' library
import "./KimonoGraph.css";
import { DateTime } from "luxon";


interface KimonoGraphProps {
  kimono: Kimono;
  onClose: () => void;
}

const KimonoGraph: React.FC<KimonoGraphProps> = ({ kimono, onClose }) => {
  return (
    <div className="kimono-graph">
      <h2>Price History for {kimono.name}</h2>
      <LineChart
        width={400}
        height={300}
        data={kimono.price.map((price: number, index: number) => ({
          date: kimono.timestamp[index],
          price,
        }))}
      >
        <XAxis dataKey="date" tickFormatter={(tickItem) => DateTime.fromISO(tickItem).toFormat('dd/MM/yyyy')} />
        <Tooltip labelFormatter={(label) => DateTime.fromISO(label).toFormat('dd/MM/yyyy')} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
      <button onClick={onClose}>Close</button>
    </div>

  );
};

export default KimonoGraph;
