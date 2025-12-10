import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../context/AuthContext';
import { Star, ExternalLink, MessageSquare, Send, ChevronLeft } from 'lucide-react';

const CourseDetail = () => {
    const { id } = useParams();
    const { courses, loading: globalLoading } = useCourses();
    const { user } = useAuth();

    const [course, setCourse] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
    const [hoverRating, setHoverRating] = useState(0);
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        const loadData = async () => {
            if (courses.length > 0) {
                const found = courses.find(c => c.id === id || c._id === id);
                if (found) {
                    setCourse(found);
                    if (found.reviews && found.reviews.length > 0) {
                        setReviews([...found.reviews].reverse());
                    }
                }
            }

            try {
                const response = await fetch(`${BASE_URL}/api/courses/${id}`);
                if (response.ok) {
                    const fullCourseData = await response.json();

                    setCourse(prev => ({ ...prev, ...fullCourseData }));

                    if (fullCourseData.reviews && Array.isArray(fullCourseData.reviews)) {
                        setReviews([...fullCourseData.reviews].reverse());
                    }
                }
            } catch (error) {
                console.error("Error cargando detalles completos:", error);
            }
        };

        loadData();
    }, [id, courses]); 

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (newReview.rating === 0 || !newReview.comment.trim()) return;

        const courseId = course._id || course.id;

        try {
            const reviewData = {
                user: user.username,
                avatarSeed: user.username,
                rating: newReview.rating,
                comment: newReview.comment
            };

            const response = await fetch(`${BASE_URL}/api/courses/${courseId}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al guardar la reseña');
            }

            const updatedCourse = await response.json();

            if (updatedCourse.reviews) {
                setReviews([...updatedCourse.reviews].reverse());

                setCourse(prev => ({
                    ...prev,
                    rating: updatedCourse.puntaje,
                    totalReviews: updatedCourse.totalReviews
                }));
            }

            setNewReview({ rating: 0, comment: '' });

        } catch (error) {
            console.error(error);
            alert(`Hubo un error: ${error.message}`);
        }
    };

    if (!course && globalLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!course) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">

            {/* HEADER */}
            <div className="relative h-[450px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent z-10"></div>
                <img
                    src={course.image}
                    alt={course.title || course.nombre} 
                    className="w-full h-full object-cover opacity-60 blur-sm"
                />
                <div className="absolute bottom-0 left-0 w-full z-20 px-6 pb-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-6">
                            <Link to="/cursos" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <ChevronLeft size={20} /> Volver al catálogo
                            </Link>
                        </div>
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded-full text-xs font-bold uppercase tracking-wider">
                                {course.category || course.categoria}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 mb-4 pb-2 leading-tight">
                            {course.title || course.nombre}
                        </h1>
                        <div className="flex items-center gap-6 text-sm md:text-base text-slate-300">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                Organismo: <strong className="text-white">{course.provider || course.organismo}</strong>
                            </span>
                            <span className="flex items-center gap-1 text-yellow-400">
                                <Star fill="currentColor" size={16} />
                                <span className="text-white font-bold">{course.rating || course.puntaje || 0}</span>
                                <span className="text-slate-500">
                                    {/* Lógica para mostrar contador real */}
                                    ({course.totalReviews || reviews.length || 0} reseñas)
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
                <div className="lg:col-span-2 space-y-10">
                    <section className="bg-[#0f0f1a] p-8 rounded-2xl border border-slate-800 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">Sobre este curso</h2>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {course.description || course.descripcion || "Descripción no disponible."}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            {(course.tags || ['Gratuito', 'Online']).map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-400 border border-slate-700">#{tag}</span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-[#0f0f1a] p-8 rounded-2xl border border-slate-800 shadow-xl">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <MessageSquare className="text-cyan-400" /> Reseñas de Estudiantes
                        </h2>

                        {user ? (
                            <form onSubmit={handleSubmitReview} className="mb-10 bg-slate-900/50 p-6 rounded-xl border border-dashed border-slate-700">
                                <h3 className="text-sm font-bold text-slate-300 mb-3">Deja tu opinión</h3>
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star size={24} className={`${(hoverRating || newReview.rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    placeholder="¿Qué te pareció el curso?"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:border-cyan-400 outline-none transition-colors min-h-[100px]"
                                ></textarea>
                                <div className="flex justify-end mt-3">
                                    <button type="submit" disabled={!newReview.rating || !newReview.comment} className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                        <Send size={16} /> Publicar Reseña
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-slate-900/50 p-6 rounded-xl text-center border border-slate-800 mb-8">
                                <p className="text-slate-400">Debes <Link to="/login" className="text-cyan-400 font-bold hover:underline">iniciar sesión</Link> para dejar una reseña.</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={review._id || index} className="border-b border-slate-800 pb-6 last:border-0 last:pb-0">
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${review.avatarSeed || review.username || review.user}`}
                                                alt="Avatar"
                                                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-white">{review.username || review.user || "Anónimo"}</h4>
                                                        <div className="flex text-yellow-400 text-xs mt-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-700"} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-slate-500">
                                                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : (review.date || "Reciente")}
                                                    </span>
                                                </div>
                                                <p className="text-slate-300 text-sm mt-2">{review.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-slate-500 italic py-4">No hay reseñas todavía.</p>
                            )}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-[#151523] border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-900/20">
                        <h3 className="text-xl font-bold text-white mb-2">Acceso Gratuito</h3>
                        <p className="text-slate-400 text-sm mb-6">Al hacer clic serás redirigido a la plataforma oficial del proveedor.</p>
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="w-full bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg mb-4">
                            Ir al Curso <ExternalLink size={20} />
                        </a>
                        <div className="space-y-3 text-sm text-slate-400">
                            <div className="flex justify-between border-b border-slate-800 pb-2"><span>Categoría</span><span className="text-white">{course.category || course.categoria}</span></div>
                            <div className="flex justify-between border-b border-slate-800 pb-2"><span>Idioma</span><span className="text-white">{course.idioma || 'Español'}</span></div>
                            <div className="flex justify-between"><span>Modalidad</span><span className="text-white">100% Online</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;