import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Web Developer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "This platform helped me sharpen my coding skills and win real prizes. The contests are well organized and fun!",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "I love how transparent and fair the contests are. The leaderboard system keeps me motivated every time.",
    rating: 4,
  },
  {
    name: "Arif Hasan",
    role: "Startup Enthusiast",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    review:
      "Participating in business idea contests here gave me real exposure and confidence. Highly recommended!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 hover:scale-105 transition"
            >
              {/* Stars */}
              <div className="flex mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-200 leading-relaxed">
                “{item.review}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
