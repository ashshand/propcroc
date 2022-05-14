//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
//const houses_json = [{"link":"/listings/1152636/3-paroo-avenue-eleebana-nsw-2282/"},{"link":"/listings/1152637/196-the-esplanade-speers-point-nsw-2284/"},{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"},{"link":"/listings/1152614/86-kemp-street-hamilton-south-nsw-2303/"},{"link":"/listings/1152618/19-crusade-close-valentine-nsw-2280/"}];
const houses_json = [{"house_link":"https://www.ppdre.com.au/properties/2-79-81-dolphin-street-coogee-nsw/"},{"house_link":"https://www.ppdre.com.au/properties/6-15-bona-vista-avenue-maroubra-nsw-2/"}];

fs.unlinkSync("housessingleppd.json"); //deletes previous version

houses_json.forEach(function(item, i) {
    (async () => {
        try {
            
            const browser = await playwright.chromium.launch({
                headless: false
            });
            const page = await browser.newPage();
            let full_url = item.house_link;
            //let full_url = "https://www.raywhite.com"+short_url;
            await page.goto(full_url);

            let data = [];

            //document.querySelector(".section.title").childNodes[1].textContent;

            try { var address = await page.textContent('.section.title'); console.log(address);}
            catch { var address = ''}

            try { var suburb = await page.textContent('.section.title > h2'); }
            catch { var suburb = '';}

            try { var guide = await page.textContent('.price'); }
            catch { var guide = '';}

            let agency = "PPD Real Estate";

            try { var agent = await page.textContent(".agent > .tile > .link > h3"); }
            catch {var agent = '' }
            
            try { var status = await page.textContent(".section.section--auction > h2"); }
            catch { var status = '';}

            try { var beds = await page.textContent(".bedrooms > .value"); }
            catch { var beds = '';}

            try { var baths = await page.textContent(".bathroom > .value"); }
            catch { var baths = ''}

            try { 
                var cars = await page.textContent(".carports > .value"); 
            }
            catch {
                var cars = 0;
            }

            //the address string has the suburb at the start, need to remove this 
            address = address.replace(suburb, "");

            try { var propType = await page.textContent(".section.type > p"); }
            catch {var propType = '';}
            //let landSize = "";
            //let propExternal = "";

            try { var title = await page.textContent(".content--wrap.clearfix > .headline"); }
            catch { var title = '';}

            try { var desc = await page.textContent(".content--wrap.clearfix"); }
            catch { var desc = '';}
            
            //the desc string has the title at the start, need to remove this 
            desc = desc.replace(title, "");

            //try { var water = await page.textContent(".content--wrap.clearfix > .features"); }
            //catch { var water = '';}


            

            let listing = await page.textContent(".content--wrap.clearfix > .features");
            desc = desc.replace(listing,"");


            //let listing_array = listing.split("\t","\n")


            //let landSizeLocation = listing_array.indexOf('Land Area'); 
            //var landSize = " ";
            //if (landSizeLocation>=0) {
            //let landSizeLocationNum = landSizeLocation+1; //the number is located one after
            //landSize=listing_array[landSizeLocationNum];

            
            //}




           // let waterRatesLocation = listing_array.indexOf('Water Rates'); 
           // var waterRates = "";
           // if (waterRatesLocation>=0) {
            //let waterRatesLocationNum = waterRatesLocation; //the number is located one after
           // waterRates=listing_array[waterRatesLocationNum];

            //waterRates = waterRates.replace('Water Rates:\t', "");
            
            //}


           // let councilRatesLocation = listing_array.indexOf('Council Rates'); 
            //var councilRates = "";
            //if (councilRatesLocation>=0) {
            //let councilRatesLocationNum = councilRatesLocation+1; //the number is located one after
            //councilRates=listing_array[councilRatesLocationNum];


            //waterRates = waterRates.replace('Water Rates:\t', "");
            
            //}

            //let landSize = await page.locator('div:right-of(:text("Land Size")) >> nth=0').textContent();
            //console.log(landSize);

            //function getNumber(string) { //the ray white beds, baths etc say '3 beds', '3 baths' - this gets rid of the text and leaves you with 3
                //var matches = string.match(/(\d+)/);
                //return matches[0];  
            //}


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
                //landSize,
                //propExternal,
                propType,
                title,
                desc,
                guide,
                //water,
                //councilRates         
            //Agent only works for first agent, Need an error code for if they don't have CAR SPOT, council and water - so if only have nth child 3 rows...Also may have home size, which sits ahead of land size;
                
            });
        
            let jsonData = JSON.stringify(data);
            
            fs.appendFileSync("house_data/housessingleppd.json", jsonData);
        
         
            await browser.close();
        }
        catch (error) {
            console.log(error);
            return '';
        }

    })();

});
  

