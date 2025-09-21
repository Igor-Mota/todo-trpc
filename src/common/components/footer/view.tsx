export interface IViewProps {
  data: {};
  handles: {};
}

export default function View({ data, handles }: IViewProps) {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-400 text-white py-4 mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-sm font-medium drop-shadow">© {new Date().getFullYear()} TodoApp. Todos os direitos reservados.</span>
        <div className="flex gap-4">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            GitHub
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            Suporte
          </a>
        </div>
      </div>
    </footer>
  );
}
