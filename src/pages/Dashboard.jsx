import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../context/WebSocketContext';
import { teamData } from '../constants/teamData';
import { FaSearch, FaSort, FaUsers } from 'react-icons/fa';
import playersData from '../data/players.json';
import { IoWallet } from "react-icons/io5";
import { SiElixir } from "react-icons/si";

const Dashboard = () => {
  const { players: soldPlayers } = useWebSocket();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [allPlayers, setAllPlayers] = useState([]);

  // Initialize and update players when soldPlayers changes
  useEffect(() => {
    const updatedPlayers = playersData.players.map(player => {
      const soldPlayer = soldPlayers.find(sp => sp.id === player.id);
      return soldPlayer || player;
    });
    setAllPlayers(updatedPlayers);
  }, [soldPlayers]);

  // Sort players
  const sortedPlayers = [...allPlayers].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const filteredPlayers = sortedPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:pl-72 pt-20 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Live Auction Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:w-64">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search players..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setSortBy(sortBy === 'price' ? 'name' : 'price')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <FaSort />
                Sort by {sortBy === 'price' ? 'Name' : 'Price'}
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 flex items-center">
            <IoWallet className="mr-2" />
            Team Wallets
          </h2>

        {/* Team Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(teamData).map(([teamName, data]) => {
            const teamPlayers = filteredPlayers.filter(p => p.team === teamName);
            const totalSpent = teamPlayers.reduce((sum, p) => sum + (p.price || 0), 0);
            const remainingBalance = data.wallet - totalSpent;
            
            return (
              <div
                key={teamName}
                className={`${data.color} rounded-xl p-4 shadow-lg
                  transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <img src={data.icon} alt={teamName} className="w-9 h-9" />
                  <div>
                    <h3 className="text-white font-bold text-lg">{teamName}</h3>
                    <p className="text-white text-sm">Players: {teamPlayers.length}</p>
                  </div>
                </div>
                
                <div className="text-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm opacity-90">Spent:</span>
                    <span className="font-bold flex items-center gap-[1px]"><SiElixir className='text-white text-[16px] rotate-[25deg]'/>{totalSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm opacity-90">Remaining:</span>
                    <span className="font-bold flex items-center gap-[1px]"><SiElixir className='text-white text-[16px] rotate-[25deg]'/>{remainingBalance.toLocaleString()}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-500"
                      style={{ width: `${(remainingBalance / data.wallet) * 100}%` }}
                    />
                  </div>
                  <div className="text-center text-sm mt-2 flex gap-[1px] items-center">
                  <SiElixir className='text-white text-[12px] rotate-[25deg]'/>{totalSpent.toLocaleString()} / <SiElixir className='text-white text-[12px] rotate-[25deg]'/>{data.wallet.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaUsers className=" mr-2" />
            Players
        </h2>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {filteredPlayers.map(player => {
    const teamInfo = player.team ? teamData[player.team] : null;
    const isSold = player.sold;

    return (
      <div
        key={player.id}
        className={`${teamInfo ? teamInfo.color : 'bg-white'} 
          rounded-xl overflow-hidden shadow-lg
          transform hover:scale-105 transition-all duration-300`}
      >
        <div className={`p-4 ${teamInfo ? '' : 'border-2 border-gray-200'} 
          ${!isSold ? 'min-h-[160px] rounded-xl' : ''}`}> 
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-xl font-bold ${teamInfo ? 'text-white' : 'text-gray-800'}`}>
                {player.name}
              </h3>
              <p className={`capitalize ${teamInfo ? 'text-white opacity-90' : 'text-gray-600'}`}>
                {player.position}
              </p>
            </div>
            {teamInfo && (
              <img src={teamInfo.icon} alt={player.team} className="w-10 h-10" />
            )}
          </div>
          {isSold ? (
            <div className={`mt-4 ${teamInfo ? 'text-white' : 'text-gray-800'}`}>
              <p className="text-sm opacity-90">Sold to {player.team}</p>
              <div className="text-2xl font-bold flex gap-[1px] items-center"><SiElixir className='text-white text-[20px] rotate-[25deg]'/>{player.price.toLocaleString()}</div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-gray-600 font-semibold">Unsold</p>
            </div>
          )}
        </div>
      </div>
    );
  })}
</div>

      </div>
    </div>
  );
};

export default Dashboard; 