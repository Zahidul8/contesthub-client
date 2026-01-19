import React from 'react';
import ContestCardSkeleton from './ContestCardSkeleton';

const CardLoading = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {[...Array(12)].map((_,index) => <ContestCardSkeleton key={index}></ContestCardSkeleton>
            )}
   
</div>

    );
};

export default CardLoading;