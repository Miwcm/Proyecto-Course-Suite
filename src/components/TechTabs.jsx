
const TechTabs = ({ activeTech, onChange, categories = [] }) => {
  // Si las categorías aún no cargaron, no mostramos nada o un esqueleto
  if (!categories || categories.length === 0) return null;

  return (
    <div
      id="categorias"
      className="mt-4 flex gap-2 overflow-x-auto smart-scrollbar py-2"
    >
      {categories.map((tech) => {
        const active = tech === activeTech
        return (
          <button
            key={tech}
            onClick={() => onChange(tech)}
            className={[
              'whitespace-nowrap rounded-full px-4 py-2 text-sm transition',
              active
                ? 'bg-linear-to-r from-cyan-400 to-fuchsia-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800',
            ].join(' ')}
          >
            {tech}
          </button>
        )
      })}
    </div>
  )
}

export default TechTabs