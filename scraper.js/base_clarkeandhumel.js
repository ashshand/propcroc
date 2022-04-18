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
  let href_selector = '.carousel-cell a';

  const page = await browser.newPage();
  let full_url = `https://www.clarkeandhumel.com.au/buying/for-sale/`;
  await page.goto(full_url);

  async function loopNextPages(loopLimit) { //this will go through and click see more until nothing left. Only after then does it crawl (given all of these will be loaded on same page)
    var last_url_check = ''; //need to initialise this
    for(let x = 0; x < loopLimit; x++) { //the loop limit is a kill switch - it will keep clicking load more until either load more not visible or looplimit reached
  
        await page.waitForTimeout(1000);

        var houses_links = page.locator(href_selector, {strict: false});
      
        var c = await houses_links.count();

        let this_url=await page.url();//get the url of the current page
        console.log(this_url);
        if(this_url == last_url_check) {break;} //if url hasn't changed from last time, then haven't changed pags, so end (e.g. the next button didn't work)
        last_url_check = this_url;
            
        for(let i = 0; i < c; i++) {
          let house_link = await houses_links.nth(i).getAttribute('href');
          console.log(house_link);
          write_data.push ({
          house_link,
          })
        }    

        try { loadMoreFound = await page.waitForSelector('li.page-item:not(.is-disabled) .fa-chevron-right', {timeout: 5000}); }
        catch { break; } //will exit loop if no more load mores found 
        try { await page.click('li.page-item:not(.is-disabled) .fa-chevron-right'); }
        catch { break;}
      
        try { await page.waitForSelector(href_selector, {timeout: 5000}); }
        catch { break; }
        await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded        
      
      }
  
  }
  
  const loopThrough = await loopNextPages(40);

  await page.waitForTimeout(5000); //waits another 5 seconds to make sure everything loaded   
 
  const jsonData = JSON.stringify(write_data);
  fs.writeFileSync("all_houses/houses_clarkeandhumel.json", jsonData);

  await browser.close();

  
})();



