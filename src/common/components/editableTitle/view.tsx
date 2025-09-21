export interface IViewProps {
  data: {
    isEditing: boolean;
    title: string;
  };
  handles: {
    handleEditing: (state: boolean) => void;
    handleChangeTitle: (data: string) => void;
    handleResetTitle: () => void;
    onSubmit: () => void;
  };
}

export default function View({ data, handles }: IViewProps) {
  return (
    <div className="w-full">
      {!data.isEditing ? (
        <h2
          className="text-2xl min-h-[40px] font-bold text-indigo-700 cursor-pointer px-2 py-1 rounded transition hover:bg-indigo-50"
          onDoubleClick={() => handles.handleEditing(true)}
          title="Clique duas vezes para editar"
        >
          {data.title}
        </h2>
      ) : (
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handles.onSubmit();
          }}
        >
          <input
            className="w-[80% min-h-[40px] px-3 py-2 rounded-lg border border-indigo-300 bg-white/80 text-indigo-900 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={data.title}
            onChange={(e) => handles.handleChangeTitle(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 text-white shadow hover:brightness-110 transition"
            title="Salvar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/70 border border-indigo-200 text-indigo-700 shadow hover:bg-indigo-50 transition"
            onClick={() => handles.handleResetTitle()}
            title="Cancelar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
