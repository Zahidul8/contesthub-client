const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Our Platform?</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-gray-800 rounded-2xl">
            <h3 className="font-semibold text-xl">Verified Contests</h3>
            <p className="text-gray-400 mt-2">
              All contests are reviewed for quality and fairness.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl">
            <h3 className="font-semibold text-xl">Secure Payments</h3>
            <p className="text-gray-400 mt-2">
              Safe and transparent prize distribution.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl">
            <h3 className="font-semibold text-xl">Global Reach</h3>
            <p className="text-gray-400 mt-2">
              Participate from anywhere in the world.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl">
            <h3 className="font-semibold text-xl">Skill Growth</h3>
            <p className="text-gray-400 mt-2">
              Improve real-world problem-solving skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
