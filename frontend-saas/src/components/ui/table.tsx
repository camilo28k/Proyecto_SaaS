type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-5 py-3 text-xs font-black uppercase tracking-wide text-slate-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{children}</tbody>
      </table>
    </div>
  );
}
