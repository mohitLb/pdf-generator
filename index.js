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

// //Ali 07/09/2023 *************************************************************************************************************** */
// const puppeteer = require("puppeteer");


// const allUrls = ["https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]

// const main = async (url) => {


//   const customArgs = [
//     "--start-maximized",
//     "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
//   ];

//   let browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//     // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//     ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//     args: customArgs,
//   });
//   let page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0)
//   // for (let i = 0; i < allUrls.length; i++) {
//   //   try {
//   //     const url = allUrls[i];
//   //     const URL = url;
//   //     const fileName = URL.split("/")[2]
//   //     console.log(fileName);
//   //     await page.goto(URL, { waitUntil: "networkidle0" });
//   //     await page.waitForTimeout(10000)
//   //     await checkRemovePopups(page)
//   //     await autoScroll(page);
//   //     await page.waitForTimeout(2000)
//   //     await checkSection(page)
//   //     let mainTag = await page.$("main")
//   //     if (mainTag) {
//   //       await findSectionDivs(page, "main", 1)
//   //     } else {
//   //       await findSectionDivs(page, "body", 1);
//   //     }
//   //     await checkImage(page)
//   //     await page.waitForTimeout(2000)
//   //     await page.emulateMediaType("print");
//   //     const pdf = await page.pdf({
//   //       path: `pdfs/${fileName}.pdf`,
//   //       margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//   //       printBackground: true,
//   //       displayHeaderFooter: true,
//   //       format: "A4",
//   //       scale: 0.5
//   //     });
//   //     console.log("Done");
//   //   } catch (error) {
//   //     console.log(error);
//   //     console.log("Done");
//   //   }
//   // }

//   // "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"

//   try {
//     const URL = "https://www.mphasis.com/home.html";
//     const fileName = URL.split("/")[2]
//     await page.goto(URL, { waitUntil: "networkidle0" });
//     await setLinkMargin(page);
//     // await page.waitForTimeout(30000)
//     await checkRemovePopups(page)
//     await autoScroll(page);
//     await page.waitForTimeout(2000)
//     let mainTag = await page.$("main")
//     if (mainTag) {
//       await findSectionDivs(page, "main", 1)
//     } else {
//       await findSectionDivs(page, "body", 1);
//     }
//     // await checkSection(page)
//     await checkImage(page)
//     await page.waitForTimeout(2000)
//     await page.emulateMediaType("print");
//     const pdf = await page.pdf({
//       path: `pdfs/${fileName}.pdf`,
//       margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//       printBackground: true,
//       displayHeaderFooter: false,
//       format: "A4",
//       scale: 0.5
//     });
//     console.log("Done");
//   } catch (error) {
//     console.log(error);
//     console.log("Done");
//   }

//   browser.close();
// };
// main()

// async function autoScroll(page) {
//   await page.evaluate(async () => {
//     await new Promise((resolve) => {
//       var totalHeight = 0;
//       var distance = 100;
//       var timer = setInterval(() => {
//         var scrollHeight = document.body.scrollHeight;
//         window.scrollBy(0, distance);
//         totalHeight += distance;

//         if (totalHeight >= scrollHeight - window.innerHeight) {
//           clearInterval(timer);
//           resolve();
//         }
//       }, 100);
//     });
//   });
// }

// async function setLinkMargin(page) {
//   let style = await page.$$eval("a", els => {
//     let style = ""
//     for (let i = 0; i < els.length; i++) {
//       let el = els[i];
//       el.href = "#"

//       // el.style.margin = "25px"
//       // el.style.padding = "10px"
//       // el.style.display = "block"
//       // let br = document.createElement('br')
//       // el.after(br);
//       // let el2 = el.parentElement
//       // el2.insertAdjacentHTML('beforeend', '<br>');
//       console.log("el2 =>",el);
//     }
//   })
// }

// async function checkRemovePopups(page) {
//   let style = await page.$$eval("*", els => {
//     var elems = els;
//     var len = elems.length
//     console.log(els);

//     for (var i = 0; i < len; i++) {
//       try {
//         var computedStyle = window.getComputedStyle(elems[i], null);
//         var tagName = elems[i].tagName.toLowerCase();

//         if (tagName === "header") {
//           // var headerValue = computedStyle.getPropertyValue("header");

//           console.log("Computed header value:", computedStyle.getPropertyValue());
//         } else if (window.getComputedStyle(elems[i], null).getPropertyValue('position') == 'fixed') {
//           var classLoop1 = elems[i].id ? ["#" + elems[i].id] : elems[i].className.split(" ");
//           // console.log(classLoop1)
//           classLoop1 = classLoop1.filter(items => items !== "")
//           classLoop1 = classLoop1.filter(items => items !== " ")

//           if (elems[i].className.toLowerCase().includes("header") || elems[i].className.toLowerCase().includes("navbar")) {
//             console.log("elems[i] true =>", elems[i], classLoop1)
//           } else {
//             var allData = classLoop1.map((items) => {
//               return elems[i].id ? items : "." + items
//             })
//             // console.log("allData =>",allData)
//             const parentElement = document.querySelector(allData.join(""));
//             // console.log(parentElement)
//             const nestedElements = parentElement.querySelectorAll("*");


//             console.log("nestedElements.length =>", nestedElements)

//             if (nestedElements.length) {
//               // Iterate over each nested element and log its class names
//               for (const element of nestedElements) {
//                 var classNames = Array.from(element.classList);
//                 if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                   // console.log("elems[i] false =>", elems[i], classLoop1)
//                   elems[i].remove();
//                   break;
//                   // return;
//                 }
//               };
//             } else if (parentElement) {
//               var classNames = Array.from(nestedElements.classList);
//               // console.log("classNames =>", classNames)
//               if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                 console.log("elems[i] false =>", elems[i], classLoop1)
//                 elems[i].remove();
//               }
//             }
//           }
//         }
//       } catch (error) {
//         // console.log(error)
//       }
//     }
//   })

// }

// const checkImage = async (page) => {
//   let style = await page.$$eval("img", els => {
//     let style = ""
//     for (let i = 0; i < els.length; i++) {
//       let el = els[i];
//       let width = el.offsetWidth
//       let height = el.offsetHeight
//       if (height > 500) {
//         console.log(height);
//         el = el.parentElement
//         console.log(el);
//         el.style.display = "block"
//         // el.style.marginTop = "1000px"
//         // el.style.pageBreakAfter = "always"
//         el.style.pageBreakBefore = "always"
//         el.style.pageBreakInside = "avoid";
//         el.style.marginTop = "160px"
//       }
//     }
//   })

//   // await page.waitForTimeout(300000)
// }

// const checkSection = async (page) => {
//   let style = await page.$$eval("main", els => {
//     let style = ""
//     for (let i = 0; i < els.length; i++) {
//       let el = els[i];
//       let width = el.offsetWidth
//       let height = el.offsetHeight
//       console.log(height);
//       el = el.parentElement
//       el.style.pageBreakAfter = "always"
//       el.style.pageBreakInside = "avoid";
//       el.style.marginTop = "160px"
//     }
//   })

//   // await page.waitForTimeout(300000)
// }

// const findSectionDivs = async (page, el, index) => {
//   console.log(index);
//   if (index < 6) {
//     console.log("senasio => 1");
//     let divtags = await page.$$eval(`${el} > div`, (els) => {
//       let data = []
//       for (let i = 0; i < els.length; i++) {
//         const el = els[i];
//         console.log(el);
//         let cls = el.getAttribute("class")?.trim()
//         if (cls && cls.length) {
//           cls = cls.split(" ");
//           let parent = "";
//           for (let j = 0; j < cls.length; j++) {
//             const el = cls[j];
//             parent = parent + "." + el;
//           }
//           data.push(parent)
//         }
//         else {
//           let id = el.getAttribute('id')?.trim()
//           if (id) {
//             data.push("#" + id)
//           }
//           else {
//             data.push(null)
//           }
//         }
//       }
//       return data
//     }

//     );
//     console.log("divtags-1 =>", divtags);

//     if (divtags.length && divtags.length < 2) {
//       console.log("senasio => 1.1");
//       for (let i = 0; i < divtags.length; i++) {
//         let element = divtags[i];
//         if (element) {
//           // element = element.split(" ");
//           // let parent = "";
//           // for (let j = 0; j < element.length; j++) {
//           //   const el = element[j];
//           //   parent = parent + "." + el;
//           // }
//           findSectionDivs(page, element, index + 1);
//         } else {
//           findSectionDivs(page, `${el} > div > div`, index + 1);
//         }
//       }
//     } else if (divtags.length && divtags.length > 2) {
//       console.log("senasio => 1.2");
//       let style = "";
//       for (let k = 0; k < divtags.length; k++) {
//         const el = divtags[k];
//         console.log((el && (el.includes(".") || el.includes("#"))))
//         if (el && (el.includes(".") || el.includes("#"))) {
//           // let split = el.split(" ");
//           // let classSelector = "";
//           // for (let t = 0; t < split.length; t++) {
//           //   const tt = split[t];
//           //   classSelector = classSelector + "." + tt;
//           // }
//           style =
//             style +
//             `
//           ${el} {
//             page-break-after: always; 
//             margin-top: 50px; 
//           }
//         `;
//         }
//       }
//       // divtags = divtags.filter((items) => items !== null)
//       // console.log(divtags);
//       // await page.addStyleTag({
//       //   content: style,
//       // });

//       // const allCss = divtags.map((items) => {
//       //   var arrayClass = items.split(" ")
//       //   console.log(arrayClass);
//       //   arrayClass = arrayClass.filter((items) => items !== "")
//       //   arrayClass = arrayClass.filter((items) => items !== " ")
//       //   // arrayClass = arrayClass.map((items) => "." + items)
//       //   // console.log("arrayClass =>", arrayClass.join(""));

//       //   return `${arrayClass.join("")} { page-break-after: always; margin-top: 50px; height: 100vh }`
//       // })

//       // console.log("style => ", style);
//       // console.log(allCss);
//       // Set CSS styles to control page breaks
//       return await page.addStyleTag({
//         content: `
//       @page {
//         size: A4;
//       }
//       ${style}
//       `,
//       });
//     }
//     // else {
//     //   // findSectionDivs(page, `div > div`, index + 1);
//     // }
//   }
//   else {
//     console.log("senasio => 2");
//     check2Div(page, "body")
//   }
// };

// // .home-top-banner.example-classname {
// //   page-break-after: always;
// // }

// let check2Div = async (page, el) => {
//   let divtags = await page.$$eval(`${el} > div`, (els) => {
//     let data = []
//     for (let i = 0; i < els.length; i++) {
//       const el = els[i];
//       let cls = el.getAttribute("class")?.trim()
//       if (cls && cls.length) {
//         cls = cls.split(" ");
//         let parent = "";
//         for (let j = 0; j < cls.length; j++) {
//           const el = cls[j];
//           parent = parent + "." + el;
//         }
//         data.push(parent)
//       }
//       else {
//         let id = el.getAttribute('id')?.trim()
//         if (id) {
//           data.push("#" + id)
//         }
//         else {
//           continue;
//         }
//       }
//     }
//     return data
//   }

//   );
//   console.log("divtags-1 =>", divtags);
//   if (divtags.length && divtags.length < 1) {
//     console.log("senasio => 1.1");
//     for (let i = 0; i < divtags.length; i++) {
//       let element = divtags[i];
//       if (element) {
//         // element = element.split(" ");
//         // let parent = "";
//         // for (let j = 0; j < element.length; j++) {
//         //   const el = element[j];
//         //   parent = parent + "." + el;
//         // }
//         check2Div(page, element);
//       } else {
//         check2Div(page, `${el} > div > div`);
//       }
//     }
//   } else if (divtags.length && divtags.length > 2) {
//     console.log("senasio => 1.2");
//     let style = "";
//     for (let k = 0; k < divtags.length; k++) {
//       const el = divtags[k];
//       console.log((el && (el.includes(".") || el.includes("#"))))
//       if (el && (el.includes(".") || el.includes("#"))) {
//         // let split = el.split(" ");
//         // let classSelector = "";
//         // for (let t = 0; t < split.length; t++) {
//         //   const tt = split[t];
//         //   classSelector = classSelector + "." + tt;
//         // }
//         style =
//           style +
//           `
//         ${el} {
//           page-break-after: always; 
//           margin-top: 50px; 
//         }
//       `;
//       }
//     }
//     // divtags = divtags.filter((items) => items !== null)
//     // console.log(divtags);
//     // await page.addStyleTag({
//     //   content: style,
//     // });

//     // const allCss = divtags.map((items) => {
//     //   var arrayClass = items.split(" ")
//     //   console.log(arrayClass);
//     //   arrayClass = arrayClass.filter((items) => items !== "")
//     //   arrayClass = arrayClass.filter((items) => items !== " ")
//     //   // arrayClass = arrayClass.map((items) => "." + items)
//     //   // console.log("arrayClass =>", arrayClass.join(""));

//     //   return `${arrayClass.join("")} { page-break-after: always; margin-top: 50px; height: 100vh }`
//     // })

//     console.log("style => ", style);
//     // console.log(allCss);
//     // Set CSS styles to control page breaks
//     return await page.addStyleTag({
//       content: `
//     @page {
//       size: A4;
//     }
//     ${style}
//     `,
//     });
//   }
// }



//*************************************************************************************************************** */



const puppeteer = require("puppeteer");
const url = "https://www.lakebrains.com/";
const output = "js.pdf";

(async () => {
  const customArgs = [
    `--start-maximized`,
    // `--load-extension=C:/Users/lenovo/AppData/Local/Google/Chrome/User Data/Profile 9/Extensions/mcbpblocgmgfnpjjppndjkmgjaogfceg/1.11.25_0`,
  ];
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    // ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    args: customArgs,
  });

  const page = await browser.newPage();
  page.setRequestInterception(true)

  page.on ( 'request', async request => {
    console.log(request.resourceType ());
      if ( request.resourceType () === 'stylesheet'  ) {
          request.abort ()
      } else {
          request.continue ()
      }
  })
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    let styletags = document.querySelectorAll('style')
    for (let index = 0; index < styletags.length; index++) {
      const el = styletags[index];
      el.remove()
    }
  })
  const pdf = await page.pdf({
    path: `pdfs/${"test"}.pdf`,
    margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    printBackground: true,
    displayHeaderFooter: false,
    format: "A4",
    scale: 0.5
  });



  await page.close();
  await browser.close();
})();
