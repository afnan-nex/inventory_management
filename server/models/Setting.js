const db = require('../config/database');

class Setting {
  static async findByShopId(shopId) {
    return db.promisifyQuery('SELECT * FROM settings WHERE shop_id = ? ORDER BY key ASC', [shopId]);
  }

  static async findByShopIdAndKey(shopId, key) {
    return db.promisifyQueryOne('SELECT * FROM settings WHERE shop_id = ? AND key = ?', [shopId, key]);
  }

  static async set(shopId, key, value) {
    await db.promisifyRun('INSERT INTO settings (shop_id, key, value) VALUES (?, ?, ?) ON CONFLICT(shop_id, key) DO UPDATE SET value = excluded.value', [shopId, key, value]);
    return Setting.findByShopIdAndKey(shopId, key);
  }

  static async delete(shopId, key) {
    await db.promisifyRun('DELETE FROM settings WHERE shop_id = ? AND key = ?', [shopId, key]);
  }
}

module.exports = Setting;
