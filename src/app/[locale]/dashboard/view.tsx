import EditableTitle from "@/common/components/editableTitle";
import TodoList from "@/common/components/todo";
import { TodoList as ITodoList, Todo } from "@prisma/client";

interface ITodoListWhitTodo extends ITodoList {
  todos: Todo[];
}

export interface IViewProps {
  data: {
    locale: string;
    lists: any[];
    isCreating: boolean;
    isRemoving: boolean;
    isCreatingItem: boolean;
  };
  handles: {
    handleCreateList: () => void;
    handleRemoveList: (id: string) => void;
    handleAddItem: (listId: string) => void;
    handleUpdate: ({ id, title }: { id: string; title: string }) => Promise<void>;
    refetch: () => void;
  };
}

export default function View({ data, handles }: IViewProps) {
  return (
    <main className="max-w-[1366px] mx-auto mt-10 px-4 space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 drop-shadow">Minhas Listas</h1>
        <p className="text-text-secondary mt-1">Organize suas tarefas em diferentes listas.</p>
        <button
          onClick={handles.handleCreateList}
          type="button"
          disabled={data.isCreating}
          className={`cursor-pointer mt-4 flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 text-white font-semibold shadow hover:brightness-110 transition
            ${data.isCreating ? "opacity-60 cursor-not-allowed" : ""}
          `}
        >
          {data.isCreating ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path stroke="currentColor" strokeWidth="2" d="M12 8v8M8 12h8" />
            </svg>
          )}
          Nova lista
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.lists.map(({ publicId, name, todos }: ITodoListWhitTodo) => (
          <section
            key={publicId}
            className={`bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/30 p-6 flex flex-col relative transition
              ${data.isRemoving ? "opacity-60 pointer-events-none" : ""}
            `}
          >
            {/* Overlay de loading ao remover lista */}
            {data.isRemoving && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-2xl z-10">
                <svg className="w-8 h-8 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              </div>
            )}

            <div className="flex flex-col items-center justify-between mb-4">
              <div className="flex w-full justify-end gap-x-4">
                <button
                  onClick={() => handles.handleAddItem(publicId)}
                  type="button"
                  disabled={data.isCreatingItem}
                  className={`cursor-pointer p-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 transition
                    ${data.isCreatingItem ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                  title="Adicionar item à lista"
                >
                  {data.isCreatingItem ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                      <path stroke="white" strokeWidth="2" d="M12 8v8M8 12h8" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => handles.handleRemoveList(publicId)}
                  type="button"
                  disabled={data.isRemoving}
                  className={`cursor-pointer p-2 rounded-full bg-red-100 hover:bg-red-200 transition
                    ${data.isRemoving ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                  title="Remover lista"
                >
                  {data.isRemoving ? (
                    <svg className="w-5 h-5 animate-spin text-red-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path stroke="currentColor" strokeWidth="2" d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                  )}
                </button>
              </div>
              <EditableTitle listTitle={name} id={publicId} handleSubmit={handles.handleUpdate} />
            </div>
            <div>
              {todos.length === 0 ? (
                <div className="text-center text-indigo-300 py-8">Nenhuma tarefa nesta lista.</div>
              ) : (
                todos.map(({ publicId, title, status }) => <TodoList key={publicId} id={publicId} title={title} refetch={handles.refetch} status={status} />)
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
