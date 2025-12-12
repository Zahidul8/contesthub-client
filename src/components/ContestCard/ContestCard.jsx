import React from 'react';
import { Link } from 'react-router';
import { FaUsers, FaCalendarAlt } from 'react-icons/fa';

const ContestCard = ({ contest }) => {
    return (
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <figure className="relative h-52 overflow-hidden">
                <img
                    src={contest.image}
                    alt="Contest"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                {/* Type Badge */}
                <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {contest.contestType}
                </span>
            </figure>

            <div className="p-5 space-y-3">
                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">{contest.name}</h2>

                {/* Participants */}
                <div className="flex items-center gap-2 text-gray-600">
                    <FaUsers className="text-primary" /> 
                    <span>{contest.count} Participants</span>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm line-clamp-3">{contest.description}</p>

                {/* Footer: Deadline */}
                <div className="flex justify-between items-center mt-4 text-gray-700">
                    <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-primary" />{" "}
                        <span>{new Date(contest.deadline).toLocaleDateString()}</span>
                    </div>
                    <Link
                        to={`/contest-details/${contest._id}`}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-2xl font-semibold shadow hover:shadow-lg transition"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContestCard;
