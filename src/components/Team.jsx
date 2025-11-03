const Team = () => {
    const teamMembers = [
      {
        name: "Miwa",
        role: "Full Stack Developer",
        avatar: "🦊",
        color: "from-purple-500 to-pink-500",
      },
      {
        name: "Valen",
        role: "Full Stack Developer",
        avatar: "🌸",
        color: "from-cyan-500 to-blue-500",
      },
      {
        name: "Tomi",
        role: "Full Stack Developer",
        avatar: "⚡",
        color: "from-yellow-500 to-orange-500",
      },
      {
        name: "Enzo",
        role: "Full Stack Developer",
        avatar: "🎨",
        color: "from-green-500 to-teal-500",
      },
      {
        name: "Mila",
        role: "Full Stack Developer",
        avatar: "✨",
        color: "from-red-500 to-pink-500",
      },
    ]
  
    return (
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-cyan-400 mb-3">Nuestro Equipo</h2>
          <p className="text-gray-400">Las personas que hacen posible este proyecto</p>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#151523] rounded-xl p-6 border border-purple-800/40 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-2 text-center"
            >
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-4xl shadow-lg`}
              >
                {member.avatar}
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-purple-400 text-sm font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default Team
  