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
  let href_selector = '.rh-filter-results-list__item > .item.property_item.clearfix > a';

  const page = await browser.newPage();
  let full_url = `https://www.raineandhorne.com.au/search/properties?listing_type=residential&status=active&offer_type_code=sale&refined=&suburbs[]=NSW&property_type=&min_price=0&max_price=999999999&min_bedrooms=&min_bathrooms=&min_car_spaces=&min_land_area_sqm=&surrounding_suburbs=0`;
  await page.goto(full_url);
    
  async function loopNextPages(loopLimit) { //this will go through and click see more until nothing left. Only after then does it crawl (given all of these will be loaded on same page)
      for(let x = 0; x < loopLimit; x++) { //the loop limit is a kill switch - it will keep clicking load more until either load more not visible or looplimit reached
  
        await page.waitForTimeout(1000);

        var houses_links = page.locator(href_selector, {strict: false});
      
        var c = await houses_links.count();
            
        for(let i = 0; i < c; i++) {
          let house_link = await houses_links.nth(i).getAttribute('href');
          console.log(house_link);
          write_data.push ({
          house_link,
          })
        }    

        try { loadMoreFound = await page.waitForSelector('#load-more', {timeout: 5000}); }
        catch { break; } //will exit loop if no more load mores found 
        await page.click('#load-more');
      
        await page.waitForSelector(href_selector, {timeout: 5000});
        await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded        
      
      }
  
  }
  
  const loopThrough = await loopNextPages(2);

  await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded   
 
  const jsonData = JSON.stringify(write_data);
  fs.writeFileSync("house_links/housesraine.json", jsonData);

  await browser.close();

  
})();



