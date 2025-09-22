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
    <main className="max-w-[1366px] space-x-10 mx-auto mt-10 px-4 space-y-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 drop-shadow">Minhas Listas</h1>
        <p className="text-text-secondary mt-1">Organize suas tarefas em diferentes listas.</p>
        <button
          onClick={handles.handleCreateList}
          type="button"
          className="cursor-pointer mt-4 flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 text-white font-semibold shadow hover:brightness-110 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path stroke="currentColor" strokeWidth="2" d="M12 8v8M8 12h8" />
          </svg>
          Nova lista
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.lists.map(({ publicId, name, todos }: ITodoListWhitTodo) => (
          <section key={publicId} className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/30 p-6 flex flex-col">
            <div className="flex flex-col items-center justify-between mb-4">
              <div className="flex w-full justify-end gap-x-4">
                <button
                  onClick={() => handles.handleAddItem(publicId)}
                  type="button"
                  className="cursor-pointer p-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 transition"
                  title="Adicionar item à lista"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                    <path stroke="white" strokeWidth="2" d="M12 8v8M8 12h8" />
                  </svg>
                </button>
                <button
                  onClick={() => handles.handleRemoveList(publicId)}
                  type="button"
                  className="cursor-pointer p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                  title="Remover lista"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path stroke="currentColor" strokeWidth="2" d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                </button>
              </div>
              <EditableTitle listTitle={name} id={publicId} handleSubmit={handles.handleUpdate} />
            </div>
            =
            {todos.map(({ publicId, title }) => {
              return <TodoList id={publicId} title={title} refetch={handles.refetch} key={publicId} />;
            })}
          </section>
        ))}
      </div>
    </main>
  );
}
