import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./KimonoGraph.css";
import { DateTime } from "luxon";
import { Kimono } from "../types";


interface KimonoGraphProps {
  kimono: Kimono;
  onClose: () => void;
}

interface DataPoint {
  date: string;
  price: number;
}

const KimonoGraph: React.FC<KimonoGraphProps> = ({ kimono, onClose }) => {

  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filterDataByPeriod = (data: DataPoint[], period: string): DataPoint[] => {
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
  
    return data.filter(({date}) => {
      const dateTime = DateTime.fromFormat(date, 'dd/MM/yyyy');
      return dateTime >= startDate;
    });
  };

  const preparedData: DataPoint[] = kimono.timestamp.map((timestamp, index) => ({
    date: timestamp,
    price: kimono.price[index],
  }));

  const filteredData = filterDataByPeriod(preparedData, selectedPeriod);

  const calculateExtremes = (data: DataPoint[]) => {
    return data.map(d => ({
      ...d,
      minPrice: Math.min(...kimono.price),
      maxPrice: Math.max(...kimono.price)
    }));
  };
  
  const extremeData = calculateExtremes(filteredData);

  return (
    <div className="kimono-graph">
      <h2>Price History for {kimono.name}</h2>
      <div className="timeframe-pills">
        {["all", "1year", "6months", "3months"].map((period) => (
          <button
            key={period}
            className={`pill ${selectedPeriod === period ? "active" : ""}`}
            onClick={() => setSelectedPeriod(period)}
          >
            {period === "1year"
              ? "Last Year"
              : period === "6months"
              ? "Last 6 Months"
              : period === "3months"
              ? "Last 3 Months"
              : "All"}
          </button>
        ))}
      </div>
      <div className="chart-container">
        <LineChart
          width={window.innerWidth < 768 ? 300 : 700}
          height={window.innerWidth < 768 ? 200 : 400}
          data={extremeData}
        >
          <XAxis
            dataKey="date"
            tickFormatter={(dateStr) =>
              DateTime.fromFormat(dateStr, "dd/MM/yyyy").toFormat("dd LLL")
            }
          />
          <Tooltip
            formatter={(value) => `${Number(value).toFixed(2)}€`}
            labelFormatter={(label) =>
              DateTime.fromFormat(label, "dd/MM/yyyy").toFormat("dd LLL yyyy")
            }
          />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <Line
            type="monotone"
            name="Min Price"
            dataKey="minPrice"
            stroke="#82ca9d"
            dot={false}
          />
          <Line
            type="monotone"
            name="Max Price"
            dataKey="maxPrice"
            stroke="#FF6347"
            dot={false}
          />
        </LineChart>
      </div>
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default KimonoGraph;
