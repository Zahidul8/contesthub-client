import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router';

const GoogleSignIn = () => {
    const {signInWithGoogle} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {

             navigate(location?.state || '/');
            console.log(result.user);
            
        })
        .catch(error => {
            console.log(error.message);
            
        })

    }
    return (
        <div>
              <button onClick={handleGoogleSignIn} className="btn btn-outline w-full flex items-center gap-2">
                                <FcGoogle size={22} /> Continue with Google
                            </button>
        </div>
    );
};

export default GoogleSignIn;