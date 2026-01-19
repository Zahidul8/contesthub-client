const ContestCategories = () => {
  const categories = [
    "Programming",
    "Design",
    "Business Ideas",
    "Photography",
    "Marketing",
    "Writing",
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Contest Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="p-4 text-center bg-white rounded-xl shadow hover:scale-105 transition"
            >
              <p className="font-semibold text-black">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContestCategories;
