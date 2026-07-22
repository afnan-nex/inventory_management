const User = require('../models/User');
const { hashPassword } = require('../utils/password');

async function createUser(name, email, password, role) {
  const existingUser = User.findByEmail(email);
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await hashPassword(password);
  return User.create(name, email, hashedPassword, role);
}

function getAllUsers() {
  return User.findAll();
}

function getUserById(id) {
  return User.findById(id);
}

async function updateUser(id, name, email, role) {
  const user = User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  return User.update(id, name, email, role);
}

module.exports = { createUser, getAllUsers, getUserById, updateUser };
