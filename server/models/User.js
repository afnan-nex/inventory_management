const db = require('../config/database');

class User {
  static async findById(id) {
    return db.promisifyQueryOne('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
  }

  static async findByEmail(email) {
    return db.promisifyQueryOne('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async create(name, email, password, role) {
    const result = await db.promisifyRun(
      'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
      [name, email, password, role]
    );
    return { id: result.lastID, name, email, role };
  }

  static async findAll() {
    return db.promisifyQuery('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
  }

  static async update(id, name, email, role) {
    await db.promisifyRun('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id]);
    return User.findById(id);
  }
}

module.exports = User;
