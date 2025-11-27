
import { TECHNOLOGIES } from '../data/courses'

const TechTabs = ({ activeTech, onChange }) => {
  return (
    <div
      id="categorias"
      className="mt-4 flex gap-2 overflow-x-auto no-scrollbar py-1"
    >
      {TECHNOLOGIES.map((tech) => {
        const active = tech === activeTech
        return (
          <button
            key={tech}
            onClick={() => onChange(tech)}
            className={[
              'whitespace-nowrap rounded-full px-4 py-2 text-sm transition',
              active
                ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 font-semibold'
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
