const puppeteer = require('puppeteer');
const fs = require('fs');

  let predictions = {
    myOvers: [],
    myUnders: [],
    myBts: [],
    myNoBts: [],
    mightBts: [],
    mightNoBts: [],
    mightOvers: [],
    mightUnders: []
  };

  // let overs = [];
  // let myOvers = [];
  // let myUnders = []
  // let mightOvers = []
  // let mightUnders = []
  // let myBts = []
  // let myNoBts = []
  // let mightBts = []
  // let mightNoBts = [];

(async () => {
  try {

    let data = '';
    fs.writeFile('message.txt', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    fs.writeFile('over.txt', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    fs.writeFile('surebts.txt', data, (err) => {
      if (err) throw err;
      console.log('The file has been created!');
    });
    fs.writeFile('sureover.txt', data, (err) => {
      if (err) throw err;
      console.log('The file has been created!');
    });


    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    page.setViewport({width: 1150, height: 700});
    await page.goto('http://soccervista.com', {waitUntil: 'networkidle2'});
    await page.waitForSelector('.main .detail');
    // await page.focus('.detail');
    // await page.click('.detail');

    const details = await page.$$('.detail');

    for (let i = 0; i < details.length; i++) {
      await page.goto('http://soccervista.com', {waitUntil: 'networkidle2'});
      await page.waitForSelector('.detail');

      const details = await page.$$('.detail');

      // const arr = Array.from(details);

      let detail = details[i];

      let button = await detail.$('.detail > a')
      await button.focus();
      await button.click();
      await page.waitForSelector('#gamecss');

      const h2hs = await page.$$('td.h2h');
      let sum = [];

      let names = await page.evaluate(() => {
        let first = document.querySelectorAll('.teamhead');
        let one = first[0].innerHTML;
        let three = first[1].innerText;

        return `${one} vs ${three}`;
      })

      let bts = 0;
      let percent;


      for (let h2h of h2hs) {
        // let length;

        if (h2hs.length > 0) {
          let score = await h2h.$('td.h2h > a');
          let num = await page.evaluate(score => {
              return Array.from((score.innerText).split(':'));
            }, score);

            sum.push(...num);

            if (Number(num[0]) > 0 && Number(num[1]) > 0) {
              bts += 1;
              // console.log(bts);
            } else {
              bts = bts;
              // console.log(bts);
            }

            percent = Math.floor((bts / h2hs.length) * 100);
          // console.log(percent);
        }

      }


      // if (percent > 65) {
      //   data = `<tr><td><h4> ${names}</td> <td>bts yes</h4></td></tr>\n`;
      // } else {
      //   data = `<tr><td><h4> ${names}</td> <td>bts no </h4></td></tr>\n`;
      // }

      if (h2hs.length > 4 && percent > 65) {
        data = `<tr><td><h4> ${names}</td> <td>bts yes</h4></td></tr>\n`;
        fs.appendFile('surebts.txt', data, (err) => {
          if (err) throw err;
          predictions.myBts.push(names)
          console.log('Created!');
        });
      } else if (h2hs.length > 4 && percent < 30) {
        data = `<tr><td><h4> ${names}</td> <td>bts no</h4></td></tr>\n`;
        fs.appendFile('surebts.txt', data, (err) => {
          if (err) throw err;
          predictions.myNoBts.push(names)
          console.log('Created!');
        });
      } else if(h2hs.length < 5) {
        if (percent > 65) {
          data = `<tr><td><h4> ${names}</td> <td>bts yes</h4></td></tr>\n`;
          fs.appendFile('message.txt', data, (err) => {
            if (err) throw err;
            predictions.mightBts.push(names)
            console.log('The file has been saved!');
          });
        } else {
          data = `<tr><td><h4> ${names}</td> <td>bts no</h4></td></tr>\n`;
          fs.appendFile('message.txt', data, (err) => {
            if (err) throw err;
            predictions.mightNoBts.push(names)
            console.log('The file has been saved!');
          });
          console.log('no');
        }
      } else {
        data = `<tr><td><h4> ${names}</td> <td>Undecided</h4></td></tr>\n`;
        fs.appendFile('message.txt', data, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
        console.log('Undecided');
      }

      // fs.appendFile('message.txt', data, (err) => {
      //   if (err) throw err;
      //   console.log('The file has been saved!');
      // });


      if (sum.length > 0) {
        let total =  sum.reduce((a, b) => Number(a) + Number(b));
        let avg = Math.floor(total / h2hs.length);
        if (h2hs.length > 4 && avg > 3) {
          console.log(total, 'total')
          console.log(avg, 'avg')
          let overTwo = `<tr><td><h4>${names}</td> <td>Over 2.5</h4></td></tr>\n`;
          fs.appendFile('sureover.txt', overTwo, (err) => {
            overs.push(names)
            predictions.myOvers.push(names)
            if (err) throw err;
            console.log('saved');
          });
        } else if (h2hs.length > 4 && avg < 2) {
          let overTwo = `<tr><td><h4>${names}</td> <td>Under 2.5</h4></td></tr>\n`;
          fs.appendFile('sureover.txt', overTwo, (err) => {
            if (err) throw err;
            predictions.myUnders.push(names)
            console.log('saved');
          });
        } else if (h2hs.length < 5) {
          if (avg > 3) {
            let overTwo = `<tr><td><h4>${names}</td> <td>Over 2.5</h4></td></tr>\n`;
            fs.appendFile('over.txt', overTwo, (err) => {
              if (err) throw err;
              predictions.mightOvers.push(names)
              console.log('saved');
            });
          } else {
            let overTwo = `<tr><td><h4>${names}</td> <td>Under 2.5</h4></td></tr>\n`;
            fs.appendFile('over.txt', overTwo, (err) => {
              if (err) throw err;
              predictions.mightUnders.push(names)
              console.log('saved');
            });
          }
        } else {
          let overTwo = `<tr><td><h4>${names}</td> <td>Undecided</h4></td></tr>\n`;
          fs.appendFile('over.txt', overTwo, (err) => {
            if (err) throw err;
            console.log('saved');
          });
        }
      }


    }

    await browser.close();

  } catch (e) {
    console.log('Our error', e);
  }
  console.log(predictions, 'pred');
  return predictions;

})();

module.exports = predictions