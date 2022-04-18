//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
//const houses_json = [{"link":"/listings/1152636/3-paroo-avenue-eleebana-nsw-2282/"},{"link":"/listings/1152637/196-the-esplanade-speers-point-nsw-2284/"},{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"},{"link":"/listings/1152614/86-kemp-street-hamilton-south-nsw-2303/"},{"link":"/listings/1152618/19-crusade-close-valentine-nsw-2280/"}];
const houses_json = [{"house_link":"/nsw/newtown/2666558/"},{"house_link":"/nsw/sydney/2677978/"},{"house_link":"/nsw/sydney/2673675/"},{"house_link":"/nsw/bellevue-hill/2669072/"}];

fs.unlinkSync("housessinglerw.json"); //deletes previous version

houses_json.forEach(function(item, i) {
    (async () => {
        try {
            const browser = await playwright.chromium.launch({
                headless: false
            });
            const page = await browser.newPage();
            let short_url = item.house_link;
            let full_url = "https://www.raywhite.com"+short_url;
            await page.goto(full_url);

            let data = [];

            try { var address = await page.textContent('.property-street-address'); }
            catch { var address = ''}

            try { var suburb = await page.textContent('.property-locality'); }
            catch { var suburb = '';}

            let agency = "Ray White";

            try { var agent = await page.textContent(".agent-name > a"); }
            catch {var agent = '' }
            
            try { var status = await page.textContent(".property-sale-type"); }
            catch { var status = '';}

            try { var beds = await page.textContent(".amen.bed"); beds = getNumber(beds); }
            catch { var beds = '';}

            try { var baths = await page.textContent(".amen.bath"); baths = getNumber(baths); }
            catch { var baths = ''}

            try { 
                var cars = await page.textContent(".amen.car"); cars = getNumber(cars);
            }
            catch {
                var cars = 0;
            }

            try { var propType = await page.textContent(".property-type"); }
            catch {var propType = '';}
            let landSize = "";
            let propExternal = "";

            try { var title = await page.textContent("#listing-title"); }
            catch { var title = '';}

            try { var desc = await page.textContent("#listing-desc"); }
            catch { var desc = '';}
            //let listing = await page.locator(".listing-summary").innerText();
            
            //let landSize = await page.locator('div:right-of(:text("Land Size")) >> nth=0').textContent();
            //console.log(landSize);

            function getNumber(string) { //the ray white beds, baths etc say '3 beds', '3 baths' - this gets rid of the text and leaves you with 3
                var matches = string.match(/(\d+)/);
                return matches[0];  
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
                title,
                desc         
            //Agent only works for first agent, Need an error code for if they don't have CAR SPOT, council and water - so if only have nth child 3 rows...Also may have home size, which sits ahead of land size;
                
            });
        
            let jsonData = JSON.stringify(data);
            fs.appendFileSync("housessinglerw.json", jsonData);
        
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
        }
        catch (error) {
            console.log(error);
            return '';
        }

    })();

});
  

