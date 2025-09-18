'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      { 
        id: 1,
        name: 'Развитие',
        description: 'N E W',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { 
        id: 2,
        name: 'Стиль',
        description: 'Aesthetics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { 
        id: 3,
        name: 'Творчество',
        description: 'дом твоей эстетики',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Искусство',
        description: 'wailet',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { 
        id: 5,
        name: 'Развитие',
        description: 'A W E S O M E',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'Фотография',
        description: 'minimalism',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { 
        id: 7,
        name: 'Литература',
        description: 'Словарный запас',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};




