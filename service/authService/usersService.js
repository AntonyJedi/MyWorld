const sequelize = require('../../db')
const {DataTypes} = require('sequelize')
// const Users = require('../../models/users')(sequelize, DataTypes)
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require("./mailService");

const registrationServices = async (email, password, role) => {
  const candidate = await Users.findOne({where: {email}})
  if (!candidate) {
    const hashPassword = await bcrypt.hash(password, 5)
    const activationLink = uuid.v4()
    const newUser = await Users.create({email, password: hashPassword, role, activationLink})
    await mailService.mail(email, activationLink)
    return {
      status: 200,
      toClient: newUser
    }
  } else {
    return {
      status: 400,
      toClient: {message: 'User already exists'}
    }
  }
}

module.exports = {registrationServices}