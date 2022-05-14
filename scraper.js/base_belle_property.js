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

  let write_data = [];

  const page = await browser.newPage();
  await page.goto("https://www.belleproperty.com/listings/?site_id=2&latitude=&longitude=&is_building=&is_project_listing=&property_type=ResidentialSale&listing_type=Sale&property_status=Available&sale_type=&view=list&state=nsw&region=&q=&beds_min=&baths_min=&price_min=&rent_min=&price_max=&rent_max=&sort_by=&surrounding_suburbs=on");
 
  await page.waitForSelector('div.ratio-3-2.caption-hover.lazyloaded', {timeout: 5000});

  var houses_links = page.locator('div.ratio-3-2.caption-hover.lazyloaded > a', {strict: false});

  var c = await houses_links.count();

  for(let i = 0; i < c; i++) {
    let house_link = await houses_links.nth(i).getAttribute('href');
    write_data.push ({
      house_link,
    })
  }

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

  /*works for one page
  await page.waitForSelector('.map-wrapper > .listing-wrapper > .prev-next-pagination > .smallport-12:nth-child(2) > .button');
  await page.click('.map-wrapper > .listing-wrapper > .prev-next-pagination > .smallport-12:nth-child(2) > .button');

  await page.waitForSelector('div.ratio-3-2.caption-hover.lazyloaded', {timeout: 5000});

  var houses_links = page.locator('div.ratio-3-2.caption-hover.lazyloaded > a', {strict: false});

  var c = await houses_links.count();
  console.log(c);

  for(let i = 0; i < c; i++) {
    let house_link = await houses_links.nth(i).getAttribute('href');
    console.log(house_link);
    write_data.push ({
      house_link,
    })
  }
  */

  async function loopNextPages(loopLimit) {
    for(let x = 0; x < loopLimit; x++) {

      await page.waitForSelector('.map-wrapper > .listing-wrapper > .prev-next-pagination > .smallport-12:nth-child(2) > .button');
      await page.click('.map-wrapper > .listing-wrapper > .prev-next-pagination > .smallport-12:nth-child(2) > .button');
    
      await page.waitForSelector('div.ratio-3-2.caption-hover.lazyloaded', {timeout: 5000});
      await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded
    
      var houses_links = page.locator('div.ratio-3-2.caption-hover.lazyloaded > a', {strict: false});
    
      var c = await houses_links.count();
    
      for(let i = 0; i < c; i++) {
        let house_link = await houses_links.nth(i).getAttribute('href');
        console.log(house_link);
        write_data.push ({
          house_link,
        })
      }
    
    }

  }

  const loopThrough = await loopNextPages(3);
  
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
 
  const jsonData = JSON.stringify(write_data);
  fs.writeFileSync("house_links/housesbelle.json", jsonData);

  await browser.close();

  
})();


