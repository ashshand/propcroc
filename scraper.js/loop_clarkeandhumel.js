//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
const houses_json = [{
    "house_link": "/buying/for-sale/8-62-65-north-steyne/"
},

{
    "house_link": "/buying/for-sale/10-ashburner-street/"
}];

houses_json.forEach(function(item, i) {
    (async () => {
        const browser = await playwright.chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        let short_url = item.house_link;
        let full_url = "https://www.clarkeandhumel.com.au"+short_url;
        await page.goto(full_url);

        let data = [];

        let address = await page.textContent(".bg-secondary.pt-64.pb-24 .container .text-white.my-16 h1");
        let suburb = await page.textContent(".bg-secondary.pt-64.pb-24 .container .row.text-white.my-32 .col-md-auto.mb-16.mr-4:nth-child(1) p");
        //let postal = await page.textContent('span[itemprop="postalCode"]');
        let agency = "Clarke & Humel";
        //let agent = await page.textContent('.bg-gray-light > bg.primary > .row:nth-child(2) > .col-6 > .h6'); 
        //console.log(agent);
        //let beds = await page.textContent(".icon-content.bed > .icon-value");
        //let baths = await page.textContent(".icon-content.bath > .icon-value");
        
        //ash old try { var desc = await page.locator(".property-section.property-description.ep1-clearfix > .entry-2-col.content-2.col.span_9.col_last > h2").allInnerTexts();} //includes title
        //let desc = await page.locator(".property-section.property-description.epl-clearfix .entry-2-col.content-2.col.span_9.col_last").allInnerTexts(); //includes title

        
        //let title = await page.textContent(".property-section.property-description.epl-clearfix .entry-2-col.content-2.col.span_9.col_last h2");
        //console.log(title);

        /*
        if (desc && title) { //the desc string has the title at the start, need to remove this 
            desc = desc.replace(title, "");
        }
        */
        
        /*try { var cars = await page.textContent('.icon-content.car > .icon-value'); }
        catch { var cars = '';}

        var propType = "" 
        if(propType == 1) {
            //
        }
        else {
            var propTypeSection = await page.locator(".property-section.property-description.epl-clearfix .entry-2-col.content-2.col.span_9.col_last").allInnerTexts(); //this section at bottom has text like Apartment or House next to the icons
            let isApartment1 = (/\bapartment\b/gi).test(propTypeSection); 
            let isApartment2 = (/\bunit\b/gi).test(propTypeSection);
            let isApartment3 = (/\bapartments\b/gi).test(propTypeSection);
            let isFreestanding = (/freestanding/gi).test(desc); //search main text
            let isAttached = (/attached\b/gi).test(desc);
            let isSemi = (/\bsemi\b/gi).test(desc);
            let isHouse = (/\bhouse\b/gi).test(propTypeSection);
            let isHouseLike = (/house-/gi).test(desc); //to catch if they have 'house-sized or house-like' but it is really an apartment
            let isTerrace = (/\bterrace\b/gi).test(desc);
            let hasPool = (/\bpool\b/gi).test(desc); 
            if(isFreestanding || isHouse || isTerrace) { 
                if(isTerrace && !isFreestanding) {propType = "Terrace"}
                else {propType = "House"};
            };
            if(isApartment1 || isApartment2 || isApartment3) { propType = "Apartment"};
        }


        try { var priceText = await page.textContent('.property-meta.pricing'); } //will usually say Auction 2 April or For Sale Contact Agent. The second part is in a span class muted (ie the date or Contact Agent)
        catch { var priceText = '';}
        //guide = guide.replace("Buyers guide ", "");

        //first see if it is a guide or a 'for sale' price
        let look_for_guide =/guide/gi;
        let look_for_fs = /sale/gi;
        let guide_found = look_for_guide.test(priceText); //will return 0 if not found, 1 if found
        let fs_found = look_for_fs.test(priceText); 

        var priceType = 0; //0 = unknown, 1 = guide, 2 = for sale 

        if(guide_found) { priceType = 1;}
        if(fs_found) {priceType = 2;}
        console.log(priceType);

        var priceMid = '';
        var priceLower = 0;
        var priceUpper = 0;

        //let matches = guide.match(/\d+/g); //will be an array with any numbers in there (stripped of text). So if it is $1.5-1.8m, this will be an array of [1.5, 1.8]
        //let matches = guide.match( /[0-9]{1,2}[.,]\d{1,2}/ ); 
        //this will match if there are commas in there, but i have changed to just remove commas let matches = guide.match( /\b[0-9]{1,3}(,[0-9]{3})*(\.[0-9]+)?\b|\.[0-9]+\b/ ); 

        priceText = priceText.replace(/,/g, '');
        let matches = priceText.match(/\d+\.?\d+/g); //matches digits, with optional decimal in between, followed by digits (e.g. 1.5 will match, as will be 1500)
        //I next do a regex check to see if there is a k (match $100K) or m (eg. $1.8m or 1.8 million or 1.8mm) straight after the number and if it is K, that it is less than 1000, and if m, that it is <100 (otherwise likely an error)
        let numIsM = (/\d+\.?\d+.?m/g).test(priceText);
        let numIsK = (/\d+\.?\d+.?k/g).test(priceText);
        
        if(matches) {
            let matchesLength = matches.length;
            
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

                priceMid = (priceUpper + priceLower)*0.5;
            }
        }
        */
        data.push({
            //address,
            //postal,
            //suburb,
            //agency,
            //agent,
            //status,
            //beds,
            //baths,
            //cars,
            //title,
            //desc,
            //water,
            //land,
            //propInternal,
            //propExternal,
            //propType,
            //priceMid,
            //priceType         
        //Agent only works for first agent, Need an error code for if they don't have CAR SPOT, council and water - so if only have nth child 3 rows...Also may have home size, which sits ahead of land size;
            
        });
    
        let jsonData = JSON.stringify(data);
        fs.appendFileSync("house_data/housessingleclarke.json", jsonData);
    
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
  

