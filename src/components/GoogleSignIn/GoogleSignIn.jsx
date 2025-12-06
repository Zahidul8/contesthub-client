import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = () => {
    const {signInWithGoogle} = useAuth();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => {
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