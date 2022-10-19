'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING,       // 해당 사용자의 닉네임은 고유해야한다.  중복된 닉네임 가질수없음
      },
      salt: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,    // 해당하는 컬럼은 무조건 존재해야한다.
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};