import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";

const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
           <ScaleLoader color='blue'/>
        </div>
    );
};

export default Loading;