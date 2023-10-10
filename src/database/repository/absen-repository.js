
const { AbsenModel } = require('../models');

class PegawaiRepository {

    async CreateAbsen(payload){
        const { pegawai_id, statusabsen_id, waktu_absen} = payload;
        // const is_exist = await AbsenModel.FindPegawaiByEmail(email);
        // if(is_exist) throw new Error("Email Sudah Terdaftar!");
        const user = new AbsenModel.absen(
            pegawai_id, statusabsen_id, waktu_absen
        )
        const userResult = await user.save();
        return userResult;
    }

    async FindPegawaiById(pegawai_id){

        const existingPegawai = await AbsenModel.FindPegawaiById(pegawai_id);
        return existingPegawai;
    }

    async FindAllPegawai(){

        const existingPegawai = await AbsenModel.FindAllPegawai();
        return existingPegawai;
    }
}

module.exports = PegawaiRepository;
