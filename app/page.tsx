import KpiCard from "../components/KpiCard";
import EventsTable from "../components/EventsTable";
import MetricsChart from "../components/MetricsChart";
import { mockMetrics, mockEvents, mockSeries } from "../lib/mock";

export default function Page() {
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
              Mock <span className="text-slate-500 font-normal">· listo para Vercel</span>
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
              <h2 className="text-2xl font-bold tracking-tight">
                Control operacional del tótem
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                KPIs principales, tendencia y últimos eventos (cuando conectemos el backend, esto se vuelve tiempo real).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2">
                <p className="text-xs text-slate-400">Última actualización</p>
                <p className="text-sm font-semibold">{new Date().toLocaleString()}</p>
              </div>

              <button className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold hover:bg-white/[0.06] transition">
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <section className="grid gap-4 md:grid-cols-3 mb-6">
          <KpiCard
            title="Total acumulado"
            value={mockMetrics.total}
            subtitle="Histórico"
            trend="+3.1%"
          />
          <KpiCard
            title="Última 1 hora"
            value={mockMetrics.last_1h}
            subtitle="Últimos 60 min"
            trend="pico"
          />
          <KpiCard
            title="Últimas 24 horas"
            value={mockMetrics.last_24h}
            subtitle="Últimas 24h"
            trend="+1.2%"
          />
        </section>

        {/* Main grid */}
        <section className="grid gap-4 lg:grid-cols-5">
          {/* Chart */}
          <div className="lg:col-span-3 rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Tendencia</h3>
                <p className="text-xs text-slate-400">Distribución horaria (mock)</p>
              </div>
              <span className="text-xs rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-slate-300">
                Últimas horas
              </span>
            </div>
            <div className="h-[280px]">
              <MetricsChart series={mockSeries} />
            </div>
          </div>

          {/* Events */}
          <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Últimos eventos</h3>
                <p className="text-xs text-slate-400">Últimos 12 registros</p>
              </div>
              <span className="text-xs rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                Online
              </span>
            </div>
            <EventsTable events={mockEvents} />
          </div>
        </section>

        {/* Footer */}
        <div className="mt-6 text-xs text-slate-500">
          People Counter · Dashboard v1 · Próximo paso: conectar API real.
        </div>
      </div>
    </main>
  );
}
