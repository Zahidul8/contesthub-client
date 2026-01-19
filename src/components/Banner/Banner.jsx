import React, { useState } from "react";
import { FaSearch, FaDollarSign, FaClock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const sliderImages = [
  {
    image: "https://images.unsplash.com/photo-1557683316-973673baf926",
    title: "Creative Contests",
    subtitle: "Show your talent and win rewards",
  },
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    title: "Tech Challenges",
    subtitle: "Compete with top developers",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Design Battles",
    subtitle: "Turn creativity into success",
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    title: "Startup Ideas",
    subtitle: "Innovate and get funded",
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Global Competitions",
    subtitle: "Join worldwide contests",
  },
];

const Banner = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const axiosInstance = useAxios();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const { data } = await axiosInstance.get(
        `/contest-search?search=${searchQuery}`
      );
      return data;
    },
    enabled: !!searchQuery,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div>
      {/* ===== Slider Section ===== */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, Navigation, EffectFade]}
          effect="fade"
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          className="h-full"
        >
          {sliderImages.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-center text-center px-4">
                  <div className="max-w-3xl text-white animate-fadeIn">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200">
                      {slide.subtitle}
                    </p>

                    {/* Search Bar */}
                    <form
                      onSubmit={handleSearch}
                      className="mt-8 flex items-center bg-white/20 backdrop-blur-xl border border-white/40 rounded-full p-2"
                    >
                      <input
                        type="text"
                        placeholder="Search contest by type..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-300 focus:outline-none w-full"
                      />
                      <button
                        type="submit"
                        className="bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 rounded-full font-bold text-gray-900 flex items-center gap-2"
                      >
                        <FaSearch /> Search
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ===== Responsive Navigation Buttons ===== */}
        <div className="absolute inset-0 z-20 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
          <button
            className="custom-prev pointer-events-auto
              w-9 h-9 sm:w-12 sm:h-12
              rounded-full bg-white/30 backdrop-blur-md
              text-white text-xl font-bold
              flex items-center justify-center
              hover:bg-white/50 transition"
          >
            ❮
          </button>

          <button
            className="custom-next pointer-events-auto
              w-9 h-9 sm:w-12 sm:h-12
              rounded-full bg-white/30 backdrop-blur-md
              text-white text-xl font-bold
              flex items-center justify-center
              hover:bg-white/50 transition"
          >
            ❯
          </button>
        </div>
      </div>

      {/* ===== Search Results ===== */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {isLoading && <Loading />}

        {!isLoading && searchQuery && contests.length === 0 && (
          <p className="text-center text-gray-500">No contests found.</p>
        )}

        {!isLoading && contests.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              Search Results
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contests.map((contest) => (
                <div
                  key={contest._id}
                  className="bg-white rounded-3xl shadow-lg hover:scale-105 transition"
                >
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="h-44 w-full object-cover rounded-t-3xl"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{contest.name}</h3>
                    <p className="text-sm text-gray-500">{contest.contestType}</p>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="flex items-center text-yellow-600 font-semibold">
                        <FaDollarSign /> {contest.prizeMoney}
                      </span>
                      <span className="flex items-center text-gray-600 text-sm">
                        <FaClock className="mr-1" />
                        {new Date(contest.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
