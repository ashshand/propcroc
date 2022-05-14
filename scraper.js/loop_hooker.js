//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
const houses_json = [
    {
        "house_link": "https://22-11blighcres-seaforth.ljhooker.com.au/"
    },
    {
        "house_link": "https://www.ljhooker.com.au/apartment-in-manly-nsw-2095-au-1exugax?search=%2fsearch%2fproperty-for-sale-in-manly-nsw-2095-au%2fpage-1%3fsort%3ddate%26surrounding%3dTrue%26liveability%3dFalse#.YnXeIdNBxJ0"
    },
    {
        "house_link": "https://www.ljhooker.com.au/apartment-in-freshwater-nsw-2096-au-tquf6q?search=%2fsearch%2fproperty-for-sale-in-manly-nsw-2095-au%2fpage-1%3fsort%3ddate%26surrounding%3dTrue%26liveability%3dFalse#.YnXeI9NBxJ0"
    },
    {
        "house_link": "https://380-380amoretonparkrd-douglaspark.ljhooker.com.au/"
    },
    {
        "house_link": "https://2mararaavenue-avalonbeach.ljhooker.com.au/"
    }
]

//NOTES for LJH
//Changed page structure (including class names) sometime around April 2022, so older listings have different class names etc
//older one has eg address class="address", newer has div class="property-heading"
//of the 5 above - 1 is old, 2 is new, 3 is new, 4 is old, 5 is old
//datalayer seems to work for old but not new. only diff i see is old ones have an additional datalayer (do a search) where stuff gets pushed to it, new ones dont

houses_json.forEach(function(item, i) {
    (async () => {
        const browser = await playwright.chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        let short_url = item.house_link;
        let full_url = short_url;
        await page.goto(full_url);

        let data = [];

        await page.waitForTimeout(1000);

        //works for old ones only 
        //const dataLayer = await page.evaluate(() => window.dataLayer); //the first thing they push is an object with a bunch of data on the property, this will be first in the array that datalayer returns

        const dataLayer = await page.evaluateHandle(() => window.dataLayer[0]);
        const prop_dataLayer = await dataLayer.jsonValue();

        let postal = prop_dataLayer['postcode'];
        let suburb = prop_dataLayer['suburb'];
        let propType = prop_dataLayer['propertyType']; //house or apartment etc

        let beds = prop_dataLayer['bedrooms'];
        let baths = prop_dataLayer['bathrooms'];
        let cars = prop_dataLayer['parking'];

        let is_auction = prop_dataLayer['auction'];

        let is_sold_text = prop_dataLayer['tenure'];
        var is_sold = 0;
        if (is_sold_text == 'Sold') {
            is_sold = 1;
        }

        let priceText = prop_dataLayer['price'];

        let agency = "LJ Hooker";

        //check what type of page it is. If fails first try it is old version (0)
        var site_version = 1;

        try { var address = await page.getAttribute("meta[property='og:street-address']","content"); }
        catch { 
            site_version = 0; 
            var address = await page.getAttribute("meta[name='og:street-address']","content"); 
        } 

        try {
            var lat = await page.getAttribute("meta[property='og:latitude']","content");
            var lng = await page.getAttribute("meta[property='og:longitude']","content");
        }
        
        catch {
            var lat = await page.getAttribute("meta[name='og:latitude']","content");
            var lng = await page.getAttribute("meta[name='og:longitude']","content");
        }
        
        if(site_version == 0) {
            var title = await page.textContent('.details .detail-title'); 
            var desc = await page.textContent('.details .detail-inner'); 
            var agent = await page.locator('.agent-details > .name').allInnerTexts(); 

        }

        else if(site_version == 1) {
            var title = await page.textContent('h2:above(.property-text)'); 
            var desc = await page.textContent('.property-content .property-text'); 
            var agent = await page.locator('.agent-name').allInnerTexts(); 

        }



        //first see if it is a guide or a 'for sale' price
        let look_for_guide =/guide/gi;
        let look_for_fs = /sale/gi;
        let guide_found = look_for_guide.test(priceText); //will return 0 if not found, 1 if found
        let fs_found = look_for_fs.test(priceText); 

        var priceType = 0; //0 = unknown, 1 = guide, 2 = for sale 

        if(guide_found) { priceType = 1;}
        if(fs_found) {priceType = 2;}
        

        var priceMid = '';
        var priceLower = 0;
        var priceUpper = 0;

        priceText = priceText.replace(/,/g, '');
        let matches = priceText.match(/\d+\.?\d+/g); //matches digits, with optional decimal in between, followed by digits (e.g. 1.5 will match, as will be 1500)
        //I next do a regex check to see if there is a k (match $100K) or m (eg. $1.8m or 1.8 million or 1.8mm) straight after the number and if it is K, that it is less than 1000, and if m, that it is <100 (otherwise likely an error)
        let numIsM = (/\d+\.?\d+.?m/g).test(priceText);
        let numIsK = (/\d+\.?\d+.?k/g).test(priceText);
        
        if(matches) {
            let matchesLength = matches.length;
            console.log(matches);
            
            if(matchesLength == 1) {
                priceMid = parseFloat(matches[0]);
                if(numIsM) {
                    priceMid = priceMid * 1000000;
                }
                else if(numIsK) {
                    priceMid = priceMid * 1000;
                }
                //priceMid = parseFloat(priceMid.replace(/,/g, '')); //removes any commas from the string eg 1,000 becomes 1000
            }
            else if(matchesLength > 1) {
                priceLower = parseFloat(matches[0]);
                priceUpper = parseFloat(matches[1]);

                if(numIsM) {
                    priceLower = priceLower * 1000000;
                    priceUpper = priceUpper * 1000000;
                }
                else if(numIsK) {
                    priceLower = priceLower * 1000;
                    priceUpper = priceUpper * 1000000;
                }
                
                console.log(priceLower);
                console.log(priceUpper);
                priceMid = (priceUpper + priceLower)*0.5;
            }
        }
        
        data.push({
            address,
            suburb,
            postal,
            agency,
            agent,
            beds,
            baths,
            cars,
            desc,
            title,
            //water,
            //land,
            //propInternal,
            //propExternal,
            propType,
            priceMid,
            priceType         
            
        });
    
        let jsonData = JSON.stringify(data);
        fs.appendFileSync("house_data/housessinglehooker.json", jsonData);
    
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
        await browser.close();
    })();

});
  

