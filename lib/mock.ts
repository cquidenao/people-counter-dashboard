import type { EventRow, Metrics, SeriesPoint } from "./types";

export const mockMetrics: Metrics = {
  total: 1284,
  last_1h: 73,
  last_24h: 412,
};

export const mockSeries: SeriesPoint[] = [
  { label: "08:00", value: 12 },
  { label: "09:00", value: 18 },
  { label: "10:00", value: 9 },
  { label: "11:00", value: 22 },
  { label: "12:00", value: 45 },
  { label: "13:00", value: 61 },
  { label: "14:00", value: 30 },
  { label: "15:00", value: 14 },
];

export const mockEvents: EventRow[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `evt_${i}`,
  ts: new Date(Date.now() - i * 60_000).toISOString(),
  camera_id: "CAM-01",
  count_delta: 1,
  track_id: 1000 + i,
}));
