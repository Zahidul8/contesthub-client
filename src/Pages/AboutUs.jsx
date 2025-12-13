import React from "react";
import { FaUsers, FaTrophy, FaLightbulb, FaRocket, FaDollarSign } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl">
            About ContestHub
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
            We are a next-generation contest platform empowering creators, 
            participants, and brands to connect through creativity, skill, and competition.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Who We Are</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Team working"
            className="rounded-2xl shadow-lg"
          />

          <div>
            <p className="text-gray-500 text-lg leading-relaxed">
              ContestHub started with a simple idea—give talented people a platform
              where they can showcase their creativity and be rewarded for it.  
              Today, thousands of creators trust us to host fair, transparent, and
              exciting contests across multiple categories.
            </p>
            <p className="text-gray-500 text-lg leading-relaxed mt-4">
              Whether you're a designer, photographer, writer, or gamer, our mission
              is to help you grow, compete, and shine.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION VALUES */}
      <section className=" py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Empower */}
          <div className="p-8 bg-gray-100 rounded-2xl text-center shadow-md hover:scale-105 transition">
            <FaRocket className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl text-black font-bold mb-2">Empower Creators</h3>
            <p className="text-gray-600">
              We provide tools & support to help creators launch contests and grow their audience.
            </p>
          </div>

          {/* Inspire */}
          <div className="p-8 bg-gray-100 rounded-2xl text-center shadow-md hover:scale-105 transition">
            <FaLightbulb className="text-yellow-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl text-black font-bold mb-2">Inspire Innovation</h3>
            <p className="text-gray-600">
              We encourage creative thinking and celebrate new ideas in every contest.
            </p>
          </div>

          {/* Celebrate */}
          <div className="p-8 bg-gray-100 rounded-2xl text-center shadow-md hover:scale-105 transition">
            <FaTrophy className="text-purple-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl text-black font-bold mb-2">Celebrate Winners</h3>
            <p className="text-gray-600">
              Every achievement matters — we make sure winners get the spotlight they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* OUR IMPACT */}
      <section className="py-16 px-6 bg-gradient-to-br from-lime-50 to-lime-100">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <FaUsers className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-black">25,000+</h3>
            <p className="text-gray-600 mt-2">Active Participants</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <FaTrophy className="text-yellow-500 text-5xl mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-black">1,200+</h3>
            <p className="text-gray-600 mt-2">Successful Contests</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <FaDollarSign className="text-green-600 text-5xl mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-black">$90,000+</h3>
            <p className="text-gray-600 mt-2">Prize Money Awarded</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose ContestHub?</h2>

        <ul className="space-y-4 text-lg text-gray-700">
          <li className="p-4 bg-white rounded-xl shadow-md">
            ✔ Fair & Transparent Contest System
          </li>
          <li className="p-4 bg-white rounded-xl shadow-md">
            ✔ Secure Payment & Fast Prize Distribution
          </li>
          <li className="p-4 bg-white rounded-xl shadow-md">
            ✔ Creative Categories for All Skill Levels
          </li>
          <li className="p-4 bg-white rounded-xl shadow-md">
            ✔ Dedicated Support & Community Engagement
          </li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Join the ContestHub Community</h2>
        <p className="text-lg mb-8 opacity-90">
          Start your journey today — create contests, compete, and win big!
        </p>
        <button className="bg-white text-purple-600 font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
