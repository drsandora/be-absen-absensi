

class absen {
    constructor(pegawai_id, statusabsen_id, waktu_absen) {
      this.pegawai_id = pegawai_id;
      this.statusabsen_id = statusabsen_id;
      this.waktu_absen = waktu_absen;
    }
    async save() {
            const { AbsenConnection } = require('../index'); 
            const insertQuery = `
            INSERT INTO absensi_t (pegawai_id, statusabsen_id, waktu_absen)
            VALUES ($1, $2, $3)
            RETURNING absensi_id, pegawai_id, statusabsen_id, waktu_absen;
            `;
            try {
            const result = await AbsenConnection.one(insertQuery, [
                this.pegawai_id, this.statusabsen_id, this.waktu_absen,
            ]);
            return result;
            } catch (error) {
                return error.message;
            }
    }
}


async function FindPegawaiById({pegawai_id}) {
    const { PegawaiConnection } = require('../index'); 
    const query = {
        text: `SELECT * FROM pegawai_t WHERE pegawai_id = $1`,
        values: [pegawai_id],
    };

    try {
        const result = await PegawaiConnection.query(query);
        return result[0];
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error finding user');
    }
}

async function FindPegawaiByEmail(email) {
    const { PegawaiConnection } = require('../index'); 
    const query = {
        text: `SELECT * FROM pegawai_t WHERE email = $1`,
        values: [email],
    };

    try {
        const result = await PegawaiConnection.query(query);
        return result[0];
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error finding user');
    }
}

async function FindAllPegawai() {
    const { PegawaiConnection } = require('../index'); 
    const query = {
        text: `SELECT * FROM pegawai_t`,
    };

    try {
        const result = await PegawaiConnection.query(query);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Error finding user');
    }
}


module.exports = {
absen,
FindPegawaiByEmail,
FindAllPegawai,
FindPegawaiById,
};

