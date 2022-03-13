const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://2-112warnersav-bondibeach.ljhooker.com.au/');
  
  await page.setViewport({ width: 1353, height: 935 })

  await page.waitForSelector('#inputName')
  await page.click('#inputName')
  await page.type('#inputName', 'Courtnay Summer');

  await page.waitForSelector('#inputEmail')
  await page.click('#inputEmail')
  await page.type('#inputEmail', 'courtnay.summer2698@gmail.com')

  await page.type('#inputPhone', '0418150526');
  await page.type('#inputPostcode', '2011');
  await page.type('#inputMessage', 'price guide please');

  await page.waitForSelector('#app > #enquire-section > .container > .row > .col-md-6:nth-child(6)')
  await page.click('#app > #enquire-section > .container > .row > .col-md-6:nth-child(6)')

  await page.waitForSelector('.row > .col-md-6 > .row > .col-xs-12:nth-child(1) > label')
  await page.click('.row > .col-md-6 > .row > .col-xs-12:nth-child(1) > label')

  await page.waitForSelector('.row > .col-md-6 > .row > .col-xs-12:nth-child(2) > label')
  await page.click('.row > .col-md-6 > .row > .col-xs-12:nth-child(2) > label')
  
  await page.waitForSelector('.row > .col-md-6 > .row > .col-xs-12:nth-child(4) > label')
  await page.click('.row > .col-md-6 > .row > .col-xs-12:nth-child(4) > label')
  
  await page.waitForSelector('#enquire-section > .container > .row > .col-xs-12 > .btn')
  await page.click('#enquire-section > .container > .row > .col-xs-12 > .btn')
  
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
