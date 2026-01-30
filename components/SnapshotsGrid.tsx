"use client";

import { useMemo, useState } from "react";

type EventOut = {
  id: string;
  ts: string;
  meta?: Record<string, any> | null;
};

type Shot = { url: string; ts: string; id: string };

export default function SnapshotsGrid({
  events,
  apiBase,
  title = "Capturas recientes",
  limit = 24,
}: {
  events: EventOut[];
  apiBase: string;
  title?: string;
  limit?: number;
}) {
  const shots: Shot[] = useMemo(() => {
    const out: Shot[] = [];
    const seen = new Set<string>();

    for (const e of events || []) {
      const snap = e?.meta?.snapshot;
      if (!snap) continue;

      // evita duplicados si el backend repite snapshots
      if (seen.has(snap)) continue;
      seen.add(snap);

      out.push({
        id: e.id,
        ts: e.ts,
        url: `${apiBase}/snapshots/${snap}`,
      });
    }

    // orden: más reciente primero
    out.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());

    return out.slice(0, limit);
  }, [events, apiBase, limit]);

  const [open, setOpen] = useState<Shot | null>(null);

  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xs text-slate-400">
            Últimas {shots.length} capturas (click para ampliar)
          </p>
        </div>
        <span className="text-xs rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-slate-300">
          Live
        </span>
      </div>

      {shots.length === 0 ? (
        <div className="text-sm text-slate-400 border border-white/5 rounded-2xl p-4 bg-white/[0.02]">
          Aún no hay capturas. Cuando se cuente alguien y el backend guarde `meta.snapshot`, aparecerán aquí.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {shots.map((s) => (
            <button
              key={s.url}
              onClick={() => setOpen(s)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] aspect-square"
              title={new Date(s.ts).toLocaleString()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.url}
                alt="snapshot"
                className="h-full w-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-[11px] text-slate-200 text-left">
                  {new Date(s.ts).toLocaleTimeString()}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {open ? (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="max-w-3xl w-full overflow-hidden rounded-3xl border border-white/10 bg-[#070A12]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div>
                <p className="text-sm font-semibold text-slate-100">Snapshot</p>
                <p className="text-xs text-slate-400">{new Date(open.ts).toLocaleString()}</p>
              </div>
              <button
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm hover:bg-white/[0.06] transition"
                onClick={() => setOpen(null)}
              >
                Cerrar
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={open.url} alt="snapshot large" className="w-full h-auto" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
