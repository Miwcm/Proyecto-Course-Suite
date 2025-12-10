import { useParams, useNavigate } from 'react-router'; 
import { useCourses } from '../hooks/useCourses';
import CourseCard from '../components/CourseCard'; // <--- IMPORTANTE: Importamos la tarjeta individual

const CursosCategoria = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const { courses, loading } = useCourses();

  // 1. Decodificar nombre
  const categoryName = decodeURIComponent(categoria || '');

  // 2. Lógica de Filtrado (La misma que ya arreglamos)
  const safeCourses = courses || [];
  
  const categoryCourses = categoryName === 'Todos'
    ? safeCourses
    : safeCourses.filter((c) => c?.category === categoryName);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 animate-pulse">Cargando cursos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      <div className="max-w-[1400px] mx-auto px-6 pt-10">

        {/* Encabezado */}
        <div className="mb-8 border-b border-slate-800 pb-6">
          <button
            onClick={() => navigate('/cursos')}
            className="text-sm text-slate-400 hover:text-white flex items-center gap-2 mb-4 transition-colors"
          >
            ← Volver al catálogo
          </button>

          <h1 className="text-3xl font-bold">
            {categoryName === 'Todos' ? 'Catálogo Completo' : categoryName}
          </h1>
          <p className="text-slate-400 mt-2">
            Mostrando {categoryCourses.length} cursos encontrados.
          </p>
        </div>

        {/* === CAMBIO CLAVE: GRILLA EN LUGAR DE CARRUSEL === */}
        {categoryCourses.length > 0 ? (
          
          // Usamos CSS Grid para que se acomoden uno al lado del otro y bajen (columnas)
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
            {categoryCourses.map((course) => (
              // Renderizamos la tarjeta directamente
              <CourseCard 
                key={course._id || course.id} 
                course={course} 
              />
            ))}
          </div>

        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800">
            <p className="text-xl text-slate-300 mb-2">
              No hay cursos disponibles por el momento.
            </p>
            <button
              onClick={() => navigate('/cursos')}
              className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition-colors"
            >
              Ver otras categorías
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CursosCategoria;