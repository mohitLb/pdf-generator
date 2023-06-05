// const puppeteer = require("puppeteer");
// const url = "https://www.zoho.com/";
// const output = "js.pdf";

// (async () => {
//   const customArgs = [
//     `--start-maximized`,
//     `--load-extension=C:/Users/lenovo/AppData/Local/Google/Chrome/User Data/Profile 9/Extensions/mcbpblocgmgfnpjjppndjkmgjaogfceg/1.11.25_0`,
//   ];
//   const browser = await puppeteer.launch({
//     defaultViewport: null,
//     headless: false,
//     executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//     ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//     args: customArgs,
//   });
//   const backgroundPageTarget = await browser.waitForTarget(
//     (target) => target.type() === "background_page"
//   );
//   const backgroundPage = await backgroundPageTarget.page()

//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
//   await page.goto(url, {
//     waitUntil: "networkidle0",
//   });
//   await page.waitForTimeout(2000);
//   await backgroundPage.evaluate(() => {
//     chrome.tabs.query({ active: true }, tabs => {
//       chrome.browserAction.onClicked.dispatch(tabs[0]);
//     })
//   })
//   await page.waitForTimeout(15000);

//   await page.close();
//   await browser.close();
// })();

//*************************************************************************************************************** */

// const puppeteer = require("puppeteer");

// const url = "https://www.zoho.com/";
// const viewportWidth = 1000;
// const output = "js.pdf";

// (async () => {
//   const browser = await puppeteer.launch({});

//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
//   await page.goto(url, {
//     waitUntil: "networkidle0",
//   });
//   await page.waitForTimeout(5000);

//   let scroll = 200;
//   let scrollHeight = await page.evaluate(
//     () =>
//     document.body.scrollHeight
//   );
//   do {
//     await page.waitForTimeout(200);
//     await page.evaluate(
//       `document.body.scrollTo(0, ${scroll})`
//     );
//     scroll = scroll + 200;
//   } while (scroll <= scrollHeight);

//   await page.waitForTimeout(1000)
//   await page.addStyleTag({
//     content: `
//     @page {
//       size : auto
//     }
//     `,
//   });

//   let [maxHeight, height] = await page.evaluate(() => {
//     const docHeight = () => {
//       const body = document.body;
//       const html = document.documentElement;
//       return Math.max(
//         body.scrollHeight,
//         body.offsetHeight,
//         html.clientHeight,
//         html.scrollHeight,
//         html.offsetHeight
//       );
//     };
//     const docWidth = () => {
//       const body = document.body;
//       const html = document.documentElement;
//       return Math.max(
//         body.scrollWidth,
//         body.offsetWidth,
//         html.clientWidth,
//         html.scrollWidth,
//         html.offsetWidth
//       );
//     };

//     let hh = document.documentElement.offsetHeight;
//     let height;
//     let arr = [];
//     const filteredElements = Array.from(
//       document.querySelectorAll("body *")
//     ).filter((element) => element.tagName.toLowerCase() !== "script");
//     filteredElements.forEach((element) => {
//       arr.push(parseInt(element.offsetHeight));
//     });
//     function removeDuplicates(arr) {
//       return [...new Set(arr)];
//     }
//     arr = removeDuplicates(arr);
//     arr = arr.sort(function (a, b) {
//       return a - b;
//     });

//     for (let i = arr.length - 1; i > 0; i--) {
//       const el = arr[i];
//       if (el && el < docHeight() / 2) {
//         height = el;
//         break;
//       }
//     }
//     filteredElements.forEach((element) => {
//       element.style.maxHeight = height + "px";
//     });
//     return [docHeight(), height];
//   });

//   console.log(maxHeight, height);
//   // await findSectionDivs(page, 'body')
//   await page.emulateMediaType("screen");

//   await page.pdf({
//     path: output,
//     printBackground: true,
//     scale: 0.75,
//     // pageRanges: '1', // THE HACK to make it work
//     height: +maxHeight + 600, // THE HACK to make it pixel-perfect
//   });

//   // await page.waitForTimeout(20000);
//   await browser.close();
// })();

//*************************************************************************************************************** */

// const puppeteer = require("puppeteer");
// const URL = "https://www.unifiedinfotech.net/web-design-development-india/?gad=1&gclid=Cj0KCQjwu-KiBhCsARIsAPztUF27oyBJ5jCxSJOPIpYdj3RUlEwpNKjfanMgVfVJP9B-vkn1OrsfioYaAm3VEALw_wcB";

// const docHeight = () => {
//   const body = document.body;
//   const html = document.documentElement;
//   return Math.max(
//     body.scrollHeight,
//     body.offsetHeight,
//     html.clientHeight,
//     html.scrollHeight,
//     html.offsetHeight
//   );
// };
// const docWidth = () => {
//   const body = document.body;
//   const html = document.documentElement;
//   return Math.max(
//     body.scrollWidth,
//     body.offsetWidth,
//     html.clientWidth,
//     html.scrollWidth,
//     html.offsetWidth
//   );
// };

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(URL);
//   const height = await page.evaluate(docHeight);
//   const width = await page.evaluate(docWidth);
//   await page.setViewport({ width: 800, height: height });
//   await page.addStyleTag({
//     content: `@page { size: auto; }
//     * {
//       max-height : max-content;
//     }
//     `,
//   });

//   await page.pdf({
//     path: `js.pdf`,
//     height: `${height}px`,
//     width: `${width}px`,
//     preferCSSPageSize : false,
//     scale : 0.5
//   });
//   console.log("done");
//   await browser.close();
// })();

//*************************************************************************************************************** */

const puppeteer = require("puppeteer");
const URL = "https://www.lakebrains.com/";

const main = async () => {
  let browser = await puppeteer.launch({
    headless: false,
    args : [`--start-maximized`],
    defaultViewport : null
  });
  let page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0)
  await page.goto(URL, { waitUntil: "networkidle0" });
  await findSectionDivs(page, "body");
  await page.waitForTimeout(2000)
  await page.emulateMediaType("print");
  const pdf = await page.pdf({
    path: "result2.pdf",
    margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    printBackground: true,
    displayHeaderFooter : false,
    format: "A4",
    scale : 0.6
  });
  console.log("Done");
  //   browser.close();
};

main();

const findSectionDivs = async (page, el) => {
  let divtags = await page.$$eval(`${el} > div`, (els) =>
    els.map((el) => el.getAttribute("class"))
  );
  console.log(divtags);
  if (!(divtags.length && divtags.length > 2)) {
    for (let i = 0; i < divtags.length; i++) {
      let element = divtags[i];
      if (element) {
        element = element.split(" ");
        let parent = "";
        for (let j = 0; j < element.length; j++) {
          const el = element[j];
          parent = parent + "." + el;
        }
        findSectionDivs(page, parent);
      } else {
        findSectionDivs(page, `${el} > div > div`);
      }
    }
  } else {
    let style = "";
    for (let k = 0; k < divtags.length; k++) {
      const el = divtags[k];
      if (el) {
        let split = el.split(" ");
        let classSelector = "";
        for (let t = 0; t < split.length; t++) {
          const tt = split[t];
          classSelector = classSelector + "." + tt;
        }
        style =
          style +
          `
          ${classSelector} {
            display: block !important;
          }
        `;
      }
    }
    // console.log(divtags);
    await page.addStyleTag({
      content: style,
    });
  }
};
