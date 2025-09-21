import Link from "next/link";

export interface IViewProps {
  data: {};
  handles: {};
}

export default function View({ data, handles }: IViewProps) {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo e nome */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 shadow">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" />
              <path d="M10 16l4 4 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-2xl font-bold text-white drop-shadow">TodoApp</span>
        </div>

        <nav className="hidden md:flex gap-6"></nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-white font-semibold shadow"
            aria-label="Trocar idioma"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.07-6.93l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93" />
              <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="hidden sm:inline">Idioma</span>
          </button>
          {/* Avatar do usuário (placeholder visual) */}
          <span className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-white font-bold shadow">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path stroke="currentColor" strokeWidth="2" d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
          </span>
        </div>

        {/* Menu mobile */}
        <div className="md:hidden flex items-center">
          <button type="button" className="text-white hover:text-yellow-300 focus:outline-none" aria-label="Abrir menu">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-4">
        <nav className="flex flex-col gap-2 mt-2 bg-white/10 rounded-xl shadow text-white backdrop-blur"></nav>
      </div>
    </header>
  );
}
