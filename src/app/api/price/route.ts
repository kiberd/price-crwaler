import { NextRequest } from "next/server";
import os from "os";
import puppeteer from "puppeteer-core";
import getExecutablePath from "../../../lib/get-excutable-path";
import { commaString2Int } from "../../../lib/commaString2Int";

export async function GET(request: NextRequest) {

    const models = ["BQ4422-161", "CZ0790-003"];

    const browser = await puppeteer.launch({
        executablePath: getExecutablePath(os.platform()),
        headless: false
    });

    const page = await browser.newPage();

    const priceArry: any = [];

    for(const model of models){

        const price : any = {
            model: "",
            name: "",
            kream : "",
            nike : ""
        };

        const kreamUrl = "https://kream.co.kr/search?keyword=" + model + "&tab=products";
        await page.goto(kreamUrl);

        const kreamPriceSelector = "#__layout > div > div.layout__main.search-container > div.content-container > div.content > div > div.shop-content > div > div.search_result.md > div.search_result_list > div > div > a > div.price.price_area > p.amount";
        await page.waitForSelector(kreamPriceSelector);
        let kreamPriceData: any = await page.$eval(
            kreamPriceSelector, element => {
                return element.textContent;
        });

        const kreamNameSelector = "#__layout > div > div.layout__main.search-container > div.content-container > div.content > div > div.shop-content > div > div.search_result.md > div.search_result_list > div > div > a > div.product_info_area > div.title > div > p.translated_name";
        await page.waitForSelector(kreamNameSelector);
        let kreamNameData = await page.$eval(
            kreamNameSelector, element => {
                return element.textContent;
        });

        price.model = model;
        price.kream = commaString2Int(kreamPriceData?.split(' ').join('').slice(0, -1));
        price.name = kreamNameData;



        // https://www.nike.com/kr/w?q=BQ4422-161

        const nikeUrl = "https://www.nike.com/kr/w?q=" + model;
        await page.goto(nikeUrl);
        const nikeSelector = "#skip-to-products > div > div > figure > div > div.product-card__animation_wrapper > div > div > div > div";
        await page.waitForSelector(nikeSelector);
        let nikeData: any = await page.$eval(
            nikeSelector, element => {
                
                return element.textContent;
        });

        price.nike = commaString2Int(nikeData?.split(' ').join('').slice(0, -1));

        priceArry.push(price);

        
    }


    await browser.close();

    
    return new Response(JSON.stringify(priceArry), { status: 200 });

    
}