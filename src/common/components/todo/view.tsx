import { TodoStatus } from "@prisma/client";
import { Check, Loader2 } from "lucide-react";
import EditableTitle from "../editableTitle";

export interface IViewProps {
  data: {
    title: string;
    id: string;
    status: TodoStatus;
    newStatus: TodoStatus;
    isRemoving: boolean;
  };
  handles: {
    handleRemove: () => void;
    handleUpdateItem: (data: { id: string; title: string }) => Promise<void>;
    handleUpdateStatus: () => void;
  };
}

export default function View({ data, handles }: IViewProps) {
  return (
    <section className="w-full max-w-2xl mx-auto mt-8">
      <ul className="space-y-4">
        <li className="relative flex items-center justify-between bg-white/80 backdrop-blur rounded-xl shadow p-4 border border-white/30 transition">
          {data.isRemoving && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl z-10">
              <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handles.handleUpdateStatus}
              disabled={data.isRemoving}
              className={`
                relative w-10 h-8 cursor-pointer flex items-center justify-center rounded-full border-2 transition
                focus:outline-none
                ${data.newStatus === "PENDING" && "border-gray-400 bg-white hover:bg-gray-100"}
                ${data.newStatus === "IN_PROGRESS" && "border-yellow-500 bg-yellow-50 hover:bg-yellow-100"}
                ${data.newStatus === "COMPLETED" && "border-green-600 bg-green-50 hover:bg-green-100"}
                ${data.isRemoving ? "opacity-60 pointer-events-none" : ""}
              `}
              title={data.newStatus}
            >
              {data.newStatus === "PENDING" && <span className="block w-4 h-4 rounded-full border border-gray-300 bg-white" />}
              {data.newStatus === "IN_PROGRESS" && <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />}
              {data.newStatus === "COMPLETED" && <Check className="w-5 h-5 text-green-600" />}
            </button>

            <EditableTitle id={data.id} listTitle={data.title} handleSubmit={handles.handleUpdateItem} />
          </div>

          <button
            onClick={handles.handleRemove}
            type="button"
            disabled={data.isRemoving}
            className={`p-2 rounded-full bg-red-100 hover:bg-red-200 transition ${data.isRemoving ? "opacity-60 pointer-events-none" : ""}`}
            title="Remover tarefa"
          >
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
