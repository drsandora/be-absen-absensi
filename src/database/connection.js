const {
  CONNECTION
} = require("../config");

const pgp = require('pg-promise')();

const db = pgp(CONNECTION);

module.exports = db;
// SQL query to create the schema

const createTableQuery1 = `
    CREATE TABLE IF NOT EXISTS absensi_t (
    absensi_id SERIAL PRIMARY KEY,
    pegawai_id INT,
    statusabsen_id INT,
    waktu_absen TIMESTAMP
    );

`;

async function createSchema() {
  try {
    await db.connect();
    await db.query(createTableQuery1);
    console.log('Schema created successfully.');
  } catch (error) {
    console.error('Error creating schema:', error);
  } 
}

createSchema();
