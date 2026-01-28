type Props = {
  title: string;
  value: number | string;
  subtitle?: string;
  trend?: string;
};

export default function KpiCard({ title, value, subtitle, trend }: Props) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-slate-400">{title}</p>
          <div className="mt-3 flex items-end gap-3">
            <p className="text-4xl font-extrabold tracking-tight">{value}</p>
            {trend ? (
              <span className="mb-1 text-xs rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-slate-300">
                {trend}
              </span>
            ) : null}
          </div>
          {subtitle ? <p className="mt-2 text-xs text-slate-500">{subtitle}</p> : null}
        </div>

        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/50 to-cyan-400/40 border border-white/10" />
      </div>
    </div>
  );
}
