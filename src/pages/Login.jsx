import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            
            const res = await axios.post(`${API_URL}/api/auth/login`, formData);

            const userData = {
                username: res.data.username,
                id: res.data.userId
            };

            login(userData, res.data.token);
            navigate('/');

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Credenciales incorrectas o error de servidor');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
            
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-purple-900/20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Acceso al Sistema</h1>
                    <p className="text-slate-400">Ingresa tu identidad asignada.</p>
                </div>

                {error && <div className="bg-red-500/20 text-red-200 text-sm p-3 rounded mb-4 border border-red-500/50">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Nombre de Usuario</label>
                        <input
                            name="username"
                            type="text"
                            onChange={handleChange}
                            placeholder="Ej: AnonymousPanda"
                            required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold py-3 rounded-lg shadow-lg transition-all transform hover:scale-[1.02]"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-slate-800 pt-6">
                    <p className="text-slate-400 text-sm">
                        ¿No tienes identidad? <Link to="/registro" className="text-cyan-400 font-semibold hover:text-cyan-300">Generar una nueva</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;