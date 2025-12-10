import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCourses } from '../hooks/useCourses';
import CoursesCarousel from '../components/CoursesCarousel';
import TechTabs from '../components/TechTabs';

const Cursos = () => {
  const navigate = useNavigate();
  const { courses, categories, loading } = useCourses();

  const [activeTech, setActiveTech] = useState('Todos');

  const handleVerMas = () => {
    // === CAMBIO 1: Permitimos navegar siempre, incluso si es 'Todos' ===
    // Antes teníamos: if (activeTech === 'Todos') return;
    // Ahora simplemente navegamos. Esto llevará a /cursos/Todos
    navigate(`/cursos/${encodeURIComponent(activeTech)}`);
  };

  // Preparamos los cursos para la vista previa
  const cursosParaMostrar = activeTech === 'Todos'
    ? courses
    : courses.filter(c => c.category === activeTech);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="animate-pulse text-lg font-medium">Cargando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <main className="px-6 pt-10 pb-20 max-w-[1400px] mx-auto">

        <section id="explorar-seccion">
          <h2 className="text-2xl font-extrabold text-center sm:text-left mb-2">
            Explora todo el catálogo
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mb-6">
            Navega por tecnología o mira la lista completa de cursos gratuitos disponibles.
          </p>

          <TechTabs
            categories={categories}
            activeTech={activeTech}
            onChange={setActiveTech}
          />

          <div className="mt-10">
            <section>
              <div className="flex items-end justify-between mb-4 px-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="bg-linear-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                    {activeTech === 'Todos' ? 'Todos los cursos' : activeTech}
                  </span>
                </h2>

                <span className="text-xs text-slate-500 ml-2 mb-1">
                  ({cursosParaMostrar.length} encontrados)
                </span>

                {/* === CAMBIO 2: El botón ahora se muestra SIEMPRE === */}
                {/* Quitamos la condición {activeTech !== 'Todos' && ...} */}
                <button
                  onClick={handleVerMas}
                  className="group flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors ml-auto"
                >
                  Ver más
                  <span className="text-xs transition-transform group-hover:translate-x-1">&rarr;</span>
                </button>
              </div>

              {cursosParaMostrar.length > 0 ? (
                <CoursesCarousel
                  courses={cursosParaMostrar}
                  // Si es 'Todos', pasamos undefined para que el carrusel no filtre internamente
                  activeTech={activeTech === 'Todos' ? undefined : activeTech}
                  showTitle={false}
                  limit={activeTech === 'Todos' ? 50 : 10}
                />
              ) : (
                <div className="text-center py-20 bg-slate-900/50 rounded-lg border border-slate-800">
                  <p className="text-slate-400">
                    No se encontraron cursos.
                  </p>
                </div>
              )}
            </section>
          </div>

        </section>

      </main>
    </div>
  );
};

export default Cursos;