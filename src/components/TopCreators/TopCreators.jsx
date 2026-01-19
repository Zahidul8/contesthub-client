const creators = [
  {
    name: "Alex Johnson",
    contests: 22,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Martinez",
    contests: 18,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Daniel Lee",
    contests: 15,
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Emily Carter",
    contests: 12,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const TopCreators = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Top Contest Creators
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <img
                src={creator.image}
                alt={creator.name}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-4 border-yellow-400"
              />

              <h4 className="font-semibold text-lg text-gray-800">
                {creator.name}
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                {creator.contests}+ Contests Hosted
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCreators;
