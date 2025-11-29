import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import TechTabs from '../components/TechTabs'
import CoursesCarousel from '../components/CoursesCarousel'
import { TECHNOLOGIES } from '../data/courses'

const Inicio = () => {

// Estado que guarda la tecnología seleccionada.
// Empieza con la primera del array y cambia cuando el usuario toca una tab.
// Determina qué cursos muestra el carrusel. 
  const [activeTech, setActiveTech] = useState(TECHNOLOGIES[0])

  return (
    <div
      id="inicio"
      className=" bg-gradient-to-b from-slate-950 to-slate-900 text-white"
    >

      <main className="px-4 pt-6 pb-20 max-w-6xl mx-auto">
        <section className="mb-4">
          <h1 className="text-2xl font-extrabold text-center sm:text-left">
            Explora por Tecnología
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-xl">
            Descubre los mejores cursos gratuitos en desarrollo web y otras
            áreas IT.
          </p>
          <TechTabs activeTech={activeTech} onChange={setActiveTech} />
        </section>

        <CoursesCarousel activeTech={activeTech} />
      </main>
    </div>
  )
}

export default Inicio