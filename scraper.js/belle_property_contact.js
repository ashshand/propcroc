//const { chromium } = require("playwright");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
const { DH_CHECK_P_NOT_PRIME } = require('constants');
//const houses_json = [{"link":"/listings/1152636/3-paroo-avenue-eleebana-nsw-2282/"},{"link":"/listings/1152637/196-the-esplanade-speers-point-nsw-2284/"},{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"},{"link":"/listings/1152614/86-kemp-street-hamilton-south-nsw-2303/"},{"link":"/listings/1152618/19-crusade-close-valentine-nsw-2280/"}];
const houses_json = [{"link":"/listings/982455/3-lindsay-avenue-darling-point-nsw-2027/"}];


let possible_comment_array = [
    'Hi, looking for a price guide, thanks',
    'Hi - looking for a price estimate. Thanks!',
    'Hi, what is price guide?'
];

houses_json.forEach(function(item, i) {
    (async () => {
        const browser = await playwright.chromium.launch({ //can also do firefox.launch or webkit.launch
            channel: 'msedge', //or msedge etc
            headless: false,
            slowMo: 50,
            actionTimeout: 10000
        });
        const page = await browser.newPage();
        let short_url = item.link;
        let full_url = "https://www.belleproperty.com/"+short_url;
        await page.goto(full_url);

        await page.click('.open-contact-form:has-text("Contact Agent") >> visible=true');

        await page.type('input[name="first_name"] >> visible=true', 'Ashleigh', {delay: 30});

        await page.type('input[name="surname"] >> visible=true', 'Shand', {delay: 40});

        await page.type('input[name="email_address"] >> visible=true', 'ashleigh.shand@gmail.com', {delay: 20});

        await page.type('input[name="contact_number"] >> visible=true', '0415106262', {delay: 30});

        //await page.check('#id_my_request_0');
        await page.click('#id_my_request_0 >> visible=true', {delay: 50});
        await page.click('#id_my_request_0 >> visible=true', {delay: 35});
        await page.click('#id_my_request_0 >> visible=true', {delay: 75});

        await page.click('#id_my_request_1 >> visible=true', {delay: 13});
        await page.click('#id_my_request_1 >> visible=true', {delay: 23});

        let random_comment = possible_comment_array[Math.floor(Math.random()*possible_comment_array.length)];

        await page.type('#id_comments >> visible=true', random_comment, {delay: 150});

        //await page.click('button[type="submit"]:has-text("Submit") >> visible=true');


        //await page.click('css=[aria-label="Close"]');

            
        
    
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
        //await browser.close();
    })();

});
  

