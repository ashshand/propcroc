//const { chromium } = require("playwright");
const { Configuration, OpenAIApi } = require("openai");
const playwright = require('playwright');
const fs = require("fs");
const { data } = require('autoprefixer');
//const houses_json = [{"link":"/listings/1152636/3-paroo-avenue-eleebana-nsw-2282/"},{"link":"/listings/1152637/196-the-esplanade-speers-point-nsw-2284/"},{"link":"/listings/1152644/6-tea-tree-court-suffolk-park-nsw-2481/"},{"link":"/listings/1152630/34-myrna-road-strathfield-nsw-2135/"},{"link":"/listings/1152537/3-lipton-close-woodrising-nsw-2284/"},{"link":"/listings/1152598/104-north-creek-road-lennox-head-nsw-2478/"},{"link":"/listings/1152612/6-tanunda-close-eleebana-nsw-2282/"},{"link":"/listings/1152614/86-kemp-street-hamilton-south-nsw-2303/"},{"link":"/listings/1152618/19-crusade-close-valentine-nsw-2280/"}];
const houses_json = [{"house_link":"https://www.ppdre.com.au/properties/2-79-81-dolphin-street-coogee-nsw/"},{"house_link":"https://www.ppdre.com.au/properties/6-15-bona-vista-avenue-maroubra-nsw-2/"}];

//fs.unlinkSync("housessingleppd.json"); //deletes previous version

//start openai

(async () => {
    console.log('here');
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    console.log('here2');
    const response = await openai.createCompletion("text-davinci-001", {
        prompt: "<table><tbody><tr><td>Water Rates:</td><td>$147.71 Quarterly</td></tr><tr><td>Council Rates:</td><td>$397.80 Quarterly</td></tr><tr><td>Strata Levies:</td><td>$888.82 Quarterly</td></tr></tbody></table>. Q: What are the water, council and strata fees? ",
        //prompt: "Water rates are $500 per quarter. Q: How much are water rates?",
        max_tokens: 50,
    });

    let answer = response['data']['choices'][0]['text'];

    console.log(answer);

})();

//



