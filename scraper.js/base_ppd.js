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
  await page.goto("https://www.ppdre.com.au/properties/for-sale/");
  
    //await page.waitForSelector('.item-clearfix', {timeout: 5000});
    await page.waitForTimeout(10000); //waits another 5 seconds to make sure everything loaded
    
    var houses_links = page.locator('.item.clearfix > a', {strict: false});
        
    var c = await houses_links.count();
        
    for(let i = 0; i < c; i++) {
            let house_link = await houses_links.nth(i).getAttribute('href');
            console.log(house_link);
            write_data.push ({
            house_link,
            })
    }    
    
  

 
  const jsonData = JSON.stringify(write_data);
  fs.writeFileSync("housesppd.json", jsonData);

  await browser.close();

  
})();



