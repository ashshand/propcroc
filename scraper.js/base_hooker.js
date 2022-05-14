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
  let href_selector = '.property-box > .property-details > a';

  const page = await browser.newPage();
  let full_url = `https://www.ljhooker.com.au/search/property-for-sale-in-nsw-au/page-1?surrounding=true`;
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

        try { loadMoreFound = await page.waitForSelector('.pagination > li > a > span[class="icon-arrow-right"]', {timeout: 5000}); }
        catch { break; } //will exit loop if no more load mores found 
        await page.click('.pagination > li > a > span[class="icon-arrow-right"]');
      
        await page.waitForSelector(href_selector, {timeout: 5000});
        await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded        
      
      }
  
  }
  
  const loopThrough = await loopNextPages(3);

  await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded   
 
  const jsonData = JSON.stringify(write_data);
  fs.writeFileSync("house_links/houseshooker.json", jsonData);

  await browser.close();

  
})();



