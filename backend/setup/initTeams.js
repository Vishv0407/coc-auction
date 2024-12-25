const Team = require('../models/Team');

const initializeTeams = async () => {
  try {
    const teams = ['Barbarians', 'Giants', 'Pekkas', 'Wizards'];
    
    for (const teamName of teams) {
      const existingTeam = await Team.findOne({ name: teamName });
      
      if (!existingTeam) {
        await Team.create({
          name: teamName,
          wallet: 10000
        });
        console.log(`Team ${teamName} initialized`);
      }
    }
  } catch (error) {
    console.error('Error initializing teams:', error);
  }
};

module.exports = initializeTeams; 