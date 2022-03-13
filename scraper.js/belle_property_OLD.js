//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");

(async () => {
  const browser = await playwright.chromium.launch({
    channel: 'msedge', //or msedge etc
    headless: false,
    slowMo: 50,
    actionTimeout: 10000
  });
  const page = await browser.newPage();
  await page.goto("https://www.belleproperty.com/listings/?site_id=2&latitude=&longitude=&is_building=&is_project_listing=&property_type=ResidentialSale&listing_type=Sale&property_status=Available&sale_type=&view=list&state=nsw&region=&q=&beds_min=&baths_min=&price_min=&rent_min=&price_max=&rent_max=&sort_by=&surrounding_suburbs=on");
  
  //const navigationPromise = page.waitForNavigation();

  const content = await page.evaluate(() => {
    let data = [];

    let house = document.querySelectorAll("div.ratio-3-2.caption-hover.lazyloaded");
    house.forEach((house) => {
      let link = house.querySelector("a").getAttribute("href");
      data.push({
        link,
      });
    });
    return data;
  });

  const jsonData = JSON.stringify(content);
  fs.writeFileSync("houses.json", jsonData);


  //this inserts multiple rows and columns into supabase
  /*
  const { data, error } = await supabase
  .from('master_info')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
    { some_column: 'someValue', other_column: 'otherValue' }, 
  { upsert: true }]) //upsert inserts if no conflict, otherwise updates
  */

  //instead i will do each row independently
  /*
  const { data, error } = await supabase
  .from('master_info')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  { upsert: true }])


  /*
  const jsonData = JSON.stringify(content);
  fs.writeFileSync("houses.json", jsonData);
  */
  
  await page.waitForSelector('.map-wrapper > .listing-wrapper > .prev-next-pagination > .smallport-12:nth-child(2) > .button');
  await page.click('.map-wrapper > .listing-wrapper > .prev-next-pagination > .smallport-12:nth-child(2) > .button');

  //await page.waitForNavigation();

  await page.waitForTimeout(50000); //waits 5 seconds
  
  //look at locator functions

  const houses2 = await page.$$eval('.div.ratio-3-2.caption-hover.lazyloaded', all_items => {
    const data2 = [];
    console.log('here');
    all_items.forEach(house2 => {
      console.log('here2');
        let link2 = house2.querySelector("a").getAttribute("href");
        data2.push({ link2});
    });
    return data2;
});

console.log(houses2);
  
/*
  let data2 = [];

  let house2 = document.querySelectorAll("div.ratio-3-2.caption-hover.lazyloaded");

  house2.forEach((house2) => {
    let link2 = house2.querySelector("a").getAttribute("href");
    data2.push({
      link2,
    });
  });
  let content2 = data2;
  */
 
  const jsonData2 = JSON.stringify(houses2);
  fs.writeFileSync("houses2.json", jsonData2);

  await browser.close();

  
})();


