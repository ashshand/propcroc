// puppeteer-extra is a wrapper around puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const run = (async () => {

    const args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ];

    const options = {
        args,
        headless: false,
        ignoreHTTPSErrors: true,
        userDataDir: './tmp'
    };


const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://www.domain.com.au/14-243a-old-south-head-road-bondi-nsw-2026-2017489111')

await page.setViewport({ width: 1353, height: 935 })

await page.waitForSelector('.noscript-expander-content > div > .css-1sc1xv6 > .css-19pq93q:nth-child(9) > .domain-icon')
await page.click('.noscript-expander-content > div > .css-1sc1xv6 > .css-19pq93q:nth-child(9) > .domain-icon')

await page.waitForSelector('.noscript-expander-wrapper > .css-1ij7r2s > div > .css-1cz2ruj > a')
await page.click('.noscript-expander-wrapper > .css-1ij7r2s > div > .css-1cz2ruj > a')

await page.waitForSelector('div > .css-13f1wtv > .css-ten7mb > .css-2b0zyx > .css-8rqdw3')
await page.click('div > .css-13f1wtv > .css-ten7mb > .css-2b0zyx > .css-8rqdw3')

await page.waitForSelector('.css-xxro6g:nth-child(2) > .css-9tarca > .css-nvo9ow > .css-1c6vscd > .css-1d89mp7 > .css-9get99 > .domain-checkbox:nth-child(1) > .domain-checkbox__input > .domain-checkbox__checkbox')
await page.click('.css-xxro6g:nth-child(2) > .css-9tarca > .css-nvo9ow > .css-1c6vscd > .css-1d89mp7 > .css-9get99 > .domain-checkbox:nth-child(1) > .domain-checkbox__input > .domain-checkbox__checkbox')

await page.waitForSelector('.css-xxro6g:nth-child(2) > .css-9tarca > .css-nvo9ow > .css-1c6vscd > .css-1d89mp7 > .css-9get99 > .domain-checkbox:nth-child(3) > .domain-checkbox__input > .domain-checkbox__checkbox')
await page.click('.css-xxro6g:nth-child(2) > .css-9tarca > .css-nvo9ow > .css-1c6vscd > .css-1d89mp7 > .css-9get99 > .domain-checkbox:nth-child(3) > .domain-checkbox__input > .domain-checkbox__checkbox')

await page.waitForSelector('.css-xxro6g:nth-child(2) > .css-9tarca > .css-nvo9ow > .css-1c6vscd > .css-1d89mp7 > .css-9get99 > .domain-checkbox:nth-child(4) > .domain-checkbox__input > .domain-checkbox__checkbox')
await page.click('.css-xxro6g:nth-child(2) > .css-9tarca > .css-nvo9ow > .css-1c6vscd > .css-1d89mp7 > .css-9get99 > .domain-checkbox:nth-child(4) > .domain-checkbox__input > .domain-checkbox__checkbox')

await page.waitForSelector('#ckxo4lt9w000m397uqj3jafe1')
await page.click('#ckxo4lt9w000m397uqj3jafe1')

await page.waitForSelector('#ckxo4lt9w000n397ujjfw5bnq')
await page.click('#ckxo4lt9w000n397ujjfw5bnq')

await page.type('#ckxo4lt9w000n397ujjfw5bnq', 'Courtnay ')

await page.type('#ckxo4lt9w000o397ul7togvnu', 'Summer')

await page.waitForSelector('#ckxo4lt9w000q397uud7as84y')
await page.click('#ckxo4lt9w000q397uud7as84y')

await page.waitForSelector('#ckxo4lt9w000m397uqj3jafe1')
await page.click('#ckxo4lt9w000m397uqj3jafe1')

await page.waitForSelector('#ckxo4lt9w000r397uob98md83')
await page.click('#ckxo4lt9w000r397uob98md83')

await page.waitForSelector('.css-xxro6g:nth-child(2) > .css-9tarca > .css-nvo9ow > .css-1c6vscd > .css-1qh5309 > .css-1cynfft')
await page.click('.css-xxro6g:nth-child(2) > .css-9tarca > .css-nvo9ow > .css-1c6vscd > .css-1qh5309 > .css-1cynfft')

await page.waitForSelector('.css-1k9qlg8 > .css-1cz34fo > .css-12aovmp > .css-2yemf3 > .domain-icon')
await page.click('.css-1k9qlg8 > .css-1cz34fo > .css-12aovmp > .css-2yemf3 > .domain-icon')

await page.screenshot({ path: 'example.png' });

await browser.close();
})();
