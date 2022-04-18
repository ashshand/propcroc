//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
//const houses_json = [{"link":"/listings/1152636/3-paroo-avenue-eleebana-nsw-2282/"},{"link":"/listings/1152637/196-the-esplanade-speers-point-nsw-2284/"},{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"},{"link":"/listings/1152614/86-kemp-street-hamilton-south-nsw-2303/"},{"link":"/listings/1152618/19-crusade-close-valentine-nsw-2280/"}];
const houses_json = [{"house_link":"/buy/5-foss-street-forest-lodge-29704?listing_type=buy&search_type=all"},{"house_link":"/buy/7-sturt-street-darlinghurst-29703?listing_type=buy&search_type=all"},{"house_link":"/buy/134-flinders-street-paddington-29693?listing_type=buy&search_type=all"}];

houses_json.forEach(function(item, i) {
    (async () => {
        const browser = await playwright.chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        let short_url = item.house_link;
        let full_url = "https://www.bresicwhitney.com.au"+short_url;
        await page.goto(full_url);

        let data = [];

        let address = await page.textContent('.property-details .address');
        console.log(address);
        let suburb = await page.textContent('.property-details .suburb');
        let agency = "BresicWhitney";
        //let agent = await page.textContent(".staff-name");
        let agent = await page.locator('.staff-name').allInnerTexts();
        let status = await page.textContent(".property-price > h6"); 
        let beds = await page.textContent(".bed > .feature > .number");
        let baths = await page.textContent(".bath > .feature > .number");
        let desc = await page.textContent(".property-highlights");
        
        try { var cars = await page.textContent('.car > .feature > .number'); }
        catch { var cars = '';}

        //let landSize = await page.locator('div:right-of(:text("Land Size")) >> nth=0').textContent();
        //console.log(landSize);

        var propType = ""; //propType not explictly in bresic, but can test for word apartment, terrace, house etc in description. Failing that, if the street address has a slash, assume apartment
        let isApartment1 = (/\bapartment\b/gi).test(desc); 
        let isApartment2 = (/\bunit\b/gi).test(desc);
        let isFreestanding = (/freestanding/gi).test(desc);
        let isAttached = (/attached\b/gi).test(desc);
        let isSemi = (/\bsemi\b/gi).test(desc);
        let isHouse = (/\bhouse\b/gi).test(desc);
        let isHouseLike = (/house-/gi).test(desc); //to catch if they have 'house-sized or house-like' but it is really an apartment
        let isTerrace = (/\bterrace\b/gi).test(desc);
        let hasPool = (/\bpool\b/gi).test(desc); 

        if(isFreestanding || isHouse || isTerrace) { 
            if(isTerrace && !isFreestanding) {propType = "Terrace"}
            else {propType = "House"};
        };
        if(isApartment1 || isApartment2) { propType = "Apartment"};
        console.log(propType);

        let listing = await page.locator("#information").innerText();
        let listing_array = listing.split("\n");

        let isInternalText = (element) => (/internal/gi).test(element);
        let propInternalLocation = listing_array.findIndex(isInternalText);
        console.log(propInternalLocation);

        //let propInternalLocation = listing_array.indexOf(regexInternal); 
        var propInternal = "";
        if (propInternalLocation>=0) {
            let propInternalSizeNum = propInternalLocation+1; //the number is located one after
            propInternal=listing_array[propInternalSizeNum];
            let p1 = propInternal.match(/\d+\.?\d+/g); //will pull out the number only from the string that might be say 272 sqm
            propInternal = p1[0]; 
        }
        
        let isLandText = (element) => (/land/gi).test(element);
        let propExternalLocation = listing_array.findIndex(isLandText);
        console.log(propExternalLocation);
        
        //let propExternalLocation = listing_array.indexOf('Land size');
        var propExternal = "";
        if (propExternalLocation>=0) {
            let propExternalLocationNum = propExternalLocation+1; //the number is located one after
            propExternal=listing_array[propExternalLocationNum];
            let p1 = propExternal.match(/\d+\.?\d+/g); //will pull out the number only from the string that might be say 272 sqm
            propExternal = p1[0]; 
        }


        try { var priceText = await page.textContent('#price .price'); }
        catch { var priceText = '';}
        console.log(priceText);
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
            agency,
            agent,
            status,
            beds,
            baths,
            cars,
            desc,
            //water,
            //land,
            propInternal,
            propExternal,
            propType,
            priceMid,
            priceType         
        //Agent only works for first agent, Need an error code for if they don't have CAR SPOT, council and water - so if only have nth child 3 rows...Also may have home size, which sits ahead of land size;
            
        });
    
        let jsonData = JSON.stringify(data);
        fs.appendFileSync("housessinglebresic.json", jsonData);
    
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
  

