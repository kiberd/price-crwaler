

import getExecutablePath from "../../../lib/get-excutable-path";
import { commaString2Int } from "../../../lib/commaString2Int";
import { Price } from "@/app/type/type";
import chromium from '@sparticuz/chromium';
import puppeteer from "puppeteer-core";
import os from "os";


export async function GET() {

    const models = ["BQ4422-161", "CZ0790-003"];

    // const browser = await puppeteer.launch({
    //     // executablePath: getExecutablePath(os.platform()),
    //     headless: false
    // });

     /* eslint-disable */
    const executablePath: any = await chromium.executablePath() || getExecutablePath(os.platform());
    console.log(executablePath);
    const browser = await puppeteer.launch({
        executablePath: executablePath,
        args: chromium.args,
        headless: false,
      })


    /* eslint-disable */
    const page: any = await browser.newPage();

    const priceArry = [];

    for(const model of models){

        const price: Price = {
            model: "",
            name: "",
            kream : 1,
            nike : 1
        };

        const kreamUrl = "https://kream.co.kr/search?keyword=" + model + "&tab=products";
        await page.goto(kreamUrl);

        const kreamPriceSelector = "#__layout > div > div.layout__main.search-container > div.content-container > div.content > div > div.shop-content > div > div.search_result.md > div.search_result_list > div > div > a > div.price.price_area > p.amount";
        await page.waitForSelector(kreamPriceSelector);
        /* eslint-disable */
        const kreamPriceData = await page.$eval(
            kreamPriceSelector, (element: any) => {
                return element.textContent;
        });

        const kreamNameSelector = "#__layout > div > div.layout__main.search-container > div.content-container > div.content > div > div.shop-content > div > div.search_result.md > div.search_result_list > div > div > a > div.product_info_area > div.title > div > p.translated_name";
        await page.waitForSelector(kreamNameSelector);
        /* eslint-disable */
        const kreamNameData = await page.$eval(
            kreamNameSelector, (element: any) => {
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
        /* eslint-disable */
        const nikeData = await page.$eval(
            nikeSelector, (element: any) => {
                
                return element.textContent;
        });

        price.nike = commaString2Int(nikeData?.split(' ').join('').slice(0, -1));
        priceArry.push(price);

        
    }


    await browser.close();
    return new Response(JSON.stringify(priceArry), { status: 200 });
    
}