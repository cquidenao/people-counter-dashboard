import type { EventRow } from "../lib/types";

export default function EventsTable({ events }: { events: EventRow[] }) {
  return (
    <div className="space-y-3">
      {events.map((e) => (
        <div
          key={e.id}
          className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.04] transition"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-slate-300">
                {e.camera_id}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(e.ts).toLocaleTimeString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-200 truncate">
              Persona detectada · Δ {e.count_delta}
            </p>
            <p className="text-xs text-slate-500">
              Track: {e.track_id ?? "—"}
            </p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-extrabold">{e.count_delta}</div>
            <div className="text-xs text-slate-500">count</div>
          </div>
        </div>
      ))}
    </div>
  );
}
