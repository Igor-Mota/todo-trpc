export interface IViewProps {
  data: {
    title: string;
  };
  handles: {};
}

export default function View({ data, handles }: IViewProps) {
  return (
    <section className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-700"> {data.title}</h2>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 text-white font-semibold shadow hover:brightness-110 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path stroke="currentColor" strokeWidth="2" d="M12 8v8M8 12h8" />
          </svg>
        </button>
      </div>
      =
      <ul className="space-y-4">
        {[1, 2, 3].map((id) => (
          <li key={id} className="flex items-center justify-between bg-white/80 backdrop-blur rounded-xl shadow p-4 border border-white/30">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="accent-indigo-600 w-5 h-5" />
              <span className="text-lg text-indigo-900 font-medium">Tarefa de exemplo {id}</span>
            </div>
            <button type="button" className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition" title="Remover tarefa">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path stroke="currentColor" strokeWidth="2" d="M15 9l-6 6M9 9l6 6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
