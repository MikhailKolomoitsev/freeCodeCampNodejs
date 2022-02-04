import connectiondb from './connectiondb.js';
import cors from 'cors';
import express from 'express';
import router from './routes/index.js';
import { PORT } from './config.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
connectiondb();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', router);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
