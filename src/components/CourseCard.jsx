
import { StarIcon } from '@heroicons/react/24/solid'

const CourseCard = ({ course }) => {
  return (
    <article className="w-[260px] flex-shrink-0 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-xl shadow-black/50">
      {/* Imagen */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-2 left-2 bg-slate-950/80 text-xs px-2 py-1 rounded-full text-cyan-300 backdrop-blur">
          {course.tag}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-3 flex flex-col gap-2">
        <span className="text-[11px] uppercase text-cyan-300 font-semibold">
          {course.provider}
        </span>

        <h3 className="text-white font-semibold text-sm min-h-[40px]">
          {course.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          {course.rating}
          <span className="text-slate-500">
            ({(course.votes / 1000).toFixed(1)}k)
          </span>
        </div>

        <button className="mt-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-900 font-semibold rounded-full py-2 text-xs shadow-md hover:brightness-110">
          Ver curso
        </button>
      </div>
    </article>
  )
}

export default CourseCard
