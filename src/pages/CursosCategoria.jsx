// src/pages/CursosCategoria.jsx
import { useMemo } from 'react'
import { useParams, Link } from 'react-router'
import { COURSES, TECHNOLOGIES } from '../data/courses'
import CourseCard from '../components/CourseCard'

const normalize = (str = '') => str.toLowerCase().trim()

const CursosCategoria = () => {
  const { categoria } = useParams()
  const decodedCategory = decodeURIComponent(categoria || '')

  const catNorm = normalize(decodedCategory)

  // La categoría es válida si coincide (normalizada) con alguna de TECHNOLOGIES
  const isValidCategory = TECHNOLOGIES.some(
    (tech) => normalize(tech) === catNorm
  )

  const courses = useMemo(() => {
    if (!isValidCategory) return []

    const byCategory = COURSES.filter(
      (c) => normalize(c.category) === catNorm
    )

    return [...byCategory].sort((a, b) => b.rating - a.rating)
  }, [catNorm, isValidCategory])

  // 👇 Esto te ayuda a ver qué está llegando realmente
  console.log('decodedCategory:', decodedCategory)
  console.log('isValidCategory:', isValidCategory)
  console.log('courses encontrados:', courses.length)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <main className="px-4 pt-6 pb-20 max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold">
              Cursos de{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {decodedCategory || '...'}
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Todos los cursos disponibles en esta categoría, ordenados por valoración.
            </p>
          </div>

          <Link
            to="/cursos"
            className="text-sm rounded-full border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            ← Volver a cursos
          </Link>
        </header>

        {!isValidCategory && (
          <p className="text-sm text-red-400">
            Esta categoría no existe.{' '}
            <Link to="/cursos" className="underline">
              Volver a cursos
            </Link>
          </p>
        )}

        {isValidCategory && courses.length === 0 && (
          <p className="text-sm text-slate-400">
            Todavía no hay cursos cargados para esta categoría.
          </p>
        )}

        {isValidCategory && courses.length > 0 && (
          <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default CursosCategoria
