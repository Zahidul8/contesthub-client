import React from "react";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import { saveOrUpdateUser } from "../../Uitls";

const GoogleSignIn = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const loggedUser = result.user;

        // Save / update user in DB
        await saveOrUpdateUser({
          name: loggedUser.displayName,
          email: loggedUser.email,
          image: loggedUser.photoURL,
        });

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn btn-outline w-full flex items-center gap-2"
    >
      <FcGoogle size={22} /> Continue with Google
    </button>
  );
};

export default GoogleSignIn;
