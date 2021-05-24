'use strict';
const faker = require('faker');
const { brand } = require('../models')

const generateProducts = (length = 10) => {

  const data = []
  for (let i = 1; i <= length; i++) {
    data.push({
      id: i,
      brandId: i,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.imageUrl(),
      price: 10000,
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
    try {
      await queryInterface.bulkInsert('products', generateProducts(10), {});
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
  }
};
