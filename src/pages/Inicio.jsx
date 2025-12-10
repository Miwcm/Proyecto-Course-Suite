import React, { useState, useEffect, useMemo } from 'react'
import TechTabs from '../components/TechTabs'
import CoursesCarousel from '../components/CoursesCarousel'
import Hero from '../components/Hero' 
import { useCourses } from '../hooks/useCourses'

const Inicio = () => {
  const { courses, categories, loading } = useCourses();

  const [activeTech, setActiveTech] = useState('')

  useEffect(() => {
    if (categories.length > 0 && !activeTech) {
      setActiveTech(categories[0]); 
    }
  }, [categories, activeTech]);

  const scrollToCategories = () => {
    const element = document.getElementById('explorar-seccion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTech('Todos'); 
    }
  }

  const featuredCourses = useMemo(() => {
    if (!courses.length) return [];
    return [...courses].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }, [courses]);

  if (loading) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Cargando experiencia...</div>;

  return (
    <div id="inicio" className="bg-slate-950 text-white">

      <Hero onExploreClick={scrollToCategories} />

      <main className="px-4 pb-20 max-w-7xl mx-auto space-y-16">

        {featuredCourses.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-extrabold bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Cursos Destacados de la Semana
              </h2>
            </div>

            <CoursesCarousel
              courses={featuredCourses}
              activeTech="Todos" 
              showTitle={false}  
            />
          </section>
        )}

        <hr className="border-slate-800" />
      </main>
    </div>
  )
}

export default Inicio