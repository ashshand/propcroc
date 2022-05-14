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
  await page.goto("https://www.bresicwhitney.com.au/buy/all");
  
    //await page.waitForSelector('.item-clearfix', {timeout: 5000});
    await page.waitForTimeout(10000); //waits another 5 seconds to make sure everything loaded
    
    var houses_links = page.locator('.page-content > #search-results > .tiles > .tile.property-tile.public-tile > .tile-content > a', {strict: false});
        
    var c = await houses_links.count();
        
    for(let i = 0; i < c; i++) {
            let house_link = await houses_links.nth(i).getAttribute('href');
            console.log(house_link);
            write_data.push ({
            house_link,
            })
    }    
    
  
    async function loopNextPages(loopLimit) {
        for(let x = 0; x < loopLimit; x++) {
    
          await page.waitForSelector('.page-content > .results-tiles.after-header.padded.all > .pagination > .btn.fancy-button.fancy-reversed.next_page');
          await page.click('.page-content > .results-tiles.after-header.padded.all > .pagination > .btn.fancy-button.fancy-reversed.next_page');
        
          await page.waitForSelector('.page-content > #search-results > .tiles > .tile.property-tile.public-tile > .tile-content > a', {timeout: 5000});
          await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded
        
          var houses_links = page.locator('.page-content > #search-results > .tiles > .tile.property-tile.public-tile > .tile-content > a', {strict: false});
        
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
    
      const loopThrough = await loopNextPages(1);
 
  const jsonData = JSON.stringify(write_data);
  fs.writeFileSync("house_links/housesbresic.json", jsonData);

  await browser.close();

  
})();



