// src/pages/Contacto.jsx
import { Link } from 'react-router'

const Contacto = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Contacto
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Si tenés feedback sobre Course Suite, querés colaborar con el proyecto
            o explorar posibles sponsors, podés escribirnos por acá.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)]">
          {/* Contacto principal */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-lg shadow-black/40">
            <h2 className="text-2xl font-semibold mb-3">
              ¿Cómo contactarnos?
            </h2>
            <p className="text-sm text-slate-300 mb-5 max-w-xl">
              Course Suite es un proyecto realizado como práctica dentro de un curso
              de la Fundación Pescar. No es una plataforma oficial, pero seguimos
              mejorándolo y nos interesa escuchar tu opinión.
            </p>

            <p className="text-sm text-slate-300 mb-3">
              Para cualquier consulta, propuesta o comentario, podés escribirnos a:
            </p>

            <a
              href="mailto:equipo.coursesuite@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:brightness-110"
            >
              ✉️ equipo.coursesuite@gmail.com
            </a>

            <p className="mt-3 text-xs text-slate-500">
              El correo es gestionado por el equipo de estudiantes que desarrolla el proyecto.
            </p>
          </section>

          {/* Colaboraciones / sponsors */}
          <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h2 className="text-xl font-semibold mb-3">
              Colaboraciones & sponsors
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Estamos abiertos a:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 mb-4">
              <li>Recibir feedback sobre la experiencia de uso y el diseño.</li>
              <li>Sumar nuevas ideas de funcionalidades o categorías de cursos.</li>
              <li>Explorar colaboraciones educativas o posibles sponsors.</li>
            </ul>

            <p className="text-xs text-slate-400">
              Si alguna de estas opciones te interesa, contanos un poco más por correo
              y nos pondremos en contacto.
            </p>

            <div className="mt-6 text-xs text-slate-400">
              ¿Querés conocer más sobre la misión del proyecto y el equipo?
              <br />
              <Link
                to="/nosotros"
                className="text-cyan-400 hover:underline"
              >
                Ir a la página de Nosotros →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Contacto
