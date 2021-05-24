'use strict';
const faker = require('faker')

const generateBrands = (length = 10) => {
  const data = []
  for (let i = 1; i <= length; i++) {
    data.push({
      id: i,
      name: faker.commerce.productName(),
      logo: faker.image.imageUrl(),
      banner: faker.image.imageUrl(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
  return data
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('brands', generateBrands(10), {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('brands', null, {});
  }
};
