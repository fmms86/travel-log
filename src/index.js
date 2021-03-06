const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();



mongoose.connect(process.env.DATABASE_URL, {

  useNewUrlParser: true,
  useUnifiedTopology : true,

});

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/' , function(req,res){
res.json({
  message:'Page Not Found 🤔',
})
})

app.use('/api/logs' , logs)

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

  // res.sendFile('C:/Users/Fuad/travel-log/server/GeneralError.html');


const port = process.env.PORT || 1337;

app.listen(port , () => {
    console.log(`Listening at http://localhost:${port}`);
});
