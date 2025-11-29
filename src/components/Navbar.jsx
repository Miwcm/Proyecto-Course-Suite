import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router"; 

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Contacto", href: "/contacto" },
    { name: "Nosotros", href: "/nosotros" },
  ];

  return (
    <nav className="bg-[#0f0f1a] text-white shadow-lg sticky top-0 z-50 border-b border-purple-800/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo (clickeable al inicio) */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight flex items-center gap-1 cursor-pointer text-cyan-400"
        >
          <img
            src="/imagenes/course-suite-logo.png" // 👈 desde /public
            alt="Course Suite"
            className="h-16 w-auto object-contain"
          />
          Course
          <span className="text-purple-500">Suite</span>
        </NavLink>

        {/* Buscador Desktop */}
        <div className="hidden md:block w-1/3 relative">
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full bg-transparent border-2 border-purple-600 text-white placeholder-gray-400 rounded-full px-4 py-2 outline-none focus:border-cyan-400 transition duration-300"
          />
        </div>

        {/* Links Desktop */}
        <ul className="hidden md:flex gap-8 text-lg">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className="relative text-gray-300 hover:text-cyan-400 transition-colors after:absolute after:w-0 after:h-0.5 after:bg-cyan-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botón Hamburguesa (Mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded hover:bg-white/10 transition"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú Mobile */}
      <div
        className={`md:hidden bg-[#151523] border-t border-purple-700/30 transition-all duration-300 overflow-hidden ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href} 
                onClick={() => setOpen(false)}
                className="block text-lg text-gray-300 hover:text-cyan-400 transition"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buscador en Mobile */}
        <div className="px-6 pb-4">
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full bg-transparent border-2 border-purple-600 text-white placeholder-gray-400 rounded-full px-4 py-2 outline-none focus:border-cyan-400 transition duration-300"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
