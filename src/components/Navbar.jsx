import { useState } from "react";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Cursos", href: "/cursos" },
    { name: "Contacto", href: "/contacto" },
    { name: "Nosotros", href: "/nosotros" },
  ];

  return (
    <nav className="bg-[#0f0f1a] text-white shadow-lg sticky top-0 z-50 border-b border-purple-800/40">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center gap-4">

        {/* === LOGO === */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight flex items-center gap-1 cursor-pointer text-cyan-400 shrink-0 group"
        >
          <img
            src="/imagenes/course-suite-logo.png"
            alt="Course Suite"
            className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />

          <span className="transition-transform duration-300 group-hover:scale-110">
            Course
          </span>

          <span className="text-purple-500 transition-transform duration-300 group-hover:scale-110">
            Suite
          </span>
        </NavLink>

        {/* === BUSCADOR (Solo Desktop) === */}
        <div className="hidden lg:block w-1/3 max-w-md relative">
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full bg-slate-900/50 border border-purple-900 text-white placeholder-slate-500 rounded-full px-4 py-2 outline-none focus:border-cyan-400 transition duration-300 text-sm"
          />
        </div>

        {/* === MENÚ DESKTOP === */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-base font-medium">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `relative transition-colors hover:text-cyan-400 ${isActive ? 'text-cyan-400' : 'text-gray-300'}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-slate-700/50 mx-2"></div>

          {/* USUARIO DESKTOP */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/perfil" className="flex items-center gap-2 group">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition">{user.username}</p>
                  <p className="text-xs text-slate-400">Ver perfil</p>
                </div>
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border border-purple-500/50 bg-slate-800 transition-transform group-hover:scale-105"
                />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-bold text-white border border-purple-500/50 hover:border-cyan-400 hover:text-cyan-400 px-5 py-2 rounded-full transition-all hover:scale-105"
              >
                Ingresar
              </Link>
              <Link
                to="/registro"
                className="text-sm font-bold bg-linear-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 px-5 py-2 rounded-full shadow-lg shadow-purple-900/20 transition-transform hover:scale-105"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>

        {/* === BOTÓN HAMBURGUESA === */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition active:scale-90"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* === MENÚ MOBILE DESPLEGABLE (CON TRANSICIONES NUEVAS) === */}
      <div
        className={`md:hidden bg-[#151523] border-t border-purple-800/30 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col gap-6 p-6">

          {/* Links Mobile */}
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-medium py-1 transition-all duration-300 ${isActive
                      ? 'text-cyan-400 pl-4 border-l-4 border-cyan-400 bg-cyan-900/10' // Activo: Borde y fondo sutil
                      : 'text-gray-300 hover:text-cyan-300 hover:pl-2' // Inactivo: Se mueve un poco a la derecha
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Buscador Mobile */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cursos..."
              className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 outline-none focus:border-cyan-400 transition-all duration-300 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)]"
            />
          </div>

          <div className="h-px w-full bg-slate-700/50"></div>

          {/* LÓGICA DE USUARIO MOBILE */}
          {user ? (
            // Si está logueado
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4 p-2 bg-slate-800/50 rounded-lg">
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border border-purple-500 bg-slate-800"
                />
                <div>
                  <p className="font-bold text-white">{user.username}</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Conectado
                  </p>
                </div>
              </div>

              <Link
                to="/perfil"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-slate-600 text-slate-200 font-medium transition-all duration-200 hover:bg-slate-800 hover:border-cyan-500/50 active:scale-95"
              >
                <UserIcon size={18} />
                Mi Perfil
              </Link>

              <button
                onClick={() => { logout(); setOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-medium transition-all duration-200 hover:bg-red-500/20 active:scale-95"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            // Si NO está logueado
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="w-full text-center py-3 rounded-lg border border-slate-700 text-slate-300 font-bold transition-all duration-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 active:scale-95"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/registro"
                onClick={() => setOpen(false)}
                className="w-full text-center py-3 rounded-lg bg-linear-to-r from-purple-600 to-cyan-500 text-white font-bold shadow-lg transition-all duration-200 hover:opacity-90 hover:shadow-cyan-500/20 active:scale-95"
              >
                Crear cuenta gratis
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;