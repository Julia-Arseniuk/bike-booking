import {log} from 'console';
import express from 'express';
import cors from 'cors';
import bikes from './routes/api/bikes.js';
import connectDB from './config/db.js';

const app = express();

app.use(cors());

await connectDB();
log("Mongo DB connecting...");

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json());

// - Routes
app.use('/api/bikes', bikes);

// - Server Settings
const port = process.env.PORT || 5000;

// - Listen
app.listen(port, () => {
    log(`Server running at http://localhost:${port}`)
});