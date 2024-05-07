import React, { useState } from "react";
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
import { Kimono } from "../types";


interface KimonoGraphProps {
  kimono: Kimono;
  onClose: () => void;
}

const KimonoGraph: React.FC<KimonoGraphProps> = ({ kimono, onClose }) => {

  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filterDataByPeriod = (data: {timestamp: string, price: number}, period: string): string[] => {
    const now = DateTime.now();
    let startDate: DateTime;
  
    switch (period) {
      case '3months':
        startDate = now.minus({ months: 3 });
        break;
      case '6months':
        startDate = now.minus({ months: 6 });
        break;
      case '1year':
        startDate = now.minus({ years: 1 });
        break;
      case 'all':
      default:
        return data; // No filtering needed
    }
  
    return data.filter((timestamp: string) => {
      const dateTime = DateTime.fromFormat(timestamp, 'dd/MM/yyyy');
      return dateTime >= startDate;
    });
  };

  const preparedData = kimono.timestamp.map((timestamp, index) => ({
    date: timestamp,
    price: kimono.price[index],
  }));

  const filteredData = filterDataByPeriod(preparedData, selectedPeriod);


  return (
    <div className="kimono-graph">
      <h2>Price History for {kimono.name}</h2>
      <LineChart
        width={400}
        height={300}
        data={filteredData}
      >
        <XAxis dataKey="date" />
        <Tooltip />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
      <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
        <option value="all">All</option>
        <option value="3months">Last 3 Months</option>
        <option value="6months">Last 6 Months</option>
        <option value="1year">Last Year</option>
      </select>
      <button onClick={onClose}>Close</button>
    </div>

  );
};

export default KimonoGraph;
