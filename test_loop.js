// 23-06-2023 Read More & Learn More if link in Button *************************************************************************************************************** */
const puppeteer = require('puppeteer');
const fs = require('fs');

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


    // const allUrls = ["https://www.pixium-vision.com/board-of-directors-2/","https://humbleandfume.com/", "https://www.brookfieldproperties.com/en/who-we-are/leadership.html", "https://www.i3verticals.com/leadership/", "https://investors.crocs.com/governance/management/default.aspx", "https://www.nexteraenergy.com/company/leadership.html/company.html", "https://www.ttec.com/about-us/executive-team", "https://www.eildoncapital.com/people/", "https://bluglass.com/our-people/", "https://traton.com/en/company/executive-board.html", "https://amagroupltd.com/our-business/ama-group-board/", "https://www.adorebeautygroup.com.au/investor-centre/?page=board-of-directors", "https://www.pixium-vision.com/2019/09/lloyd-diamond/", "https://ir.gatx.com/governance/management/default.aspx", "https://ir.essentgroup.com/governance/management/default.aspx", "https://investors.esabcorporation.com/governance/executive-management/default.aspx", "https://www.automationnth.com/about-us/#team", "https://www.advatix.com/team", "https://jrvrgroup.com/james-river-insurance/our-company/leadership", "https://newsroom.fiserv.com/corporate-information/executive-leadership", "https://www.idacorpinc.com/about-us/our-leadership/default.aspx", "https://www.iaai.com/marketing/ritchiebros-investor-relations", "https://catalystcr.com/our-people/", "https://ir.applied.com/governance/corporate-management/default.aspx", "https://datalix.eu/", "https://bonobos.com/", "https://lakebrains.com/", "https://www.tcs.com/", "https://www.infosys.com/", "https://www.hcltech.com/", "https://www.tata.com/", "https://www.larsentoubro.com/", "https://www.pwc.com/", "https://www.mphasis.com/home.html"]
    const allUrls = ["https://www.mphasis.com/home.html"]

    for (let i = 0; i < allUrls.length; i++) {
        try {
            const url = allUrls[i];
            const URL = url;
            console.log("URL =>", URL);
            const fileName = URL.split("/")[2]
            let page = await browser.newPage();
            await page.setDefaultTimeout(0)
            await page.setDefaultNavigationTimeout(0)
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

            await page.goto(URL, { waitUntil: "networkidle0", timeout: 0 });

            // await page.waitForTimeout(10000)
            // await checkRemovePopups(page)

            await checkVideo(page)

            await page.waitForTimeout(5000)

            async function test_newPage(link) {
                let pageInternal = await browser.newPage();

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
            }

            await page.exposeFunction("test_newPage", test_newPage);

            var mainStyles;
            await fs.readFile('public/main.css', 'utf8', (err, data) => {
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

            await page.evaluate(() => {
                let allels = document.querySelectorAll("*")
                let links = document.querySelectorAll("link")
                let scripts = document.querySelectorAll('script')
                let styles = document.querySelectorAll('style')
                let headers = document.querySelectorAll('header')
                let footers = document.querySelectorAll('footer')

                const elements = document.body.getElementsByTagName('*');

                setInterval(() => {
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].removeAttribute('style');
                    }
                }, 500);

                // Loop through each element
                allels.forEach(element => {
                    // Get all attributes of the element
                    const attributes = element.attributes;

                    // Loop through each attribute
                    for (let i = 0; i < attributes.length; i++) {
                        const attribute = attributes[i];
                        const attributeValue = attribute.value;

                        // Check if the attribute value contains the word "sticky"
                        if (attributeValue && attributeValue.includes('sticky')) {
                            // Remove the element
                            element.remove();
                            break; // Exit the loop once an attribute is found with the word "sticky"
                        }
                    }
                });

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
                for (let i = 0; i < headers.length; i++) {
                    const header = headers[i];
                    header.remove()
                }
                for (let i = 0; i < footers.length; i++) {
                    const footer = footers[i];
                    footer.remove()
                }
            })

            // path, can be relative or absolute path
            // await page.addScriptTag({ path: 'public/jquery.min.js' })
            // await page.addScriptTag({ path: 'public/algo.js' })

            await page.addStyleTag({ path: 'public/main.css' })

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
                    // bodyBaseURI = bodyBaseURI.toLowerCase().includes("www.") ? bodyBaseURI.replace(/^(https?:\/\/)?(www\.)?/, '$1') : bodyBaseURI
                    // console.log("link.getAttribute(href) =>", bodyBaseURI.replace(/^(https?:\/\/)?(www\.)?/, '$1'));
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

                // body = body.innerHTML
                // const parentElement = `<div id = "printfriendly" class = "pf-12" ><div id="pf-print-area"><div id="pf-content" orig-style="null" style="direction: ltr">${body}</div></div></div>`;
                // document.body.innerHTML = parentElement
            }, mainStyles);

            await page.waitForTimeout(2000)

            // Add attribute to every element
            await page.evaluate(async (mainStyles) => {
                return new Promise(async (resolve) => {
                    const elements = document.querySelectorAll('*');

                    var attri = false;

                    for (const innerElement of elements) {
                        for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
                            if (atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
                                attri = true
                            }
                        }
                    }


                    setTimeout(async () => {
                        if (attri === true) {
                            for (const innerElement of elements) {
                                for (var i = 0, atts = innerElement.attributes, n = atts.length, arr = []; i < n; i++) {
                                    if (atts[i].nodeValue.toLocaleLowerCase() === "next page" || atts[i].nodeValue.toLocaleLowerCase() === "next-page") {
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

            // // Add styles to the iframe's internal style
            // await page.evaluate(() => {
            //     var iframes = document.querySelectorAll('iframe'); // Select the iframe based on your specific selector

            //     // Iterate over the iframes to find the one with a name containing specific words
            //     var targetIframe = [];
            //     for (var i = 0; i < iframes.length; i++) {
            //         var iframe = iframes[i];
            //         var name = iframe.getAttribute('name');

            //         // Check if the name contains specific words
            //         if (name && name.includes('addedIframe')) {
            //             targetIframe.push(iframe);
            //         }
            //     }
            //     if (targetIframe.length) {
            //         targetIframe[targetIframe.length - 1].remove()
            //     }
            //     console.log("iframe =>", targetIframe);
            // });

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
// *************************************************************************************************************** */