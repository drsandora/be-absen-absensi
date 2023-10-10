const AbsenService = require('../services/absen-service');
const bodyParser = require('body-parser');
const { PublishPegawaiEvent, PublishReportEvent } = require('../helper/index.js')
const { format } = require('date-fns');

module.exports = (app, channel) => {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true }));
    const service = new AbsenService();

    app.get('/getAllPegawai' , async (req,res) => {
        try {
            const { data } = await service.GetAllPegawai();
            res.json({data});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    });

    app.get('/getPegawai' , async (req,res) => {
        try {
            const { pegawai_id } = req.body;
            const { data } = await service.GetPegawai({ pegawai_id });
            res.json({data});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    });


    app.post('/AddAbsen',  async (req,res,next) => {
        try {
            const { pegawai_id, statusabsen_id } = req.body;
            const waktu_absen = new Date();
            const formattedDate = format(waktu_absen, 'dd-MM-yyyy HH:mm:ss');
            const { data } = await service.addAbsen({ pegawai_id, statusabsen_id, waktu_absen: formattedDate});
            if(!data) return;
            const formattedDate2 = format(data.waktu_absen, 'dd-MM-yyyy HH:mm:ss');
            const status_absen_nama = data.statusabsen_id == 1 ? "Masuk" : "Pulang"
            const payloadPegawai = { 
                event: 'GET_PEGAWAI',
                data: { pegawai_id : pegawai_id}
            };
            const getPegawai = await PublishPegawaiEvent(payloadPegawai);
            if(!getPegawai) return;
            const payloadReport = {
                event: 'CREATE_REPORT',
                data: { 
                    absensi_id : data.absensi_id, pegawai_id: getPegawai.pegawai_id, nama_pegawai: getPegawai.nama_pegawai, 
                    status_absen_nama: status_absen_nama, waktu_absen: formattedDate2,
                    email: getPegawai.email, position: getPegawai.position
                }
            }
            PublishReportEvent(payloadReport)
            res.json(data);
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

    });
}
