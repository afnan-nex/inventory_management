require('dotenv').config();
const db = require('../config/database');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await db.exec(schema);

    const existingAdmin = await db.promisifyQueryOne('SELECT id FROM users WHERE email = ?', ['admin@example.com']);
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.promisifyRun(
        'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
        ['Admin User', 'admin@example.com', hashedPassword, 'owner']
      );
      console.log('Default admin account created: admin@example.com / admin123');
    } else {
      console.log('Admin account already exists.');
    }

    console.log('Database initialized successfully.');
    db.db.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    db.db.close();
    process.exit(1);
  }
}

initDatabase();
