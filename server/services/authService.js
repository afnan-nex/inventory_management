const User = require('../models/User');
const { hashPassword, comparePassword, generateToken } = require('../utils/jwt');

async function loginUser(email, password, rememberMe) {
  const user = User.findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
}

module.exports = { loginUser };
