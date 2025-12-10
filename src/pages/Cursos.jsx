import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; 
import { useCourses } from '../hooks/useCourses';
import { X } from 'lucide-react'; 
import CoursesCarousel from '../components/CoursesCarousel';
import TechTabs from '../components/TechTabs';

const Cursos = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); 
  const { courses, categories, loading } = useCourses();
  const [activeTech, setActiveTech] = useState('Todos');

  const searchTerm = searchParams.get("search");

  useEffect(() => {
    if (searchTerm) {
      setActiveTech('Todos');
    }
  }, [searchTerm]);

  const handleVerMas = () => {
    if (!searchTerm) {
    } else {
      navigate(`/cursos/${encodeURIComponent(activeTech)}`);
    }
  };

  const handleTabChange = (category) => {
    setActiveTech(category);
    setSearchParams({}); 
  };

  const clearSearch = () => {
    setSearchParams({});
    setActiveTech('Todos');
  };

  const cursosParaMostrar = courses.filter(c => {
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      return (
        c.title?.toLowerCase().includes(query) ||
        c.category?.toLowerCase().includes(query) ||
        c.provider?.toLowerCase().includes(query) || 
        c.description?.toLowerCase().includes(query)
      );
    }
    if (activeTech === 'Todos') return true;
    return c.category === activeTech;
  });

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
            onChange={handleTabChange}
          />

          <div className="mt-10">
            <section>
              <div className="flex items-end justify-between mb-4 px-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="bg-linear-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                    {searchTerm ? `Resultados para "${searchTerm}"` : (activeTech === 'Todos' ? 'Todos los cursos' : activeTech)}
                  </span>

                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="ml-2 p-1 bg-slate-800 rounded-full hover:bg-red-500/20 hover:text-red-400 transition"
                      title="Borrar búsqueda"
                    >
                      <X size={16} />
                    </button>
                  )}
                </h2>

                <span className="text-xs text-slate-500 ml-2 mb-1">
                  ({cursosParaMostrar.length} encontrados)
                </span>

                {!searchTerm && (
                  <button
                    onClick={handleVerMas}
                    className="group flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white transition-colors ml-auto"
                  >
                    Ver más
                    <span className="text-xs transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                )}
              </div>

              {cursosParaMostrar.length > 0 ? (
                <CoursesCarousel
                  courses={cursosParaMostrar}
                  activeTech={searchTerm ? undefined : (activeTech === 'Todos' ? undefined : activeTech)}
                  showTitle={false}
                  limit={50}
                />
              ) : (
                <div className="text-center py-20 bg-slate-900/50 rounded-lg border border-slate-800 flex flex-col items-center">
                  <p className="text-slate-400 mb-4">
                    No encontramos cursos que coincidan con "{searchTerm || activeTech}".
                  </p>
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="text-cyan-400 hover:underline"
                    >
                      Ver todos los cursos
                    </button>
                  )}
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