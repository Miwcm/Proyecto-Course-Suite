import { useState } from 'react'

const Hero = ({ onExploreClick }) => {
    const [email, setEmail] = useState('')

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (!email) return
        alert(`¡Gracias por suscribirte con ${email}! Pronto recibirás novedades.`)
        setEmail('')
        // Aquí luego podrías conectar con tu backend para guardar el email
    }

    return (
        <div className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-24 lg:py-32">
            {/* Efectos de fondo (luces) */}
            <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-20">
                <div className="aspect-1155/678 w-6xl bg-linear-to-tr from-[#ff80b5] to-[#9089fc]"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                {/* Título Principal */}
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                    Potencia tu carrera con <br />
                    <span className="bg-linear-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                        los mejores cursos gratuitos
                    </span>
                </h1>

                <p className="mt-4 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                    Accede a una selección curada de cursos de alta calidad en programación, diseño y datos.
                    Todo lo que necesitas para crecer, en un solo lugar.
                </p>

                {/* Acciones: Botón Ver Todos y Suscripción */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">

                    <button
                        onClick={onExploreClick}
                        className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 ring-1 ring-white/20 transition-all"
                    >
                        Explorar Cursos ↓
                    </button>

                    {/* Formulario de Suscripción */}
                    <form onSubmit={handleSubscribe} className="flex gap-2">
                        <input
                            type="email"
                            required
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="min-w-0 flex-auto rounded-full border-0 bg-white/5 px-4 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 placeholder:text-slate-500"
                        />
                        <button
                            type="submit"
                            className="flex-none rounded-full bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-110 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                        >
                            Suscribirse
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Hero