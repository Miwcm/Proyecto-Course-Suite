import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Perfil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Protección: Si no hay usuario, mandar al login
    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-950 pt-20 px-4 flex justify-center">
            <div className="max-w-2xl w-full">

                {/* Tarjeta de Perfil */}
                <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-900/20 relative overflow-hidden">

                    {/* Fondo decorativo */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-purple-900 to-cyan-900 opacity-50"></div>

                    <div className="relative z-10 flex flex-col items-center -mt-12">
                        {/* Avatar (Usamos una API de avatares automáticos con el nombre) */}
                        <img
                            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800 shadow-xl"
                        />

                        <h1 className="text-3xl font-bold text-white mt-4">{user.username}</h1>
                        <p className="text-cyan-400 font-medium text-sm bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30 mt-2">
                            Identidad Anónima Verificada
                        </p>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                            <h3 className="text-slate-400 text-sm mb-1">ID de Usuario</h3>
                            <p className="text-white font-mono">{user.id}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">
                                <span className="block text-2xl font-bold text-purple-400">0</span>
                                <span className="text-xs text-slate-500">Cursos Completados</span>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">
                                <span className="block text-2xl font-bold text-cyan-400">Activo</span>
                                <span className="text-xs text-slate-500">Estado de Cuenta</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={logout}
                            className="px-6 py-2 text-red-400 border border-red-500/30 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-bold"
                        >
                            Cerrar Sesión
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Perfil;