'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.createTable('loan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bankName: {
        type: Sequelize.STRING
      },
      loanNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      balance: {
        type: Sequelize.FLOAT,
      },
      partialPayments: {
        type: Sequelize.FLOAT,
      },
      openingDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      project: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.dropTable('loan')
  }
};
