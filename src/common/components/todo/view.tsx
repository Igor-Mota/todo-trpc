import { TodoStatus } from "@prisma/client";
import EditableTitle from "../editableTitle";

export interface IViewProps {
  data: {
    title: string;
    id: string;
  };
  handles: {
    handleRemove: () => void;
    handleUpdateItem: (data: { id: string; title: string }) => Promise<void>;
  };
}

export default function View({ data, handles }: IViewProps) {
  return (
    <section className="w-full cursor-grabbing max-w-2xl mx-auto mt-8">
      <ul className="space-y-4">
        <li key={data.id} className="flex items-center justify-between bg-white/80 backdrop-blur rounded-xl shadow p-4 border border-white/30">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="accent-indigo-600 w-5 h-5" title="status" />
            <EditableTitle id={data.id} listTitle={data.title} handleSubmit={handles.handleUpdateItem} />
          </div>

          <button onClick={handles.handleRemove} type="button" className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition" title="Remover tarefa">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path stroke="currentColor" strokeWidth="2" d="M15 9l-6 6M9 9l6 6" />
            </svg>
          </button>
        </li>
      </ul>
    </section>
  );
}
