import express from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import configViewEngine from './config/viewEngine.js';
import initWebRoutes from './routes/index.router.js';

import connetDB from './config/db.js';

connetDB();
const app = express();
// app.use(cors(corsOptions));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('hello api');
});

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
