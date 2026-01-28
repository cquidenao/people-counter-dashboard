"use client";

import { Line } from "react-chartjs-2";
import type { SeriesPoint } from "../lib/types";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function MetricsChart({ series }: { series: SeriesPoint[] }) {
  const labels = series.map((p) => p.label);
  const data = series.map((p) => p.value);

  return (
  <div className="h-full w-full">
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Personas",
            data,
            tension: 0.35,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      }}
    />
  </div>
);

}
