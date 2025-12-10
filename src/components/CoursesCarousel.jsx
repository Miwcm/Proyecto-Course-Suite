import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import CourseCard from './CourseCard'
import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // Asegúrate de usar 'react-router-dom' si es web

const CoursesCarousel = ({ activeTech, showTitle = true, limit, courses = [] }) => {
  const [index, setIndex] = useState(0)

  // Variable auxiliar para saber si estamos en modo "Ver Todo"
  // Esto es verdadero si activeTech es null, undefined, vacío o la palabra 'Todos'
  const isShowingAll = !activeTech || activeTech === 'Todos';

  const filtered = useMemo(() => {
    // Si no hay cursos cargados, devolvemos array vacío
    if (!courses || !courses.length) return [];

    let result = [];

    // === MODIFICACIÓN CLAVE AQUÍ ===
    // Si isShowingAll es true, copiamos todo el array.
    if (isShowingAll) {
      result = [...courses];
    } else {
      // Si hay una categoría específica, filtramos.
      // Agregamos chequeo por 'technology' por si acaso tu DB usa ese campo.
      result = courses.filter((c) => c.category === activeTech || c.technology === activeTech);
    }

    // Ordenar por rating (asegurando que rating exista, sino usa 0)
    const sorted = result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    // Aplicar límite si existe
    return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
  }, [activeTech, limit, courses, isShowingAll]); // Agregamos dependencias correctas

  const total = filtered.length;

  useEffect(() => {
    setIndex(0)
  }, [activeTech, limit, total])

  const next = () => {
    if (!total) return
    setIndex((prev) => (prev + 1) % total)
  }

  const prev = () => {
    if (!total) return
    setIndex((prev) => (prev - 1 + total) % total)
  }

  // Generar el link para "Ver todos"
  const verTodosLink = isShowingAll
    ? '/cursos'
    : `/cursos/${encodeURIComponent(activeTech)}`;

  // Si no hay resultados y NO estamos cargando (total === 0)
  if (total === 0) {
    return (
      <div className="mt-4 p-8 text-center bg-slate-900/50 rounded-lg border border-slate-800">
        <p className="text-slate-400 text-sm">
          No hay cursos disponibles para mostrar en esta sección.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-6">
      {/* CABECERA */}
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {isShowingAll ? (
              'Cursos más destacados'
            ) : (
              <>
                Mejor valorados en{' '}
                <span className="bg-linear-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                  {activeTech}
                </span>
              </>
            )}
          </h2>

          <Link
            to={verTodosLink}
            className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 border border-slate-700 px-4 py-1.5 rounded-full hover:bg-slate-800"
          >
            Ver todos <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      )}

      {/* Mobile: scroll horizontal simple */}
      <div className="flex gap-4 overflow-x-auto smart-scrollbar md:hidden py-2 pb-4">
        {filtered.map((course) => (
          // Usamos course._id o course.id según venga de la DB
          <CourseCard key={course._id || course.id} course={course} />
        ))}
      </div>

      {/* Desktop: carrusel con flechas */}
      <div className="relative hidden md:flex justify-center gap-4 py-4">
        {/* Botón Anterior */}
        <button
          onClick={prev}
          disabled={total <= 3}
          className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/90 border border-slate-700 hover:bg-slate-800 disabled:opacity-0 disabled:cursor-default z-10 transition-opacity"
        >
          <ChevronLeftIcon className="h-6 w-6 text-slate-200" />
        </button>

        {/* Renderizado de Tarjetas (Lógica de 3 en 3) */}
        {filtered.slice(index, index + 3).map((course) => (
          <CourseCard key={course._id || course.id} course={course} />
        ))}

        {/* Relleno si estamos al final del loop para que no queden huecos */}
        {index + 3 > total &&
          filtered.slice(0, index + 3 - total).map((course) => (
            <CourseCard key={course._id || course.id} course={course} />
          ))}

        {/* Botón Siguiente */}
        <button
          onClick={next}
          disabled={total <= 3}
          className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/90 border border-slate-700 hover:bg-slate-800 disabled:opacity-0 disabled:cursor-default z-10 transition-opacity"
        >
          <ChevronRightIcon className="h-6 w-6 text-slate-200" />
        </button>
      </div>
    </section>
  )
}

export default CoursesCarousel