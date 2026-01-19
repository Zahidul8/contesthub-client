const StatisticsSection = () => {
  return (
    <section className="py-16 bg-indigo-600 text-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <Stat number="10K+" label="Participants" />
        <Stat number="500+" label="Contests Hosted" />
        <Stat number="$50K+" label="Prize Distributed" />
        <Stat number="120+" label="Creators" />
      </div>
    </section>
  );
};

const Stat = ({ number, label }) => (
  <div>
    <h3 className="text-3xl font-bold">{number}</h3>
    <p className="text-indigo-200 mt-1">{label}</p>
  </div>
);

export default StatisticsSection;
