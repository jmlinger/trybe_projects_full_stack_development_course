require('dotenv').config();
const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
  );

const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
  );
  
app.use(cors());
    
const { PORT, UPSIDEDOWN_MODE } = process.env;
const hereIsTheUpsideDown = UPSIDEDOWN_MODE;

console.log(hereIsTheUpsideDown);

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT || 3000, () => {
  console.log(`Escutando na porta ${PORT}`);
});
