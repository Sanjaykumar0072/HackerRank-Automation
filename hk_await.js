const puppeteer = require("puppeteer");
const code = require("./code");

const email = "fesagom584@chatich.com";
const password = "pepcoding123";

let page;
let cPge;
async function func(){
    try{
    let browserInstance = await puppeteer.launch({ headless: false,defaultViewport:null,rgs:['--start-maximized'] });
    let newPage = await browserInstance.newPage();
    await newPage.goto("https://hackerrank.com");
    await waitAndClick('.menu-item-12851 a',newPage);
    //await newPage.click('a[data-event-action="Login"]',{delay:200});
    await waitAndClick(".create_account-content li:last-child .hr_button",newPage);
    //await newPage.click(".fl-col.fl-node-5bd106f71cd43 .fl-button",{delay:100});
    await newPage.waitForSelector('input[name="username"]');
    await newPage.type('input[name="username"]',email);
    await newPage.waitForSelector('input[name="password"]');
    await newPage.type('input[name="password"]',password);
    await waitAndClick('button[data-analytics="LoginPassword"]',newPage);
    //await newPage.click('button[data-analytics="LoginPassword"]',{delay:100});
    await waitAndClick('.topic-name',newPage);
    // //await newPage.click('.topic-name');
    await waitAndClick('input[value="warmup"]',newPage);
    // await waitAndClick('input[value="warmup]',newPage);
    await newPage.waitForSelector('.challenges-list .js-track-click.challenge-list-item');
    let linkArr = await newPage.evaluate(function(){
        let allEle = document.querySelectorAll('.challenges-list .js-track-click.challenge-list-item');
        let linksArr = [];
        for(let i = 0; i < allEle.length; i++){
            linksArr.push("https://www.hackerrank.com/"+allEle[i].getAttribute("href"));
        }
        return linksArr;
    })
    //console.log(linkArr);
        for(let i = 0; i < linkArr.length; i++){
            await questionSolver(linkArr[i],code.answers[i],browserInstance);
        }
    }catch(err){
        console.log(err);
    }
}


func();

async function waitAndClick(selector,page){
    await page.waitForSelector(selector);
    await page.click(selector,{delay:200});
}

async function questionSolver(url,answer,browser){
    let newPage = await browser.newPage();
    await newPage.goto(url);
    await waitAndClick(".monaco-editor.no-user-select",newPage);
    await waitAndClick(".checkbox-input",newPage);
    await waitAndClick("#input-1",newPage);
    await newPage.type("#input-1",answer);
    await newPage.keyboard.down('Control');
    await newPage.keyboard.press('A');
    await newPage.keyboard.press('X');
    await newPage.keyboard.up('Control');
    await newPage.click(".monaco-editor.no-user-select");
    await newPage.keyboard.down('Control');
    await newPage.keyboard.press('A');
    await newPage.keyboard.press('V');
    await waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right",newPage);
}
