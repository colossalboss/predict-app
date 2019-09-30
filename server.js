const express = require('express')

// import {predictions} from './utils/app';

const picks = require('./utils/app')
const app = express()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  console.log(picks)
  let response = new Promise((resolve, reject) => {
    let val = picks;
    resolve(val);
  })
  response.then(data => {
    console.log(data, 'data');

    return res.render('index', {data: data});
  })
  // const mediumArticles = new Promise((resolve, reject) => {
  //   scraper
  //     .scrapeMedium()
  //     .then(data => {
  //       resolve(data)
  //     })
  //     .catch(err => reject('Medium scrape failed'))
  // })

  // const youtubeVideos = new Promise((resolve, reject) => {
  //   scraper
  //     .scrapeYoutube()
  //     .then(data => {
  //       resolve(data)
  //     })
  //     .catch(err => reject('YouTube scrape failed'))
  // })

  // Promise.all([mediumArticles, youtubeVideos])
  //   .then(data => {
  //     res.render('index', { data: { articles: data[0], videos: data[1] } })
  //   })
  //   .catch(err => res.status(500).send(err))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('LISTENING ON 3000))');
});
