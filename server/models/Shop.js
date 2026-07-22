const db = require('../config/database');

class Shop {
  static async findById(id) {
    return db.promisifyQueryOne('SELECT * FROM shops WHERE id = ?', [id]);
  }

  static async findAll() {
    return db.promisifyQuery('SELECT * FROM shops ORDER BY created_at DESC');
  }

  static async create(name, address, phone, currency) {
    const result = await db.promisifyRun(
      'INSERT INTO shops (name, address, phone, currency, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
      [name, address, phone, currency]
    );
    return { id: result.lastID, name, address, phone, currency };
  }

  static async update(id, name, address, phone, currency) {
    await db.promisifyRun('UPDATE shops SET name = ?, address = ?, phone = ?, currency = ? WHERE id = ?', [name, address, phone, currency, id]);
    return Shop.findById(id);
  }

  static async delete(id) {
    await db.promisifyRun('DELETE FROM shops WHERE id = ?', [id]);
  }
}

module.exports = Shop;
