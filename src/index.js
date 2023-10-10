const express = require('express');
const { absen, appEvent } = require('./api');


const StartServer = async() => {

    const app = express();
    const port = 8003;
    absen(app);
    app.listen(port, () => {

        console.log(`Absen is Listening to Port ${port}`)
    })
    
    

}

StartServer();

