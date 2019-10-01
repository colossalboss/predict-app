const express = require('express');

// import {predictions} from './utils/app';

const picks = require('./utils/app')
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  let response = new Promise((resolve, reject) => {
    let val = picks;
    resolve(val);
  })
  response.then(data => {
    console.log(data, 'data');

    return res.render('index', {data: data});
  })
  .catch(err => console.log('The Error' + err))
})

app.listen(process.env.PORT || 4000, () => console.log('LISTENING ON 4000'));