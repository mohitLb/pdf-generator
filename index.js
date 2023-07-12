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
//   for (let i = 0; i < allUrls.length; i++) {
//     try {
//       const url = allUrls[i];
//       const URL = url;
//       const fileName = URL.split("/")[2]
//       console.log(fileName);
//       await page.goto(URL, { waitUntil: "networkidle0" });
//       await setLinkMargin(page);
//       await page.waitForTimeout(10000)
//       await checkRemovePopups(page)
//       await autoScroll(page);
//       await page.waitForTimeout(2000)
//       await checkSection(page)
//       let mainTag = await page.$("main")
//       if (mainTag) {
//         await findSectionDivs(page, "main", 1)
//       } else {
//         await findSectionDivs(page, "body", 1);
//       }
//       await checkImage(page)
//       await page.waitForTimeout(2000)
//       await page.emulateMediaType("print");
//       const pdf = await page.pdf({
//         path: `pdfs/${fileName}.pdf`,
//         margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//         printBackground: true,
//         displayHeaderFooter: true,
//         format: "A4",
//         scale: 0.5
//       });
//       console.log("Done");
//     } catch (error) {
//       console.log(error);
//       console.log("Done");
//     }
//   }

//   // "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"

//   // try {
//   //   const URL = "https://www.mphasis.com/home.html";
//   //   const fileName = URL.split("/")[2]
//   //   await page.goto(URL, { waitUntil: "networkidle0" });
//   //   await setLinkMargin(page);
//   //   // await page.waitForTimeout(30000)
//   //   await checkRemovePopups(page)
//   //   await autoScroll(page);
//   //   await page.waitForTimeout(2000)
//   //   let mainTag = await page.$("main")
//   //   if (mainTag) {
//   //     await findSectionDivs(page, "main", 1)
//   //   } else {
//   //     await findSectionDivs(page, "body", 1);
//   //   }
//   //   // await checkSection(page)
//   //   await checkImage(page)
//   //   await page.waitForTimeout(2000)
//   //   await page.emulateMediaType("print");
//   //   const pdf = await page.pdf({
//   //     path: `pdfs/${fileName}.pdf`,
//   //     margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//   //     printBackground: true,
//   //     displayHeaderFooter: false,
//   //     format: "A4",
//   //     scale: 0.5
//   //   });
//   //   console.log("Done");
//   // } catch (error) {
//   //   console.log(error);
//   //   console.log("Done");
//   // }

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



// // 14-06-2023 *************************************************************************************************************** */

// const puppeteer = require("puppeteer");
// const fs = require('fs')
// const url = "https://www.lakebrains.com/";

// const output = "js.pdf";

// const allUrls = ["https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]

// console.log(allUrls.length);
// const main = async () => {
//   const customArgs = [
//     "--start-maximized",
//     "--load-extension=C:/Users/Abdeali/Downloads/ohlencieiipommannpdfcmfdpjjmeolj,C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
//   ];

//   let browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//     executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//     ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//     args: customArgs,
//   });

//   for (let i = 0; i < allUrls.length; i++) {
//     try {
//       const url = allUrls[i];
//       const URL = url;
//       const fileName = URL.split("/")[2]
//       const backgroundPageTarget = await browser.waitForTarget(
//         (target) => target.type() === "background_page"
//       );
//       const backgroundPage = await backgroundPageTarget.page()
//       const page = await browser.newPage();
//       await page.goto(URL, {
//         waitUntil: "networkidle0",
//       });
//       await setLinkMargin(page);
//       await page.waitForTimeout(10000)
//       await checkRemovePopups(page)
//       await autoScroll(page);
//       await page.waitForTimeout(2000)
//       await checkSection(page)
//       let mainTag = await page.$("main")
//       if (mainTag) {
//         await findSectionDivs(page, "main", 1)
//       } else {
//         await findSectionDivs(page, "body", 1);
//       }
//       await checkImage(page)
//       await page.waitForTimeout(2000)
//       await backgroundPage.evaluate(() => {
//         startWokr()
//       })

//       await page.waitForTimeout(5000);

//       // const frameHandle = await page.$('iframe');
//       // const frame = await frameHandle.contentFrame();



//       // // Generate the PDF of the iframe content
//       // const pdf = await frame.pdf({
//       //   format: 'A4',
//       //   path: `pdfs/${"test"}.pdf`,
//       //   printBackground: true,
//       // });
//       const frame = page.frames().find(frame => frame.url().includes("core.html"));
//       // console.log("frame =>", frame);

//       await frame.click("#w-pdf")
//       await page.waitForTimeout(10000);

//       const frame2 = page.frames().find(frame => frame.name().includes("pdf_iframe"));
//       // console.log(frame2);
//       await frame2.click(".pdf-download")
//       await page.waitForTimeout(25000);

//       // pdf-download-image
//       // const data = await renderPageToHtml(page)

//       // console.log("data =>",data);
//       //fs.writeFileSync('page.html', data);
//       // await page.waitForTimeout(1500000);

//       // const pdf = await frame.pdf({
//       //   path: `pdfs/${"test"}.pdf`,
//       //   margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//       //   printBackground: true,
//       //   displayHeaderFooter: false,
//       //   format: "A4",
//       //   scale: 0.5
//       // });

//       await page.close();
//       console.log("Done");
//     } catch (error) {
//       console.log(error);
//       console.log("Done");
//     }
//   }


//   await browser.close();
// };
// main()

// async function renderPageToHtml(page) {

//   const iframe = await page.$("iframe#pf-core");
//   console.log("iframe => ", iframe);

//   const frame = await iframe.contentFrame();
//   const context = await frame.executionContext();
//   const res = await context.evaluate(() => {
//     const el = document.querySelector("*");
//     if (el) return el.outerHTML;
//   });
//   if (res) {
//     await iframe.evaluate((a, res) => {
//       a.innerHTML = res;
//     }, res);
//   }

//   const iframe2 = await page.$("iframe#pf-core");
//   console.log("iframe => ", iframe2);

//   const frame2 = await iframe2.contentFrame();
//   const context2 = await frame2.executionContext();
//   const res2 = await context2.evaluate(() => {
//     const el = document.querySelector("*");
//     if (el) return el.outerHTML;
//   });
//   if (res2) {
//     await iframe2.evaluate((a, res) => {
//       a.innerHTML = res;
//     }, res2);
//   }

//   return await page.evaluate(() => new XMLSerializer().serializeToString(document))
// }


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
//       console.log("el2 =>", el);
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
//       return await page.addStyleTag({
//         content: `
//       @page {
//         size: A4;
//       }
//       ${style}
//       `,
//       });
//     }
//   }
//   else {
//     console.log("senasio => 2");
//     check2Div(page, "body")
//   }
// };

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

//     console.log("style => ", style);

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


// // 15-06-2023 *************************************************************************************************************** */
// const puppeteer = require('puppeteer');

// async function run() {

//     const customArgs = [
//         "--start-maximized",
//         "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
//     ];

//     let browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: null,
//         executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//         ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//         args: customArgs,
//     });


//     const allUrls = ["https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
//     // const allUrls = ["https://amagroupltd.com/our-business/ama-group-board"]

//     for (let i = 0; i < allUrls.length; i++) {
//         try {
//             const url = allUrls[i];
//             const URL = url;
//             const fileName = URL.split("/")[2]
//             let page = await browser.newPage();
//             // await page.setViewport({ width: 1920, height: 1080 });
//             // await page.setRequestInterception(true);

//             // page.on('request', (req) => {
//             //     if (req.resourceType() == 'stylesheet') {
//             //         req.abort();
//             //     }
//             //     else {
//             //         req.continue();
//             //     }
//             // });

//             await page.goto(URL, { waitUntil: "networkidle0" });

//             // await page.waitForTimeout(10000)
//             // await checkRemovePopups(page)

//             await checkVideo(page)

//             await page.waitForTimeout(5000)

//             await page.evaluate(() => {
//                 let allels = document.querySelectorAll("*")
//                 let links = document.querySelectorAll("link")
//                 let scripts = document.querySelectorAll('script')
//                 let styles = document.querySelectorAll('style')

//                 const elements = document.body.getElementsByTagName('*');

//                 setInterval(() => {
//                     for (let i = 0; i < elements.length; i++) {
//                         elements[i].removeAttribute('style');
//                     }
//                 }, 500);

//                 for (let i = 0; i < allels.length; i++) {
//                     const el = allels[i];
//                     el.removeAttribute("style")
//                 }

//                 for (let i = 0; i < styles.length; i++) {
//                     const el = styles[i];
//                     el.remove()
//                 }
//                 for (let i = 0; i < links.length; i++) {
//                     const link = links[i];
//                     link.remove()
//                 }
//                 for (let i = 0; i < scripts.length; i++) {
//                     const link = scripts[i];
//                     link.remove()
//                 }

//             })

//             // path, can be relative or absolute path
//             // await page.addScriptTag({ path: 'public/jquery.min.js' })
//             // await page.addScriptTag({ path: 'public/algo.js' })

//             await page.addStyleTag({ path: 'public/main.css' })

//             // Add attribute to every element
//             await page.evaluate(async () => {
//                 const elements = document.querySelectorAll('*');
//                 for (const element of elements) {
//                     element.setAttribute('data-pf_style_display', 'block');
//                     element.setAttribute('data-pf_style_visibility', 'visible');
//                     element.setAttribute('orig-style', 'null');
//                 }
//                 const buttons = document.querySelectorAll('button');
//                 for (const button of buttons) {
//                     if (!button.querySelector('a') && (button.innerText.toLowerCase().includes("read") || button.innerText.toLowerCase().includes("learn more") || button.innerText.toLowerCase().includes("more"))) {
//                         button.click();
//                     }
//                 }
//                 var body = await document.querySelector('body');
//                 body.classList.add("content-unmask")
//                 body.classList.add("cs-algo-iframe")
//                 body.classList.add("px-2")
//                 body.classList.add("px-sm-4")
//                 body.classList.add("px-md-5")
//                 body.classList.add("pt-2")
//                 body.classList.add("pt-sm-3")
//                 body.classList.add("direction-ltr")
//                 body.id = "pf-body"

//                 // body = body.innerHTML
//                 // const parentElement = `<div id = "printfriendly" class = "pf-12" ><div id="pf-print-area"><div id="pf-content" orig-style="null" style="direction: ltr">${body}</div></div></div>`;
//                 // document.body.innerHTML = parentElement
//             });
//             // await autoScroll(page);
//             await page.waitForTimeout(2000)
//             await checkSection(page)
//             let mainTag = await page.$("main")
//             if (mainTag) {
//                 await findSectionDivs(page, "main", 1, "parent")
//             } else {
//                 await findSectionDivs(page, "body", 1, "parent");
//             }
//             await checkImage(page)
//             await page.waitForTimeout(2000)
//             await page.emulateMediaType("print");
//             const pdf = await page.pdf({
//                 path: `pdfs/${fileName}.pdf`,
//                 margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//                 printBackground: true,
//                 displayHeaderFooter: true,
//                 format: "A4",
//                 scale: 0.5
//             });

//             await page.waitForTimeout(2000)
//             await removePage(fileName).catch((err) => console.log(err));
//             await page.waitForTimeout(2000)
//             await page.close();
//             console.log("Done");

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     await browser.close();
// }

// run();


// const checkImage = async (page) => {
//     let style = await page.$$eval("img", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             // const span = document.createElement("span")
//             // span.innerText = 'image'
//             // console.log("span", span);
//             // el.after(span);
//             // el.style.maxWidth = "500px"
//             // el.style.maxHeight = "500px"
//             const br = document.createElement("br")
//             el.parentElement.after(br)
//         }
//     })

//     // await page.waitForTimeout(300000)
// }


// const checkVideo = async (page) => {
//     let style = await page.$$eval("video", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             el.remove()
//         }
//     })

//     // await page.waitForTimeout(300000)
// }

// async function autoScroll(page) {
//     await page.evaluate(async () => {
//         await new Promise((resolve) => {
//             var totalHeight = 0;
//             var distance = 50;
//             var timer = setInterval(() => {
//                 var scrollHeight = document.body.scrollHeight;
//                 window.scrollBy(0, distance);
//                 totalHeight += distance;

//                 if (totalHeight >= scrollHeight - window.innerHeight) {
//                     clearInterval(timer);
//                     resolve();
//                 }
//             }, 100);
//         });
//     });
// }


// const checkSection = async (page) => {
//     let style = await page.$$eval("main", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             let width = el.offsetWidth
//             let height = el.offsetHeight
//             console.log(height);
//             el = el.parentElement
//             el.style.pageBreakAfter = "always"
//             el.style.pageBreakInside = "avoid";
//             el.style.marginTop = "160px"
//         }
//     })

//     // await page.waitForTimeout(300000)
// }

// const findSectionDivs = async (page, el, index, flag) => {
//     let classWithFlag = `mohitTestPDF_${flag}`
//     if (index < 6) {
//         let divtags = await page.$$(`${el} > div`)
//         // , (els) => {
//         //     let data = []
//         //     for (let i = 0; i < els.length; i++) {
//         //         const el = els[i];
//         //         console.log(el);
//         //         let cls = el.getAttribute("class")?.trim()
//         //         if (cls && cls.length) {
//         //             cls = cls.split(" ");
//         //             let parent = "";
//         //             for (let j = 0; j < cls.length; j++) {
//         //                 const el = cls[j];
//         //                 parent = parent + "." + el;
//         //             }
//         //             data.push(parent)
//         //         }
//         //         else {
//         //             let id = el.getAttribute('id')?.trim()
//         //             if (id) {
//         //                 data.push("#" + id)
//         //             }
//         //             else {
//         //                 data.push(null)
//         //             }
//         //         }
//         //     }
//         //     return data
//         // }

//         // );

//         if (divtags.length && divtags.length < 2) {
//             let previous = ""
//             for (let i = 0; i < divtags.length; i++) {
//                 let element = divtags[i];
//                 let classNameNew = ""
//                 const el = element;
//                 let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                 if (cls && cls.length) {
//                     cls = cls.split(" ");
//                     let parent = "";
//                     for (let j = 0; j < cls.length; j++) {
//                         const el = cls[j];
//                         parent = parent + "." + el;
//                     }
//                     classNameNew = parent
//                 }
//                 else {
//                     let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                     console.log("id ", id);
//                     if (id) {
//                         classNameNew = "#" + id
//                     }
//                     else {
//                         let cllass = "unique_Mohit_test_xyz" + i
//                         await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                         classNameNew = "." + cllass
//                     }
//                 }
//                 // await page.waitForTimeout(1200000)
//                 if (classNameNew != null) {
//                     findSectionDivs(page, classNameNew, index + 1, flag);
//                 } else if (previous) {
//                     console.log(previous);
//                     findSectionDivs(page, `${previous} > div > div`, index + 1, flag);
//                 }
//                 previous = classNameNew
//             }
//         } else if (divtags.length && divtags.length > 2) {
//             let style = "";
//             for (let k = 0; k < divtags.length; k++) {
//                 const el = divtags[k];
//                 let cllass = `${classWithFlag}_${k}`
//                 let x = el
//                 await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
//                 // el.classList.add(`${classWithFlag}_${k}`)
//                 style =
//                     style +
//                     `
//                 .${classWithFlag}_${k} {
//                     page-break-after: always; 
//                     margin-top: 50px; 
//                 }
//                 `;
//                 const pagesRequired = Math.ceil((await el.evaluate(x => x.offsetHeight) / 1122) / 2)
//                 if (pagesRequired > 1) {
//                     let classNameNew = ""
//                     let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                     if (cls && cls.length) {
//                         cls = cls.split(" ");
//                         let parent = "";
//                         for (let j = 0; j < cls.length; j++) {
//                             const el = cls[j];
//                             parent = parent + "." + el;
//                         }
//                         classNameNew = parent
//                     }
//                     else {
//                         let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                         if (id) {
//                             classNameNew = "#" + id
//                         }
//                         else {
//                             let cllass = "unique_Mohit_z" + i
//                             await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                             classNameNew = "." + cllass
//                         }
//                     }
//                     // console.log("test log =>");
//                     // secondLevelFindSections(page, classNameNew, 1, "justForTest", pagesRequired)
//                     // let breakIndex = await page.evaluate((el, pagesRequired) => {
//                     //     let children = el.childNodes
//                     //     let breakIndex = Math.ceil(children.length / pagesRequired)
//                     //     for (let i = breakIndex; i < children.length; i = i + breakIndex) {
//                     //         const element = children[i];
//                     //         element.style.pageBreakAfter = "always"
//                     //         element.style.marginTop = "50px"
//                     //     }
//                     //     return breakIndex
//                     // }, el, pagesRequired)
//                     // console.log("breakIndex => ", breakIndex);
//                 }

//             }
//             return await page.addStyleTag({
//                 content: `
//       @page {
//         size: A4;
//       }
//       ${style}
//       `,
//             });
//         }
//     }
//     else {
//         console.log("senasio => 2");
//         check2Div(page, "body")
//     }
// };

// const secondLevelFindSections = async (page, el, index, flag, pagesRequired) => {
//     // console.log("Pages =>", page, el, index, flag, pagesRequired);
//     let classWithFlag = `mohitPDF_${flag}`
//     if (index < 12) {
//         console.log("senasio => 1");
//         let divtags = await page.$$(`${el} > div`)
//         console.log("divtags-1 =>", divtags);
//         if (divtags.length && divtags.length < 2) {
//             console.log("senasio => 1.1");
//             let previous = ""
//             for (let i = 0; i < divtags.length; i++) {
//                 let element = divtags[i];
//                 let classNameNew = ""
//                 const el = element;
//                 console.log(el);
//                 let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                 console.log("cls ", cls);
//                 if (cls && cls.length) {
//                     cls = cls.split(" ");
//                     let parent = "";
//                     for (let j = 0; j < cls.length; j++) {
//                         const el = cls[j];
//                         parent = parent + "." + el;
//                     }
//                     classNameNew = parent
//                 }
//                 else {
//                     let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                     console.log("id ", id);
//                     if (id) {
//                         classNameNew = "#" + id
//                     }
//                     else {
//                         let cllass = "unique_Mohit_test_xyz" + i
//                         await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                         classNameNew = "." + cllass
//                     }
//                 }
//                 console.log(classNameNew);
//                 if (classNameNew != null) {
//                     secondLevelFindSections(page, classNameNew, index + 1, flag, pagesRequired);
//                 } else if (previous) {
//                     console.log(previous);
//                     secondLevelFindSections(page, `${previous} > div > div`, index + 1, flag, pagesRequired);
//                 }
//                 previous = classNameNew
//             }
//         } else if (divtags.length && divtags.length > 2) {
//             console.log("senasio => 1.2");
//             let el = divtags[0]
//             // for (let k = 0; k < divtags.length; k++) {
//             //     const el = divtags[k];
//             // let cllass = `${classWithFlag}_${k}`
//             // let x = el
//             // await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
//             // // el.classList.add(`${classWithFlag}_${k}`)
//             // style =
//             //     style +
//             //     `
//             // .${classWithFlag}_${k} {
//             //     page-break-after: always; 
//             //     margin-top: 50px; 
//             // }
//             // `;
//             let breakIndex = await page.evaluate((el, pagesRequired) => {
//                 console.log("parent =>", pagesRequired, el);
//                 let parent = el.parentElement
//                 let children = parent.childNodes
//                 let breakIndex = Math.ceil(children.length / pagesRequired)
//                 for (let i = breakIndex; i < children.length; i = i + breakIndex) {
//                     const element = children[i];
//                     element.style.pageBreakAfter = "always"
//                     element.style.marginTop = "50px"
//                 }
//                 return breakIndex
//             }, el, pagesRequired)
//             console.log("breakIndex => ", breakIndex);

//             // }
//             //         return await page.addStyleTag({
//             //             content: `
//             //   @page {
//             //     size: A4;
//             //   }
//             //   ${style}
//             //   `,
//             //         });
//         }
//     }
//     else {
//         console.log("senasio => 2");
//         check2Div(page, "body")
//     }
// };

// let check2Div = async (page, el) => {
//     let divtags = await page.$$eval(`${el} > div`, (els) => {
//         let data = []
//         for (let i = 0; i < els.length; i++) {
//             const el = els[i];
//             let cls = el.getAttribute("class")?.trim()
//             if (cls && cls.length) {
//                 cls = cls.split(" ");
//                 let parent = "";
//                 for (let j = 0; j < cls.length; j++) {
//                     const el = cls[j];
//                     parent = parent + "." + el;
//                 }
//                 data.push(parent)
//             }
//             else {
//                 let id = el.getAttribute('id')?.trim()
//                 if (id) {
//                     data.push("#" + id)
//                 }
//                 else {
//                     continue;
//                 }
//             }
//         }
//         return data
//     }

//     );
//     if (divtags.length && divtags.length < 1) {
//         console.log("senasio => 1.1");
//         for (let i = 0; i < divtags.length; i++) {
//             let element = divtags[i];
//             if (element) {
//                 check2Div(page, element);
//             } else {
//                 check2Div(page, `${el} > div > div`);
//             }
//         }
//     } else if (divtags.length && divtags.length > 2) {
//         console.log("senasio => 1.2");
//         let style = "";
//         for (let k = 0; k < divtags.length; k++) {
//             const el = divtags[k];
//             console.log((el && (el.includes(".") || el.includes("#"))))
//             if (el && (el.includes(".") || el.includes("#"))) {
//                 style =
//                     style +
//                     `
//         ${el} {
//           page-break-after: always; 
//           margin-top: 50px; 
//         }
//       `;
//             }
//         }

//         console.log("style => ", style);

//         return await page.addStyleTag({
//             content: `
//     @page {
//       size: A4;
//     }
//     ${style}
//     `,
//         });
//     }
// }

// async function checkRemovePopups(page) {
//     let style = await page.$$eval("*", els => {
//         var elems = els;
//         var len = elems.length
//         console.log(els);

//         for (var i = 0; i < len; i++) {
//             try {
//                 var computedStyle = window.getComputedStyle(elems[i], null);
//                 var tagName = elems[i].tagName.toLowerCase();

//                 if (tagName === "header") {
//                     // var headerValue = computedStyle.getPropertyValue("header");

//                     console.log("Computed header value:", computedStyle.getPropertyValue());
//                 } else if (window.getComputedStyle(elems[i], null).getPropertyValue('position') == 'fixed') {
//                     var classLoop1 = elems[i].id ? ["#" + elems[i].id] : elems[i].className.split(" ");
//                     // console.log(classLoop1)
//                     classLoop1 = classLoop1.filter(items => items !== "")
//                     classLoop1 = classLoop1.filter(items => items !== " ")

//                     if (elems[i].className.toLowerCase().includes("header") || elems[i].className.toLowerCase().includes("navbar")) {
//                         console.log("elems[i] true =>", elems[i], classLoop1)
//                     } else {
//                         var allData = classLoop1.map((items) => {
//                             return elems[i].id ? items : "." + items
//                         })
//                         // console.log("allData =>",allData)
//                         const parentElement = document.querySelector(allData.join(""));
//                         // console.log(parentElement)
//                         const nestedElements = parentElement.querySelectorAll("*");


//                         console.log("nestedElements.length =>", nestedElements)

//                         if (nestedElements.length) {
//                             // Iterate over each nested element and log its class names
//                             for (const element of nestedElements) {
//                                 var classNames = Array.from(element.classList);
//                                 if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                                     // console.log("elems[i] false =>", elems[i], classLoop1)
//                                     elems[i].remove();
//                                     break;
//                                     // return;
//                                 }
//                             };
//                         } else if (parentElement) {
//                             var classNames = Array.from(nestedElements.classList);
//                             // console.log("classNames =>", classNames)
//                             if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                                 console.log("elems[i] false =>", elems[i], classLoop1)
//                                 elems[i].remove();
//                             }
//                         }
//                     }
//                 }
//             } catch (error) {
//                 // console.log(error)
//             }
//         }
//     })

// }

// async function removePage(filePath) {
//     const { writeFileSync, readFileSync } = require("fs");
//     const { PDFDocument } = require("pdf-lib");
//     const pdf = require('pdf-parse');

//     const dataBuffer = readFileSync(`pdfs/${filePath}.pdf`);
//     const letters = await PDFDocument.load(readFileSync(`pdfs/${filePath}.pdf`));

//     await pdf(dataBuffer).then(async function (data) {
//         const pages = data.text.split('\n\n'); // Split the text by page

//         var num = 1
//         for (let i = 0; i < pages.length; i++) {
//             // Get the text of the desired page
//             const desiredPageText = pages[i];

//             // console.log("desiredPageText =>", desiredPageText);


//             if (!desiredPageText && i !== 0) {
//                 console.log(` `);
//                 console.log(`Text of page ${num}:`);
//                 console.log(desiredPageText);
//                 await letters.removePage(i - num);
//                 num = num + 1
//             }
//         }
//         writeFileSync(`pdfs_test/${filePath}_test.pdf`, await letters.save());
//     }).catch(function (error) {
//         console.log('An error occurred:', error);
//     });

// }
// // *************************************************************************************************************** */


// //Blank pages test senarios
// const { PDFDocument } = require("pdf-lib");
// const { writeFileSync, readFileSync } = require("fs");

// async function removePage() {
//     const letters = await PDFDocument.load(readFileSync("pdfs/lakebrains.com_test.pdf"));
//     // console.log(letters.)
//     letters.removePage(1);
//     writeFileSync("remove-page.pdf", await letters.save());
// }

// removePage().catch((err) => console.log(err));


// const fs = require('fs');
// const pdf = require('pdf-parse');

// const filePath = 'pdfs/lakebrains.com_test.pdf';
// const targetPageNumber = 4; // Specify the desired page number here

// const dataBuffer = fs.readFileSync(filePath);

// pdf(dataBuffer).then(function (data) {
//     const pages = data.text.split('\n\n'); // Split the text by page

//     console.log(pages.length);
//     var pageNumbers = [];

//     for (let i = 0; i < pages.length; i++) {
//         // Get the text of the desired page
//         const desiredPageText = pages[i];

//         if (!desiredPageText && i !== 0) {
//             console.log(` `);
//             console.log(`Text of page ${i}:`);
//             pageNumbers.push(i)
//             console.log(desiredPageText);
//         }
//     }


// }).catch(function (error) {
//     console.log('An error occurred:', error);
// });
// // *********************************

// // 22-06-2023 Internal, External & Inline css change *************************************************************************************************************** */

// const puppeteer = require('puppeteer');

// async function run() {

//     const customArgs = [
//         "--start-maximized",
//         "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
//     ];

//     let browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: null,
//         executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//         ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//         args: customArgs,
//     });


//     // const allUrls = ["https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
//     const allUrls = ["https://lakebrains.com/"]

//     for (let i = 0; i < allUrls.length; i++) {
//         try {
//             const url = allUrls[i];
//             const URL = url;
//             const fileName = URL.split("/")[2]
//             let page = await browser.newPage();

//             await page.goto(URL, { waitUntil: "networkidle0" });

//             // await page.waitForTimeout(30000)

//             await page.evaluate(() => {
//                 let allels = document.querySelectorAll("*[style]");
//                 // let links = document.querySelectorAll("link")
//                 // let scripts = document.querySelectorAll('script')
//                 // let styles = document.querySelectorAll('style')

//                 // const elements = document.body.getElementsByTagName('*');

//                 // setInterval(() => {
//                 //     for (let i = 0; i < elements.length; i++) {
//                 //         elements[i].removeAttribute('style');
//                 //     }
//                 // }, 500);

//                 for (let i = 0; i < allels.length; i++) {
//                     const el = allels[i];
//                     // console.log(el)
//                     for (let r = 0; r < el.style.length; r++) {
//                         const element = el.style[r];
//                         // console.log("el.style.display =>", el.style.display);
//                         if (
//                             element !== "flex-display" &&
//                             element !== "flex-direction" &&
//                             element !== "flex-wrap" &&
//                             element !== "flex-flow" &&
//                             element !== "justify-content" &&
//                             element !== "align-items" &&
//                             element !== "gap" &&
//                             element !== "row-gap" &&
//                             element !== "column-gap" &&
//                             !element.includes("margin") &&
//                             !element.includes("padding")
//                         ) {
//                             // console.log("margin" ,element.includes("margin"));
//                             // console.log("element =>", element, el.style[`${element}`])
//                             el.style[`${element}`] = ""
//                         } else if (
//                             el.style.display !== "grid" &&
//                             el.style.display !== "flex" &&
//                             el.style.display !== "inline" &&
//                             el.style.display !== "inline-block"
//                         ) {
//                             // console.log("element =>", element, el.style[`${element}`])
//                             el.style[`${element}`] = ""
//                         }
//                     }
//                 }

//                 var allClasses = [];

//                 var allElements = document.querySelectorAll('*');

//                 var styleSheet = document.styleSheets;

//                 console.log("rule =>",rules);
//                 for (var i = 0; i < styleSheet.length; i++) {
//                     var ruleIndex = 0;
//                     var rules = styleSheet[i];
//                     var rule = rules;

//                     // if (rule.selectorText === '.yourClassName') {
//                       // Modify the styles of the matched rule
//                       console.log(rule)
//                       // Replace 'property' with the CSS property you want to change, and 'value' with the desired value
//                     // }
//                   }

//                 // for (var i = 0; i < allElements.length; i++) {
//                 //     var style = window.getComputedStyle(allElements[i]);
//                 //     console.log("style =>",style);
//                 //     var classes = allElements[i].className.toString().split(/\s+/);
//                 //     for (var j = 0; j < classes.length; j++) {
//                 //         var cls = classes[j];
//                 //         if (cls && allClasses.indexOf(cls) === -1) {
//                 //             allClasses.push(cls);
//                 //             var className = style.getPropertyValue(cls);
//                 //             console.log("className =>",className);
//                 //         }
//                 //     }
//                 // }

//                 // console.log(allClasses);
//             })
//             await page.waitForTimeout(2000)
//             await page.emulateMediaType("print");
//             // const pdf = await page.pdf({
//             //     path: `pdfs/${fileName}.pdf`,
//             //     margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//             //     printBackground: true,
//             //     displayHeaderFooter: true,
//             //     format: "A4",
//             //     scale: 0.5
//             // });

//             await page.waitForTimeout(2000)
//             // await page.close();
//             console.log("Done");

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     // await browser.close();
// }

// run();

// //*************************************************************************************************************** */


// // 23-06-2023 Read More & Learn More if link in Button *************************************************************************************************************** */
// const puppeteer = require('puppeteer');
// const fs = require('fs');

// async function run() {

//     const customArgs = [
//         "--start-maximized",
//         "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
//     ];

//     let browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: null,
//         protocolTimeout: 1200000,
//         executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//         ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//         args: customArgs,
//     });


//     const allUrls = ["https://www.pixium-vision.com/board-of-directors-2/", "https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
//     // const allUrls = ["https://www.mphasis.com/home.html"]

//     for (let i = 0; i < allUrls.length; i++) {
//         try {
//             const url = allUrls[i];
//             const URL = url;
//             console.log("URL =>", URL);
//             const fileName = URL.split("/")[2]
//             let page = await browser.newPage();
//             await page.setDefaultTimeout(0)
//             await page.setDefaultNavigationTimeout(0)

//             await page.goto(URL, { waitUntil: "networkidle0", timeout: 0 });

//             await checkVideo(page)

//             await page.waitForTimeout(5000)

//             async function test_newPage(link) {
//                 let pageInternal = await browser.newPage();

//                 await pageInternal.goto(link, { timeout: 0 });
//                 console.log("Getting in");

//                 await pageInternal.waitForTimeout(5000)
//                 await autoScroll(pageInternal);

//                 const offsetHeight = await pageInternal.evaluate(() => {
//                     const body = document.body;
//                     console.log("offsetHeight =>", body);
//                     return body.offsetHeight;
//                 });


//                 await pageInternal.close();

//                 return offsetHeight;
//             }

//             await page.exposeFunction("test_newPage", test_newPage);

//             var mainStyles;
//             await fs.readFile('public/main.css', 'utf8', (err, data) => {
//                 return new Promise(async (resolve) => {
//                     if (err) {
//                         console.error(err);
//                         return;
//                     }

//                     // Parse the CSS file to extract the classes
//                     const classes = data;
//                     mainStyles = classes
//                     resolve();
//                 })
//             });

//             await page.evaluate(() => {
//                 let allels = document.querySelectorAll("*")
//                 let links = document.querySelectorAll("link")
//                 let scripts = document.querySelectorAll('script')
//                 let styles = document.querySelectorAll('style')
//                 let headers = document.querySelectorAll('header')
//                 let footers = document.querySelectorAll('footer')

//                 const elements = document.body.getElementsByTagName('*');

//                 setInterval(() => {
//                     for (let i = 0; i < elements.length; i++) {
//                         elements[i].removeAttribute('style');
//                     }
//                 }, 500);

//                 // Loop through each element
//                 allels.forEach(element => {
//                     // Get all attributes of the element
//                     const attributes = element.attributes;

//                     // Loop through each attribute
//                     for (let i = 0; i < attributes.length; i++) {
//                         const attribute = attributes[i];
//                         const attributeValue = attribute.value;

//                         // Check if the attribute value contains the word "sticky"
//                         if (attributeValue && attributeValue === 'sticky') {
//                             // Remove the element
//                             element.remove();
//                             break; // Exit the loop once an attribute is found with the word "sticky"
//                         }
//                     }
//                 });

//                 for (let i = 0; i < allels.length; i++) {
//                     const el = allels[i];
//                     el.removeAttribute("style")
//                 }

//                 for (let i = 0; i < styles.length; i++) {
//                     const el = styles[i];
//                     el.remove()
//                 }
//                 for (let i = 0; i < links.length; i++) {
//                     const link = links[i];
//                     link.remove()
//                 }
//                 for (let i = 0; i < scripts.length; i++) {
//                     const link = scripts[i];
//                     link.remove()
//                 }
//                 for (let i = 0; i < headers.length; i++) {
//                     const header = headers[i];
//                     header.remove()
//                 }
//                 for (let i = 0; i < footers.length; i++) {
//                     const footer = footers[i];
//                     footer.remove()
//                 }
//             })

//             await page.addStyleTag({ path: 'public/main.css' })

//             // Add attribute to every element
//             await page.evaluate(async (mainStyles) => {
//                 const elements = document.querySelectorAll('*');
//                 for (const element of elements) {
//                     element.setAttribute('data-pf_style_display', 'block');
//                     element.setAttribute('data-pf_style_visibility', 'visible');
//                     element.setAttribute('orig-style', 'null');
//                 }
//                 const buttons = document.querySelectorAll('button');
//                 for (const button of buttons) {
//                     if (!button.querySelector('a') && (button.innerText.toLowerCase().includes("read more") || button.innerText.toLowerCase().includes("learn more") || button.innerText.toLowerCase().includes("more"))) {
//                         button.click();
//                     }
//                 }

//                 var allLinks = [];

//                 const links = document.querySelectorAll('a');
//                 console.log("all links =>", links);
//                 for (const link of links) {
//                     var bodyBaseURI = document.querySelector('body').baseURI.split("/")[2];

//                     if (!link.querySelector('a') && (link.innerText.toLowerCase().includes("read more") || link.innerText.toLowerCase().includes("learn more") || link.innerText.toLowerCase().includes("more"))) {
//                         if (link.getAttribute("href") && link.getAttribute("href").includes(bodyBaseURI.replace(/^(https?:\/\/)?(www\.)?/, '$1'))) {
//                             const allLinksFilter = await allLinks.filter(items => items === link.getAttribute("href"));
//                             console.log("links =>", allLinksFilter);
//                             if (!allLinksFilter.length) {
//                                 console.log("link.getAttribute(href) =>", link.getAttribute("href"));
//                                 var height = await test_newPage(link.getAttribute("href"))

//                                 console.log("height =>", height);

//                                 // Create the <iframe> element
//                                 var iframe = document.createElement("iframe");
//                                 iframe.src = link.getAttribute("href")
//                                 iframe.classList.add("pageBreakBefore")
//                                 iframe.width = "100%";
//                                 iframe.height = height;
//                                 iframe.frameBorder = "0"
//                                 iframe.scrolling = "no"


//                                 // Add event listener for iframe load event
//                                 iframe.addEventListener("load", function () {
//                                     // Access the <iframe> contentDocument
//                                     var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

//                                     // Remove the header element
//                                     var header = iframeDocument.querySelector("header"); // Replace "header" with the selector for your header element
//                                     if (header) {
//                                         header.parentNode.removeChild(header);
//                                     }

//                                     // Remove the footer element
//                                     var footer = iframeDocument.querySelector("footer"); // Replace "footer" with the selector for your footer element
//                                     if (footer) {
//                                         footer.parentNode.removeChild(footer);
//                                     }

//                                     // Remove elements with class including "header" or "footer"
//                                     var elements = iframeDocument.querySelectorAll("[class*='header'], [class*='footer']");
//                                     console.log("elements =>", elements);

//                                     elements.forEach(function (element) {
//                                         if (element.nodeName === "DIV" || element.nodeName === "SECTION") {
//                                             element.parentNode.removeChild(element);
//                                         }
//                                     });

//                                     const styleElement = iframeDocument.createElement('style');
//                                     styleElement.innerHTML = `${mainStyles}`;

//                                     iframeDocument.head.appendChild(styleElement);
//                                 });

//                                 console.log("iframe =>", iframe);

//                                 document.body.appendChild(iframe)
//                                 allLinks.push(link.getAttribute("href"))
//                             }
//                         }
//                     }
//                 }

//                 var body = await document.querySelector('body');
//                 body.classList.add("content-unmask")
//                 body.classList.add("cs-algo-iframe")
//                 body.classList.add("px-2")
//                 body.classList.add("px-sm-4")
//                 body.classList.add("px-md-5")
//                 body.classList.add("pt-2")
//                 body.classList.add("pt-sm-3")
//                 body.classList.add("direction-ltr")
//                 body.id = "pf-body"

//             }, mainStyles);

//             await page.waitForTimeout(2000)

//             // Add attribute to every element
//             await page.evaluate(async (mainStyles) => {
//                 return new Promise(async (resolve) => {
//                     const elements = document.querySelectorAll('*');

//                     var attri = false;

//                     for (const innerElement of elements) {
//                         for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
//                             if (atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
//                                 attri = true
//                             }
//                         }
//                     }


//                     setTimeout(async () => {
//                         if (attri === true) {
//                             for (const innerElement of elements) {
//                                 for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
//                                     if (atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
//                                         var elementHrefData = async () => {
//                                             if (innerElement.tagName === "A" && !innerElement.getAttribute("href").includes("https")) {
//                                                 console.log("The element is an anchor (<a>) element.");
//                                                 var parent = innerElement
//                                                 const loop = async () => {
//                                                     if (parent.offsetHeight < 500) {
//                                                         parent = await parent.parentElement
//                                                         loop()
//                                                     } else {
//                                                         console.log("element =>", innerElement)

//                                                         var timeEnd;

//                                                         // Select the target node (in this case, the <body> element)
//                                                         const observerLoop = async (i) => {
//                                                             setTimeout(() => {
//                                                                 var targetNode = parent;
//                                                                 console.log("count => ", i);

//                                                                 // Create a new instance of the MutationObserver
//                                                                 var observer = new MutationObserver(function (mutationsList, observer) {
//                                                                     // Iterate through the list of mutations
//                                                                     if (mutationsList) {
//                                                                         console.log("atts[i].nodeName =>", innerElement.parentElement);
//                                                                         clearTimeout(timeEnd);
//                                                                         observerLoop(i + 1);
//                                                                         observer.disconnect();
//                                                                     }
//                                                                 });

//                                                                 // Configuration options for the observer (e.g., which types of mutations to observe)
//                                                                 var observerConfig = { attributes: true, childList: true, subtree: true };

//                                                                 // Start observing the target node with the specified configuration
//                                                                 observer.observe(targetNode, observerConfig);

//                                                                 console.log("Click =>", parent);

//                                                                 var div1 = document.createElement("div");

//                                                                 div1.classList.add("pageBreakBefore")

//                                                                 // Create the <iframe> element
//                                                                 var iframe = document.createElement("iframe");

//                                                                 iframe.name = `addedIframe-${i}`
//                                                                 iframe.width = "100%";

//                                                                 iframe.height = parent.offsetHeight + 200;
//                                                                 iframe.frameBorder = "0"
//                                                                 iframe.scrolling = "no"


//                                                                 // Create the <div> element
//                                                                 var div2 = document.createElement("div");

//                                                                 // Set attributes for the <div>
//                                                                 div2.textContent = "This is a div element.";

//                                                                 // Copy the contents of the original <div> to the new <div> element
//                                                                 div2.innerHTML = parent.innerHTML;

//                                                                 // div2.style.pageBreakBefore = "always"

//                                                                 // Add event listener for iframe load event
//                                                                 iframe.addEventListener("load", function () {
//                                                                     // Access the <iframe> contentDocument
//                                                                     var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

//                                                                     iframeDocument.body.appendChild(div2);

//                                                                     // Remove the header element
//                                                                     var header = iframeDocument.querySelector("header"); // Replace "header" with the selector for your header element
//                                                                     if (header) {
//                                                                         header.parentNode.removeChild(header);
//                                                                     }

//                                                                     // Remove the footer element
//                                                                     var footer = iframeDocument.querySelector("footer"); // Replace "footer" with the selector for your footer element
//                                                                     if (footer) {
//                                                                         footer.parentNode.removeChild(footer);
//                                                                     }

//                                                                     // Remove elements with class including "header" or "footer"
//                                                                     var elements = iframeDocument.querySelectorAll("[class*='header'], [class*='footer']");
//                                                                     console.log("elements =>", elements);

//                                                                     elements.forEach(function (element) {
//                                                                         if (element.nodeName === "DIV" || element.nodeName === "SECTION") {
//                                                                             element.parentNode.removeChild(element);
//                                                                         }
//                                                                     });

//                                                                     const styleElement = iframeDocument.createElement('style');
//                                                                     styleElement.innerHTML = `${mainStyles}`;

//                                                                     iframeDocument.head.appendChild(styleElement);
//                                                                     timeEnd = setTimeout(() => {
//                                                                         console.log("Loop done");
//                                                                         return resolve()
//                                                                     }, 20000);
//                                                                 });

//                                                                 // Append the <iframe> element to the <body>
//                                                                 div1.appendChild(iframe);
//                                                                 document.body.appendChild(div1);

//                                                                 innerElement.click()
//                                                             }, 10000);
//                                                         }
//                                                         observerLoop(1)
//                                                     }
//                                                 }
//                                                 await loop()
//                                             } else {
//                                                 console.log("The element is not an anchor element.");
//                                                 return resolve()
//                                             }
//                                         }
//                                         elementHrefData()
//                                     }
//                                 }
//                             }
//                         } else if (attri === false) {
//                             return resolve()
//                         }
//                     }, 10000);
//                 });
//             }, mainStyles);

//             await page.waitForTimeout(2000)

//             await autoScroll(page);
//             await page.waitForTimeout(2000)
//             await checkSection(page)
//             let mainTag = await page.$("main")
//             if (mainTag) {
//                 await findSectionDivs(page, "main", 1, "parent")
//             } else {
//                 await findSectionDivs(page, "body", 1, "parent");
//             }
//             await checkImage(page)
//             await page.waitForTimeout(2000)
//             await page.emulateMediaType("print");
//             const pdf = await page.pdf({
//                 path: `pdfs/${fileName}.pdf`,
//                 margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//                 printBackground: true,
//                 displayHeaderFooter: true,
//                 format: "A4",
//                 scale: 0.5
//             });

//             await page.waitForTimeout(2000)
//             await removePage(fileName).catch((err) => console.log(err));
//             await page.waitForTimeout(2000)
//             await page.close();
//             console.log("Done");

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     await browser.close();
// }

// run();


// const checkImage = async (page) => {
//     let style = await page.$$eval("img", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             // const span = document.createElement("span")
//             // span.innerText = 'image'
//             // console.log("span", span);
//             // el.after(span);
//             // el.style.maxWidth = "500px"
//             // el.style.maxHeight = "500px"
//             const br = document.createElement("br")
//             el.parentElement.after(br)
//         }
//     })

//     // await page.waitForTimeout(300000)
// }


// const checkVideo = async (page) => {
//     let style = await page.$$eval("video", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             el.remove()
//         }
//     })

//     // await page.waitForTimeout(300000)
// }

// async function autoScroll(page) {
//     await page.evaluate(async () => {
//         await new Promise((resolve) => {
//             var totalHeight = 0;
//             var distance = 50;
//             var timer = setInterval(() => {
//                 var scrollHeight = document.body.scrollHeight;
//                 window.scrollBy(0, distance);
//                 totalHeight += distance;

//                 if (totalHeight >= scrollHeight - window.innerHeight) {
//                     clearInterval(timer);
//                     resolve();
//                 }
//             }, 100);
//         });
//     });
// }


// const checkSection = async (page) => {
//     let style = await page.$$eval("main", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             let width = el.offsetWidth
//             let height = el.offsetHeight
//             console.log(height);
//             el = el.parentElement
//             el.style.pageBreakAfter = "always"
//             el.style.pageBreakInside = "avoid";
//             el.style.marginTop = "160px"
//         }
//     })

//     // await page.waitForTimeout(300000)
// }

// const findSectionDivs = async (page, el, index, flag) => {
//     let classWithFlag = `mohitTestPDF_${flag}`
//     if (index < 6) {
//         let divtags = await page.$$(`${el} > div`)
//         // , (els) => {
//         //     let data = []
//         //     for (let i = 0; i < els.length; i++) {
//         //         const el = els[i];
//         //         console.log(el);
//         //         let cls = el.getAttribute("class")?.trim()
//         //         if (cls && cls.length) {
//         //             cls = cls.split(" ");
//         //             let parent = "";
//         //             for (let j = 0; j < cls.length; j++) {
//         //                 const el = cls[j];
//         //                 parent = parent + "." + el;
//         //             }
//         //             data.push(parent)
//         //         }
//         //         else {
//         //             let id = el.getAttribute('id')?.trim()
//         //             if (id) {
//         //                 data.push("#" + id)
//         //             }
//         //             else {
//         //                 data.push(null)
//         //             }
//         //         }
//         //     }
//         //     return data
//         // }

//         // );

//         if (divtags.length && divtags.length < 2) {
//             let previous = ""
//             for (let i = 0; i < divtags.length; i++) {
//                 let element = divtags[i];
//                 let classNameNew = ""
//                 const el = element;
//                 let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                 if (cls && cls.length) {
//                     cls = cls.split(" ");
//                     let parent = "";
//                     for (let j = 0; j < cls.length; j++) {
//                         const el = cls[j];
//                         parent = parent + "." + el;
//                     }
//                     classNameNew = parent
//                 }
//                 else {
//                     let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                     console.log("id ", id);
//                     if (id) {
//                         classNameNew = "#" + id
//                     }
//                     else {
//                         let cllass = "unique_Mohit_test_xyz" + i
//                         await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                         classNameNew = "." + cllass
//                     }
//                 }
//                 // await page.waitForTimeout(1200000)
//                 if (classNameNew != null) {
//                     findSectionDivs(page, classNameNew, index + 1, flag);
//                 } else if (previous) {
//                     console.log(previous);
//                     findSectionDivs(page, `${previous} > div > div`, index + 1, flag);
//                 }
//                 previous = classNameNew
//             }
//         } else if (divtags.length && divtags.length > 2) {
//             let style = "";
//             for (let k = 0; k < divtags.length; k++) {
//                 const el = divtags[k];
//                 let cllass = `${classWithFlag}_${k}`
//                 let x = el
//                 await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
//                 // el.classList.add(`${classWithFlag}_${k}`)
//                 style =
//                     style +
//                     `
//                 .${classWithFlag}_${k} {
//                     page-break-after: always; 
//                     margin-top: 50px; 
//                 }
//                 `;
//                 const pagesRequired = Math.ceil((await el.evaluate(x => x.offsetHeight) / 1122) / 2)
//                 if (pagesRequired > 1) {
//                     let classNameNew = ""
//                     let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                     if (cls && cls.length) {
//                         cls = cls.split(" ");
//                         let parent = "";
//                         for (let j = 0; j < cls.length; j++) {
//                             const el = cls[j];
//                             parent = parent + "." + el;
//                         }
//                         classNameNew = parent
//                     }
//                     else {
//                         let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                         if (id) {
//                             classNameNew = "#" + id
//                         }
//                         else {
//                             let cllass = "unique_Mohit_z" + i
//                             await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                             classNameNew = "." + cllass
//                         }
//                     }
//                     // console.log("test log =>");
//                     // secondLevelFindSections(page, classNameNew, 1, "justForTest", pagesRequired)
//                     // let breakIndex = await page.evaluate((el, pagesRequired) => {
//                     //     let children = el.childNodes
//                     //     let breakIndex = Math.ceil(children.length / pagesRequired)
//                     //     for (let i = breakIndex; i < children.length; i = i + breakIndex) {
//                     //         const element = children[i];
//                     //         element.style.pageBreakAfter = "always"
//                     //         element.style.marginTop = "50px"
//                     //     }
//                     //     return breakIndex
//                     // }, el, pagesRequired)
//                     // console.log("breakIndex => ", breakIndex);
//                 }

//             }
//             return await page.addStyleTag({
//                 content: `
//       @page {
//         size: A4;
//       }
//       ${style}
//       `,
//             });
//         }
//     }
//     else {
//         console.log("senasio => 2");
//         check2Div(page, "body")
//     }
// };

// const secondLevelFindSections = async (page, el, index, flag, pagesRequired) => {
//     // console.log("Pages =>", page, el, index, flag, pagesRequired);
//     let classWithFlag = `mohitPDF_${flag}`
//     if (index < 12) {
//         console.log("senasio => 1");
//         let divtags = await page.$$(`${el} > div`)
//         console.log("divtags-1 =>", divtags);
//         if (divtags.length && divtags.length < 2) {
//             console.log("senasio => 1.1");
//             let previous = ""
//             for (let i = 0; i < divtags.length; i++) {
//                 let element = divtags[i];
//                 let classNameNew = ""
//                 const el = element;
//                 console.log(el);
//                 let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                 console.log("cls ", cls);
//                 if (cls && cls.length) {
//                     cls = cls.split(" ");
//                     let parent = "";
//                     for (let j = 0; j < cls.length; j++) {
//                         const el = cls[j];
//                         parent = parent + "." + el;
//                     }
//                     classNameNew = parent
//                 }
//                 else {
//                     let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                     console.log("id ", id);
//                     if (id) {
//                         classNameNew = "#" + id
//                     }
//                     else {
//                         let cllass = "unique_Mohit_test_xyz" + i
//                         await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                         classNameNew = "." + cllass
//                     }
//                 }
//                 console.log(classNameNew);
//                 if (classNameNew != null) {
//                     secondLevelFindSections(page, classNameNew, index + 1, flag, pagesRequired);
//                 } else if (previous) {
//                     console.log(previous);
//                     secondLevelFindSections(page, `${previous} > div > div`, index + 1, flag, pagesRequired);
//                 }
//                 previous = classNameNew
//             }
//         } else if (divtags.length && divtags.length > 2) {
//             console.log("senasio => 1.2");
//             let el = divtags[0]
//             // for (let k = 0; k < divtags.length; k++) {
//             //     const el = divtags[k];
//             // let cllass = `${classWithFlag}_${k}`
//             // let x = el
//             // await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
//             // // el.classList.add(`${classWithFlag}_${k}`)
//             // style =
//             //     style +
//             //     `
//             // .${classWithFlag}_${k} {
//             //     page-break-after: always; 
//             //     margin-top: 50px; 
//             // }
//             // `;
//             let breakIndex = await page.evaluate((el, pagesRequired) => {
//                 console.log("parent =>", pagesRequired, el);
//                 let parent = el.parentElement
//                 let children = parent.childNodes
//                 let breakIndex = Math.ceil(children.length / pagesRequired)
//                 for (let i = breakIndex; i < children.length; i = i + breakIndex) {
//                     const element = children[i];
//                     element.style.pageBreakAfter = "always"
//                     element.style.marginTop = "50px"
//                 }
//                 return breakIndex
//             }, el, pagesRequired)
//             console.log("breakIndex => ", breakIndex);

//             // }
//             //         return await page.addStyleTag({
//             //             content: `
//             //   @page {
//             //     size: A4;
//             //   }
//             //   ${style}
//             //   `,
//             //         });
//         }
//     }
//     else {
//         console.log("senasio => 2");
//         check2Div(page, "body")
//     }
// };

// let check2Div = async (page, el) => {
//     let divtags = await page.$$eval(`${el} > div`, (els) => {
//         let data = []
//         for (let i = 0; i < els.length; i++) {
//             const el = els[i];
//             let cls = el.getAttribute("class")?.trim()
//             if (cls && cls.length) {
//                 cls = cls.split(" ");
//                 let parent = "";
//                 for (let j = 0; j < cls.length; j++) {
//                     const el = cls[j];
//                     parent = parent + "." + el;
//                 }
//                 data.push(parent)
//             }
//             else {
//                 let id = el.getAttribute('id')?.trim()
//                 if (id) {
//                     data.push("#" + id)
//                 }
//                 else {
//                     continue;
//                 }
//             }
//         }
//         return data
//     }

//     );
//     if (divtags.length && divtags.length < 1) {
//         console.log("senasio => 1.1");
//         for (let i = 0; i < divtags.length; i++) {
//             let element = divtags[i];
//             if (element) {
//                 check2Div(page, element);
//             } else {
//                 check2Div(page, `${el} > div > div`);
//             }
//         }
//     } else if (divtags.length && divtags.length > 2) {
//         console.log("senasio => 1.2");
//         let style = "";
//         for (let k = 0; k < divtags.length; k++) {
//             const el = divtags[k];
//             console.log((el && (el.includes(".") || el.includes("#"))))
//             if (el && (el.includes(".") || el.includes("#"))) {
//                 style =
//                     style +
//                     `
//         ${el} {
//           page-break-after: always; 
//           margin-top: 50px; 
//         }
//       `;
//             }
//         }

//         console.log("style => ", style);

//         return await page.addStyleTag({
//             content: `
//     @page {
//       size: A4;
//     }
//     ${style}
//     `,
//         });
//     }
// }

// async function checkRemovePopups(page) {
//     let style = await page.$$eval("*", els => {
//         var elems = els;
//         var len = elems.length
//         console.log(els);

//         for (var i = 0; i < len; i++) {
//             try {
//                 var computedStyle = window.getComputedStyle(elems[i], null);
//                 var tagName = elems[i].tagName.toLowerCase();

//                 if (tagName === "header") {
//                     // var headerValue = computedStyle.getPropertyValue("header");

//                     console.log("Computed header value:", computedStyle.getPropertyValue());
//                 } else if (window.getComputedStyle(elems[i], null).getPropertyValue('position') == 'fixed') {
//                     var classLoop1 = elems[i].id ? ["#" + elems[i].id] : elems[i].className.split(" ");
//                     // console.log(classLoop1)
//                     classLoop1 = classLoop1.filter(items => items !== "")
//                     classLoop1 = classLoop1.filter(items => items !== " ")

//                     if (elems[i].className.toLowerCase().includes("header") || elems[i].className.toLowerCase().includes("navbar")) {
//                         console.log("elems[i] true =>", elems[i], classLoop1)
//                     } else {
//                         var allData = classLoop1.map((items) => {
//                             return elems[i].id ? items : "." + items
//                         })
//                         // console.log("allData =>",allData)
//                         const parentElement = document.querySelector(allData.join(""));
//                         // console.log(parentElement)
//                         const nestedElements = parentElement.querySelectorAll("*");


//                         console.log("nestedElements.length =>", nestedElements)

//                         if (nestedElements.length) {
//                             // Iterate over each nested element and log its class names
//                             for (const element of nestedElements) {
//                                 var classNames = Array.from(element.classList);
//                                 if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                                     // console.log("elems[i] false =>", elems[i], classLoop1)
//                                     elems[i].remove();
//                                     break;
//                                     // return;
//                                 }
//                             };
//                         } else if (parentElement) {
//                             var classNames = Array.from(nestedElements.classList);
//                             // console.log("classNames =>", classNames)
//                             if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                                 console.log("elems[i] false =>", elems[i], classLoop1)
//                                 elems[i].remove();
//                             }
//                         }
//                     }
//                 }
//             } catch (error) {
//                 // console.log(error)
//             }
//         }
//     })
// }

// async function removePage(filePath) {
//     const { writeFileSync, readFileSync } = require("fs");
//     const { PDFDocument } = require("pdf-lib");
//     const pdf = require('pdf-parse');

//     const dataBuffer = readFileSync(`pdfs/${filePath}.pdf`);
//     const letters = await PDFDocument.load(readFileSync(`pdfs/${filePath}.pdf`));

//     await pdf(dataBuffer).then(async function (data) {
//         const pages = data.text.split('\n\n'); // Split the text by page

//         var num = 1
//         for (let i = 0; i < pages.length; i++) {
//             // Get the text of the desired page
//             const desiredPageText = pages[i];

//             // console.log("desiredPageText =>", desiredPageText);


//             if (!desiredPageText && i !== 0) {
//                 console.log(` `);
//                 console.log(`Text of page ${num}:`);
//                 console.log(desiredPageText);
//                 await letters.removePage(i - num);
//                 num = num + 1
//             }
//         }
//         writeFileSync(`pdfs_test/${filePath}_test.pdf`, await letters.save());
//     }).catch(function (error) {
//         console.log('An error occurred:', error);
//     });

// }
// // *************************************************************************************************************** */

// // 22-06-2023 - 03-07-2023 Internal, External & Inline css change *************************************************************************************************************** */

// const puppeteer = require('puppeteer');

// async function run() {

//     const customArgs = [
//         "--start-maximized",
//         "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
//     ];

//     let browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: null,
//         executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//         ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//         args: customArgs,
//     });


//     // const allUrls = ["https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
//     const allUrls = ["https://humbleandfume.com/"]

//     for (let i = 0; i < allUrls.length; i++) {
//         try {
//             const url = allUrls[i];
//             const URL = url;
//             const fileName = URL.split("/")[2]
//             let page = await browser.newPage();

//             await page.goto(URL, { waitUntil: "networkidle0" });

//             // await page.waitForTimeout(30000)


//             async function test_cssPage(link) {
//                 let pageInternal = await browser.newPage();

//                 await pageInternal.goto(link, { timeout: 0 });
//                 console.log("Getting in");

//                 await pageInternal.waitForTimeout(2000)

//                 const offsetHeight = await pageInternal.evaluate(() => {
//                     const body = document.querySelector("pre");
//                     console.log("body =>", body);
//                     return body.innerText;
//                 });


//                 await pageInternal.close();

//                 return offsetHeight;
//             }

//             await page.exposeFunction("test_cssPage", test_cssPage);


//             await page.evaluate(async () => {

//                 let styles = document.querySelectorAll('style')

//                 for (let i = 0; i < styles.length; i++) {
//                     const el = styles[i];
//                     styles[i].remove()
//                     document.head.appendChild(el)
//                 }

//                 let links = document.querySelectorAll("link")

//                 var flag = 1

//                 for (let i = 0; i < links.length; i++) {
//                     if (links[i].rel === "stylesheet") {
//                         var body = await test_cssPage(links[i].getAttribute("href"))
//                         const styleElement = document.createElement('style');
//                         styleElement.innerHTML = `${body}`;
//                         document.head.appendChild(styleElement);
//                         console.log("body =>", styleElement);
//                         // setTimeout(() => {
//                         links[i].remove()
//                         flag = flag + 1
//                         // }, 2000);
//                     } else {
//                         links[i].remove()
//                     }
//                 }
//             })


//             await page.waitForTimeout(10000)


//             await page.evaluate(() => {
//                 let allels = document.querySelectorAll("*[style]");
//                 // let links = document.querySelectorAll("link")
//                 let scripts = document.querySelectorAll('script')


//                 for (let i = 0; i < scripts.length; i++) {
//                     const link = scripts[i];
//                     link.remove()
//                 }

//                 for (let i = 0; i < allels.length; i++) {
//                     const el = allels[i];
//                     // console.log(el)
//                     for (let r = 0; r < el.style.length; r++) {
//                         const element = el.style[r];
//                         // console.log("el.style.display =>", el.style.display);
//                         if (
//                             element !== "flex-display" &&
//                             element !== "flex-direction" &&
//                             element !== "flex-wrap" &&
//                             element !== "flex-flow" &&
//                             element !== "justify-content" &&
//                             element !== "align-items" &&
//                             element !== "gap" &&
//                             element !== "row-gap" &&
//                             element !== "column-gap" &&
//                             !element.includes("margin") &&
//                             !element.includes("padding")
//                         ) {
//                             // console.log("margin" ,element.includes("margin"));
//                             // console.log("element =>", element, el.style[`${element}`])
//                             el.style[`${element}`] = ""
//                         } else if (
//                             el.style.display !== "grid" &&
//                             el.style.display !== "flex" &&
//                             el.style.display !== "inline" &&
//                             el.style.display !== "inline-block"
//                         ) {
//                             // console.log("element =>", element, el.style[`${element}`])
//                             el.style[`${element}`] = ""
//                         }
//                     }
//                 }

//                 var allClasses = [];

//                 var allElements = document.querySelectorAll('*');

//                 const allowedProperties = [
//                     'flex-direction',
//                     'flex-wrap',
//                     'flex-flow',
//                     'justify-content',
//                     'align-items',
//                     'gap',
//                     'row-gap',
//                     'column-gap',

//                     'margin',
//                     'margin-top',
//                     'margin-bottom',
//                     'margin-right',
//                     'margin-left',

//                     'padding',
//                     'padding-top',
//                     'padding-bottom',
//                     'padding-right',
//                     'padding-left',
//                     'display'
//                 ];

//                 const allowedDisplayValues = [
//                     'flex',
//                     'grid',
//                     'inline',
//                     'inline-block'
//                 ];


//                 const styleSheetList = document.styleSheets;

//                 const newStyleElement = document.createElement('style');

//                 console.log("styleSheetList.length =>", styleSheetList.length);

//                 for (let i = 0; i < styleSheetList.length; i++) {
//                     const styleSheet = styleSheetList[i];

//                     const rules = styleSheet.cssRules || styleSheet.rules; // Handle different browser compatibility

//                     for (let j = 0; j < rules.length; j++) {
//                         const rule = rules[j];

//                         // Check if the rule is a CSSStyleRule and not a CSSImportRule or other type of rule
//                         if (rule instanceof CSSStyleRule) {
//                             const { style } = rule;

//                             // Remove properties that are not in the allowed list
//                             for (let k = style.length - 1; k >= 0; k--) {
//                                 const property = style[k];

//                                 if (!allowedProperties.includes(property)) {
//                                     style.removeProperty(property);
//                                 }
//                             }

//                             // Check display property and remove if not in allowed display values
//                             const display = style.getPropertyValue('display');
//                             if (!allowedDisplayValues.includes(display)) {
//                                 style.removeProperty('display');
//                             }

//                             // Append the modified rule to the new style element
//                             newStyleElement.appendChild(
//                                 document.createTextNode(`${rule.selectorText} { ${style.cssText} }`)
//                             );
//                         }
//                     }
//                 }
//                 document.head.appendChild(newStyleElement);

//                 setTimeout(() => {
//                     let styles = document.querySelectorAll('style')

//                     for (let i = 0; i < styles.length - 1; i++) {
//                         const el = styles[i];
//                         el.remove()
//                     }
//                     // document.addEventListener('DOMContentLoaded', function () {
//                     //     const styleSheetList = document.styleSheets;
//                     //     const numStyleSheets = styleSheetList.length;

//                     //     for (let i = 0; i < numStyleSheets - 1; i++) {
//                     //         styleSheetList[i].disabled = true;
//                     //         styleSheetList[i].ownerNode.remove();
//                     //     }
//                     // });
//                 }, 1000);
//             })
//             await page.waitForTimeout(30000)
//             await page.emulateMediaType("print");
//             // const pdf = await page.pdf({
//             //     path: `pdfs/${fileName}.pdf`,
//             //     margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//             //     printBackground: true,
//             //     displayHeaderFooter: true,
//             //     format: "A4",
//             //     scale: 0.5
//             // });

//             await page.waitForTimeout(2000)
//             // await page.close();
//             console.log("Done");

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     // await browser.close();
// }

// run();
// //*************************************************************************************************************** */


// // 03-07-2023 old code with styles merge *************************************************************************************************************** */
// const puppeteer = require('puppeteer');
// const fs = require('fs');

// async function run() {

//     const customArgs = [
//         "--start-maximized",
//         "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
//     ];

//     let browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: null,
//         protocolTimeout: 1200000,
//         executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//         ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//         args: customArgs,
//     });


//     // // "Single page toggle sections"
//     // const allUrls = [
//     //     "https://investor.marketaxess.com/governance/executive-management/default.aspx",
//     //     "https://investors.paycom.com/Corporate-Governance/Board-of-Directors/default.aspx",
//     //     "https://investors.principal.com/investor-relations/our-business/leadership/senior-management-bios/default.aspx",
//     //     "https://investor.marketaxess.com/governance/board-of-directors/default.aspx",
//     //     "https://investors.principal.com/investor-relations/our-business/leadership/board-of-director-bios/default.aspx",
//     //     "https://ir.maac.com/overview/directors-and-management/default.aspx",
//     //     "https://ir.mtch.com/corporate-governance/board-of-directors/default.aspx",
//     //     "https://ir.questdiagnostics.com/governance/management-team/default.aspx",
//     //     "https://ir.questdiagnostics.com/governance/board-of-directors/default.aspx",
//     //     "https://ir.dish.com/corporate-governance/board-of-directors",
//     //     "https://investor.dollargeneral.com/websites/dollargeneral/English/4000/management-team.html",
//     //     "https://investor.dollargeneral.com/websites/dollargeneral/English/5100/board-of-directors.html",
//     //     "https://ir.ea.com/corporate-governance/board-of-directors/default.aspx",
//     //     "https://investors.eastman.com/governance/board-of-directors/default.aspx",
//     //     "https://www.elcompanies.com/en/investors/corporate-governance/board-of-directors",
//     //     "https://investors.equityapartments.com/overview/officers-and-trustees/default.aspx",
//     //     "https://investors.essexapartmenthomes.com/corporate-information/officers-directors/default.aspx",
//     //     "https://investors.etsy.com/governance/board-of-directors/default.aspx",
//     //     "https://investor.expeditors.com/corporate-governance/board-of-directors-and-board-diversity-matrix",
//     //     "https://investor.fastenal.com/governance/management/default.aspx",
//     //     "https://investor.fastenal.com/governance/board-of-directors/default.aspx",
//     //     "https://investors.fedex.com/esg/board-of-directors/default.aspx",
//     //     "https://investor.marketaxess.com/governance/executive-management/default.aspx",
//     //     "https://investor.marketaxess.com/governance/board-of-directors/default.aspx",
//     //     "https://www.mastercard.com/news/press/executive-bios/",
//     //     "https://ir.mtch.com/corporate-governance/board-of-directors/default.aspx",
//     //     "https://www.metlife.com/about-us/corporate-governance/board-of-directors/",
//     //     "https://www.monolithicpower.com/en/about-mps/investor-relations/corporate-governance/management.html"
//     // ]

//     // "Single Page content popups"
//     const allUrls = [
//         "https://about.netflix.com/en/leadership",
//         "https://about.nike.com/en/company",
//         "https://esg.revvity.com/governance/",
//         "https://investor.phillips66.com/corporate-governance/",
//         "https://mtch.com/leadership",
//         "https://newscorp.com/news-corp-leadership/",
//         "https://nucor.com/leadership",
//         "https://www.ea.com/executives",
//         "https://www.ebayinc.com/company/our-leaders/",
//         "https://investors.ebayinc.com/corporate-governance/board-of-directors/default.aspx",
//         "https://www.eogresources.com/company/board-of-directors/",
//         "https://www.eogresources.com/company/leadership/",
//         "https://ir.edwards.com/governance-sustainability/governance/board-of-directors/default.aspx",
//         "https://www.exeloncorp.com/leadership-and-governance/executive-profiles",
//         "https://www.exeloncorp.com/leadership-and-governance/board-of-directors",
//         "https://www.expediagroup.com/who-we-are/leadership/default.aspx",
//         "https://www.expeditors.com/about-us/leadership",
//         "https://www.marathonpetroleum.com/About/Leadership/",
//         "https://www.marathonpetroleum.com/About/Board-of-Directors/",
//         "https://www.marshmclennan.com/about/leadership.html"
//     ]

//     // // "Click Next scenarios"
//     // const allUrls = [
//     //     "https://investors.paycom.com/corporate-governance/management/default.aspx",
//     //     "https://mohawkind.com/about/leadership.php",
//     //     "https://www.discover.com/company/our-company/meet-the-team/board-of-directors/",
//     //     "https://www.marshmclennan.com/about/leadership.html"
//     // ]

//     // // "Read more scenarios"
//     // const allUrls = [
//     //     "https://www.pmi.com/our-leadership-team",
//     //     "https://www.dishtv.in/Pages/AboutUs/Top-Management-Profiles.aspx",
//     //     "https://corporate.dollartree.com/about/leadership/executive-leadership",
//     //     "https://corporate.dollartree.com/about/leadership/board-of-directors",
//     //     "https://biz.dominos.com/about-us/leadership/",
//     //     "https://investors.dow.com/en/corporate-governance/board-of-directors/default.aspx",
//     //     "https://www.dupont.com/about/leadership.html",
//     //     "https://dxc.com/us/en/about-us/leadership-and-governance",
//     //     "https://www.eastman.com/en/who-we-are/our-organization/leadership",
//     //     "https://www.ecolab.com/about/leadership",
//     //     "https://www.elcompanies.com/en/investors/corporate-governance/executive-officers",
//     //     "https://www.equifax.com/about-equifax/leadership/",
//     //     "https://investors.evergy.com/about-evergy/leadership-team",
//     //     "https://www.factset.com/our-company/our-leadership",
//     //     "https://investor.factset.com/corporate-governance/board-of-directors",
//     //     "https://www.marathonpetroleum.com/About/Leadership/",
//     //     "https://www.marathonpetroleum.com/About/Board-of-Directors/"
//     // ]

//     // // "On hover content"
//     // const allUrls = []

//     // // "Pagination"
//     // const allUrls = [
//     //     "https://investors.epam.com/investors/leadership-and-governance"
//     // ]

//     // // "Input questionaries"
//     // const allUrls = [
//     //     "https://www.elcompanies.com/en/investors/corporate-governance/board-of-directors",
//     //     "https://www.fedex.com/en-us/about/leadership.html"
//     // ]

//     // const allUrls = ["https://www.pixium-vision.com/board-of-directors-2/", "https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
//     // const allUrls = ["https://www.brookfieldproperties.com/en/who-we-are/leadership.html"]

//     for (let i = 0; i < allUrls.length; i++) {
//         try {
//             const url = allUrls[i];
//             const URL = url;
//             console.log("URL =>", URL);
//             var fileName = URL.split("/")
//             fileName = fileName.splice(2, fileName.length)
//             fileName = fileName.join("_")
//             console.log("fileName =>", fileName);
//             let page = await browser.newPage();
//             await page.setDefaultTimeout(0)
//             await page.setDefaultNavigationTimeout(0)

//             await page.goto(URL, { waitUntil: "networkidle0", timeout: 0 });

//             await checkVideo(page)

//             await page.waitForTimeout(5000)

//             async function test_cssPage(link) {
//                 let pageInternal = await browser.newPage();
//                 try {
//                     await pageInternal.goto(link, { timeout: 0 });
//                     console.log("Getting in =>", link);

//                     await pageInternal.waitForTimeout(2000)

//                     const offsetHeight = await pageInternal.evaluate(() => {
//                         const body = document.querySelector("pre");
//                         console.log("body =>", body);
//                         return body.innerText;
//                     });

//                     await pageInternal.close();

//                     return offsetHeight;
//                 } catch (error) {
//                     console.log("Error =>", error);
//                     await pageInternal.close();
//                     return null
//                 }
//             }

//             await page.exposeFunction("test_cssPage", test_cssPage);

//             async function test_newPage(link) {
//                 let pageInternal = await browser.newPage();
//                 try {

//                     await pageInternal.goto(link, { timeout: 0 });
//                     console.log("Getting in");

//                     await pageInternal.waitForTimeout(5000)
//                     await autoScroll(pageInternal);

//                     const offsetHeight = await pageInternal.evaluate(() => {
//                         const body = document.body;
//                         console.log("offsetHeight =>", body);
//                         return body.offsetHeight;
//                     });

//                     await pageInternal.close();

//                     return offsetHeight;

//                 } catch (error) {
//                     console.log("Error =>", error);
//                     await pageInternal.close();
//                     return ""
//                 }
//             }

//             await page.exposeFunction("test_newPage", test_newPage);

//             var mainStyles;
//             await fs.readFile('public/main.css', 'utf8', (err, data) => {
//                 return new Promise(async (resolve) => {
//                     if (err) {
//                         console.error(err);
//                         return;
//                     }

//                     // Parse the CSS file to extract the classes
//                     const classes = data;
//                     mainStyles = classes
//                     resolve();
//                 })
//             });

//             await page.evaluate(async () => {

//                 let styles = document.querySelectorAll('style')

//                 for (let i = 0; i < styles.length; i++) {
//                     const el = styles[i];
//                     styles[i].remove()
//                     document.head.appendChild(el)
//                 }

//                 let links = document.querySelectorAll("link")

//                 console.log(links);

//                 for (let i = 0; i < links.length; i++) {
//                     if (links[i].rel && links[i].rel === "stylesheet" && links[i].getAttribute("href").includes("https")) {

//                         var body = await test_cssPage(links[i].getAttribute("href"))
//                         const styleElement = document.createElement('style');
//                         styleElement.innerHTML = `${body}`;
//                         document.head.appendChild(styleElement);
//                         console.log("body =>", styleElement);
//                         links[i].remove()
//                     } else {
//                         links[i].remove()
//                     }
//                 }
//             })

//             await page.evaluate(() => {
//                 let allelss = document.querySelectorAll("*")
//                 let scripts = document.querySelectorAll('script')
//                 let headers = document.querySelectorAll('header')
//                 let footers = document.querySelectorAll('footer')


//                 // Loop through each element
//                 allelss.forEach(element => {
//                     // Get all attributes of the element
//                     const attributes = element.attributes;

//                     // Loop through each attribute
//                     for (let i = 0; i < attributes.length; i++) {
//                         const attribute = attributes[i];
//                         const attributeValue = attribute.value;

//                         // Check if the attribute value contains the word "sticky"
//                         if (attributeValue && attributeValue === 'sticky') {
//                             // Remove the element
//                             element.remove();
//                             break; // Exit the loop once an attribute is found with the word "sticky"
//                         }
//                     }
//                 });

//                 for (let i = 0; i < scripts.length; i++) {
//                     const link = scripts[i];
//                     link.remove()
//                 }
//                 for (let i = 0; i < headers.length; i++) {
//                     const header = headers[i];
//                     header.remove()
//                 }
//                 for (let i = 0; i < footers.length; i++) {
//                     const footer = footers[i];
//                     footer.remove()
//                 }

//                 let allels = document.querySelectorAll("*[style]");

//                 for (let i = 0; i < allels.length; i++) {
//                     const el = allels[i];
//                     // console.log(el)
//                     for (let r = 0; r < el.style.length; r++) {
//                         const element = el.style[r];
//                         // console.log("el.style.display =>", el.style.display);
//                         if (
//                             element !== "flex-display" &&
//                             element !== "flex-direction" &&
//                             element !== "flex-wrap" &&
//                             element !== "flex-flow" &&
//                             element !== "justify-content" &&
//                             element !== "align-items" &&
//                             element !== "gap" &&
//                             element !== "row-gap" &&
//                             element !== "column-gap" &&
//                             !element.includes("margin") &&
//                             !element.includes("padding")
//                         ) {
//                             el.style[`${element}`] = ""
//                         } else if (
//                             el.style.display !== "grid" &&
//                             el.style.display !== "flex" &&
//                             el.style.display !== "inline" &&
//                             el.style.display !== "inline-block"
//                         ) {
//                             el.style[`${element}`] = ""
//                         }
//                     }
//                 }


//                 const allowedProperties = [
//                     'flex-direction',
//                     'flex-wrap',
//                     'flex-flow',
//                     'justify-content',
//                     'align-items',
//                     'gap',
//                     'row-gap',
//                     'column-gap',

//                     'margin',
//                     'margin-top',
//                     'margin-bottom',
//                     'margin-right',
//                     'margin-left',

//                     'padding',
//                     'padding-top',
//                     'padding-bottom',
//                     'padding-right',
//                     'padding-left',
//                     'display'
//                 ];

//                 const allowedDisplayValues = [
//                     'flex',
//                     'grid',
//                     'inline',
//                     'inline-block'
//                 ];


//                 const styleSheetList = document.styleSheets;

//                 const newStyleElement = document.createElement('style');

//                 console.log("styleSheetList.length =>", styleSheetList.length);

//                 for (let i = 0; i < styleSheetList.length; i++) {
//                     const styleSheet = styleSheetList[i];

//                     const rules = styleSheet.cssRules || styleSheet.rules; // Handle different browser compatibility

//                     for (let j = 0; j < rules.length; j++) {
//                         const rule = rules[j];

//                         // Check if the rule is a CSSStyleRule and not a CSSImportRule or other type of rule
//                         if (rule instanceof CSSStyleRule) {
//                             const { style } = rule;

//                             // Remove properties that are not in the allowed list
//                             for (let k = style.length - 1; k >= 0; k--) {
//                                 const property = style[k];

//                                 if (!allowedProperties.includes(property)) {
//                                     style.removeProperty(property);
//                                 }
//                             }

//                             // Check display property and remove if not in allowed display values
//                             const display = style.getPropertyValue('display');
//                             if (!allowedDisplayValues.includes(display)) {
//                                 style.removeProperty('display');
//                             }

//                             // Append the modified rule to the new style element
//                             newStyleElement.appendChild(
//                                 document.createTextNode(`${rule.selectorText} { ${style.cssText} }`)
//                             );
//                         }
//                     }
//                 }
//                 document.head.appendChild(newStyleElement);

//                 setTimeout(() => {
//                     let styles = document.querySelectorAll('style')

//                     for (let i = 0; i < styles.length - 1; i++) {
//                         const el = styles[i];
//                         el.remove()
//                     }
//                 }, 1000);
//             })

//             await page.addStyleTag({ path: 'public/main.css' })

//             // Add attribute to every element
//             await page.evaluate(async (mainStyles) => {
//                 const elements = document.querySelectorAll('*');
//                 for (const element of elements) {
//                     element.setAttribute('data-pf_style_display', 'block');
//                     element.setAttribute('data-pf_style_visibility', 'visible');
//                     element.setAttribute('orig-style', 'null');
//                 }
//                 const buttons = document.querySelectorAll('button');
//                 for (const button of buttons) {
//                     if (!button.querySelector('a') && (button.innerText.toLowerCase().includes("read more") || button.innerText.toLowerCase().includes("learn more") || button.innerText.toLowerCase().includes("more"))) {
//                         button.click();
//                     }
//                 }

//                 var allLinks = [];

//                 const links = document.querySelectorAll('a');
//                 console.log("all links =>", links);
//                 for (const link of links) {
//                     var bodyBaseURI = document.querySelector('body').baseURI.split("/")[2];

//                     if (!link.querySelector('a') && (link.innerText.toLowerCase().includes("read more") || link.innerText.toLowerCase().includes("learn more") || link.innerText.toLowerCase().includes("more"))) {
//                         if (link.getAttribute("href") && link.getAttribute("href").includes(bodyBaseURI.replace(/^(https?:\/\/)?(www\.)?/, '$1'))) {
//                             const allLinksFilter = await allLinks.filter(items => items === link.getAttribute("href"));
//                             console.log("links =>", allLinksFilter);
//                             if (!allLinksFilter.length) {
//                                 console.log("link.getAttribute(href) =>", link.getAttribute("href"));
//                                 var height = await test_newPage(link.getAttribute("href"))

//                                 console.log("height =>", height);

//                                 // Create the <iframe> element
//                                 var iframe = document.createElement("iframe");
//                                 iframe.src = link.getAttribute("href")
//                                 iframe.classList.add("pageBreakBefore")
//                                 iframe.width = "100%";
//                                 iframe.height = height;
//                                 iframe.style.marginTop = "20px"
//                                 iframe.frameBorder = "0"
//                                 iframe.scrolling = "no"


//                                 // Add event listener for iframe load event
//                                 iframe.addEventListener("load", function () {
//                                     // Access the <iframe> contentDocument
//                                     var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

//                                     // Remove the header element
//                                     var header = iframeDocument.querySelector("header"); // Replace "header" with the selector for your header element
//                                     if (header) {
//                                         header.parentNode.removeChild(header);
//                                     }

//                                     // Remove the footer element
//                                     var footer = iframeDocument.querySelector("footer"); // Replace "footer" with the selector for your footer element
//                                     if (footer) {
//                                         footer.parentNode.removeChild(footer);
//                                     }

//                                     // Remove elements with class including "header" or "footer"
//                                     var elements = iframeDocument.querySelectorAll("[class*='header'], [class*='footer']");
//                                     console.log("elements =>", elements);

//                                     elements.forEach(function (element) {
//                                         if (element.nodeName === "DIV" || element.nodeName === "SECTION") {
//                                             element.parentNode.removeChild(element);
//                                         }
//                                     });

//                                     const styleElement = iframeDocument.createElement('style');
//                                     styleElement.innerHTML = `${mainStyles}`;

//                                     iframeDocument.head.appendChild(styleElement);
//                                 });

//                                 console.log("iframe =>", iframe);

//                                 document.body.appendChild(iframe)
//                                 allLinks.push(link.getAttribute("href"))
//                             }
//                         }
//                     }
//                 }

//                 var body = await document.querySelector('body');
//                 body.classList.add("content-unmask")
//                 body.classList.add("cs-algo-iframe")
//                 body.classList.add("px-2")
//                 body.classList.add("px-sm-4")
//                 body.classList.add("px-md-5")
//                 body.classList.add("pt-2")
//                 body.classList.add("pt-sm-3")
//                 body.classList.add("direction-ltr")
//                 body.id = "pf-body"

//             }, mainStyles);

//             await page.waitForTimeout(2000)

//             // Add attribute to every element
//             await page.evaluate(async (mainStyles) => {
//                 return new Promise(async (resolve) => {
//                     const elements = document.querySelectorAll('*');

//                     var attri = false;

//                     for (const innerElement of elements) {
//                         for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
//                             if (atts[i].nodeValue.toLocaleLowerCase() === "next" || atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
//                                 attri = true
//                             }
//                         }
//                     }


//                     setTimeout(async () => {
//                         if (attri === true) {
//                             for (const innerElement of elements) {
//                                 for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
//                                     if (atts[i].nodeValue.toLocaleLowerCase() === "next" || atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
//                                         if (innerElement.href && !innerElement.href.toLocaleLowerCase().includes("https")) {
//                                             console.log("atts[i].nodeValue.toLocaleLowerCase() =>", innerElement.href.toLocaleLowerCase().includes("https"));
//                                             var elementHrefData = async () => {
//                                                 if (innerElement.tagName === "A" && !innerElement.getAttribute("href").includes("https")) {
//                                                     console.log("The element is an anchor (<a>) element.");
//                                                     var parent = innerElement
//                                                     const loop = async () => {
//                                                         if (parent.offsetHeight < 500) {
//                                                             parent = await parent.parentElement
//                                                             loop()
//                                                         } else {
//                                                             console.log("element =>", innerElement)

//                                                             var timeEnd;

//                                                             // Select the target node (in this case, the <body> element)
//                                                             const observerLoop = async (i) => {
//                                                                 setTimeout(() => {
//                                                                     var targetNode = parent;
//                                                                     console.log("count => ", i);

//                                                                     // Create a new instance of the MutationObserver
//                                                                     var observer = new MutationObserver(function (mutationsList, observer) {
//                                                                         // Iterate through the list of mutations
//                                                                         if (mutationsList) {
//                                                                             console.log("atts[i].nodeName =>", innerElement.parentElement);
//                                                                             clearTimeout(timeEnd);
//                                                                             observerLoop(i + 1);
//                                                                             observer.disconnect();
//                                                                         }
//                                                                     });

//                                                                     // Configuration options for the observer (e.g., which types of mutations to observe)
//                                                                     var observerConfig = { attributes: true, childList: true, subtree: true };

//                                                                     // Start observing the target node with the specified configuration
//                                                                     observer.observe(targetNode, observerConfig);

//                                                                     console.log("Click =>", parent);

//                                                                     var div1 = document.createElement("div");

//                                                                     div1.classList.add("pageBreakBefore")

//                                                                     // Create the <iframe> element
//                                                                     var iframe = document.createElement("iframe");

//                                                                     iframe.name = `addedIframe-${i}`
//                                                                     iframe.width = "100%";
//                                                                     iframe.style.marginTop = "20px"

//                                                                     iframe.height = parent.offsetHeight + 200;
//                                                                     iframe.frameBorder = "0"
//                                                                     iframe.scrolling = "no"


//                                                                     // Create the <div> element
//                                                                     var div2 = document.createElement("div");

//                                                                     // Set attributes for the <div>
//                                                                     div2.textContent = "This is a div element.";

//                                                                     // Copy the contents of the original <div> to the new <div> element
//                                                                     div2.innerHTML = parent.innerHTML;

//                                                                     // div2.style.pageBreakBefore = "always"

//                                                                     // Add event listener for iframe load event
//                                                                     iframe.addEventListener("load", function () {
//                                                                         // Access the <iframe> contentDocument
//                                                                         var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

//                                                                         iframeDocument.body.appendChild(div2);

//                                                                         // Remove the header element
//                                                                         var header = iframeDocument.querySelector("header"); // Replace "header" with the selector for your header element
//                                                                         if (header) {
//                                                                             header.parentNode.removeChild(header);
//                                                                         }

//                                                                         // Remove the footer element
//                                                                         var footer = iframeDocument.querySelector("footer"); // Replace "footer" with the selector for your footer element
//                                                                         if (footer) {
//                                                                             footer.parentNode.removeChild(footer);
//                                                                         }

//                                                                         // Remove elements with class including "header" or "footer"
//                                                                         var elements = iframeDocument.querySelectorAll("[class*='header'], [class*='footer']");
//                                                                         console.log("elements =>", elements);

//                                                                         elements.forEach(function (element) {
//                                                                             if (element.nodeName === "DIV" || element.nodeName === "SECTION") {
//                                                                                 element.parentNode.removeChild(element);
//                                                                             }
//                                                                         });

//                                                                         const styleElement = iframeDocument.createElement('style');
//                                                                         styleElement.innerHTML = `${mainStyles}`;

//                                                                         iframeDocument.head.appendChild(styleElement);
//                                                                         timeEnd = setTimeout(() => {
//                                                                             console.log("Loop done");
//                                                                             return resolve()
//                                                                         }, 20000);
//                                                                     });

//                                                                     // Append the <iframe> element to the <body>
//                                                                     div1.appendChild(iframe);
//                                                                     document.body.appendChild(div1);

//                                                                     innerElement.click()
//                                                                 }, 10000);
//                                                             }
//                                                             observerLoop(1)
//                                                         }
//                                                     }
//                                                     await loop()
//                                                 } else {
//                                                     console.log("The element is not an anchor element.");
//                                                     return resolve()
//                                                 }
//                                             }
//                                             elementHrefData()
//                                         } else {
//                                             return resolve()
//                                         }
//                                     }
//                                 }
//                             }
//                         } else if (attri === false) {
//                             return resolve()
//                         }
//                     }, 10000);
//                 });
//             }, mainStyles);

//             await page.waitForTimeout(2000)

//             await autoScroll(page);
//             await page.waitForTimeout(2000)
//             await checkSection(page)
//             let mainTag = await page.$("main")
//             if (mainTag) {
//                 await findSectionDivs(page, "main", 1, "parent")
//             } else {
//                 await findSectionDivs(page, "body", 1, "parent");
//             }
//             await checkImage(page)
//             await page.waitForTimeout(5000)
//             await page.emulateMediaType("print");
//             await page.pdf({
//                 path: `pdfs/${fileName}.pdf`,
//                 margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//                 printBackground: true,
//                 displayHeaderFooter: false,
//                 format: "A4",
//                 scale: 0.3
//             });

//             await page.waitForTimeout(2000)
//             await removePage(fileName).catch((err) => console.log(err));
//             await page.waitForTimeout(2000)
//             await page.close();
//             console.log("Done");

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     await browser.close();
// }

// run();


// const checkImage = async (page) => {
//     let style = await page.$$eval("img", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             // const span = document.createElement("span")
//             // span.innerText = 'image'
//             // console.log("span", span);
//             // el.after(span);
//             // el.style.maxWidth = "500px"
//             // el.style.maxHeight = "500px"
//             // const br = document.createElement("br")
//             // el.parentElement.after(br)
//         }
//     })

//     // await page.waitForTimeout(300000)
// }


// const checkVideo = async (page) => {
//     let style = await page.$$eval("video", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             el.remove()
//         }
//     })

//     // await page.waitForTimeout(300000)
// }

// async function autoScroll(page) {
//     await page.evaluate(async () => {
//         await new Promise((resolve) => {
//             var totalHeight = 0;
//             var distance = 50;
//             var timer = setInterval(() => {
//                 var scrollHeight = document.body.scrollHeight;
//                 window.scrollBy(0, distance);
//                 totalHeight += distance;

//                 if (totalHeight >= scrollHeight - window.innerHeight) {
//                     clearInterval(timer);
//                     resolve();
//                 }
//             }, 100);
//         });
//     });
// }


// const checkSection = async (page) => {
//     let style = await page.$$eval("main", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             let width = el.offsetWidth
//             let height = el.offsetHeight
//             console.log(height);
//             el = el.parentElement
//             el.style.pageBreakAfter = "always"
//             el.style.pageBreakInside = "avoid";
//             el.style.marginTop = "160px"
//         }
//     })

//     // await page.waitForTimeout(300000)
// }

// const findSectionDivs = async (page, el, index, flag) => {
//     let classWithFlag = `mohitTestPDF_${flag}`
//     if (index < 6) {
//         let divtags = await page.$$(`${el} > div`)
//         // , (els) => {
//         //     let data = []
//         //     for (let i = 0; i < els.length; i++) {
//         //         const el = els[i];
//         //         console.log(el);
//         //         let cls = el.getAttribute("class")?.trim()
//         //         if (cls && cls.length) {
//         //             cls = cls.split(" ");
//         //             let parent = "";
//         //             for (let j = 0; j < cls.length; j++) {
//         //                 const el = cls[j];
//         //                 parent = parent + "." + el;
//         //             }
//         //             data.push(parent)
//         //         }
//         //         else {
//         //             let id = el.getAttribute('id')?.trim()
//         //             if (id) {
//         //                 data.push("#" + id)
//         //             }
//         //             else {
//         //                 data.push(null)
//         //             }
//         //         }
//         //     }
//         //     return data
//         // }

//         // );

//         if (divtags.length && divtags.length < 2) {
//             let previous = ""
//             for (let i = 0; i < divtags.length; i++) {
//                 let element = divtags[i];
//                 let classNameNew = ""
//                 const el = element;
//                 let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                 if (cls && cls.length) {
//                     cls = cls.split(" ");
//                     let parent = "";
//                     for (let j = 0; j < cls.length; j++) {
//                         const el = cls[j];
//                         parent = parent + "." + el;
//                     }
//                     classNameNew = parent
//                 }
//                 else {
//                     let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                     console.log("id ", id);
//                     if (id) {
//                         classNameNew = "#" + id
//                     }
//                     else {
//                         let cllass = "unique_Mohit_test_xyz" + i
//                         await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                         classNameNew = "." + cllass
//                     }
//                 }
//                 // await page.waitForTimeout(1200000)
//                 if (classNameNew != null) {
//                     findSectionDivs(page, classNameNew, index + 1, flag);
//                 } else if (previous) {
//                     console.log(previous);
//                     findSectionDivs(page, `${previous} > div > div`, index + 1, flag);
//                 }
//                 previous = classNameNew
//             }
//         } else if (divtags.length && divtags.length > 2) {
//             let style = "";
//             for (let k = 0; k < divtags.length; k++) {
//                 const el = divtags[k];
//                 let cllass = `${classWithFlag}_${k}`
//                 let x = el
//                 await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
//                 // el.classList.add(`${classWithFlag}_${k}`)
//                 style =
//                     style +
//                     `
//                 .${classWithFlag}_${k} {
//                     page-break-after: always; 
//                     margin-top: 50px; 
//                 }
//                 `;
//                 const pagesRequired = Math.ceil((await el.evaluate(x => x.offsetHeight) / 1122) / 2)
//                 if (pagesRequired > 1) {
//                     let classNameNew = ""
//                     let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                     if (cls && cls.length) {
//                         cls = cls.split(" ");
//                         let parent = "";
//                         for (let j = 0; j < cls.length; j++) {
//                             const el = cls[j];
//                             parent = parent + "." + el;
//                         }
//                         classNameNew = parent
//                     }
//                     else {
//                         let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                         if (id) {
//                             classNameNew = "#" + id
//                         }
//                         else {
//                             let cllass = "unique_Mohit_z" + i
//                             await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                             classNameNew = "." + cllass
//                         }
//                     }
//                     // console.log("test log =>");
//                     // secondLevelFindSections(page, classNameNew, 1, "justForTest", pagesRequired)
//                     // let breakIndex = await page.evaluate((el, pagesRequired) => {
//                     //     let children = el.childNodes
//                     //     let breakIndex = Math.ceil(children.length / pagesRequired)
//                     //     for (let i = breakIndex; i < children.length; i = i + breakIndex) {
//                     //         const element = children[i];
//                     //         element.style.pageBreakAfter = "always"
//                     //         element.style.marginTop = "50px"
//                     //     }
//                     //     return breakIndex
//                     // }, el, pagesRequired)
//                     // console.log("breakIndex => ", breakIndex);
//                 }

//             }
//             return await page.addStyleTag({
//                 content: `
//       @page {
//         size: A4;
//       }
//       ${style}
//       `,
//             });
//         }
//     }
//     else {
//         console.log("senasio => 2");
//         check2Div(page, "body")
//     }
// };

// const secondLevelFindSections = async (page, el, index, flag, pagesRequired) => {
//     // console.log("Pages =>", page, el, index, flag, pagesRequired);
//     let classWithFlag = `mohitPDF_${flag}`
//     if (index < 12) {
//         console.log("senasio => 1");
//         let divtags = await page.$$(`${el} > div`)
//         console.log("divtags-1 =>", divtags);
//         if (divtags.length && divtags.length < 2) {
//             console.log("senasio => 1.1");
//             let previous = ""
//             for (let i = 0; i < divtags.length; i++) {
//                 let element = divtags[i];
//                 let classNameNew = ""
//                 const el = element;
//                 console.log(el);
//                 let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                 console.log("cls ", cls);
//                 if (cls && cls.length) {
//                     cls = cls.split(" ");
//                     let parent = "";
//                     for (let j = 0; j < cls.length; j++) {
//                         const el = cls[j];
//                         parent = parent + "." + el;
//                     }
//                     classNameNew = parent
//                 }
//                 else {
//                     let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                     console.log("id ", id);
//                     if (id) {
//                         classNameNew = "#" + id
//                     }
//                     else {
//                         let cllass = "unique_Mohit_test_xyz" + i
//                         await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                         classNameNew = "." + cllass
//                     }
//                 }
//                 console.log(classNameNew);
//                 if (classNameNew != null) {
//                     secondLevelFindSections(page, classNameNew, index + 1, flag, pagesRequired);
//                 } else if (previous) {
//                     console.log(previous);
//                     secondLevelFindSections(page, `${previous} > div > div`, index + 1, flag, pagesRequired);
//                 }
//                 previous = classNameNew
//             }
//         } else if (divtags.length && divtags.length > 2) {
//             console.log("senasio => 1.2");
//             let el = divtags[0]
//             // for (let k = 0; k < divtags.length; k++) {
//             //     const el = divtags[k];
//             // let cllass = `${classWithFlag}_${k}`
//             // let x = el
//             // await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
//             // // el.classList.add(`${classWithFlag}_${k}`)
//             // style =
//             //     style +
//             //     `
//             // .${classWithFlag}_${k} {
//             //     page-break-after: always; 
//             //     margin-top: 50px; 
//             // }
//             // `;
//             let breakIndex = await page.evaluate((el, pagesRequired) => {
//                 console.log("parent =>", pagesRequired, el);
//                 let parent = el.parentElement
//                 let children = parent.childNodes
//                 let breakIndex = Math.ceil(children.length / pagesRequired)
//                 for (let i = breakIndex; i < children.length; i = i + breakIndex) {
//                     const element = children[i];
//                     element.style.pageBreakAfter = "always"
//                     element.style.marginTop = "50px"
//                 }
//                 return breakIndex
//             }, el, pagesRequired)
//             console.log("breakIndex => ", breakIndex);

//             // }
//             //         return await page.addStyleTag({
//             //             content: `
//             //   @page {
//             //     size: A4;
//             //   }
//             //   ${style}
//             //   `,
//             //         });
//         }
//     }
//     else {
//         console.log("senasio => 2");
//         check2Div(page, "body")
//     }
// };

// let check2Div = async (page, el) => {
//     let divtags = await page.$$eval(`${el} > div`, (els) => {
//         let data = []
//         for (let i = 0; i < els.length; i++) {
//             const el = els[i];
//             let cls = el.getAttribute("class")?.trim()
//             if (cls && cls.length) {
//                 cls = cls.split(" ");
//                 let parent = "";
//                 for (let j = 0; j < cls.length; j++) {
//                     const el = cls[j];
//                     parent = parent + "." + el;
//                 }
//                 data.push(parent)
//             }
//             else {
//                 let id = el.getAttribute('id')?.trim()
//                 if (id) {
//                     data.push("#" + id)
//                 }
//                 else {
//                     continue;
//                 }
//             }
//         }
//         return data
//     }

//     );
//     if (divtags.length && divtags.length < 1) {
//         console.log("senasio => 1.1");
//         for (let i = 0; i < divtags.length; i++) {
//             let element = divtags[i];
//             if (element) {
//                 check2Div(page, element);
//             } else {
//                 check2Div(page, `${el} > div > div`);
//             }
//         }
//     } else if (divtags.length && divtags.length > 2) {
//         console.log("senasio => 1.2");
//         let style = "";
//         for (let k = 0; k < divtags.length; k++) {
//             const el = divtags[k];
//             console.log((el && (el.includes(".") || el.includes("#"))))
//             if (el && (el.includes(".") || el.includes("#"))) {
//                 style =
//                     style +
//                     `
//         ${el} {
//           page-break-after: always; 
//           margin-top: 50px; 
//         }
//       `;
//             }
//         }

//         console.log("style => ", style);

//         return await page.addStyleTag({
//             content: `
//     @page {
//       size: A4;
//     }
//     ${style}
//     `,
//         });
//     }
// }

// async function checkRemovePopups(page) {
//     let style = await page.$$eval("*", els => {
//         var elems = els;
//         var len = elems.length
//         console.log(els);

//         for (var i = 0; i < len; i++) {
//             try {
//                 var computedStyle = window.getComputedStyle(elems[i], null);
//                 var tagName = elems[i].tagName.toLowerCase();

//                 if (tagName === "header") {
//                     // var headerValue = computedStyle.getPropertyValue("header");

//                     console.log("Computed header value:", computedStyle.getPropertyValue());
//                 } else if (window.getComputedStyle(elems[i], null).getPropertyValue('position') == 'fixed') {
//                     var classLoop1 = elems[i].id ? ["#" + elems[i].id] : elems[i].className.split(" ");
//                     // console.log(classLoop1)
//                     classLoop1 = classLoop1.filter(items => items !== "")
//                     classLoop1 = classLoop1.filter(items => items !== " ")

//                     if (elems[i].className.toLowerCase().includes("header") || elems[i].className.toLowerCase().includes("navbar")) {
//                         console.log("elems[i] true =>", elems[i], classLoop1)
//                     } else {
//                         var allData = classLoop1.map((items) => {
//                             return elems[i].id ? items : "." + items
//                         })
//                         // console.log("allData =>",allData)
//                         const parentElement = document.querySelector(allData.join(""));
//                         // console.log(parentElement)
//                         const nestedElements = parentElement.querySelectorAll("*");


//                         console.log("nestedElements.length =>", nestedElements)

//                         if (nestedElements.length) {
//                             // Iterate over each nested element and log its class names
//                             for (const element of nestedElements) {
//                                 var classNames = Array.from(element.classList);
//                                 if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                                     // console.log("elems[i] false =>", elems[i], classLoop1)
//                                     elems[i].remove();
//                                     break;
//                                     // return;
//                                 }
//                             };
//                         } else if (parentElement) {
//                             var classNames = Array.from(nestedElements.classList);
//                             // console.log("classNames =>", classNames)
//                             if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                                 console.log("elems[i] false =>", elems[i], classLoop1)
//                                 elems[i].remove();
//                             }
//                         }
//                     }
//                 }
//             } catch (error) {
//                 // console.log(error)
//             }
//         }
//     })
// }

// async function removePage(filePath) {
//     const { writeFileSync, readFileSync } = require("fs");
//     const { PDFDocument } = require("pdf-lib");
//     const pdf = require('pdf-parse');

//     const dataBuffer = readFileSync(`pdfs/${filePath}.pdf`);
//     const letters = await PDFDocument.load(readFileSync(`pdfs/${filePath}.pdf`));

//     await pdf(dataBuffer).then(async function (data) {
//         const pages = data.text.split('\n\n'); // Split the text by page

//         var num = 1
//         for (let i = 0; i < pages.length; i++) {
//             // Get the text of the desired page
//             const desiredPageText = pages[i];

//             // console.log("desiredPageText =>", desiredPageText);


//             if (!desiredPageText && i !== 0) {
//                 console.log(` `);
//                 console.log(`Text of page ${num}:`);
//                 console.log(desiredPageText);
//                 await letters.removePage(i - num);
//                 num = num + 1
//             }
//         }
//         writeFileSync(`pdfs_test/${filePath}_test.pdf`, await letters.save());
//     }).catch(function (error) {
//         console.log('An error occurred:', error);
//     });

// }
// // *************************************************************************************************************** */


// // 03-07-2023 old code with styles merge *************************************************************************************************************** */
// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');

// // Specify the path and name of the parent folder
// const parentFolderPath = './pdfs';
// const parentFolderPath2 = './pdfs_test';


// async function run() {

//     const customArgs = [
//         "--start-maximized",
//         "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
//     ];

//     let browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: null,
//         protocolTimeout: 1200000,
//         executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//         ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
//         args: customArgs,
//     });


//     // // "Single page toggle sections"
//     // const allUrls = [
//     //     "https://investor.marketaxess.com/governance/executive-management/default.aspx",
//     //     "https://investors.paycom.com/Corporate-Governance/Board-of-Directors/default.aspx",
//     //     "https://investors.principal.com/investor-relations/our-business/leadership/senior-management-bios/default.aspx",
//     //     "https://investor.marketaxess.com/governance/board-of-directors/default.aspx",
//     //     "https://investors.principal.com/investor-relations/our-business/leadership/board-of-director-bios/default.aspx",
//     //     "https://ir.maac.com/overview/directors-and-management/default.aspx",
//     //     "https://ir.mtch.com/corporate-governance/board-of-directors/default.aspx",
//     //     "https://ir.questdiagnostics.com/governance/management-team/default.aspx",
//     //     "https://ir.questdiagnostics.com/governance/board-of-directors/default.aspx",
//     //     "https://ir.dish.com/corporate-governance/board-of-directors",
//     //     "https://investor.dollargeneral.com/websites/dollargeneral/English/4000/management-team.html",
//     //     "https://investor.dollargeneral.com/websites/dollargeneral/English/5100/board-of-directors.html",
//     //     "https://ir.ea.com/corporate-governance/board-of-directors/default.aspx",
//     //     "https://investors.eastman.com/governance/board-of-directors/default.aspx",
//     //     "https://www.elcompanies.com/en/investors/corporate-governance/board-of-directors",
//     //     "https://investors.equityapartments.com/overview/officers-and-trustees/default.aspx",
//     //     "https://investors.essexapartmenthomes.com/corporate-information/officers-directors/default.aspx",
//     //     "https://investors.etsy.com/governance/board-of-directors/default.aspx",
//     //     "https://investor.expeditors.com/corporate-governance/board-of-directors-and-board-diversity-matrix",
//     //     "https://investor.fastenal.com/governance/management/default.aspx",
//     //     "https://investor.fastenal.com/governance/board-of-directors/default.aspx",
//     //     "https://investors.fedex.com/esg/board-of-directors/default.aspx",
//     //     "https://investor.marketaxess.com/governance/executive-management/default.aspx",
//     //     "https://investor.marketaxess.com/governance/board-of-directors/default.aspx",
//     //     "https://www.mastercard.com/news/press/executive-bios/",
//     //     "https://ir.mtch.com/corporate-governance/board-of-directors/default.aspx",
//     //     "https://www.metlife.com/about-us/corporate-governance/board-of-directors/",
//     //     "https://www.monolithicpower.com/en/about-mps/investor-relations/corporate-governance/management.html"
//     // ]

//     // // "Single Page content popups"
//     // const allUrls = [
//     //     "https://about.netflix.com/en/leadership",
//     //     "https://about.nike.com/en/company",
//     //     "https://esg.revvity.com/governance/",
//     //     "https://investor.phillips66.com/corporate-governance/",
//     //     "https://mtch.com/leadership",
//     //     "https://newscorp.com/news-corp-leadership/",
//     //     "https://nucor.com/leadership",
//     //     "https://www.ea.com/executives",
//     //     "https://www.ebayinc.com/company/our-leaders/",
//     //     "https://investors.ebayinc.com/corporate-governance/board-of-directors/default.aspx",
//     //     "https://www.eogresources.com/company/board-of-directors/",
//     //     "https://www.eogresources.com/company/leadership/",
//     //     "https://ir.edwards.com/governance-sustainability/governance/board-of-directors/default.aspx",
//     //     "https://www.exeloncorp.com/leadership-and-governance/executive-profiles",
//     //     "https://www.exeloncorp.com/leadership-and-governance/board-of-directors",
//     //     "https://www.expediagroup.com/who-we-are/leadership/default.aspx",
//     //     "https://www.expeditors.com/about-us/leadership",
//     //     "https://www.marathonpetroleum.com/About/Leadership/",
//     //     "https://www.marathonpetroleum.com/About/Board-of-Directors/",
//     //     "https://www.marshmclennan.com/about/leadership.html"
//     // ]

//     // // "Click Next scenarios"
//     // const allUrls = [
//     //     "https://investors.paycom.com/corporate-governance/management/default.aspx",
//     //     "https://mohawkind.com/about/leadership.php",
//     //     "https://www.discover.com/company/our-company/meet-the-team/board-of-directors/",
//     //     "https://www.marshmclennan.com/about/leadership.html"
//     // ]

//     // // "Read more scenarios"
//     // const allUrls = [
//     //     "https://www.pmi.com/our-leadership-team",
//     //     "https://www.dishtv.in/Pages/AboutUs/Top-Management-Profiles.aspx",
//     //     "https://corporate.dollartree.com/about/leadership/executive-leadership",
//     //     "https://corporate.dollartree.com/about/leadership/board-of-directors",
//     //     "https://biz.dominos.com/about-us/leadership/",
//     //     "https://investors.dow.com/en/corporate-governance/board-of-directors/default.aspx",
//     //     "https://www.dupont.com/about/leadership.html",
//     //     "https://dxc.com/us/en/about-us/leadership-and-governance",
//     //     "https://www.eastman.com/en/who-we-are/our-organization/leadership",
//     //     "https://www.ecolab.com/about/leadership",
//     //     "https://www.elcompanies.com/en/investors/corporate-governance/executive-officers",
//     //     "https://www.equifax.com/about-equifax/leadership/",
//     //     "https://investors.evergy.com/about-evergy/leadership-team",
//     //     "https://www.factset.com/our-company/our-leadership",
//     //     "https://investor.factset.com/corporate-governance/board-of-directors",
//     //     "https://www.marathonpetroleum.com/About/Leadership/",
//     //     "https://www.marathonpetroleum.com/About/Board-of-Directors/"
//     // ]

//     // // "On hover content"
//     // const allUrls = []

//     // // "Pagination"
//     // const allUrls = [
//     //     "https://investors.epam.com/investors/leadership-and-governance"
//     // ]

//     // // "Input questionaries"
//     // const allUrls = [
//     //     "https://www.elcompanies.com/en/investors/corporate-governance/board-of-directors",
//     //     "https://www.fedex.com/en-us/about/leadership.html"
//     // ]

//     // const allUrls = ["https://www.pixium-vision.com/board-of-directors-2/", "https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
//     const allUrls = ["https://lakebrains.com"]

//     for (let i = 0; i < allUrls.length; i++) {
//         try {
//             const url = allUrls[i];
//             const URL = url;
//             console.log("URL =>", URL);
//             var fileName = URL.split("/")
//             fileName = fileName.splice(2, fileName.length)
//             fileName = fileName.join("_")
//             console.log("fileName =>", fileName);

//             // Specify the name of the new folder
//             const newFolderName = fileName;

//             // Create the new folder within the parent folder
//             const newFolderPath = path.join(parentFolderPath, newFolderName);
//             const newFolderPath2 = path.join(parentFolderPath2, newFolderName);

//             fs.mkdir(newFolderPath, { recursive: true }, (err) => {
//                 if (err) {
//                     console.error('Error creating folder:', err);
//                 } else {
//                     console.log('Folder created successfully!');
//                 }
//             });

//             fs.mkdir(newFolderPath2, { recursive: true }, (err) => {
//                 if (err) {
//                     console.error('Error creating folder:', err);
//                 } else {
//                     console.log('Folder created successfully!');
//                 }
//             });


//             let page = await browser.newPage();
//             await page.setDefaultTimeout(0)
//             await page.setDefaultNavigationTimeout(0)

//             await page.goto(URL, { waitUntil: "networkidle0", timeout: 0 });

//             await checkVideo(page)

//             await page.waitForTimeout(5000)

//             var pageNumber = 1

//             async function test_pdfPage() {
//                 await page.emulateMediaType("screen");
//                 await page.pdf({
//                     path: `pdfs/${fileName}/${fileName}${pageNumber}.pdf`,
//                     printBackground: true,
//                     format: "A4",
//                     scale: 0.3
//                 });
//                 pageNumber = pageNumber + 1

//                 await page.evaluate(async () => {
//                     // Get elements with attribute names or class names containing "close"
//                     const elementsWithCloseAttributes = Array.from(document.querySelectorAll('*')).filter(element => {
//                         const attributes = Array.from(element.attributes);
//                         const classNames = Array.from(element.classList);
//                         return (
//                             attributes.some(attribute => attribute.name.toLowerCase().includes('close')) ||
//                             classNames.some(className => className.toLowerCase().includes('close'))
//                         );
//                     });

//                     console.log("elementsWithCloseAttributes =>", elementsWithCloseAttributes);

//                     setTimeout(() => {
//                         // Click on each element
//                         elementsWithCloseAttributes.forEach(closeElement => {
//                             const event = new MouseEvent('click', {
//                                 bubbles: true,
//                                 cancelable: true,
//                                 view: window
//                             });
//                             closeElement.dispatchEvent(event);
//                         });
//                     }, 2000);
//                 });
//             }

//             await page.exposeFunction("test_pdfPage", test_pdfPage);

//             await page.evaluate(async () => {
//                 return new Promise(async (resolve) => {
//                     // Helper function to check if an element or its ancestors have an href attribute
//                     function hasHrefAncestor(element) {
//                         let currentElement = element;
//                         while (currentElement) {
//                             if (currentElement.hasAttribute("href")) {
//                                 return true;
//                             }
//                             currentElement = currentElement.parentElement;
//                         }
//                         return false;
//                     }
//                     // Get all div or button elements with cursor: pointer and without href attribute in self or ancestors
//                     const pointerElementsWithoutHrefAncestors = Array.from(document.querySelectorAll("div, button")).filter(element => {
//                         const styles = window.getComputedStyle(element);
//                         return styles.getPropertyValue("cursor") === "pointer" && !hasHrefAncestor(element);
//                     }).filter(element => {
//                         const attributes = Array.from(element.attributes).map(attr => attr.name);
//                         const classNames = element.className.split(" ");
//                         return !attributes.some(attr => attr.toLowerCase().includes("nav") || attr.toLowerCase().includes("menu") || attr.toLowerCase().includes("dropdown")) &&
//                             !classNames.some(className => className.toLowerCase().includes("nav") || className.toLowerCase().includes("menu") || className.toLowerCase().includes("dropdown")) &&
//                             !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("search")) &&
//                             !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("subscribe")) &&
//                             !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("submit")) &&
//                             !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("next")) &&
//                             !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("previous")) &&
//                             !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("nav"));
//                     });

//                     if (pointerElementsWithoutHrefAncestors.length) {
//                         for (let i = 0; i < pointerElementsWithoutHrefAncestors.length; i++) {
//                             setTimeout(async () => {
//                                 try {
//                                     console.log("i =>", i + 1, pointerElementsWithoutHrefAncestors.length);
//                                     console.log(pointerElementsWithoutHrefAncestors[i]);
//                                     pointerElementsWithoutHrefAncestors[i].click();
//                                     await test_pdfPage();
//                                     if ((i + 1) === pointerElementsWithoutHrefAncestors.length) {
//                                         setTimeout(() => {
//                                             console.log("Resolved");
//                                             resolve();
//                                         }, 5000);
//                                     }
//                                 } catch (error) {
//                                     console.log("Error =>", error);
//                                 }
//                             }, i * 5000); // 10 seconds delay between clicks
//                         }
//                     } else {
//                         resolve();
//                     }
//                 })
//             })


//             async function test_cssPage(link) {
//                 let pageInternal = await browser.newPage();
//                 try {
//                     await pageInternal.goto(link, { timeout: 0 });
//                     console.log("Getting in =>", link);

//                     await pageInternal.waitForTimeout(2000)

//                     const offsetHeight = await pageInternal.evaluate(() => {
//                         const body = document.querySelector("pre");
//                         console.log("body =>", body);
//                         return body ? body.innerText : ""
//                     });

//                     await pageInternal.close();

//                     return offsetHeight;
//                 } catch (error) {
//                     console.log("Error =>", error);
//                     await pageInternal.close();
//                     return null
//                 }
//             }

//             await page.exposeFunction("test_cssPage", test_cssPage);

//             async function test_newPage(link) {
//                 let pageInternal = await browser.newPage();
//                 try {

//                     await pageInternal.goto(link, { timeout: 0 });
//                     console.log("Getting in");

//                     await pageInternal.waitForTimeout(5000)
//                     await autoScroll(pageInternal);

//                     const offsetHeight = await pageInternal.evaluate(() => {
//                         const body = document.body;
//                         console.log("offsetHeight =>", body);
//                         return body.offsetHeight;
//                     });

//                     await pageInternal.close();

//                     return offsetHeight;

//                 } catch (error) {
//                     console.log("Error =>", error);
//                     await pageInternal.close();
//                     return ""
//                 }
//             }

//             await page.exposeFunction("test_newPage", test_newPage);

//             var mainStyles;
//             await fs.readFile('public/puppeteerMain.css', 'utf8', (err, data) => {
//                 return new Promise(async (resolve) => {
//                     if (err) {
//                         console.error(err);
//                         return;
//                     }

//                     // Parse the CSS file to extract the classes
//                     const classes = data;
//                     mainStyles = classes
//                     resolve();
//                 })
//             });

//             await page.evaluate(async () => {

//                 let styles = document.querySelectorAll('style')

//                 for (let i = 0; i < styles.length; i++) {
//                     const el = styles[i];
//                     styles[i].remove()
//                     document.head.appendChild(el)
//                 }

//                 let links = document.querySelectorAll("link")

//                 // console.log(links);

//                 for (let i = 0; i < links.length; i++) {
//                     if (links[i].rel && links[i].rel === "stylesheet" && links[i].href.includes("https")) {
//                         var body = await test_cssPage(links[i].href)
//                         const styleElement = document.createElement('style');
//                         styleElement.innerHTML = `${body}`;
//                         document.head.appendChild(styleElement);
//                         console.log("body =>", styleElement);
//                         links[i].remove()
//                     } else {
//                         links[i].remove()
//                     }
//                 }
//             })

//             await page.evaluate(() => {
//                 let allelss = document.querySelectorAll("*")
//                 let scripts = document.querySelectorAll('script')
//                 let headers = document.querySelectorAll('header')
//                 let footers = document.querySelectorAll('footer')


//                 // Loop through each element
//                 allelss.forEach(element => {
//                     // Get all attributes of the element
//                     const attributes = element.attributes;

//                     // Loop through each attribute
//                     for (let i = 0; i < attributes.length; i++) {
//                         const attribute = attributes[i];
//                         const attributeValue = attribute.value;

//                         // Check if the attribute value contains the word "sticky"
//                         if (attributeValue && attributeValue === 'sticky') {
//                             // Remove the element
//                             element.remove();
//                             break; // Exit the loop once an attribute is found with the word "sticky"
//                         }
//                     }
//                 });

//                 for (let i = 0; i < scripts.length; i++) {
//                     const link = scripts[i];
//                     console.log("links[i] =>", scripts[i]);
//                     link.remove()
//                 }
//                 for (let i = 0; i < headers.length; i++) {
//                     const header = headers[i];
//                     header.remove()
//                 }
//                 for (let i = 0; i < footers.length; i++) {
//                     const footer = footers[i];
//                     footer.remove()
//                 }

//                 let allels = document.querySelectorAll("*[style]");

//                 setInterval(() => {
//                     for (let i = 0; i < allels.length; i++) {
//                         const el = allels[i];
//                         // console.log(el)
//                         for (let r = 0; r < el.style.length; r++) {
//                             const element = el.style[r];
//                             // console.log("el.style.display =>", el.style.display);
//                             if (
//                                 element !== "flex-display" &&
//                                 element !== "flex-direction" &&
//                                 element !== "flex-wrap" &&
//                                 element !== "flex-flow" &&
//                                 element !== "justify-content" &&
//                                 element !== "align-items" &&
//                                 element !== "gap" &&
//                                 element !== "row-gap" &&
//                                 element !== "column-gap" &&
//                                 !element.includes("margin") &&
//                                 !element.includes("padding")
//                             ) {
//                                 el.style[`${element}`] = ""
//                             } else if (
//                                 el.style.display !== "grid" &&
//                                 el.style.display !== "flex" &&
//                                 el.style.display !== "inline" &&
//                                 el.style.display !== "inline-block"
//                             ) {
//                                 el.style[`${element}`] = ""
//                             }
//                         }
//                     }
//                 }, 500);


//                 // const allowedProperties = [
//                 //     'flex-direction',
//                 //     'flex-wrap',
//                 //     'flex-flow',
//                 //     'justify-content',
//                 //     'align-items',
//                 //     'gap',
//                 //     'row-gap',
//                 //     'column-gap',

//                 //     'margin',
//                 //     'margin-top',
//                 //     'margin-bottom',
//                 //     'margin-right',
//                 //     'margin-left',

//                 //     'padding',
//                 //     'padding-top',
//                 //     'padding-bottom',
//                 //     'padding-right',
//                 //     'padding-left',
//                 //     'display'
//                 // ];

//                 // const allowedDisplayValues = [
//                 //     'flex',
//                 //     'grid',
//                 //     'inline',
//                 //     'inline-block'
//                 // ];


//                 // const styleSheetList = document.styleSheets;

//                 // const newStyleElement = document.createElement('style');

//                 // newStyleElement.id = "merged_styles"

//                 // console.log("styleSheetList.length =>", styleSheetList.length);

//                 // for (let i = 0; i < styleSheetList.length; i++) {
//                 //     const styleSheet = styleSheetList[i];

//                 //     const rules = styleSheet.cssRules || styleSheet.rules; // Handle different browser compatibility

//                 //     for (let j = 0; j < rules.length; j++) {
//                 //         const rule = rules[j];

//                 //         // Check if the rule is a CSSStyleRule and not a CSSImportRule or other type of rule
//                 //         if (rule instanceof CSSStyleRule) {
//                 //             const { style } = rule;

//                 //             // Remove properties that are not in the allowed list
//                 //             for (let k = style.length - 1; k >= 0; k--) {
//                 //                 const property = style[k];

//                 //                 if (!allowedProperties.includes(property)) {
//                 //                     style.removeProperty(property);
//                 //                 }
//                 //             }

//                 //             // Check display property and remove if not in allowed display values
//                 //             const display = style.getPropertyValue('display');
//                 //             if (!allowedDisplayValues.includes(display)) {
//                 //                 style.removeProperty('display');
//                 //             }

//                 //             // Append the modified rule to the new style element
//                 //             newStyleElement.appendChild(
//                 //                 document.createTextNode(`${rule.selectorText} { ${style.cssText} }`)
//                 //             );
//                 //         }
//                 //     }
//                 // }
//                 // document.head.appendChild(newStyleElement);


//                 const allowedProperties = [
//                     'flex-direction',
//                     'flex-wrap',
//                     'flex-flow',
//                     'justify-content',
//                     'align-items',
//                     'gap',
//                     'row-gap',
//                     'column-gap',
//                     'margin',
//                     'margin-top',
//                     'margin-bottom',
//                     'margin-right',
//                     'margin-left',
//                     'padding',
//                     'padding-top',
//                     'padding-bottom',
//                     'padding-right',
//                     'padding-left',
//                     'display'
//                 ];

//                 const allowedDisplayValues = [
//                     'flex',
//                     'grid',
//                     'inline',
//                     'inline-block'
//                 ];

//                 const styleSheetList = document.styleSheets;
//                 const newStyleElement = document.createElement('style');
//                 newStyleElement.id = "merged_styles";

//                 for (let i = 0; i < styleSheetList.length; i++) {
//                     const styleSheet = styleSheetList[i];
//                     const rules = styleSheet.cssRules || styleSheet.rules; // Handle different browser compatibility

//                     for (let j = 0; j < rules.length; j++) {
//                         const rule = rules[j];

//                         // Check if the rule is a CSSStyleRule and not a CSSImportRule or other type of rule
//                         if (rule instanceof CSSStyleRule) {
//                             const { style } = rule;

//                             // Check if display is flex and add flex-wrap: wrap
//                             if (style.display === 'flex') {
//                                 style.setProperty('flex-wrap', 'wrap');
//                             }

//                             // Remove properties that are not in the allowed list
//                             for (let k = style.length - 1; k >= 0; k--) {
//                                 const property = style[k];
//                                 if (!allowedProperties.includes(property)) {
//                                     style.removeProperty(property);
//                                 }
//                             }

//                             // Check display property and remove if not in allowed display values
//                             const display = style.getPropertyValue('display');
//                             if (!allowedDisplayValues.includes(display)) {
//                                 style.removeProperty('display');
//                             }

//                             // Append the modified rule to the new style element
//                             newStyleElement.appendChild(
//                                 document.createTextNode(`${rule.selectorText} { ${style.cssText} }`)
//                             );
//                         }
//                     }
//                 }

//                 document.head.appendChild(newStyleElement);


//                 setTimeout(() => {
//                     let styles = document.querySelectorAll('style')

//                     for (let i = 0; i < styles.length; i++) {
//                         console.log(styles[i]);
//                         if (!styles[i].id && (styles[i].id !== "merged_styles" || styles[i].id !== "puppeteerMain")) {
//                             const el = styles[i];
//                             el.remove()
//                         }
//                     }
//                 }, 1000);
//             })

//             await page.waitForTimeout(5000)

//             await page.addStyleTag({ path: 'public/puppeteerMain.css' })

//             // Add attribute to every element
//             await page.evaluate(async (mainStyles) => {
//                 const elements = document.querySelectorAll('*');
//                 for (const element of elements) {
//                     element.setAttribute('data-pf_style_display', 'block');
//                     element.setAttribute('data-pf_style_visibility', 'visible');
//                     element.setAttribute('orig-style', 'null');
//                 }
//                 const buttons = document.querySelectorAll('button');
//                 for (const button of buttons) {
//                     if (!button.querySelector('a') && (button.innerText.toLowerCase().includes("read more") || button.innerText.toLowerCase().includes("learn more") || button.innerText.toLowerCase().includes("more"))) {
//                         button.click();
//                     }
//                 }

//                 var allLinks = [];

//                 const links = document.querySelectorAll('a');
//                 console.log("all links =>", links);
//                 for (const link of links) {
//                     var bodyBaseURI = document.querySelector('body').baseURI.split("/")[2];

//                     if (!link.querySelector('a') && (link.innerText.toLowerCase().includes("read more") || link.innerText.toLowerCase().includes("learn more") || link.innerText.toLowerCase().includes("more"))) {
//                         if (link.getAttribute("href") && link.getAttribute("href").includes(bodyBaseURI.replace(/^(https?:\/\/)?(www\.)?/, '$1'))) {
//                             const allLinksFilter = await allLinks.filter(items => items === link.getAttribute("href"));
//                             console.log("links =>", allLinksFilter);
//                             if (!allLinksFilter.length) {
//                                 console.log("link.getAttribute(href) =>", link.getAttribute("href"));
//                                 var height = await test_newPage(link.getAttribute("href"))

//                                 console.log("height =>", height);

//                                 // Create the <iframe> element
//                                 var iframe = document.createElement("iframe");
//                                 iframe.src = link.getAttribute("href")
//                                 iframe.classList.add("pageBreakBefore")
//                                 iframe.width = "100%";
//                                 iframe.height = height;
//                                 iframe.style.marginTop = "20px"
//                                 iframe.frameBorder = "0"
//                                 iframe.scrolling = "no"


//                                 // Add event listener for iframe load event
//                                 iframe.addEventListener("load", function () {
//                                     // Access the <iframe> contentDocument
//                                     var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

//                                     // Remove the header element
//                                     var header = iframeDocument.querySelector("header"); // Replace "header" with the selector for your header element
//                                     if (header) {
//                                         header.parentNode.removeChild(header);
//                                     }

//                                     // Remove the footer element
//                                     var footer = iframeDocument.querySelector("footer"); // Replace "footer" with the selector for your footer element
//                                     if (footer) {
//                                         footer.parentNode.removeChild(footer);
//                                     }

//                                     // Remove elements with class including "header" or "footer"
//                                     var elements = iframeDocument.querySelectorAll("[class*='header'], [class*='footer']");
//                                     console.log("elements =>", elements);

//                                     elements.forEach(function (element) {
//                                         if (element.nodeName === "DIV" || element.nodeName === "SECTION") {
//                                             element.parentNode.removeChild(element);
//                                         }
//                                     });

//                                     const styleElement = iframeDocument.createElement('style');
//                                     styleElement.innerHTML = `${mainStyles}`;

//                                     iframeDocument.head.appendChild(styleElement);
//                                 });

//                                 console.log("iframe =>", iframe);

//                                 document.body.appendChild(iframe)
//                                 allLinks.push(link.getAttribute("href"))
//                             }
//                         }
//                     }
//                 }

//                 var body = await document.querySelector('body');
//                 body.classList.add("content-unmask")
//                 body.classList.add("cs-algo-iframe")
//                 body.classList.add("px-2")
//                 body.classList.add("px-sm-4")
//                 body.classList.add("px-md-5")
//                 body.classList.add("pt-2")
//                 body.classList.add("pt-sm-3")
//                 body.classList.add("direction-ltr")
//                 body.id = "pf-body"

//             }, mainStyles);

//             await page.waitForTimeout(2000)

//             // Add attribute to every element
//             await page.evaluate(async (mainStyles) => {
//                 return new Promise(async (resolve) => {
//                     const elements = document.querySelectorAll('*');

//                     var attri = false;

//                     for (const innerElement of elements) {
//                         for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
//                             if (atts[i].nodeValue.toLocaleLowerCase() === "next" || atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
//                                 attri = true
//                             }
//                         }
//                     }


//                     setTimeout(async () => {
//                         if (attri === true) {
//                             for (const innerElement of elements) {
//                                 for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
//                                     if (atts[i].nodeValue.toLocaleLowerCase() === "next" || atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
//                                         if (innerElement.href && !innerElement.href.toLocaleLowerCase().includes("https")) {
//                                             console.log("atts[i].nodeValue.toLocaleLowerCase() =>", innerElement.href.toLocaleLowerCase().includes("https"));
//                                             var elementHrefData = async () => {
//                                                 if (innerElement.tagName === "A" && !innerElement.getAttribute("href").includes("https")) {
//                                                     console.log("The element is an anchor (<a>) element.");
//                                                     var parent = innerElement
//                                                     const loop = async () => {
//                                                         if (parent.offsetHeight < 500) {
//                                                             parent = await parent.parentElement
//                                                             loop()
//                                                         } else {
//                                                             console.log("element =>", innerElement)

//                                                             var timeEnd;

//                                                             // Select the target node (in this case, the <body> element)
//                                                             const observerLoop = async (i) => {
//                                                                 setTimeout(() => {
//                                                                     var targetNode = parent;
//                                                                     console.log("count => ", i);

//                                                                     // Create a new instance of the MutationObserver
//                                                                     var observer = new MutationObserver(function (mutationsList, observer) {
//                                                                         // Iterate through the list of mutations
//                                                                         if (mutationsList) {
//                                                                             console.log("atts[i].nodeName =>", innerElement.parentElement);
//                                                                             clearTimeout(timeEnd);
//                                                                             observerLoop(i + 1);
//                                                                             observer.disconnect();
//                                                                         }
//                                                                     });

//                                                                     // Configuration options for the observer (e.g., which types of mutations to observe)
//                                                                     var observerConfig = { attributes: true, childList: true, subtree: true };

//                                                                     // Start observing the target node with the specified configuration
//                                                                     observer.observe(targetNode, observerConfig);

//                                                                     console.log("Click =>", parent);

//                                                                     var div1 = document.createElement("div");

//                                                                     div1.classList.add("pageBreakBefore")

//                                                                     // Create the <iframe> element
//                                                                     var iframe = document.createElement("iframe");

//                                                                     iframe.name = `addedIframe-${i}`
//                                                                     iframe.width = "100%";
//                                                                     iframe.style.marginTop = "20px"

//                                                                     iframe.height = parent.offsetHeight + 200;
//                                                                     iframe.frameBorder = "0"
//                                                                     iframe.scrolling = "no"


//                                                                     // Create the <div> element
//                                                                     var div2 = document.createElement("div");

//                                                                     // Set attributes for the <div>
//                                                                     div2.textContent = "This is a div element.";

//                                                                     // Copy the contents of the original <div> to the new <div> element
//                                                                     div2.innerHTML = parent.innerHTML;

//                                                                     // div2.style.pageBreakBefore = "always"

//                                                                     // Add event listener for iframe load event
//                                                                     iframe.addEventListener("load", function () {
//                                                                         // Access the <iframe> contentDocument
//                                                                         var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

//                                                                         iframeDocument.body.appendChild(div2);

//                                                                         // Remove the header element
//                                                                         var header = iframeDocument.querySelector("header"); // Replace "header" with the selector for your header element
//                                                                         if (header) {
//                                                                             header.parentNode.removeChild(header);
//                                                                         }

//                                                                         // Remove the footer element
//                                                                         var footer = iframeDocument.querySelector("footer"); // Replace "footer" with the selector for your footer element
//                                                                         if (footer) {
//                                                                             footer.parentNode.removeChild(footer);
//                                                                         }

//                                                                         // Remove elements with class including "header" or "footer"
//                                                                         var elements = iframeDocument.querySelectorAll("[class*='header'], [class*='footer']");
//                                                                         console.log("elements =>", elements);

//                                                                         elements.forEach(function (element) {
//                                                                             if (element.nodeName === "DIV" || element.nodeName === "SECTION") {
//                                                                                 element.parentNode.removeChild(element);
//                                                                             }
//                                                                         });

//                                                                         const styleElement = iframeDocument.createElement('style');
//                                                                         styleElement.innerHTML = `${mainStyles}`;

//                                                                         iframeDocument.head.appendChild(styleElement);
//                                                                         timeEnd = setTimeout(() => {
//                                                                             console.log("Loop done");
//                                                                             return resolve()
//                                                                         }, 20000);
//                                                                     });

//                                                                     // Append the <iframe> element to the <body>
//                                                                     div1.appendChild(iframe);
//                                                                     document.body.appendChild(div1);

//                                                                     innerElement.click()
//                                                                 }, 10000);
//                                                             }
//                                                             observerLoop(1)
//                                                         }
//                                                     }
//                                                     await loop()
//                                                 } else {
//                                                     console.log("The element is not an anchor element.");
//                                                     return resolve()
//                                                 }
//                                             }
//                                             elementHrefData()
//                                         } else {
//                                             return resolve()
//                                         }
//                                     }
//                                 }
//                             }
//                         } else if (attri === false) {
//                             return resolve()
//                         }
//                     }, 10000);
//                 });
//             }, mainStyles);

//             // await page.waitForTimeout(2000)

//             // await page.evaluate(() => {
//             //     var data = Array.from(document.querySelectorAll('*')).filter(element => {
//             //         const computedStyle = window.getComputedStyle(element);
//             //         return computedStyle.display === 'flex';
//             //     });
//             //     console.log("elementsWithFlexDisplay =>", data);
//             //     data.forEach(element => {
//             //         element.style.flexWrap = 'wrap';
//             //     });
//             // });

//             await page.waitForTimeout(2000)

//             await autoScroll(page);
//             await page.waitForTimeout(2000)
//             await checkSection(page)
//             let mainTag = await page.$("main")
//             if (mainTag) {
//                 await findSectionDivs(page, "main", 1, "parent")
//             } else {
//                 await findSectionDivs(page, "body", 1, "parent");
//             }
//             await checkImage(page)
//             await page.waitForTimeout(5000)
//             await page.emulateMediaType("print");
//             await page.pdf({
//                 path: `pdfs/${fileName}/${fileName}.pdf`,
//                 margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
//                 printBackground: true,
//                 displayHeaderFooter: false,
//                 format: "A4",
//                 scale: 0.3
//             });

//             await page.waitForTimeout(2000)
//             await removePage(fileName).catch((err) => console.log(err));
//             await page.waitForTimeout(2000)
//             // await page.close();
//             console.log("Done");

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     // await browser.close();
// }

// run();


// const checkImage = async (page) => {
//     let style = await page.$$eval("img", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             // const span = document.createElement("span")
//             // span.innerText = 'image'
//             // console.log("span", span);
//             // el.after(span);
//             // el.style.maxWidth = "500px"
//             // el.style.maxHeight = "500px"
//             // const br = document.createElement("br")
//             // el.parentElement.after(br)
//         }
//     })

//     // await page.waitForTimeout(300000)
// }


// const checkVideo = async (page) => {
//     let style = await page.$$eval("video", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             el.remove()
//         }
//     })

//     // await page.waitForTimeout(300000)
// }

// async function autoScroll(page) {
//     await page.evaluate(async () => {
//         await new Promise((resolve) => {
//             var totalHeight = 0;
//             var distance = 50;
//             var timer = setInterval(() => {
//                 var scrollHeight = document.body.scrollHeight;
//                 window.scrollBy(0, distance);
//                 totalHeight += distance;

//                 if (totalHeight >= scrollHeight - window.innerHeight) {
//                     clearInterval(timer);
//                     resolve();
//                 }
//             }, 100);
//         });
//     });
// }


// const checkSection = async (page) => {
//     let style = await page.$$eval("main", els => {
//         let style = ""
//         for (let i = 0; i < els.length; i++) {
//             let el = els[i];
//             let width = el.offsetWidth
//             let height = el.offsetHeight
//             console.log(height);
//             el = el.parentElement
//             el.style.pageBreakAfter = "always"
//             el.style.pageBreakInside = "avoid";
//             el.style.marginTop = "160px"
//         }
//     })

//     // await page.waitForTimeout(300000)
// }

// const findSectionDivs = async (page, el, index, flag) => {
//     let classWithFlag = `mohitTestPDF_${flag}`
//     if (index < 6) {
//         let divtags = await page.$$(`${el} > div`)

//         if (divtags.length && divtags.length < 2) {
//             let previous = ""
//             for (let i = 0; i < divtags.length; i++) {
//                 let element = divtags[i];
//                 let classNameNew = ""
//                 const el = element;
//                 let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                 if (cls && cls.length) {
//                     cls = cls.split(" ");
//                     let parent = "";
//                     for (let j = 0; j < cls.length; j++) {
//                         const el = cls[j];
//                         if (!el == " ") {
//                             parent = parent + "." + el;
//                         }
//                     }
//                     classNameNew = parent
//                 }
//                 else {
//                     let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                     console.log("id ", id);
//                     if (id) {
//                         classNameNew = "#" + id
//                     }
//                     else {
//                         let cllass = "unique_Mohit_test_xyz" + i
//                         await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                         classNameNew = "." + cllass
//                     }
//                 }
//                 // await page.waitForTimeout(1200000)
//                 if (classNameNew != null) {
//                     findSectionDivs(page, classNameNew, index + 1, flag);
//                 } else if (previous) {
//                     console.log(previous);
//                     findSectionDivs(page, `${previous} > div > div`, index + 1, flag);
//                 }
//                 previous = classNameNew
//             }
//         } else if (divtags.length && divtags.length > 2) {
//             let style = "";
//             for (let k = 0; k < divtags.length; k++) {
//                 const el = divtags[k];
//                 let cllass = `${classWithFlag}_${k}`
//                 let x = el
//                 await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
//                 // el.classList.add(`${classWithFlag}_${k}`)
//                 style =
//                     style +
//                     `
//                 .${classWithFlag}_${k} {
//                     page-break-after: always; 
//                     margin-top: 50px; 
//                 }
//                 `;
//                 const pagesRequired = Math.ceil((await el.evaluate(x => x.offsetHeight) / 1122) / 2)
//                 if (pagesRequired > 1) {
//                     let classNameNew = ""
//                     let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                     if (cls && cls.length) {
//                         cls = cls.split(" ");
//                         let parent = "";
//                         for (let j = 0; j < cls.length; j++) {
//                             const el = cls[j];
//                             parent = parent + "." + el;
//                         }
//                         classNameNew = parent
//                     }
//                     else {
//                         let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                         if (id) {
//                             classNameNew = "#" + id
//                         }
//                         else {
//                             let cllass = "unique_Mohit_z" + i
//                             await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                             classNameNew = "." + cllass
//                         }
//                     }
//                 }
//             }
//             return await page.addStyleTag({
//                 content: `
//       @page {
//         size: A4;
//       }
//       ${style}
//       `,
//             });
//         }
//     }
//     else {
//         console.log("senasio => 2");
//         check2Div(page, "body")
//     }
// };

// const secondLevelFindSections = async (page, el, index, flag, pagesRequired) => {
//     // console.log("Pages =>", page, el, index, flag, pagesRequired);
//     let classWithFlag = `mohitPDF_${flag}`
//     if (index < 12) {
//         console.log("senasio => 1");
//         let divtags = await page.$$(`${el} > div`)
//         console.log("divtags-1 =>", divtags);
//         if (divtags.length && divtags.length < 2) {
//             console.log("senasio => 1.1");
//             let previous = ""
//             for (let i = 0; i < divtags.length; i++) {
//                 let element = divtags[i];
//                 let classNameNew = ""
//                 const el = element;
//                 console.log(el);
//                 let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
//                 console.log("cls ", cls);
//                 if (cls && cls.length) {
//                     cls = cls.split(" ");
//                     let parent = "";
//                     for (let j = 0; j < cls.length; j++) {
//                         const el = cls[j];
//                         parent = parent + "." + el;
//                     }
//                     classNameNew = parent
//                 }
//                 else {
//                     let id = await el.evaluate(x => x.getAttribute("id")?.trim())
//                     console.log("id ", id);
//                     if (id) {
//                         classNameNew = "#" + id
//                     }
//                     else {
//                         let cllass = "unique_Mohit_test_xyz" + i
//                         await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
//                         classNameNew = "." + cllass
//                     }
//                 }
//                 console.log(classNameNew);
//                 if (classNameNew != null) {
//                     secondLevelFindSections(page, classNameNew, index + 1, flag, pagesRequired);
//                 } else if (previous) {
//                     console.log(previous);
//                     secondLevelFindSections(page, `${previous} > div > div`, index + 1, flag, pagesRequired);
//                 }
//                 previous = classNameNew
//             }
//         } else if (divtags.length && divtags.length > 2) {
//             console.log("senasio => 1.2");
//             let el = divtags[0]

//             let breakIndex = await page.evaluate((el, pagesRequired) => {
//                 console.log("parent =>", pagesRequired, el);
//                 let parent = el.parentElement
//                 let children = parent.childNodes
//                 let breakIndex = Math.ceil(children.length / pagesRequired)
//                 for (let i = breakIndex; i < children.length; i = i + breakIndex) {
//                     const element = children[i];
//                     element.style.pageBreakAfter = "always"
//                     element.style.marginTop = "50px"
//                 }
//                 return breakIndex
//             }, el, pagesRequired)
//             console.log("breakIndex => ", breakIndex);
//         }
//     }
//     else {
//         console.log("senasio => 2");
//         check2Div(page, "body")
//     }
// };

// let check2Div = async (page, el) => {
//     let divtags = await page.$$eval(`${el} > div`, (els) => {
//         let data = []
//         for (let i = 0; i < els.length; i++) {
//             const el = els[i];
//             let cls = el.getAttribute("class")?.trim()
//             if (cls && cls.length) {
//                 cls = cls.split(" ");
//                 let parent = "";
//                 for (let j = 0; j < cls.length; j++) {
//                     const el = cls[j];
//                     parent = parent + "." + el;
//                 }
//                 data.push(parent)
//             }
//             else {
//                 let id = el.getAttribute('id')?.trim()
//                 if (id) {
//                     data.push("#" + id)
//                 }
//                 else {
//                     continue;
//                 }
//             }
//         }
//         return data
//     }

//     );
//     if (divtags.length && divtags.length < 1) {
//         console.log("senasio => 1.1");
//         for (let i = 0; i < divtags.length; i++) {
//             let element = divtags[i];
//             if (element) {
//                 check2Div(page, element);
//             } else {
//                 check2Div(page, `${el} > div > div`);
//             }
//         }
//     } else if (divtags.length && divtags.length > 2) {
//         console.log("senasio => 1.2");
//         let style = "";
//         for (let k = 0; k < divtags.length; k++) {
//             const el = divtags[k];
//             console.log((el && (el.includes(".") || el.includes("#"))))
//             if (el && (el.includes(".") || el.includes("#"))) {
//                 style =
//                     style +
//                     `
//         ${el} {
//           page-break-after: always; 
//           margin-top: 50px; 
//         }
//       `;
//             }
//         }

//         console.log("style => ", style);

//         return await page.addStyleTag({
//             content: `
//     @page {
//       size: A4;
//     }
//     ${style}
//     `,
//         });
//     }
// }

// async function checkRemovePopups(page) {
//     let style = await page.$$eval("*", els => {
//         var elems = els;
//         var len = elems.length
//         console.log(els);

//         for (var i = 0; i < len; i++) {
//             try {
//                 var computedStyle = window.getComputedStyle(elems[i], null);
//                 var tagName = elems[i].tagName.toLowerCase();

//                 if (tagName === "header") {
//                     // var headerValue = computedStyle.getPropertyValue("header");

//                     console.log("Computed header value:", computedStyle.getPropertyValue());
//                 } else if (window.getComputedStyle(elems[i], null).getPropertyValue('position') == 'fixed') {
//                     var classLoop1 = elems[i].id ? ["#" + elems[i].id] : elems[i].className.split(" ");
//                     // console.log(classLoop1)
//                     classLoop1 = classLoop1.filter(items => items !== "")
//                     classLoop1 = classLoop1.filter(items => items !== " ")

//                     if (elems[i].className.toLowerCase().includes("header") || elems[i].className.toLowerCase().includes("navbar")) {
//                         console.log("elems[i] true =>", elems[i], classLoop1)
//                     } else {
//                         var allData = classLoop1.map((items) => {
//                             return elems[i].id ? items : "." + items
//                         })
//                         // console.log("allData =>",allData)
//                         const parentElement = document.querySelector(allData.join(""));
//                         // console.log(parentElement)
//                         const nestedElements = parentElement.querySelectorAll("*");


//                         console.log("nestedElements.length =>", nestedElements)

//                         if (nestedElements.length) {
//                             // Iterate over each nested element and log its class names
//                             for (const element of nestedElements) {
//                                 var classNames = Array.from(element.classList);
//                                 if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                                     // console.log("elems[i] false =>", elems[i], classLoop1)
//                                     elems[i].remove();
//                                     break;
//                                     // return;
//                                 }
//                             };
//                         } else if (parentElement) {
//                             var classNames = Array.from(nestedElements.classList);
//                             // console.log("classNames =>", classNames)
//                             if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
//                                 console.log("elems[i] false =>", elems[i], classLoop1)
//                                 elems[i].remove();
//                             }
//                         }
//                     }
//                 }
//             } catch (error) {
//                 // console.log(error)
//             }
//         }
//     })
// }

// async function removePage(filePathOld, pageNumber) {
//     // const { writeFileSync, readFileSync } = require("fs");
//     // const { PDFDocument } = require("pdf-lib");
//     // const pdf = require('pdf-parse');

//     // const dataBuffer = await readFileSync(`pdfs/${filePath}/${filePath}${pageNumber ? pageNumber : ""}.pdf`);
//     // const letters = await PDFDocument.load(readFileSync(`pdfs/${filePath}/${filePath}${pageNumber ? pageNumber : ""}.pdf`));

//     // await pdf(dataBuffer).then(async function (data) {
//     //     const pages = data.text.split('\n\n'); // Split the text by page

//     //     var num = 1
//     //     for (let i = 0; i < pages.length; i++) {
//     //         // Get the text of the desired page
//     //         const desiredPageText = pages[i];

//     //         // console.log("desiredPageText =>", desiredPageText);


//     //         if (!desiredPageText && i !== 0) {
//     //             console.log(` `);
//     //             console.log(`Text of page ${num}:`);
//     //             console.log(desiredPageText);
//     //             await letters.removePage(i - num);
//     //             num = num + 1
//     //         }
//     //     }
//     //     await writeFileSync(`pdfs_test/${filePath}/${filePath}${pageNumber ? pageNumber : ""}.pdf`, await letters.save());
//     // }).catch(function (error) {
//     //     console.log('An error occurred:', error);
//     // });


//     const { writeFileSync, readFileSync, readdirSync } = require("fs");
//     const { PDFDocument } = require("pdf-lib");
//     const pdf = require("pdf-parse");

//     // Directory path containing the PDF files
//     const directoryPath = `pdfs/${filePathOld}`;

//     // Read the list of files in the directory
//     const files = await readdirSync(directoryPath);
//     console.log(files);

//     // Loop through each PDF file
//     for (const file of files) {
//         if (file.endsWith(".pdf")) {
//             // Construct the file path
//             const filePath = `${directoryPath}/${file}`;

//             // Read the file buffer
//             const dataBuffer = readFileSync(filePath);

//             // Load the PDF document
//             const letters = await PDFDocument.load(dataBuffer);

//             await pdf(dataBuffer)
//                 .then(async function (data) {
//                     const pages = data.text.split("\n\n"); // Split the text by page

//                     let num = 1;
//                     for (let i = 0; i < pages.length; i++) {
//                         // Get the text of the desired page
//                         const desiredPageText = pages[i];

//                         if (!desiredPageText && i !== 0) {
//                             console.log(`Text of page ${num}:`);
//                             console.log(desiredPageText);
//                             await letters.removePage(i - num);
//                             num++;
//                         }
//                     }

//                     // Save the modified PDF
//                     const outputFilePath = `pdfs_test/${filePathOld}/${file}`;
//                     await writeFileSync(outputFilePath, await letters.save());
//                     // console.log(`Processed PDF: ${file}. Saved as: ${outputFilePath}`);
//                 })
//                 .catch(function (error) {
//                     console.log(`An error occurred while processing PDF: ${file}`);
//                     console.log("Error:", error);
//                 });
//         }
//     }
// }
// // *************************************************************************************************************** */
// 10-07-2023 header & footer every pdf, add styles from scripts *************************************************************************************************************** */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Specify the path and name of the parent folder
const parentFolderPath = './pdfs';
const parentFolderPath2 = './pdfs_test';


async function run() {

    const customArgs = [
        "--start-maximized",
        "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
    ];

    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        protocolTimeout: 1200000,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
        args: customArgs,
    });


    // // "Single page toggle sections"
    // const allUrls = [
    //     "https://investor.marketaxess.com/governance/executive-management/default.aspx",
    //     "https://investors.paycom.com/Corporate-Governance/Board-of-Directors/default.aspx",
    //     "https://investors.principal.com/investor-relations/our-business/leadership/senior-management-bios/default.aspx",
    //     "https://investor.marketaxess.com/governance/board-of-directors/default.aspx",
    //     "https://investors.principal.com/investor-relations/our-business/leadership/board-of-director-bios/default.aspx",
    //     "https://ir.maac.com/overview/directors-and-management/default.aspx",
    //     "https://ir.mtch.com/corporate-governance/board-of-directors/default.aspx",
    //     "https://ir.questdiagnostics.com/governance/management-team/default.aspx",
    //     "https://ir.questdiagnostics.com/governance/board-of-directors/default.aspx",
    //     "https://ir.dish.com/corporate-governance/board-of-directors",
    //     "https://investor.dollargeneral.com/websites/dollargeneral/English/4000/management-team.html",
    //     "https://investor.dollargeneral.com/websites/dollargeneral/English/5100/board-of-directors.html",
    //     "https://ir.ea.com/corporate-governance/board-of-directors/default.aspx",
    //     "https://investors.eastman.com/governance/board-of-directors/default.aspx",
    //     "https://www.elcompanies.com/en/investors/corporate-governance/board-of-directors",
    //     "https://investors.equityapartments.com/overview/officers-and-trustees/default.aspx",
    //     "https://investors.essexapartmenthomes.com/corporate-information/officers-directors/default.aspx",
    //     "https://investors.etsy.com/governance/board-of-directors/default.aspx",
    //     "https://investor.expeditors.com/corporate-governance/board-of-directors-and-board-diversity-matrix",
    //     "https://investor.fastenal.com/governance/management/default.aspx",
    //     "https://investor.fastenal.com/governance/board-of-directors/default.aspx",
    //     "https://investors.fedex.com/esg/board-of-directors/default.aspx",
    //     "https://investor.marketaxess.com/governance/executive-management/default.aspx",
    //     "https://investor.marketaxess.com/governance/board-of-directors/default.aspx",
    //     "https://www.mastercard.com/news/press/executive-bios/",
    //     "https://ir.mtch.com/corporate-governance/board-of-directors/default.aspx",
    //     "https://www.metlife.com/about-us/corporate-governance/board-of-directors/",
    //     "https://www.monolithicpower.com/en/about-mps/investor-relations/corporate-governance/management.html"
    // ]

    // // "Single Page content popups"
    // const allUrls = [
    //     "https://about.netflix.com/en/leadership",
    //     "https://about.nike.com/en/company",
    //     "https://esg.revvity.com/governance/",
    //     "https://investor.phillips66.com/corporate-governance/",
    //     "https://mtch.com/leadership",
    //     "https://newscorp.com/news-corp-leadership/",
    //     "https://nucor.com/leadership",
    //     "https://www.ea.com/executives",
    //     "https://www.ebayinc.com/company/our-leaders/",
    //     "https://investors.ebayinc.com/corporate-governance/board-of-directors/default.aspx",
    //     "https://www.eogresources.com/company/board-of-directors/",
    //     "https://www.eogresources.com/company/leadership/",
    //     "https://ir.edwards.com/governance-sustainability/governance/board-of-directors/default.aspx",
    //     "https://www.exeloncorp.com/leadership-and-governance/executive-profiles",
    //     "https://www.exeloncorp.com/leadership-and-governance/board-of-directors",
    //     "https://www.expediagroup.com/who-we-are/leadership/default.aspx",
    //     "https://www.expeditors.com/about-us/leadership",
    //     "https://www.marathonpetroleum.com/About/Leadership/",
    //     "https://www.marathonpetroleum.com/About/Board-of-Directors/",
    //     "https://www.marshmclennan.com/about/leadership.html"
    // ]

    // // "Click Next scenarios"
    // const allUrls = [
    //     "https://investors.paycom.com/corporate-governance/management/default.aspx",
    //     "https://mohawkind.com/about/leadership.php",
    //     "https://www.discover.com/company/our-company/meet-the-team/board-of-directors/",
    //     "https://www.marshmclennan.com/about/leadership.html"
    // ]

    // "Read more scenarios"
    const allUrls = [
        "https://www.pmi.com/our-leadership-team",
        "https://www.dishtv.in/Pages/AboutUs/Top-Management-Profiles.aspx",
        "https://corporate.dollartree.com/about/leadership/executive-leadership",
        "https://corporate.dollartree.com/about/leadership/board-of-directors",
        "https://biz.dominos.com/about-us/leadership/",
        "https://investors.dow.com/en/corporate-governance/board-of-directors/default.aspx",
        "https://www.dupont.com/about/leadership.html",
        "https://dxc.com/us/en/about-us/leadership-and-governance",
        "https://www.eastman.com/en/who-we-are/our-organization/leadership",
        "https://www.ecolab.com/about/leadership",
        "https://www.elcompanies.com/en/investors/corporate-governance/executive-officers",
        "https://www.equifax.com/about-equifax/leadership/",
        "https://investors.evergy.com/about-evergy/leadership-team",
        "https://www.factset.com/our-company/our-leadership",
        "https://investor.factset.com/corporate-governance/board-of-directors",
        "https://www.marathonpetroleum.com/About/Leadership/",
        "https://www.marathonpetroleum.com/About/Board-of-Directors/"
    ]

    // // "On hover content"
    // const allUrls = []

    // // "Pagination"
    // const allUrls = [
    //     "https://investors.epam.com/investors/leadership-and-governance"
    // ]

    // // "Input questionaries"
    // const allUrls = [
    //     "https://www.elcompanies.com/en/investors/corporate-governance/board-of-directors",
    //     "https://www.fedex.com/en-us/about/leadership.html"
    // ]

    // const allUrls = ["https://www.pixium-vision.com/board-of-directors-2/", "https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
    // const allUrls = ["https://mtch.com/leadership"]

    for (let i = 0; i < allUrls.length; i++) {
        try {
            const url = allUrls[i];
            const URL = url;
            console.log("URL =>", URL);
            var fileName = URL.split("/")
            fileName = fileName.splice(2, fileName.length)
            fileName = fileName.join("_")
            console.log("fileName =>", fileName);

            // Specify the name of the new folder
            const newFolderName = fileName;

            // Create the new folder within the parent folder
            const newFolderPath = path.join(parentFolderPath, newFolderName);
            const newFolderPath2 = path.join(parentFolderPath2, newFolderName);

            fs.mkdir(newFolderPath, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating folder:', err);
                } else {
                    console.log('Folder created successfully!');
                }
            });

            fs.mkdir(newFolderPath2, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating folder:', err);
                } else {
                    console.log('Folder created successfully!');
                }
            });


            let page = await browser.newPage();
            await page.setDefaultTimeout(0)
            await page.setDefaultNavigationTimeout(0)

            await page.goto(URL, { waitUntil: "networkidle0", timeout: 0 });

            await checkVideo(page)

            await page.waitForTimeout(5000)

            var pageNumber = 1

            var title = "none"

            async function test_pdfPage(profileName1, pageTitle) {

                title = pageTitle
                await page.emulateMediaType("screen");
                await page.pdf({
                    path: `pdfs/${fileName}/${fileName}${pageNumber}.pdf`,
                    margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
                    printBackground: true,
                    format: "A4",
                    scale: 0.5
                });

                var websiteName = URL


                // Usage example
                await addPageNumbersToPDF(`pdfs/${fileName}/${fileName}${pageNumber}.pdf`, profileName1, websiteName, pageTitle)
                    .then(() => {
                        console.log('Page numbers added successfully!');
                    })
                    .catch((error) => {
                        console.log('Error adding page numbers:', error);
                    });

                pageNumber = pageNumber + 1

                // await page.evaluate(async () => {
                //     // Get elements with attribute names or class names containing "close"
                //     const elementsWithCloseAttributes = Array.from(document.querySelectorAll('*')).filter(element => {
                //         const attributes = Array.from(element.attributes);
                //         const classNames = Array.from(element.classList);
                //         return (
                //             attributes.some(attribute => attribute.name.toLowerCase().includes('close')) ||
                //             classNames.some(className => className.toLowerCase().includes('close'))
                //         );
                //     });

                //     console.log("elementsWithCloseAttributes =>", elementsWithCloseAttributes);

                //     setTimeout(() => {
                //         // Click on each element
                //         elementsWithCloseAttributes.forEach(closeElement => {
                //             const event = new MouseEvent('click', {
                //                 bubbles: true,
                //                 cancelable: true,
                //                 view: window
                //             });
                //             closeElement.dispatchEvent(event);
                //         });
                //     }, 2000);
                // });



            }

            await page.exposeFunction("test_pdfPage", test_pdfPage);

            await page.evaluate(async () => {
                return new Promise(async (resolve) => {
                    // Helper function to check if an element or its ancestors have an href attribute
                    function hasHrefAncestor(element) {
                        let currentElement = element;
                        while (currentElement) {
                            if (currentElement.hasAttribute("href")) {
                                return true;
                            }
                            currentElement = currentElement.parentElement;
                        }
                        return false;
                    }
                    // Get all div or button elements with cursor: pointer and without href attribute in self or ancestors
                    const pointerElementsWithoutHrefAncestors = Array.from(document.querySelectorAll("div, button")).filter(element => {
                        const styles = window.getComputedStyle(element);
                        return styles.getPropertyValue("cursor") === "pointer" && !hasHrefAncestor(element);
                    }).filter(element => {
                        const attributes = Array.from(element.attributes).map(attr => attr.name);
                        const classNames = element.className.split(" ");
                        return !attributes.some(attr => attr.toLowerCase().includes("nav") || attr.toLowerCase().includes("menu") || attr.toLowerCase().includes("dropdown")) &&
                            !classNames.some(className => className.toLowerCase().includes("nav") || className.toLowerCase().includes("menu") || className.toLowerCase().includes("dropdown")) &&
                            !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("search")) &&
                            !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("subscribe")) &&
                            !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("submit")) &&
                            !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("next")) &&
                            !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("previous")) &&
                            !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("nav"));
                    }).filter(element => !element.hasAttribute("onclick"));

                    if (pointerElementsWithoutHrefAncestors.length) {
                        for (let i = 0; i < pointerElementsWithoutHrefAncestors.length; i++) {
                            setTimeout(async () => {
                                try {

                                    var pageTitle = document.title;

                                    console.log("i =>", i + 1, pointerElementsWithoutHrefAncestors.length);
                                    console.log(pointerElementsWithoutHrefAncestors[i]);
                                    pointerElementsWithoutHrefAncestors[i].click();

                                    var profileName1 = null;

                                    // Create a new MutationObserver
                                    const observer = new MutationObserver(mutations => {
                                        mutations.forEach(mutation => {
                                            if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE && mutation.target.nodeName !== "BODY") {
                                                const elements = mutation.target.getElementsByClassName('name'); // Get elements with class 'name'

                                                for (let i = 0; i < elements.length; i++) {
                                                    // console.log("Mutation target:", [mutation.target]); // Element that has changed
                                                    console.log("Inner element:", elements[i].innerText); // Inner element with class 'name'
                                                    profileName1 = elements[i].innerText
                                                }
                                            }
                                        });
                                    });

                                    // Start observing the document for attribute changes on elements
                                    await observer.observe(document, { attributes: true, subtree: true });


                                    setTimeout(async () => {
                                        await test_pdfPage(profileName1, pageTitle);
                                        console.log("profileName1 =>", profileName1);
                                        observer.disconnect()
                                    }, 5000);

                                    // Get elements with attribute names or class names containing "close"
                                    const elementsWithCloseAttributes = Array.from(document.querySelectorAll('*')).filter(element => {
                                        const attributes = Array.from(element.attributes);
                                        const classNames = Array.from(element.classList);
                                        return (
                                            attributes.some(attribute => attribute.name.toLowerCase().includes('close')) ||
                                            classNames.some(className => className.toLowerCase().includes('close'))
                                        );
                                    }).filter(element => !element.hasAttribute("onclick"));

                                    console.log("elementsWithCloseAttributes =>", elementsWithCloseAttributes);

                                    setTimeout(() => {
                                        // Click on each element
                                        elementsWithCloseAttributes.forEach(closeElement => {
                                            const event = new MouseEvent('click', {
                                                bubbles: true,
                                                cancelable: true,
                                                view: window
                                            });
                                            closeElement.dispatchEvent(event);
                                        });
                                    }, 7000);

                                    if ((i + 1) === pointerElementsWithoutHrefAncestors.length) {
                                        setTimeout(() => {
                                            console.log("Resolved");
                                            resolve();
                                        }, 5000);
                                    }
                                } catch (error) {
                                    console.log("Error =>", error);
                                }
                            }, i * 5000); // 10 seconds delay between clicks
                        }
                    } else {
                        resolve();
                    }
                })
            })


            async function test_cssPage(link) {
                let pageInternal = await browser.newPage();
                try {
                    await pageInternal.goto(link, { timeout: 0 });
                    console.log("Getting in =>", link);

                    await pageInternal.waitForTimeout(2000)

                    const offsetHeight = await pageInternal.evaluate(() => {
                        const body = document.querySelector("pre");
                        console.log("body =>", body);
                        return body ? body.innerText : ""
                    });

                    await pageInternal.close();

                    return offsetHeight;
                } catch (error) {
                    console.log("Error =>", error);
                    await pageInternal.close();
                    return null
                }
            }

            await page.exposeFunction("test_cssPage", test_cssPage);

            async function test_newPage(link) {
                let pageInternal = await browser.newPage();
                try {

                    await pageInternal.goto(link, { timeout: 0 });
                    console.log("Getting in");

                    await pageInternal.waitForTimeout(5000)
                    await autoScroll(pageInternal);

                    const offsetHeight = await pageInternal.evaluate(() => {
                        const body = document.body;
                        console.log("offsetHeight =>", body);
                        return body.offsetHeight;
                    });

                    await pageInternal.close();

                    return offsetHeight;

                } catch (error) {
                    console.log("Error =>", error);
                    await pageInternal.close();
                    return ""
                }
            }

            await page.exposeFunction("test_newPage", test_newPage);

            var mainStyles;
            await fs.readFile('public/puppeteerMain.css', 'utf8', (err, data) => {
                return new Promise(async (resolve) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    // Parse the CSS file to extract the classes
                    const classes = data;
                    mainStyles = classes
                    resolve();
                })
            });

            await page.evaluate(async () => {

                let styles = document.querySelectorAll('style')

                for (let i = 0; i < styles.length; i++) {
                    const el = styles[i];
                    styles[i].remove()
                    document.head.appendChild(el)
                }

                let links = document.querySelectorAll("link")

                // console.log(links);

                for (let i = 0; i < links.length; i++) {
                    if (links[i].rel && links[i].rel === "stylesheet" && links[i].href.includes("https")) {
                        var body = await test_cssPage(links[i].href)
                        const styleElement = document.createElement('style');
                        styleElement.innerHTML = `${body}`;
                        document.head.appendChild(styleElement);
                        console.log("body =>", styleElement);
                        links[i].remove()
                    } else {
                        links[i].remove()
                    }
                }
            })

            await page.evaluate(() => {
                let allelss = document.querySelectorAll("*")
                let scripts = document.querySelectorAll('script')
                let headers = document.querySelectorAll('header')
                let footers = document.querySelectorAll('footer')


                // Loop through each element
                allelss.forEach(element => {
                    // Get all attributes of the element
                    const attributes = element.attributes;

                    // Loop through each attribute
                    for (let i = 0; i < attributes.length; i++) {
                        const attribute = attributes[i];
                        const attributeValue = attribute.value;

                        // Check if the attribute value contains the word "sticky"
                        if (attributeValue && attributeValue === 'sticky') {
                            // Remove the element
                            element.remove();
                            break; // Exit the loop once an attribute is found with the word "sticky"
                        }
                    }
                });

                for (let i = 0; i < scripts.length; i++) {
                    const link = scripts[i];
                    console.log("links[i] =>", scripts[i]);
                    link.remove()
                }
                for (let i = 0; i < headers.length; i++) {
                    const header = headers[i];
                    header.remove()
                }
                for (let i = 0; i < footers.length; i++) {
                    const footer = footers[i];
                    footer.remove()
                }

                let allels = document.querySelectorAll("*[style]");

                setInterval(() => {
                    for (let i = 0; i < allels.length; i++) {
                        const el = allels[i];
                        // console.log(el)
                        for (let r = 0; r < el.style.length; r++) {
                            const element = el.style[r];
                            // console.log("el.style.display =>", el.style.display);
                            if (
                                element !== "flex-display" &&
                                element !== "flex-direction" &&
                                element !== "flex-wrap" &&
                                element !== "flex-flow" &&
                                element !== "justify-content" &&
                                element !== "align-items" &&
                                element !== "gap" &&
                                element !== "row-gap" &&
                                element !== "column-gap" &&
                                !element.includes("margin") &&
                                !element.includes("padding")
                            ) {
                                el.style[`${element}`] = ""
                            } else if (
                                el.style.display !== "grid" &&
                                el.style.display !== "flex" &&
                                el.style.display !== "inline" &&
                                el.style.display !== "inline-block"
                            ) {
                                el.style[`${element}`] = ""
                            }
                        }
                    }
                }, 500);

                const allowedProperties = [
                    'flex-direction',
                    'flex-wrap',
                    'flex-flow',
                    'justify-content',
                    'align-items',
                    'gap',
                    'row-gap',
                    'column-gap',
                    'margin',
                    'margin-top',
                    'margin-bottom',
                    'margin-right',
                    'margin-left',
                    'padding',
                    'padding-top',
                    'padding-bottom',
                    'padding-right',
                    'padding-left',
                    'display'
                ];

                const allowedDisplayValues = [
                    'flex',
                    'grid',
                    'inline',
                    'inline-block'
                ];

                const styleSheetList = document.styleSheets;
                const newStyleElement = document.createElement('style');
                newStyleElement.id = "merged_styles";

                for (let i = 0; i < styleSheetList.length; i++) {
                    const styleSheet = styleSheetList[i];
                    const rules = styleSheet.cssRules || styleSheet.rules; // Handle different browser compatibility

                    for (let j = 0; j < rules.length; j++) {
                        const rule = rules[j];

                        // Check if the rule is a CSSStyleRule and not a CSSImportRule or other type of rule
                        if (rule instanceof CSSStyleRule) {
                            const { style } = rule;

                            // Check if display is flex and add flex-wrap: wrap
                            if (style.display === 'flex') {
                                style.setProperty('flex-wrap', 'wrap');
                            }

                            // Remove properties that are not in the allowed list
                            for (let k = style.length - 1; k >= 0; k--) {
                                const property = style[k];
                                if (!allowedProperties.includes(property)) {
                                    style.removeProperty(property);
                                }
                            }

                            // Check display property and remove if not in allowed display values
                            const display = style.getPropertyValue('display');
                            if (!allowedDisplayValues.includes(display)) {
                                style.removeProperty('display');
                            }

                            // Append the modified rule to the new style element
                            newStyleElement.appendChild(
                                document.createTextNode(`${rule.selectorText} { ${style.cssText} }`)
                            );
                        }
                    }
                }

                document.head.appendChild(newStyleElement);


                setTimeout(() => {
                    let styles = document.querySelectorAll('style')

                    for (let i = 0; i < styles.length; i++) {
                        console.log(styles[i]);
                        if (!styles[i].id && (styles[i].id !== "merged_styles" || styles[i].id !== "puppeteerMain")) {
                            const el = styles[i];
                            el.remove()
                        }
                    }
                }, 1000);
            })

            await page.waitForTimeout(5000)

            await page.addStyleTag({ path: 'public/puppeteerMain.css' })

            // Add attribute to every element
            await page.evaluate(async (mainStyles) => {
                const elements = document.querySelectorAll('*');
                for (const element of elements) {
                    element.setAttribute('data-pf_style_display', 'block');
                    element.setAttribute('data-pf_style_visibility', 'visible');
                    element.setAttribute('orig-style', 'null');
                }
                const buttons = document.querySelectorAll('button');
                for (const button of buttons) {
                    if (!button.querySelector('a') && (button.innerText.toLowerCase().includes("read more") || button.innerText.toLowerCase().includes("learn more") || button.innerText.toLowerCase().includes("more"))) {
                        button.click();
                    }
                }

                var allLinks = [];

                const links = document.querySelectorAll('a');
                console.log("all links =>", links);
                for (const link of links) {
                    var bodyBaseURI = document.querySelector('body').baseURI.split("/")[2];

                    if (!link.querySelector('a') && (link.innerText.toLowerCase().includes("read more") || link.innerText.toLowerCase().includes("learn more") || link.innerText.toLowerCase().includes("more"))) {
                        if (link.getAttribute("href") && link.getAttribute("href").includes(bodyBaseURI.replace(/^(https?:\/\/)?(www\.)?/, '$1'))) {
                            const allLinksFilter = await allLinks.filter(items => items === link.getAttribute("href"));
                            console.log("links =>", allLinksFilter);
                            if (!allLinksFilter.length) {
                                console.log("link.getAttribute(href) =>", link.getAttribute("href"));
                                var height = await test_newPage(link.getAttribute("href"))

                                console.log("height =>", height);

                                // Create the <iframe> element
                                var iframe = document.createElement("iframe");
                                iframe.src = link.getAttribute("href")
                                iframe.classList.add("pageBreakBefore")
                                iframe.width = "100%";
                                iframe.height = height;
                                iframe.style.marginTop = "20px"
                                iframe.frameBorder = "0"
                                iframe.scrolling = "no"


                                // Add event listener for iframe load event
                                iframe.addEventListener("load", function () {
                                    // Access the <iframe> contentDocument
                                    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

                                    // Remove the header element
                                    var header = iframeDocument.querySelector("header"); // Replace "header" with the selector for your header element
                                    if (header) {
                                        header.parentNode.removeChild(header);
                                    }

                                    // Remove the footer element
                                    var footer = iframeDocument.querySelector("footer"); // Replace "footer" with the selector for your footer element
                                    if (footer) {
                                        footer.parentNode.removeChild(footer);
                                    }

                                    // Remove elements with class including "header" or "footer"
                                    var elements = iframeDocument.querySelectorAll("[class*='header'], [class*='footer']");
                                    console.log("elements =>", elements);

                                    elements.forEach(function (element) {
                                        if (element.nodeName === "DIV" || element.nodeName === "SECTION") {
                                            element.parentNode.removeChild(element);
                                        }
                                    });

                                    const styleElement = iframeDocument.createElement('style');
                                    styleElement.innerHTML = `${mainStyles}`;

                                    iframeDocument.head.appendChild(styleElement);
                                });

                                console.log("iframe =>", iframe);

                                document.body.appendChild(iframe)
                                allLinks.push(link.getAttribute("href"))
                            }
                        }
                    }
                }

                var body = await document.querySelector('body');
                body.classList.add("content-unmask")
                body.classList.add("cs-algo-iframe")
                body.classList.add("px-2")
                body.classList.add("px-sm-4")
                body.classList.add("px-md-5")
                body.classList.add("pt-2")
                body.classList.add("pt-sm-3")
                body.classList.add("direction-ltr")
                body.id = "pf-body"

            }, mainStyles);

            await page.waitForTimeout(2000)

            // Add attribute to every element
            await page.evaluate(async (mainStyles) => {
                return new Promise(async (resolve) => {
                    const elements = document.querySelectorAll('*');

                    var attri = false;

                    for (const innerElement of elements) {
                        for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
                            if (atts[i].nodeValue.toLocaleLowerCase() === "next" || atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
                                attri = true
                            }
                        }
                    }


                    setTimeout(async () => {
                        if (attri === true) {
                            for (const innerElement of elements) {
                                for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
                                    if (atts[i].nodeValue.toLocaleLowerCase() === "next" || atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
                                        if (innerElement.href && !innerElement.href.toLocaleLowerCase().includes("https")) {
                                            console.log("atts[i].nodeValue.toLocaleLowerCase() =>", innerElement.href.toLocaleLowerCase().includes("https"));
                                            var elementHrefData = async () => {
                                                if (innerElement.tagName === "A" && !innerElement.getAttribute("href").includes("https")) {
                                                    console.log("The element is an anchor (<a>) element.");
                                                    var parent = innerElement
                                                    const loop = async () => {
                                                        if (parent.offsetHeight < 500) {
                                                            parent = await parent.parentElement
                                                            loop()
                                                        } else {
                                                            console.log("element =>", innerElement)

                                                            var timeEnd;

                                                            // Select the target node (in this case, the <body> element)
                                                            const observerLoop = async (i) => {
                                                                setTimeout(() => {
                                                                    var targetNode = parent;
                                                                    console.log("count => ", i);

                                                                    // Create a new instance of the MutationObserver
                                                                    var observer = new MutationObserver(function (mutationsList, observer) {
                                                                        // Iterate through the list of mutations
                                                                        if (mutationsList) {
                                                                            console.log("atts[i].nodeName =>", innerElement.parentElement);
                                                                            clearTimeout(timeEnd);
                                                                            observerLoop(i + 1);
                                                                            observer.disconnect();
                                                                        }
                                                                    });

                                                                    // Configuration options for the observer (e.g., which types of mutations to observe)
                                                                    var observerConfig = { attributes: true, childList: true, subtree: true };

                                                                    // Start observing the target node with the specified configuration
                                                                    observer.observe(targetNode, observerConfig);

                                                                    console.log("Click =>", parent);

                                                                    var div1 = document.createElement("div");

                                                                    div1.classList.add("pageBreakBefore")

                                                                    // Create the <iframe> element
                                                                    var iframe = document.createElement("iframe");

                                                                    iframe.name = `addedIframe-${i}`
                                                                    iframe.width = "100%";
                                                                    iframe.style.marginTop = "20px"

                                                                    iframe.height = parent.offsetHeight + 200;
                                                                    iframe.frameBorder = "0"
                                                                    iframe.scrolling = "no"


                                                                    // Create the <div> element
                                                                    var div2 = document.createElement("div");

                                                                    // Set attributes for the <div>
                                                                    div2.textContent = "This is a div element.";

                                                                    // Copy the contents of the original <div> to the new <div> element
                                                                    div2.innerHTML = parent.innerHTML;

                                                                    // div2.style.pageBreakBefore = "always"

                                                                    // Add event listener for iframe load event
                                                                    iframe.addEventListener("load", function () {
                                                                        // Access the <iframe> contentDocument
                                                                        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

                                                                        iframeDocument.body.appendChild(div2);

                                                                        // Remove the header element
                                                                        var header = iframeDocument.querySelector("header"); // Replace "header" with the selector for your header element
                                                                        if (header) {
                                                                            header.parentNode.removeChild(header);
                                                                        }

                                                                        // Remove the footer element
                                                                        var footer = iframeDocument.querySelector("footer"); // Replace "footer" with the selector for your footer element
                                                                        if (footer) {
                                                                            footer.parentNode.removeChild(footer);
                                                                        }

                                                                        // Remove elements with class including "header" or "footer"
                                                                        var elements = iframeDocument.querySelectorAll("[class*='header'], [class*='footer']");
                                                                        console.log("elements =>", elements);

                                                                        elements.forEach(function (element) {
                                                                            if (element.nodeName === "DIV" || element.nodeName === "SECTION") {
                                                                                element.parentNode.removeChild(element);
                                                                            }
                                                                        });

                                                                        const styleElement = iframeDocument.createElement('style');
                                                                        styleElement.innerHTML = `${mainStyles}`;

                                                                        iframeDocument.head.appendChild(styleElement);
                                                                        timeEnd = setTimeout(() => {
                                                                            console.log("Loop done");
                                                                            return resolve()
                                                                        }, 20000);
                                                                    });

                                                                    // Append the <iframe> element to the <body>
                                                                    div1.appendChild(iframe);
                                                                    document.body.appendChild(div1);

                                                                    innerElement.click()
                                                                }, 10000);
                                                            }
                                                            observerLoop(1)
                                                        }
                                                    }
                                                    await loop()
                                                } else {
                                                    console.log("The element is not an anchor element.");
                                                    return resolve()
                                                }
                                            }
                                            elementHrefData()
                                        } else {
                                            return resolve()
                                        }
                                    }
                                }
                            }
                        } else if (attri === false) {
                            return resolve()
                        }
                    }, 10000);
                });
            }, mainStyles);

            await page.waitForTimeout(2000)

            await autoScroll(page);
            await page.waitForTimeout(2000)
            await checkSection(page)
            let mainTag = await page.$("main")
            if (mainTag) {
                await findSectionDivs(page, "main", 1, "parent")
            } else {
                await findSectionDivs(page, "body", 1, "parent");
            }
            await checkImage(page)
            await page.waitForTimeout(5000)
            await page.emulateMediaType("print");
            await page.pdf({
                path: `pdfs/${fileName}/${fileName}.pdf`,
                margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
                printBackground: true,
                displayHeaderFooter: false,
                format: "A4",
                scale: 0.5
            });

            await page.waitForTimeout(2000)
            // Usage example
            await addPageNumbersToPDF(`pdfs/${fileName}/${fileName}.pdf`, "Main", fileName, title)
                .then(() => {
                    console.log('Page numbers added successfully!');
                })
                .catch((error) => {
                    console.log('Error adding page numbers:', error);
                });
            await removePage(fileName).catch((err) => console.log(err));
            await page.waitForTimeout(2000)
            // await page.close();
            console.log("Done");

        } catch (error) {
            console.log(error);
        }
    }

    // await browser.close();
}

run();


const checkImage = async (page) => {
    let style = await page.$$eval("img", els => {
        let style = ""
        for (let i = 0; i < els.length; i++) {
            let el = els[i];
            // const span = document.createElement("span")
            // span.innerText = 'image'
            // console.log("span", span);
            // el.after(span);
            // el.style.maxWidth = "500px"
            // el.style.maxHeight = "500px"
            // const br = document.createElement("br")
            // el.parentElement.after(br)
        }
    })

    // await page.waitForTimeout(300000)
}


const checkVideo = async (page) => {
    let style = await page.$$eval("video", els => {
        let style = ""
        for (let i = 0; i < els.length; i++) {
            let el = els[i];
            el.remove()
        }
    })

    // await page.waitForTimeout(300000)
}

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 50;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight - window.innerHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


const checkSection = async (page) => {
    let style = await page.$$eval("main", els => {
        let style = ""
        for (let i = 0; i < els.length; i++) {
            let el = els[i];
            let width = el.offsetWidth
            let height = el.offsetHeight
            console.log(height);
            el = el.parentElement
            el.style.pageBreakAfter = "always"
            el.style.pageBreakInside = "avoid";
            el.style.marginTop = "160px"
        }
    })

    // await page.waitForTimeout(300000)
}

const findSectionDivs = async (page, el, index, flag) => {
    let classWithFlag = `mohitTestPDF_${flag}`
    if (index < 6) {
        let divtags = await page.$$(`${el} > div`)

        if (divtags.length && divtags.length < 2) {
            let previous = ""
            for (let i = 0; i < divtags.length; i++) {
                let element = divtags[i];
                let classNameNew = ""
                const el = element;
                let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
                if (cls && cls.length) {
                    cls = cls.split(" ");
                    let parent = "";
                    for (let j = 0; j < cls.length; j++) {
                        const el = cls[j];
                        if (!el == " ") {
                            parent = parent + "." + el;
                        }
                    }
                    classNameNew = parent
                }
                else {
                    let id = await el.evaluate(x => x.getAttribute("id")?.trim())
                    console.log("id ", id);
                    if (id) {
                        classNameNew = "#" + id
                    }
                    else {
                        let cllass = "unique_Mohit_test_xyz" + i
                        await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
                        classNameNew = "." + cllass
                    }
                }
                // await page.waitForTimeout(1200000)
                if (classNameNew != null) {
                    findSectionDivs(page, classNameNew, index + 1, flag);
                } else if (previous) {
                    console.log(previous);
                    findSectionDivs(page, `${previous} > div > div`, index + 1, flag);
                }
                previous = classNameNew
            }
        } else if (divtags.length && divtags.length > 2) {
            let style = "";
            for (let k = 0; k < divtags.length; k++) {
                const el = divtags[k];
                let cllass = `${classWithFlag}_${k}`
                let x = el
                await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
                // el.classList.add(`${classWithFlag}_${k}`)
                style =
                    style +
                    `
                .${classWithFlag}_${k} {
                    page-break-after: always; 
                    margin-top: 50px; 
                }
                `;
                const pagesRequired = Math.ceil((await el.evaluate(x => x.offsetHeight) / 1122) / 2)
                if (pagesRequired > 1) {
                    let classNameNew = ""
                    let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
                    if (cls && cls.length) {
                        cls = cls.split(" ");
                        let parent = "";
                        for (let j = 0; j < cls.length; j++) {
                            const el = cls[j];
                            parent = parent + "." + el;
                        }
                        classNameNew = parent
                    }
                    else {
                        let id = await el.evaluate(x => x.getAttribute("id")?.trim())
                        if (id) {
                            classNameNew = "#" + id
                        }
                        else {
                            let cllass = "unique_Mohit_z" + i
                            await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
                            classNameNew = "." + cllass
                        }
                    }
                }
            }
            return await page.addStyleTag({
                content: `
      @page {
        size: A4;
      }
      ${style}
      `,
            });
        }
    }
    else {
        console.log("senasio => 2");
        check2Div(page, "body")
    }
};

const secondLevelFindSections = async (page, el, index, flag, pagesRequired) => {
    // console.log("Pages =>", page, el, index, flag, pagesRequired);
    let classWithFlag = `mohitPDF_${flag}`
    if (index < 12) {
        console.log("senasio => 1");
        let divtags = await page.$$(`${el} > div`)
        console.log("divtags-1 =>", divtags);
        if (divtags.length && divtags.length < 2) {
            console.log("senasio => 1.1");
            let previous = ""
            for (let i = 0; i < divtags.length; i++) {
                let element = divtags[i];
                let classNameNew = ""
                const el = element;
                console.log(el);
                let cls = await el.evaluate(x => x.getAttribute("class")?.trim())
                console.log("cls ", cls);
                if (cls && cls.length) {
                    cls = cls.split(" ");
                    let parent = "";
                    for (let j = 0; j < cls.length; j++) {
                        const el = cls[j];
                        parent = parent + "." + el;
                    }
                    classNameNew = parent
                }
                else {
                    let id = await el.evaluate(x => x.getAttribute("id")?.trim())
                    console.log("id ", id);
                    if (id) {
                        classNameNew = "#" + id
                    }
                    else {
                        let cllass = "unique_Mohit_test_xyz" + i
                        await page.evaluate((x, cllass) => x.classList.add(cllass), el, cllass)
                        classNameNew = "." + cllass
                    }
                }
                console.log(classNameNew);
                if (classNameNew != null) {
                    secondLevelFindSections(page, classNameNew, index + 1, flag, pagesRequired);
                } else if (previous) {
                    console.log(previous);
                    secondLevelFindSections(page, `${previous} > div > div`, index + 1, flag, pagesRequired);
                }
                previous = classNameNew
            }
        } else if (divtags.length && divtags.length > 2) {
            console.log("senasio => 1.2");
            let el = divtags[0]

            let breakIndex = await page.evaluate((el, pagesRequired) => {
                console.log("parent =>", pagesRequired, el);
                let parent = el.parentElement
                let children = parent.childNodes
                let breakIndex = Math.ceil(children.length / pagesRequired)
                for (let i = breakIndex; i < children.length; i = i + breakIndex) {
                    const element = children[i];
                    element.style.pageBreakAfter = "always"
                    element.style.marginTop = "50px"
                }
                return breakIndex
            }, el, pagesRequired)
            console.log("breakIndex => ", breakIndex);
        }
    }
    else {
        console.log("senasio => 2");
        check2Div(page, "body")
    }
};

let check2Div = async (page, el) => {
    let divtags = await page.$$eval(`${el} > div`, (els) => {
        let data = []
        for (let i = 0; i < els.length; i++) {
            const el = els[i];
            let cls = el.getAttribute("class")?.trim()
            if (cls && cls.length) {
                cls = cls.split(" ");
                let parent = "";
                for (let j = 0; j < cls.length; j++) {
                    const el = cls[j];
                    parent = parent + "." + el;
                }
                data.push(parent)
            }
            else {
                let id = el.getAttribute('id')?.trim()
                if (id) {
                    data.push("#" + id)
                }
                else {
                    continue;
                }
            }
        }
        return data
    }

    );
    if (divtags.length && divtags.length < 1) {
        console.log("senasio => 1.1");
        for (let i = 0; i < divtags.length; i++) {
            let element = divtags[i];
            if (element) {
                check2Div(page, element);
            } else {
                check2Div(page, `${el} > div > div`);
            }
        }
    } else if (divtags.length && divtags.length > 2) {
        console.log("senasio => 1.2");
        let style = "";
        for (let k = 0; k < divtags.length; k++) {
            const el = divtags[k];
            console.log((el && (el.includes(".") || el.includes("#"))))
            if (el && (el.includes(".") || el.includes("#"))) {
                style =
                    style +
                    `
        ${el} {
          page-break-after: always; 
          margin-top: 50px; 
        }
      `;
            }
        }

        console.log("style => ", style);

        return await page.addStyleTag({
            content: `
    @page {
      size: A4;
    }
    ${style}
    `,
        });
    }
}

async function checkRemovePopups(page) {
    let style = await page.$$eval("*", els => {
        var elems = els;
        var len = elems.length
        console.log(els);

        for (var i = 0; i < len; i++) {
            try {
                var computedStyle = window.getComputedStyle(elems[i], null);
                var tagName = elems[i].tagName.toLowerCase();

                if (tagName === "header") {
                    // var headerValue = computedStyle.getPropertyValue("header");

                    console.log("Computed header value:", computedStyle.getPropertyValue());
                } else if (window.getComputedStyle(elems[i], null).getPropertyValue('position') == 'fixed') {
                    var classLoop1 = elems[i].id ? ["#" + elems[i].id] : elems[i].className.split(" ");
                    // console.log(classLoop1)
                    classLoop1 = classLoop1.filter(items => items !== "")
                    classLoop1 = classLoop1.filter(items => items !== " ")

                    if (elems[i].className.toLowerCase().includes("header") || elems[i].className.toLowerCase().includes("navbar")) {
                        console.log("elems[i] true =>", elems[i], classLoop1)
                    } else {
                        var allData = classLoop1.map((items) => {
                            return elems[i].id ? items : "." + items
                        })
                        // console.log("allData =>",allData)
                        const parentElement = document.querySelector(allData.join(""));
                        // console.log(parentElement)
                        const nestedElements = parentElement.querySelectorAll("*");


                        console.log("nestedElements.length =>", nestedElements)

                        if (nestedElements.length) {
                            // Iterate over each nested element and log its class names
                            for (const element of nestedElements) {
                                var classNames = Array.from(element.classList);
                                if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
                                    // console.log("elems[i] false =>", elems[i], classLoop1)
                                    elems[i].remove();
                                    break;
                                    // return;
                                }
                            };
                        } else if (parentElement) {
                            var classNames = Array.from(nestedElements.classList);
                            // console.log("classNames =>", classNames)
                            if (!classNames.join(" ").includes("header") || !classNames.join(" ").includes("navbar")) {
                                console.log("elems[i] false =>", elems[i], classLoop1)
                                elems[i].remove();
                            }
                        }
                    }
                }
            } catch (error) {
                // console.log(error)
            }
        }
    })
}

async function removePage(filePathOld) {

    const { writeFileSync, readFileSync, readdirSync } = require("fs");
    const { PDFDocument } = require("pdf-lib");
    const pdf = require("pdf-parse");

    // Directory path containing the PDF files
    const directoryPath = `pdfs/${filePathOld}`;

    // Read the list of files in the directory
    const files = await readdirSync(directoryPath);
    console.log(files);

    // Loop through each PDF file
    for (const file of files) {
        if (file.endsWith(".pdf")) {
            // Construct the file path
            const filePath = `${directoryPath}/${file}`;

            // Read the file buffer
            const dataBuffer = readFileSync(filePath);

            // Load the PDF document
            const letters = await PDFDocument.load(dataBuffer);

            await pdf(dataBuffer)
                .then(async function (data) {
                    const pages = data.text.split("\n\n"); // Split the text by page

                    let num = 1;
                    for (let i = 0; i < pages.length; i++) {
                        // Get the text of the desired page
                        const desiredPageText = pages[i];

                        if (!desiredPageText && i !== 0) {
                            console.log(`Text of page ${num}:`);
                            console.log(desiredPageText);
                            await letters.removePage(i - num);
                            num++;
                        }
                    }

                    // Save the modified PDF
                    const outputFilePath = `pdfs_test/${filePathOld}/${file}`;
                    await writeFileSync(outputFilePath, await letters.save());
                    // console.log(`Processed PDF: ${file}. Saved as: ${outputFilePath}`);
                })
                .catch(function (error) {
                    console.log(`An error occurred while processing PDF: ${file}`);
                    console.log("Error:", error);
                });
        }
    }
}

async function addPageNumbersToPDF(inputPath, profileName, website, pageTitle) {
    const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
    const fs = require('fs').promises;
    const pdfDoc = await PDFDocument.load(await fs.readFile(inputPath));

    const pages = pdfDoc.getPages();
    const totalPages = pages.length;

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    for (let i = 0; i < totalPages; i++) {
        const page = pages[i];

        const { width, height } = page.getSize();
        const fontSize = 8;

        const currentDate = new Date().toLocaleDateString();
        var currentTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
        currentTime = currentTime.split(" ")

        currentTime[1] = currentTime[1].toUpperCase()

        currentTime = currentTime.join(" ")

        const pageText = `${profileName ? profileName : "none"} - ${pageTitle} ${i + 1} out of ${totalPages}`;
        const websiteText = `${website}`
        const dateTimeText = `${currentDate}, ${currentTime}`;

        // Calculate text widths
        const pageTextWidth = font.widthOfTextAtSize(pageText, fontSize);
        const dateTimeTextWidth = font.widthOfTextAtSize(dateTimeText, fontSize);

        // Add pageText in top right corner
        page.drawText(pageText, {
            x: width - pageTextWidth - 10,
            y: height - 12,
            size: fontSize,
            color: rgb(0, 0, 0),
            font: font,
        });

        // Add dateTimeText in bottom right corner
        page.drawText(dateTimeText, {
            x: width - dateTimeTextWidth - 10,
            y: 6,
            size: fontSize,
            color: rgb(0, 0, 0),
            font: font,
        });

        // Add websiteText in bottom left corner
        page.drawText(websiteText, {
            x: 10,
            y: 6,
            size: fontSize,
            color: rgb(0, 0, 0),
            font: font,
        });
    }

    const modifiedPdfBytes = await pdfDoc.save();

    await fs.writeFile(inputPath, modifiedPdfBytes);
}

// *************************************************************************************************************** */

