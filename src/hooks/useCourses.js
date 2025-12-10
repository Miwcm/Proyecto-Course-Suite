import { useState, useEffect, useCallback } from 'react'; // 1. Importa useCallback

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/api/courses`;

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true); 
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const rawCourses = data.courses || data;

      if (!Array.isArray(rawCourses)) {
        throw new Error("El formato de respuesta del servidor no es válido");
      }

      const adaptedCourses = rawCourses.map(course => ({
        id: course._id,
        title: course.nombre,
        image: course.imagen,
        category: course.categoria,
        description: course.descripcion,
        provider: course.organismo,
        link: course.link,
        rating: course.puntaje || 0,

        reviews: course.reviews || [],      
        totalReviews: course.totalReviews || (course.reviews ? course.reviews.length : 0), 
      }));

      const uniqueCourses = adaptedCourses.filter((course, index, self) =>
        index === self.findIndex((t) => (
          t.id === course.id
        ))
      );

      setCourses(uniqueCourses);

      const uniqueCategories = [...new Set(uniqueCourses.map(c => c.category))];
      setCategories(['Todos', ...uniqueCategories]);

    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, categories, loading, error, refetch: fetchCourses };
};