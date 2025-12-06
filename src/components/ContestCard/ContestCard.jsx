import React from 'react';

const ContestCard = ({contest}) => {
    return (
        <div className="card bg-base-100 shadow-xl border border-base-300 ">
                <figure className="h-52">
                    <img
                        src={contest.image}
                        alt="Contest"
                        className="object-cover w-full h-full"
                    />
                </figure>

                <div className="card-body space-y-3">
                    {/* Title */}
                    <h2 className="card-title">
                        {contest.name}
                    </h2>

                    {/* Participants */}
                    <p className="text-sm text-gray-500">
                        Participants: <span className="font-semibold">{contest.count}</span>
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {contest.description}
                    </p>

                    {/* Footer */}
                    <div className="card-actions justify-end mt-2">
                        <button className="btn btn-primary btn-sm">
                            Details
                        </button>
                    </div>
                </div>
            </div>
    );
};

export default ContestCard;