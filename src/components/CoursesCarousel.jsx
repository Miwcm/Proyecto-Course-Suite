
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { COURSES } from '../data/courses'
import CourseCard from './CourseCard'
import { useMemo, useState } from 'react'

const CoursesCarousel = ({ activeTech }) => {
  const [index, setIndex] = useState(0)

  const filtered = useMemo(
    () => COURSES.filter((c) => c.category === activeTech),
    [activeTech]
  )

  const total = filtered.length

  const next = () => {
    if (!total) return
    setIndex((prev) => (prev + 1) % total)
  }

  const prev = () => {
    if (!total) return
    setIndex((prev) => (prev - 1 + total) % total)
  }

  return (
    <section id="populares" className="mt-8">
      <h2 className="text-lg font-bold text-white mb-3">
        Mejor valorados en{' '}
        <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          {activeTech}
        </span>
      </h2>

      {/* Mobile: scroll horizontal simple */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar md:hidden py-2">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Desktop: carrusel con flechas */}
      {total > 0 && (
        <div className="relative hidden md:flex justify-center gap-3 py-4">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-slate-800"
          >
            <ChevronLeftIcon className="h-5 w-5 text-slate-200" />
          </button>

          {filtered.slice(index, index + 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

          {index + 3 > total &&
            filtered.slice(0, index + 3 - total).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-slate-800"
          >
            <ChevronRightIcon className="h-5 w-5 text-slate-200" />
          </button>
        </div>
      )}
    </section>
  )
}

export default CoursesCarousel
