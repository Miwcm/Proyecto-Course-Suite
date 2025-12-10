import { useState, useEffect } from 'react';

const API_URL = `${import.meta.env.VITE_API_URL}/api/courses`;

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al conectar con el servidor');
        
        const data = await response.json();
        
        // Adaptamos los datos para tu Frontend
        const adaptedCourses = data.courses.map(course => ({
          id: course._id,
          title: course.nombre,
          image: course.imagen,
          category: course.categoria,
          description: course.descripcion,
          provider: course.organismo,
          link: course.link,
          rating: course.puntaje || 0,
          reviews: course.totalReviews || 0
        }));

        setCourses(adaptedCourses);

        // 1. Extraemos las categorías únicas de la base de datos
        const uniqueCategories = [...new Set(adaptedCourses.map(c => c.category))];
        
        // 2. AQUÍ ESTÁ EL TRUCO: Agregamos 'Todos' al principio
        setCategories(['Todos', ...uniqueCategories]);

      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, categories, loading, error };
};