import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Mail, User, CreditCard, Edit2, Save, X, ShieldCheck } from 'lucide-react'; // Necesitarás instalar lucide-react si no lo tienes

const Perfil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    // Estado para controlar si estamos editando o visualizando
    const [isEditing, setIsEditing] = useState(false);

    // Estado para los datos opcionales
    const [profileData, setProfileData] = useState({
        realName: '',
        contactEmail: '',
        paymentMethod: ''
    });

    // Protección: Si no hay usuario, mandar al login
    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    // Cargar datos guardados (Simulación de base de datos usando LocalStorage)
    useEffect(() => {
        if (user) {
            const savedData = localStorage.getItem(`user_profile_${user.id}`);
            if (savedData) {
                setProfileData(JSON.parse(savedData));
            }
        }
    }, [user]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Guardar cambios
    const handleSave = () => {
        if (user) {
            localStorage.setItem(`user_profile_${user.id}`, JSON.stringify(profileData));
            setIsEditing(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-950 pt-20 px-4 flex justify-center pb-10">
            <div className="max-w-2xl w-full">

                {/* Tarjeta de Perfil */}
                <div className="bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/20 relative overflow-hidden">

                    {/* Fondo decorativo */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-purple-900 to-cyan-900 opacity-50"></div>

                    {/* Botón de Editar (Top Right) */}
                    <div className="absolute top-4 right-4 z-20">
                        <button 
                            onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                            className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-purple-500/50 text-purple-300 hover:text-white hover:border-cyan-400 transition-all"
                        >
                            {isEditing ? <X size={20} /> : <Edit2 size={20} />}
                        </button>
                    </div>

                    {/* Header del Perfil */}
                    <div className="relative z-10 flex flex-col items-center -mt-12 pt-12">
                        <img
                            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800 shadow-xl"
                        />

                        <h1 className="text-3xl font-bold text-white mt-4">{user.username}</h1>
                        <p className="flex items-center gap-1 text-cyan-400 font-medium text-sm bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30 mt-2">
                            <ShieldCheck size={14} /> Identidad Anónima Verificada
                        </p>
                    </div>

                    <div className="p-8 space-y-6">
                        
                        {/* SECCIÓN 1: Datos Personales Opcionales */}
                        <div className="space-y-4">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                                Información de Contacto (Opcional)
                            </h3>

                            {/* Nombre Real */}
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                                <div className="p-2 bg-slate-900 rounded-lg text-purple-400">
                                    <User size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500">Nombre Real</p>
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="realName"
                                            value={profileData.realName}
                                            onChange={handleChange}
                                            placeholder="Agrega tu nombre..."
                                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:border-cyan-400 outline-none mt-1"
                                        />
                                    ) : (
                                        <p className="text-white font-medium">
                                            {profileData.realName || <span className="text-slate-600 italic">No especificado</span>}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email de Contacto */}
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                                <div className="p-2 bg-slate-900 rounded-lg text-cyan-400">
                                    <Mail size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500">Email de Contacto</p>
                                    {isEditing ? (
                                        <input 
                                            type="email" 
                                            name="contactEmail"
                                            value={profileData.contactEmail}
                                            onChange={handleChange}
                                            placeholder="ejemplo@correo.com"
                                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:border-cyan-400 outline-none mt-1"
                                        />
                                    ) : (
                                        <p className="text-white font-medium">
                                            {profileData.contactEmail || <span className="text-slate-600 italic">No especificado</span>}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* SECCIÓN 2: Medio de Pago */}
                        <div className="space-y-4">
                            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                                Finanzas
                            </h3>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                                <div className="p-2 bg-slate-900 rounded-lg text-green-400">
                                    <CreditCard size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500">Medio de Pago Preferido</p>
                                    {isEditing ? (
                                        <select 
                                            name="paymentMethod"
                                            value={profileData.paymentMethod}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:border-cyan-400 outline-none mt-1"
                                        >
                                            <option value="">Seleccionar...</option>
                                            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                                            <option value="Mercado Pago">Mercado Pago</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="Criptomonedas">Criptomonedas</option>
                                        </select>
                                    ) : (
                                        <p className="text-white font-medium">
                                            {profileData.paymentMethod || <span className="text-slate-600 italic">No configurado</span>}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Botón Guardar (Solo visible en edición) */}
                        {isEditing && (
                            <button 
                                onClick={handleSave}
                                className="w-full py-3 bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-lg text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                            >
                                <Save size={18} /> Guardar Cambios
                            </button>
                        )}

                        {/* Estadísticas (Existente) */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">
                                <span className="block text-2xl font-bold text-purple-400">0</span>
                                <span className="text-xs text-slate-500">Cursos Completados</span>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 text-center">
                                <span className="block text-2xl font-bold text-cyan-400">Activo</span>
                                <span className="text-xs text-slate-500">Estado de Cuenta</span>
                            </div>
                        </div>

                        {/* Botón Logout */}
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={logout}
                                className="px-6 py-2 text-red-400 border border-red-500/30 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-bold w-full"
                            >
                                Cerrar Sesión
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;