// src/pages/Scoreboard.jsx
import React, { useState } from 'react';
import { FaSearch, FaTrophy, FaCrown } from 'react-icons/fa';
import { GiQueenCrown, GiCrownedSkull } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import playersData from '../data/players.json';
import { teamData } from '../constants/teamData';

const getPositionIcon = (position) => {
  switch (position.toLowerCase()) {
    case 'leader':
      return <FaCrown className="text-yellow-500 text-3xl" />;
    case 'co-leader':
      return <GiQueenCrown className="text-purple-500 text-3xl" />;
    case 'elder':
      return <GiCrownedSkull className="text-blue-500 text-3xl" />;
    case 'member':
      return <HiUserGroup className="text-gray-500 text-3xl" />;
    default:
      return null;
  }
};

const Scoreboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sort players by rank (id) by default
  const sortedPlayers = [...playersData.players].sort((a, b) => Number(a.id) - Number(b.id));

  const filteredPlayers = sortedPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#010815] p-4 lg:pl-72 pt-20 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              <FaTrophy className="inline-block mr-2 text-yellow-500" />
              Scoreboard
            </h1>
          </div>
        </div>

        {/* Search Control */}
        <div className="flex sm:flex-row flex-col sm:justify-between items-start md:items-center pb-8">
          <div className="flex items-center gap-4 w-full">
            <div className="relative flex-1 md:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search players..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-gray-200 
                         dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Players List */}
        <div className="space-y-4">
          {filteredPlayers.map((player) => {
            const teamInfo = player.team ? teamData[player.team] : null;

            return (
              <div
                key={player.id}
                className={`${
                  teamInfo ? teamInfo.color : 'bg-white dark:bg-gray-900'
                } rounded-xl shadow-lg transform hover:scale-[1.01] transition-all duration-150`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className={`text-xl font-bold ${
                        teamInfo ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        #{player.id}
                      </span>
                      <div className="flex items-center gap-4">
                        <div>
                          <a
                            href={player.codolio_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-lg md:text-xl font-bold hover:underline ${
                              teamInfo ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            {player.name}
                          </a>
                          <div className={`capitalize mt-1 flex gap-2 items-center ${
                            teamInfo ? 'text-white opacity-90' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            <div className="bg-gray-100 dark:bg-white border-[1px] dark:border-0 rounded-full p-[4px] w-[1.15rem] h-[1.15rem] sm:w-5 sm:h-5 flex items-center justify-center">
                          {getPositionIcon(player.position)}
                        </div>
                            <p>{player.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className={`text-center ${
                        teamInfo ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        <p className="text-sm opacity-80">Q1 Score</p>
                        <p className="text-xl font-bold">{player.q1_score}</p>
                      </div>
                      <div className={`text-center ${
                        teamInfo ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        <p className="text-sm opacity-80">Q2 Score</p>
                        <p className="text-xl font-bold">{player.q2_score}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;