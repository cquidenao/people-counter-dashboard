"use client";

import { useEffect, useMemo, useState } from "react";
import KpiCard from "../components/KpiCard";
import EventsTable from "../components/EventsTable";
import MetricsChart from "../components/MetricsChart";
import SnapshotsGrid from "../components/SnapshotsGrid";

type Metrics = {
  total: number;
  last_1h: number;
  last_24h: number;
};

type EventOut = {
  id: string;
  ts: string;
  camera_id?: string | null;
  direction: string;
  count_delta: number;
  meta?: Record<string, any> | null;
};

type SeriesPoint = { label: string; value: number };

// ✅ Si quieres volver a .env luego, cámbialo por process.env.NEXT_PUBLIC_API_BASE
const API_BASE = "http://127.0.0.1:8000";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

function authHeaders() {
  return API_KEY ? { "x-api-key": API_KEY } : {};
}

function buildSeriesFromEvents(events: EventOut[], hours = 12): SeriesPoint[] {
  const now = new Date();
  const buckets = new Map<string, number>();

  for (let i = hours - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 60 * 60 * 1000);
    const key = `${String(d.getHours()).padStart(2, "0")}:00`;
    buckets.set(key, 0);
  }

  for (const e of events) {
    const t = new Date(e.ts);
    const key = `${String(t.getHours()).padStart(2, "0")}:00`;
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) || 0) + (e.count_delta || 0));
  }

  return Array.from(buckets.entries()).map(([label, value]) => ({ label, value }));
}

export default function Page() {
  const [metrics, setMetrics] = useState<Metrics>({ total: 0, last_1h: 0, last_24h: 0 });
  const [events, setEvents] = useState<EventOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("—");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const [mRes, eRes] = await Promise.all([
        fetch(`${API_BASE}/metrics`, { headers: authHeaders(), cache: "no-store" }),
        fetch(`${API_BASE}/events?limit=48`, { headers: authHeaders(), cache: "no-store" }), // 👈 más eventos para galería
      ]);

      if (!mRes.ok) throw new Error(`metrics ${mRes.status}`);
      if (!eRes.ok) throw new Error(`events ${eRes.status}`);

      const m = (await mRes.json()) as Metrics;
      const e = (await eRes.json()) as EventOut[];

      setMetrics(m);
      setEvents(e);
      setLastUpdated(new Date().toLocaleString());
    } catch (err: any) {
      setError(err?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const series: SeriesPoint[] = useMemo(() => buildSeriesFromEvents(events, 12), [events]);

  return (
    <main className="min-h-screen bg-[#070A12] text-slate-100">
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-white/5 bg-[#070A12]/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/80 to-cyan-400/70 shadow-lg shadow-indigo-500/20 grid place-items-center">
              <span className="font-black">PC</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">People Counter</h1>
              <p className="text-xs text-slate-400">Totem · métricas y eventos</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Modo</p>
            <p className="text-sm font-semibold">
              Live <span className="text-slate-500 font-normal">· FastAPI</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Hero */}
        <div className="mb-6 rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Control operacional del tótem</h2>
              <p className="mt-1 text-sm text-slate-400">KPIs, tendencia, eventos y capturas.</p>
              {error ? (
                <p className="mt-2 text-sm text-rose-300">
                  Error: {error} · Revisa API_BASE / CORS / API_KEY
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2">
                <p className="text-xs text-slate-400">Última actualización</p>
                <p className="text-sm font-semibold">{lastUpdated}</p>
              </div>

              <button
                onClick={load}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold hover:bg-white/[0.06] transition"
              >
                {loading ? "Actualizando..." : "Actualizar"}
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <section className="grid gap-4 md:grid-cols-3 mb-6">
          <KpiCard title="Total acumulado" value={metrics.total} subtitle="Histórico" trend="live" />
          <KpiCard title="Última 1 hora" value={metrics.last_1h} subtitle="Últimos 60 min" trend="live" />
          <KpiCard title="Últimas 24 horas" value={metrics.last_24h} subtitle="Últimas 24h" trend="live" />
        </section>

        {/* Main grid */}
        <section className="grid gap-4 lg:grid-cols-5">
          {/* Chart */}
          <div className="lg:col-span-3 rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Tendencia</h3>
                <p className="text-xs text-slate-400">Agrupado por hora (últimas 12h)</p>
              </div>
              <span className="text-xs rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-slate-300">
                Live
              </span>
            </div>
            <div className="h-[280px]">
              <MetricsChart series={series as any} />
            </div>
          </div>

          {/* Events */}
          <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Últimos eventos</h3>
                <p className="text-xs text-slate-400">Últimos registros</p>
              </div>
              <span className="text-xs rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                Online
              </span>
            </div>
            <EventsTable events={events as any} apiBase={API_BASE} />
          </div>
        </section>

        {/* ✅ Snapshots gallery */}
        <section className="mt-6">
          <SnapshotsGrid events={events as any} apiBase={API_BASE} limit={24} />
        </section>

        <div className="mt-6 text-xs text-slate-500">People Counter · Dashboard v1 · API: {API_BASE}</div>
      </div>
    </main>
  );
}
