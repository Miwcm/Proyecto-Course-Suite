// src/components/Footer.jsx
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b17] text-gray-300 border-t border-purple-800/40 pt-16">
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-4">
        {/* Marca + descripción */}
        <div className="md:col-span-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="/imagenes/course-suite-logo.png"
              alt="Course Suite"
              className="h-12 w-auto object-contain"
            />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-cyan-400">Course</span>
              <span className="text-purple-500">Suite</span>
            </span>
          </NavLink>

          <p className="mt-3 text-sm text-gray-400 max-w-md">
            Descubre los mejores cursos gratuitos en desarrollo web y otras áreas IT. Aprende a tu ritmo con contenido seleccionado para la comunidad.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { name: "Inicio", href: "/" },
              { name: "Cursos", href: "/cursos" },
              { name: "Contacto", href: "/contacto" },
              { name: "Nosotros", href: "/nosotros" },
            ].map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className="relative text-gray-300 hover:text-cyan-400 transition-colors
                             after:absolute after:w-0 after:h-0.5 after:bg-cyan-400
                             after:left-0 after:-bottom-1 hover:after:w-full
                             after:transition-all after:duration-300"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Tecnologías + contacto simple */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Tecnologías
          </h3>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {[
              "Desarrollo Web",
              "Data Science",
              "Ciberseguridad",
              "Cloud Computing",
              "IA & Machine Learning",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-purple-700/40 px-3 py-1
                           text-[0.75rem] text-gray-300
                           hover:border-cyan-400 hover:text-cyan-300 transition"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Contacto
          </h3>
          <a
            href="mailto:contacto@coursesuite.com"
            className="mt-3 block text-sm text-gray-300 hover:text-cyan-400 transition"
          >
            contacto@coursesuite.com
          </a>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-purple-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Course Suite. Todos los derechos reservados.</p>
          <p>
            Hecho con <span className="text-purple-400">❤</span> para la comunidad IT.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
