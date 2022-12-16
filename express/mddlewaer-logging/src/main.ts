import express from 'express';
import logger from "./logger";

const app = express();
const port = 3001;

//routes
app.get('/regions', logger, (req, res) => {
    res.send('Regions!')
});

app.get('/divisions', logger, (req, res) => {
    res.send('Divisions!')
});

app.get('/sub-divisions', logger, (req, res) => {
    res.send('Sub Divisions!')
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});