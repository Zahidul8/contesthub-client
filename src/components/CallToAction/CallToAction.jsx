import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const CallToAction = () => {
    const {user} = useAuth();
  return (
    <section className="py-20 bg-yellow-400 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Join the Competition?
      </h2>
      <p className="mb-6">
        Participate, showcase your skills, and win exciting prizes.
      </p>

      <Link
        to={`${user? "/all-contests" : "/login"}`}
        className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
      >
        Get Started Now
      </Link>
    </section>
  );
};

export default CallToAction;
