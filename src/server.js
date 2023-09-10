import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import cors from 'cors';

require('dotenv').config();

let app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoutes(app)

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Backend nodejs is running on port: ", port)
});




