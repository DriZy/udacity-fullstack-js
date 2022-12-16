import express from 'express';
import {promises as fsPromises} from 'fs';
import csv from 'csvtojson'

const app = express();
const port = 3000;
const inputFile = './users.csv'
const outputFile = './users.json'

//convert route
app.get('/convert', (req, res) =>{
    res.send('Converting csv to json in process...');
    csv().fromFile(inputFile)
        .then((jsonObj)=>{
            let data = jsonObj.map((item:{first_name: string, last_name:string, phone: string})=>{
                let {first_name, last_name, phone} = item;
                if (item.phone === ""){
                    phone = "Missing phone here"
                }
                return {first_name, last_name, phone}
            });
            fsPromises.writeFile(outputFile, JSON.stringify(data));
        })
})

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});