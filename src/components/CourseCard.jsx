import { StarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router';

const CourseCard = ({ course }) => {
  return (
    <article className="w-[260px] shrink-0 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-xl shadow-black/50 flex flex-col h-full">
      <div className="relative h-40 w-full overflow-hidden bg-slate-900">
        <img
          src={course.image}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/400x200?text=Curso+IT";
          }}
        />
        <span className="absolute top-2 left-2 bg-slate-950/80 text-xs px-2 py-1 rounded-full text-cyan-300 backdrop-blur">
          {course.category}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <span className="text-[11px] uppercase text-cyan-300 font-semibold truncate">
          {course.provider}
        </span>

        <h3 className="text-white font-semibold text-sm min-h-10 line-clamp-2" title={course.title}>
          {course.title}
        </h3>

        <div className="flex items-center gap-1 text-xs text-slate-400 mt-auto">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-white font-medium">{course.rating || 0}</span>
          <span className="text-slate-500">
            ({course.totalReviews > 999 ? (course.totalReviews / 1000).toFixed(1) + 'k' : course.totalReviews})
          </span>
        </div>

        <Link
          to={`/curso/${course.id || course._id}`} // <--- CAMBIO CLAVE: Redirige a tu página interna
          className="mt-3 text-center bg-linear-to-r from-cyan-400 to-fuchsia-500 text-slate-950 font-semibold rounded-full py-2 text-xs shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center justify-center"
        >
          Ver detalles
        </Link>
      </div>
    </article>
  )
}

export default CourseCard