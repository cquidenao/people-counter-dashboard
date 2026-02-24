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
  Filler,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

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

              // ✅ HACEN QUE SE VEA EN DARK
              borderColor: "rgba(79, 156, 249, 1)",
              borderWidth: 3,
              pointRadius: 2,
              pointHoverRadius: 5,
              pointBackgroundColor: "rgba(255,255,255,0.9)",

              // ✅ Opcional: relleno suave para visibilidad
              fill: true,
              backgroundColor: "rgba(79, 156, 249, 0.15)",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(15, 18, 24, 0.95)",
              borderColor: "rgba(255,255,255,0.12)",
              borderWidth: 1,
              titleColor: "rgba(255,255,255,0.9)",
              bodyColor: "rgba(255,255,255,0.85)",
              displayColors: false,
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(255,255,255,0.06)" },
              ticks: { color: "rgba(255,255,255,0.65)" },
              border: { color: "rgba(255,255,255,0.12)" },
            },
            y: {
              beginAtZero: true,
              grid: { color: "rgba(255,255,255,0.06)" },
              ticks: { color: "rgba(255,255,255,0.65)", precision: 0 },
              border: { color: "rgba(255,255,255,0.12)" },
            },
          },
        }}
      />
    </div>
  );
}