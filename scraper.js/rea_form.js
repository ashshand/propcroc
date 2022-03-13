const { chromium } = require('playwright');

async function main() {

        const browser = await chromium.launch({
            headless: false
        });
        const page = await browser.newPage()
        await page.goto('https://www.belleproperty.com/listings/?site_id=2&latitude=&longitude=&is_building=&is_project_listing=&property_type=ResidentialSale&listing_type=Sale&property_status=Available&sale_type=&view=list&state=nsw&region=&q=&beds_min=&baths_min=&price_min=&rent_min=&price_max=&rent_max=&sort_by=&surrounding_suburbs=on')

        await page.setViewportSize({ width: 1920, height: 937 })

        await page.waitForSelector('.layout__sidebar-primary > .contact-agent-panel > .contact-agent-panel__buttons > .get-in-touch > .ButtonBase-sc-18zziu4-0')
        await page.click('.layout__sidebar-primary > .contact-agent-panel > .contact-agent-panel__buttons > .get-in-touch > .ButtonBase-sc-18zziu4-0')

        await page.waitForSelector('#contactAgentEnquiryPrice')
        await page.click('#contactAgentEnquiryPrice')

        await page.waitForSelector('#contactAgentEnquiryRates')
        await page.click('#contactAgentEnquiryRates')

        await page.waitForSelector('#contactAgentConsumerMessage')
        await page.click('#contactAgentConsumerMessage')

        await page.waitForSelector('#wrapper > #listings-app-container > .details > .details__footer > .contact-agent-section')
        await page.click('#wrapper > #listings-app-container > .details > .details__footer > .contact-agent-section')

        await page.waitForSelector('#listings-app-container > .details > .details__footer > .contact-agent-section > .layout')
        await page.click('#listings-app-container > .details > .details__footer > .contact-agent-section > .layout')

        await page.waitForSelector('.styles__SelectAndListboxContainer-sc-1fzshw2-3 > #contactAgentConsumerType-toggle-button > .TextInputBase__ScrollableArea-sc-1huij7c-2 > .styles__DisplayContainer-sc-1fzshw2-6 > .styles__DisplayText-sc-1fzshw2-5')
        await page.click('.styles__SelectAndListboxContainer-sc-1fzshw2-3 > #contactAgentConsumerType-toggle-button > .TextInputBase__ScrollableArea-sc-1huij7c-2 > .styles__DisplayContainer-sc-1fzshw2-6 > .styles__DisplayText-sc-1fzshw2-5')

        await page.waitForSelector('#contactAgentConsumerType-item-1')
        await page.click('#contactAgentConsumerType-item-1')

        await page.waitForSelector('#finance-pre-approval-ratherNotSay')
        await page.click('#finance-pre-approval-ratherNotSay')

        await page.waitForSelector('#contactAgentEnquirySubmit')
        await page.click('#contactAgentEnquirySubmit')

        await page.waitForSelector('.ReactModalPortal > .ReactModal__Overlay > .ReactModal__Content > .Card__Box-sc-g1378g-0 > .ButtonBase-sc-18zziu4-0')
        await page.click('.ReactModalPortal > .ReactModal__Overlay > .ReactModal__Content > .Card__Box-sc-g1378g-0 > .ButtonBase-sc-18zziu4-0')

        await page.screenshot({ path: 'my_screenshot.png', fullPage: true })

        await browser.close();
    
}

main();

