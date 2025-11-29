import { Target, Users, Rocket, Award } from "lucide-react"

const Objetivos = () => {
  const objetivos = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Accesibilidad Universal",
      description:
        "Hacer que la educación tecnológica sea accesible para todos, sin importar su ubicación o situación económica.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Comunidad Activa",
      description: "Construir una comunidad de aprendizaje donde estudiantes y profesionales puedan crecer juntos.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Contenido Actualizado",
      description:
        "Mantener una colección curada de cursos actualizados con las últimas tecnologías y tendencias del mercado.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Calidad Garantizada",
      description:
        "Seleccionar únicamente cursos de alta calidad que realmente aporten valor al aprendizaje de nuestros usuarios.",
    },
  ]

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-cyan-400 mb-3">Nuestros Objetivos</h2>
        <p className="text-gray-400">Los pilares que guían nuestro trabajo diario</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {objetivos.map((objective, index) => (
          <div
            key={index}
            className="bg-[#151523] rounded-xl p-6 border border-purple-800/40 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
          >
            <div className="flex items-start gap-4">
              <div className="text-purple-400 mt-1">{objective.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{objective.title}</h3>
                <p className="text-gray-400 leading-relaxed">{objective.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Objetivos