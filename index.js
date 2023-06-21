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


// 15-06-2023 *************************************************************************************************************** */
const puppeteer = require('puppeteer');

async function run() {

    const customArgs = [
        "--start-maximized",
        "--load-extension=C:/Users/Abdeali/AppData/Local/Google/Chrome/User Data/Profile 10/Extensions/edibdbjcniadpccecjdfdjjppcpchdlm/1.1.1_0",
    ];

    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
        args: customArgs,
    });


    // const allUrls = ["https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
    const allUrls = ["https://www.larsentoubro.com/"]

    for (let i = 0; i < allUrls.length; i++) {
        try {
            const url = allUrls[i];
            const URL = url;
            const fileName = URL.split("/")[2]
            let page = await browser.newPage();
            // await page.setViewport({ width: 1920, height: 1080 });
            // await page.setRequestInterception(true);

            // page.on('request', (req) => {
            //     if (req.resourceType() == 'stylesheet') {
            //         req.abort();
            //     }
            //     else {
            //         req.continue();
            //     }
            // });

            await page.goto(URL, { waitUntil: "networkidle0" });

            await page.waitForTimeout(10000)
            await checkRemovePopups(page)

            await checkVideo(page)

            await page.waitForTimeout(5000)

            await page.evaluate(() => {
                let allels = document.querySelectorAll("*")
                let links = document.querySelectorAll("link")
                let scripts = document.querySelectorAll('script')
                let styles = document.querySelectorAll('style')

                const elements = document.body.getElementsByTagName('*');

                setInterval(() => {
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].removeAttribute('style');
                    }
                }, 500);

                for (let i = 0; i < allels.length; i++) {
                    const el = allels[i];
                    el.removeAttribute("style")
                }

                for (let i = 0; i < styles.length; i++) {
                    const el = styles[i];
                    el.remove()
                }
                for (let i = 0; i < links.length; i++) {
                    const link = links[i];
                    link.remove()
                }
                for (let i = 0; i < scripts.length; i++) {
                    const link = scripts[i];
                    link.remove()
                }

            })

            // path, can be relative or absolute path
            // await page.addScriptTag({ path: 'public/jquery.min.js' })
            // await page.addScriptTag({ path: 'public/algo.js' })

            await page.addStyleTag({ path: 'public/main.css' })

            // Add attribute to every element
            await page.evaluate(async () => {
                const elements = document.querySelectorAll('*');
                for (const element of elements) {
                    element.setAttribute('data-pf_style_display', 'block');
                    element.setAttribute('data-pf_style_visibility', 'visible');
                    element.setAttribute('orig-style', 'null');
                }
                const buttons = document.querySelectorAll('button');
                for (const button of buttons) {
                    if (!button.querySelector('a') && (button.innerText.toLowerCase().includes("read") || button.innerText.toLowerCase().includes("learn more") || button.innerText.toLowerCase().includes("more"))) {
                        button.click();
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

                // body = body.innerHTML
                // const parentElement = `<div id = "printfriendly" class = "pf-12" ><div id="pf-print-area"><div id="pf-content" orig-style="null" style="direction: ltr">${body}</div></div></div>`;
                // document.body.innerHTML = parentElement
            });
            // await autoScroll(page);
            await page.waitForTimeout(2000)
            await checkSection(page)
            let mainTag = await page.$("main")
            if (mainTag) {
                await findSectionDivs(page, "main", 1, "parent")
            } else {
                await findSectionDivs(page, "body", 1, "parent");
            }
            await checkImage(page)
            await page.waitForTimeout(2000)
            await page.emulateMediaType("print");
            const pdf = await page.pdf({
                path: `pdfs/${fileName}.pdf`,
                margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
                printBackground: true,
                displayHeaderFooter: true,
                format: "A4",
                scale: 0.5
            });

            await page.waitForTimeout(2000)
            await removePage(fileName).catch((err) => console.log(err));
            await page.waitForTimeout(2000)
            await page.close();
            console.log("Done");

        } catch (error) {
            console.log(error);
        }
    }

    await browser.close();
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
            const br = document.createElement("br")
            el.parentElement.after(br)
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
        // , (els) => {
        //     let data = []
        //     for (let i = 0; i < els.length; i++) {
        //         const el = els[i];
        //         console.log(el);
        //         let cls = el.getAttribute("class")?.trim()
        //         if (cls && cls.length) {
        //             cls = cls.split(" ");
        //             let parent = "";
        //             for (let j = 0; j < cls.length; j++) {
        //                 const el = cls[j];
        //                 parent = parent + "." + el;
        //             }
        //             data.push(parent)
        //         }
        //         else {
        //             let id = el.getAttribute('id')?.trim()
        //             if (id) {
        //                 data.push("#" + id)
        //             }
        //             else {
        //                 data.push(null)
        //             }
        //         }
        //     }
        //     return data
        // }

        // );

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
                    // console.log("test log =>");
                    // secondLevelFindSections(page, classNameNew, 1, "justForTest", pagesRequired)
                    // let breakIndex = await page.evaluate((el, pagesRequired) => {
                    //     let children = el.childNodes
                    //     let breakIndex = Math.ceil(children.length / pagesRequired)
                    //     for (let i = breakIndex; i < children.length; i = i + breakIndex) {
                    //         const element = children[i];
                    //         element.style.pageBreakAfter = "always"
                    //         element.style.marginTop = "50px"
                    //     }
                    //     return breakIndex
                    // }, el, pagesRequired)
                    // console.log("breakIndex => ", breakIndex);
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
            // for (let k = 0; k < divtags.length; k++) {
            //     const el = divtags[k];
            // let cllass = `${classWithFlag}_${k}`
            // let x = el
            // await page.evaluate((x, cllass) => x.classList.add(cllass), x, cllass)
            // // el.classList.add(`${classWithFlag}_${k}`)
            // style =
            //     style +
            //     `
            // .${classWithFlag}_${k} {
            //     page-break-after: always; 
            //     margin-top: 50px; 
            // }
            // `;
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

            // }
            //         return await page.addStyleTag({
            //             content: `
            //   @page {
            //     size: A4;
            //   }
            //   ${style}
            //   `,
            //         });
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




async function removePage(filePath) {
    const { writeFileSync, readFileSync } = require("fs");
    const { PDFDocument } = require("pdf-lib");
    const pdf = require('pdf-parse');

    const dataBuffer = readFileSync(`pdfs/${filePath}.pdf`);
    const letters = await PDFDocument.load(readFileSync(`pdfs/${filePath}.pdf`));

    await pdf(dataBuffer).then(async function (data) {
        const pages = data.text.split('\n\n'); // Split the text by page

        var num = 1
        for (let i = 0; i < pages.length; i++) {
            // Get the text of the desired page
            const desiredPageText = pages[i];

            // console.log("desiredPageText =>", desiredPageText);


            if (!desiredPageText && i !== 0) {
                console.log(` `);
                console.log(`Text of page ${num}:`);
                console.log(desiredPageText);
                await letters.removePage(i - num);
                num = num + 1
            }
        }
        writeFileSync(`pdfs_test/${filePath}_test.pdf`, await letters.save());
    }).catch(function (error) {
        console.log('An error occurred:', error);
    });

}