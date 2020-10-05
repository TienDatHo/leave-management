const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const indexRouter = require('./routes');


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));