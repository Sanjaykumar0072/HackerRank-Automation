const puppeteer = require('puppeteer');
const codeFile = require("./code");

const email = "fesagom584@chatich.com";
const password = "pepcoding123";


let browserPromise = puppeteer.launch({ headless: false,defaultViewport:null,rgs:['--start-maximized'] });
let cPage;
let page;
let browser;
browserPromise.then(function(browserInstance){
    browser = browserInstance;
    console.log("browser opened");
    let pagePromise = browserInstance.newPage();
    return pagePromise;
}).then(function(newPage){
    console.log("page opened");
    page = newPage;
    let hkPromise = page.goto("https://hackerrank.com");
    return hkPromise;
}).then(function(){
    console.log("hackerrank home page opened");
    return waitAndClick('.menu-item-12851 a');
//}).then(function(){
//     let loginhkPromise = page.click('a[data-event-action="Login"]',{
//         delay: 200,
//     });
//     return loginhkPromise;
 }).then(function(){
    console.log("login is clicked");
    return waitAndClick(".create_account-content li:last-child .hr_button");
// }).then(function(){
//     let logInDeveloperPromise = page.click(".fl-col.fl-node-5bd106f71cd43 .fl-button",{
//         delay:200,
//     })
//     return logInDeveloperPromise;
 }).then(function(){
     console.log("dev login clicked");
    return page.waitForSelector('input[name="username"]');
}).then(function(){
    console.log("dev login success");
    let emailTypePromise = page.type('input[name="username"]',email);
    return emailTypePromise;
}).then(function(){
    console.log("email is typed");
}).then(function(){
    return page.waitForSelector('input[name="password"]');
}).then(function(){
    let passTypePromise = page.type('input[name="password"]',password);
    return passTypePromise;
}).then(function(){
    console.log("password is typed");
    return page.waitForSelector('button[data-analytics="LoginPassword"]');
}).then(function(){
    let emailLoginPromise = page.click('button[data-analytics="LoginPassword"]',{
        delay: 100,
    });
    return emailLoginPromise;
}).then(function(){
    console.log("dev email login success");
    return page.waitForSelector(".topic-name");
}).then(function(){
    let algoTpicPromise = page.click(".topic-name");
    return algoTpicPromise;
}).then(function(){
    console.log("algorithm is clicked");
    return page.waitForSelector('input[value="warmup"]');
}).then(function(){
    let warmupPromise = page.click('input[value="warmup"]',{
        delay: 400,
    });
        return warmupPromise;
}).then(function(){
    console.log("warmup is clicked");
    return page.waitForSelector(".challenges-list .js-track-click.challenge-list-item");
}).then(function(){
    console.log("warup has been selected");
    //querySelector    --> $
    //querySelectorAll --> $$
    let allChallengeArrPromise = page.$$(".challenges-list .js-track-click.challenge-list-item",{
        delay:100
    });
    return allChallengeArrPromise;
}).then(function(allChallengeArr){
    console.log("Number of questions -> " + allChallengeArr.length);
    let allUrlLinksPromise = page.evaluate(function(){
        let allEle = document.querySelectorAll(".challenges-list .js-track-click.challenge-list-item");
        let linksArr = [];
        for(let i=0;i<allEle.length;i++){
            linksArr.push("https://www.hackerrank.com/"+allEle[i].getAttribute("href"));
        }
        return linksArr;
    })
    return allUrlLinksPromise;
}).then(function(allLinks){
    console.log(allLinks);
    let questionWillBeSolvePromise = questionSolver(allLinks[0],codeFile.answers[0]);
    for(let i=1;i<allLinks.length;i++){
        questionWillBeSolvePromise = questionWillBeSolvePromise.then(function(){
            return questionSolver(allLinks[i],codeFile.answers[i]);
        })
    }
    return questionWillBeSolvePromise;
    // console.log("Question is solved");
}).then(function(){
    console.log("All the Questions have been solved");
}).catch(function(err){
    console.log(err);
})

function waitAndClick(selector) {
    return new Promise(function(resolve,reject){
        let waitForElementPromise = page.waitForSelector(selector);
        waitForElementPromise.then(function(){
            let clickPromise = page.click(selector,{delay:200});
        }).then(function(){
            resolve();
        }).catch(function(){
            reject(err);
        })
    })
}

function questionSolver(url,answer){
    return new Promise(function(resolve,reject){
        let pagePromise = browser.newPage();
        pagePromise.then(function(pageInstance){
            cPage = pageInstance;
            return cPage.goto(url);
        }).then(function(){
            return cPage.waitForSelector(".monaco-editor.no-user-select")
        }).then(function(){
            return cPage.click(".monaco-editor.no-user-select",{delay:200});
        }).then(function(){
            return cPage.waitForSelector(".checkbox-input");
        }).then(function(){
            return cPage.click(".checkbox-input",{delay:200})
        }).then(function(){
            return cPage.waitForSelector("#input-1");
        }).then(function(){
            return cPage.click("#input-1",{delay:200});
        }).then(function(){
            return cPage.type("#input-1",answer);
        }).then(function(){
            return cPage.keyboard.down('Control');
        }).then(function(){
            return cPage.keyboard.press('A');
        }).then(function(){
            return cPage.keyboard.press('X');
        }).then(function(){
            return cPage.keyboard.up('Control');
        }).then(function(){
            return cPage.click(".monaco-editor.no-user-select");
        }).then(function(){
            return cPage.keyboard.down('Control');
        }).then(function(){
            return cPage.keyboard.press('A');
        }).then(function(){
            return cPage.keyboard.press('V');
        }).then(function(){
            return cPage.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right");
        }).then(function(){
            return cPage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right",{delay:200});
        }).then(function(){
            resolve();
        })
    })

}