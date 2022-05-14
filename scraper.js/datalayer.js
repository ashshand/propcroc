

//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
//const houses_json = [{"link":"/listings/1152636/3-paroo-avenue-eleebana-nsw-2282/"},{"link":"/listings/1152637/196-the-esplanade-speers-point-nsw-2284/"},{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"},{"link":"/listings/1152614/86-kemp-street-hamilton-south-nsw-2303/"},{"link":"/listings/1152618/19-crusade-close-valentine-nsw-2280/"}];
const houses_json = [{"house_link":"https://www.century21.com.au/property/residential/buy/nsw/2090/cremorne-point/527400"}];

houses_json.forEach(function(item, i) {
    (async () => {
        const browser = await playwright.chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        let short_url = item.house_link;
        let full_url = short_url;
        await page.goto(full_url);

        let dl = await page.textContent('datalayer');
        console.log(dl);
        
       
        await browser.close();
    })();

});
  

