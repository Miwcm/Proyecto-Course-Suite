import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registro = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [generatedUser, setGeneratedUser] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const res = await axios.post(`${API_URL}/api/auth/register`, { password });

            setGeneratedUser(res.data.username);

        } catch (err) {
            console.error(err); 
            setError(err.response?.data?.error || 'Error al registrarse');
        }
    };
    
    if (generatedUser) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-slate-900 border border-cyan-500/50 rounded-2xl p-8 text-center shadow-2xl shadow-cyan-900/50">
                    <h2 className="text-3xl font-bold text-white mb-4">¡Registro Exitoso! 🎉</h2>
                    <p className="text-slate-300 mb-6">
                        Tu cuenta ha sido creada. El sistema te ha asignado el siguiente nombre de usuario.
                        <br />
                        <span className="text-red-400 font-bold">¡Guárdalo, lo necesitarás para entrar!</span>
                    </p>

                    <div className="bg-slate-950 border border-dashed border-slate-700 p-4 rounded-xl mb-8">
                        <span className="text-2xl font-mono text-cyan-400 font-bold tracking-wider">
                            {generatedUser}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-linear-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform"
                    >
                        Ir a Iniciar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta Anónima</h1>
                    <p className="text-slate-400 text-sm">
                        Solo necesitas una contraseña. Nosotros te asignaremos un nombre clave.
                    </p>
                </div>

                {error && <div className="bg-red-500/20 text-red-200 text-sm p-3 rounded mb-4 border border-red-500/50">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Crea tu contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            required
                            minLength={6}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg transition-all transform hover:scale-[1.02]"
                    >
                        Generar Identidad
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-slate-800 pt-6">
                    <p className="text-slate-400 text-sm">
                        ¿Ya tienes tu usuario? <Link to="/login" className="text-purple-400 font-semibold hover:text-purple-300">Inicia Sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registro;