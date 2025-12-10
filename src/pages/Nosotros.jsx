import Mision from "../components/Mision"
import Objetivos from "../components/Objetivos"
import Team from "../components/Team"

const Nosotros = () => {
  return (
    <>
    <div className="min-h-screen bg-linear-to-b from-[#0f0f1a] to-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Sobre Nosotros
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Conoce más sobre nuestra misión, objetivos y el equipo que hace posible Course Suite
          </p>
        </div>

        {/* Components */}
        <div className="space-y-20">
          <Mision />
          <Objetivos/>
          <Team />
        </div>
      </div>
    </div>
    </>
  )
}

export default Nosotros
