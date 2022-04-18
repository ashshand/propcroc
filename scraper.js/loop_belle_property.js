//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
//const houses_json = [{"link":"/listings/1152636/3-paroo-avenue-eleebana-nsw-2282/"},{"link":"/listings/1152637/196-the-esplanade-speers-point-nsw-2284/"},{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"},{"link":"/listings/1152614/86-kemp-street-hamilton-south-nsw-2303/"},{"link":"/listings/1152618/19-crusade-close-valentine-nsw-2280/"}];
const houses_json = [{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"}];

fs.unlinkSync("housessinglebelle.json"); //deletes previous version

houses_json.forEach(function(item, i) {
    (async () => {
        const browser = await playwright.chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        let short_url = item.house_link;
        let full_url = "https://www.belleproperty.com/"+short_url;
        await page.goto(full_url);

        let data = [];

        let address = await page.textContent('.sub-heading');
        let suburb = await page.textContent('.main-heading');
        let agency = await page.textContent(".office-name");
        let agent = await page.textContent(".agent-name");
        let status = await page.textContent(".listing-price.show-for-large"); 
        let beds = await page.textContent("span.listing-icon:has(span.icon-bed)");
        let baths = await page.textContent("span.listing-icon:has(span.icon-bath)");
        let cars = await page.textContent("span.listing-icon:has(span.icon-car)");
        let listing = await page.locator(".listing-summary").innerText();
        
        //let landSize = await page.locator('div:right-of(:text("Land Size")) >> nth=0').textContent();
        //console.log(landSize);

        let listing_array = listing.split("\n");
        let landSizeLocation = listing_array.indexOf('Land Size'); 
        let landSizeLocationNum = landSizeLocation+1; //the number is located one after
        let landSize=listing_array[landSizeLocationNum];

        let propTypeLocation = listing_array.indexOf('Property Type'); 
        let propTypeLocationNum = propTypeLocation+1; //the number is located one after
        let propType=listing_array[propTypeLocationNum];

        let propExternalLocation = listing_array.indexOf('External Area');

        var propExternal = "";
        if (propExternalLocation>=0) {
        let propExternalLocationNum = propExternalLocation+1; //the number is located one after
        propExternal=listing_array[propExternalLocationNum];
        }


        data.push({
            address,
            suburb,
            agency,
            agent,
            status,
            beds,
            baths,
            cars,
            //water,
            //land,
            landSize,
            propExternal,
            propType,
            listing,            
        //Agent only works for first agent, Need an error code for if they don't have CAR SPOT, council and water - so if only have nth child 3 rows...Also may have home size, which sits ahead of land size;
            
        });
    
        let jsonData = JSON.stringify(data);
        fs.appendFileSync("housessinglebelle.json", jsonData);
    
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
  

