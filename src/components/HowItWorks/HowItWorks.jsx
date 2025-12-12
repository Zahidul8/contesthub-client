import React from "react";
import { FaUserCheck, FaMoneyCheckAlt, FaTrophy } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserCheck size={45} />,
      title: "Join a Contest",
      desc: "Explore exciting contests and choose the one that suits you best.",
    },
    {
      icon: <FaMoneyCheckAlt size={45} />,
      title: "Submit Your Entry",
      desc: "Upload your creative work, project, or design before the deadline.",
    },
    {
      icon: <FaTrophy size={45} />,
      title: "Win Rewards",
      desc: "If selected as the winner, enjoy instant prize money rewards!",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
        How It Works
      </h2>

      {/* Steps Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group bg-white/30 backdrop-blur-xl p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition-all duration-500"
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-white/70 shadow-md text-primary group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
            </div>

            {/* Text */}
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
              {step.title}
            </h3>

            <p className="text-gray-700 text-center leading-relaxed">
              {step.desc}
            </p>

            {/* Hover glow effect */}
            <div className="mt-5 h-1 w-0 group-hover:w-full transition-all duration-700 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
