const PlatformFeatures = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">
          Platform Features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature title="Live Leaderboard" />
          <Feature title="Real-Time Submissions" />
          <Feature title="Deadline Tracking" />
          <Feature title="Contest Analytics" />
          <Feature title="Creator Dashboard" />
          <Feature title="Secure Authentication" />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ title }) => (
  <div className="p-6 bg-white rounded-2xl shadow">
    <h3 className="font-semibold text-lg text-black">{title}</h3>
    <p className="text-gray-500 mt-2">
      Designed to enhance user experience and performance.
    </p>
  </div>
);

export default PlatformFeatures;
