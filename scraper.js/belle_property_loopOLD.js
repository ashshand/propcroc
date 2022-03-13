//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
//const houses_json = [{"link":"/listings/1152636/3-paroo-avenue-eleebana-nsw-2282/"},{"link":"/listings/1152637/196-the-esplanade-speers-point-nsw-2284/"},{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"},{"link":"/listings/1152614/86-kemp-street-hamilton-south-nsw-2303/"},{"link":"/listings/1152618/19-crusade-close-valentine-nsw-2280/"}];
const houses_json = [{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"}];

houses_json.forEach(function(item, i) {
    (async () => {
        const browser = await playwright.chromium.launch({
            headless: true
        });
        const page = await browser.newPage();
        let short_url = item.link;
        let full_url = "https://www.belleproperty.com/"+short_url;
        await page.goto(full_url);
        const content = await page.evaluate(() => {
            try {
                let data = [];
                let address = document.querySelector(".sub-heading").innerText;
                let suburb = document.querySelector(".main-heading").innerText;
                let agency = document.querySelector(".office-name").innerText;
                let agent = document.querySelector(".agent-name").innerText;
                let status = document.querySelector(".listing-price.show-for-large").innerText; 
                //let beds = document.querySelector(".title-strip > .row > .columns > .listing-icons > .listing-icon:nth-child(1)").innerText; 
                //let baths = document.querySelector(".title-strip > .row > .columns > .listing-icons > .listing-icon:nth-child(2)").innerText;
                //let cars = document.querySelector(".title-strip > .row > .columns > .listing-icons > .listing-icon:nth-child(3)").innerText;
                //let beds = document.querySelector(".title-strip > .row > .columns > .listing-icon:has(.icon-bed)").innerText; 
                //let beds = page.textContent('.listing-icon:has(.icon-bed)');
                //let baths = document.querySelector(".title-strip > .row > .columns > .listing-icon:has(.icon-bath)").innerText; 
                //let cars = document.querySelector(".title-strip > .row > .columns > .listing-icon:has(.icon-car)").innerText; 
                
                //let listing = document.querySelector(".listing-summary").innerText;
                
                //let council = document.querySelector(".large-7 > .listing-summary > .row:nth-child(3) > .smallport-12 > strong").innerText;
                //let water = document.querySelector(".large-7 > .listing-summary > .row:nth-child(4) > .smallport-12 > strong").innerText;
                //let land = document.querySelector(".large-7 > .listing-summary > .row:nth-child(5) > .smallport-12 > strong").innerText;
                data.push({
                    address,
                    suburb,
                    agency,
                    agent,
                    status,
                    //beds,
                    //baths,
                    //cars,
                    //council,
                    //water,
                    //land,
                    //listing,
                //Agent only works for first agent, Need an error code for if they don't have CAR SPOT, council and water - so if only have nth child 3 rows...Also may have home size, which sits ahead of land size;
                    
                });
                return data;

            }

            catch (error) {
                return '';
            }

        });
    
        let jsonData = JSON.stringify(content);
        fs.appendFileSync("housessingle.json", jsonData);
    
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
  

