
import { useNavigate } from 'react-router'
import { TECHNOLOGIES } from '../data/courses'
import CoursesCarousel from '../components/CoursesCarousel'

const Cursos = () => {
  const navigate = useNavigate()

  const handleVerMas = (tech) => {
    navigate(`/cursos/${encodeURIComponent(tech)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <main className="px-4 pt-6 pb-20 max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold">Cursos</h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Mira los mejores cursos por tecnología y explora todo lo que hay en cada categoría.
          </p>
        </header>

        <div className="space-y-10">
          {TECHNOLOGIES.map((tech) => (
            <section key={tech}>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold">
                  Mejor valorados en{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                    {tech}
                  </span>
                </h2>

                <button
                  onClick={() => handleVerMas(tech)}
                  className="text-xs sm:text-sm rounded-full border border-slate-700 px-3 py-1.5 hover:bg-slate-800"
                >
                  Ver todos
                </button>
              </div>

              <CoursesCarousel
                activeTech={tech}
                showTitle={false}
                limit={5}
              />
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Cursos
