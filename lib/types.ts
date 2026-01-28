export type EventRow = {
  id: string;
  ts: string;
  camera_id: string;
  count_delta: number;
  track_id?: string | number | null;
};

export type Metrics = {
  total: number;
  last_1h: number;
  last_24h: number;
};

export type SeriesPoint = {
  label: string;
  value: number;
};
