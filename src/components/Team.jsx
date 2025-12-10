import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: "Miwa",
      role: "Full Stack Developer",
      avatar: "/imagenes/miwa.jpg",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Valen",
      role: "Full Stack Developer",
      avatar: "/imagenes/valen.jpg",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Mili",
      role: "Full Stack Developer",
      avatar: "/imagenes/mili.jpg",
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <section className="py-8 px-4 md:py-16 md:px-8">

      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 md:mb-3">
          Nuestro Equipo
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Las personas que hacen posible este proyecto
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="w-full sm:w-80 bg-[#151523] rounded-xl p-6 border border-purple-800/40 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-2 flex flex-col items-center justify-center text-center group"
          >
            <div
              className={`w-24 h-24 mb-4 rounded-full bg-linear-to-br ${member.color} p-[3px] shadow-lg`}
            >
              <img
                src={member.avatar}
                alt={`Foto de ${member.name}`}
                className="w-full h-full rounded-full object-cover bg-[#151523]"
              />
            </div>

            <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors">
              {member.name}
            </h3>
            <p className="text-purple-400 text-sm font-medium">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;