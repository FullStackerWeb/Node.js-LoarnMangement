'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('loan', [{
      bankName: "Banco Cathay",
      loanNumber: 60007651,
      amount: 75000000.00,
      balance: 22979554.86,
      partialPayments: 52020445.14,
      openingDate: "2018-6-15",
      dueDate: "2018-12-11",
      project: "RECOPE",
      details: "Descuento Fact #492",
      updatedAt: "2018-11-17",
      createdAt: "2018-11-17"
    },
    {
      bankName: "Fayma",
      loanNumber: 60007714,
      amount: 22979554.86,
      balance: 22979554.86,
      partialPayments: 0.00,
      openingDate: "2018-3-26",
      dueDate: "2018-6-26",
      project: "Muni Cartago",
      details: "Adelanto",
      updatedAt: "2018-11-17",
      createdAt: "2018-11-17"
    },
    {
      bankName: "Banco Davivienda",
      loanNumber: 25546464656644,
      amount: 6658944.25,
      balance: 2124784.25,
      partialPayments: 4534160,
      openingDate: "2018-9-28",
      dueDate: "2019-2-25",
      project: "Muni Sarapiqui",
      details: "Descuento Fact #455",
      updatedAt: "2018-11-17",
      createdAt: "2018-11-17"
    },
    {
      bankName: "Banco Improsa",
      loanNumber: 60007923,
      amount: 6658944.25,
      balance: 2124784.25,
      partialPayments: 4534160.00,
      openingDate: "2018-9-28",
      dueDate: "2019-2-25",
      project: "Base 2",
      details: "Largo plazo",
      updatedAt: "2018-11-17",
      createdAt: "2018-11-17"
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
