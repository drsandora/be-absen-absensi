const { FormateData } = require('../helper')
const { AbsenRepository } = require('../database'); 

class AbsenService {

    constructor(){
        this.repository = new AbsenRepository();
    }

    async addAbsen(userInputs){
        const { pegawai_id, statusabsen_id, waktu_absen } = userInputs;
        const addAbsen = await this.repository.CreateAbsen({ pegawai_id, statusabsen_id, waktu_absen });
        return FormateData(addAbsen );

    }

    async GetAllPegawai(){
        const user = await  this.repository.FindAllPegawai();
        return FormateData(user);
    }

    async GetPegawai(pegawai_id){
        const user = await  this.repository.FindPegawaiById(pegawai_id);
        return FormateData(user);
    }


    async SubscribeEvents(payload){
 
        console.log('Triggering.... Absen Events')

        payload = JSON.parse(payload)

        const { event, data } =  payload;

        const { userId, product, order, qty } = data;

        switch(event){
            case 'CREATE_ORDER':
                this.ManageOrder(userId,order);
                break;
            default:
                break;
        }
 
    }

}

module.exports = AbsenService;
