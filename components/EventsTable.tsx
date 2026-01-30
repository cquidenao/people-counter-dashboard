type EventRow = {
  id: string;
  ts: string;
  camera_id?: string | null;
  direction: string;
  count_delta: number;
  meta?: Record<string, any> | null;
};

export default function EventsTable({
  events,
  apiBase,
}: {
  events: EventRow[];
  apiBase: string;
}) {
  return (
    <div className="space-y-3">
      {events.map((e) => {
        const snap = e?.meta?.snapshot;
        const imgUrl = snap ? `${apiBase}/snapshots/${snap}` : null;

        return (
          <div
            key={e.id}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3"
          >
            <div className="h-14 w-14 shrink-0 rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden grid place-items-center">
              {imgUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imgUrl} alt="snapshot" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-slate-500">No img</span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-slate-300">
                  {e.camera_id ?? "—"}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(e.ts).toLocaleTimeString()}
                </span>
                <span className="text-xs rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-slate-300">
                  {e.direction}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-200 truncate">Conteo confirmado · Δ {e.count_delta}</p>

              <p className="text-xs text-slate-500">
                Track: {e?.meta?.track_id ?? "—"} · Person: {e?.meta?.person_id ?? "—"}
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-extrabold">{e.count_delta}</div>
              <div className="text-xs text-slate-500">count</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
