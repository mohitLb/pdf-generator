// 03-07-2023 old code with styles merge *************************************************************************************************************** */
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

    // // "Read more scenarios"
    // const allUrls = [
    //     "https://www.pmi.com/our-leadership-team",
    //     "https://www.dishtv.in/Pages/AboutUs/Top-Management-Profiles.aspx",
    //     "https://corporate.dollartree.com/about/leadership/executive-leadership",
    //     "https://corporate.dollartree.com/about/leadership/board-of-directors",
    //     "https://biz.dominos.com/about-us/leadership/",
    //     "https://investors.dow.com/en/corporate-governance/board-of-directors/default.aspx",
    //     "https://www.dupont.com/about/leadership.html",
    //     "https://dxc.com/us/en/about-us/leadership-and-governance",
    //     "https://www.eastman.com/en/who-we-are/our-organization/leadership",
    //     "https://www.ecolab.com/about/leadership",
    //     "https://www.elcompanies.com/en/investors/corporate-governance/executive-officers",
    //     "https://www.equifax.com/about-equifax/leadership/",
    //     "https://investors.evergy.com/about-evergy/leadership-team",
    //     "https://www.factset.com/our-company/our-leadership",
    //     "https://investor.factset.com/corporate-governance/board-of-directors",
    //     "https://www.marathonpetroleum.com/About/Leadership/",
    //     "https://www.marathonpetroleum.com/About/Board-of-Directors/"
    // ]

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
    const allUrls = ["https://lakebrains.com/"]

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

            // async function test_pdfPage() {
            //     await page.emulateMediaType("screen");
            //     await page.pdf({
            //         path: `pdfs/${fileName}/${fileName}${pageNumber}.pdf`,
            //         printBackground: true,
            //         format: "A4",
            //         scale: 0.3
            //     });
            //     pageNumber = pageNumber + 1

            //     await page.evaluate(async () => {
            //         // Get elements with attribute names or class names containing "close"
            //         const elementsWithCloseAttributes = Array.from(document.querySelectorAll('*')).filter(element => {
            //             const attributes = Array.from(element.attributes);
            //             const classNames = Array.from(element.classList);
            //             return (
            //                 attributes.some(attribute => attribute.name.toLowerCase().includes('close')) ||
            //                 classNames.some(className => className.toLowerCase().includes('close'))
            //             );
            //         });

            //         console.log("elementsWithCloseAttributes =>", elementsWithCloseAttributes);

            //         // Click on each element
            //         elementsWithCloseAttributes.forEach(closeElement => {
            //             const event = new MouseEvent('click', {
            //                 bubbles: true,
            //                 cancelable: true,
            //                 view: window
            //             });
            //             closeElement.dispatchEvent(event);
            //         });
            //     });
            // }

            // await page.exposeFunction("test_pdfPage", test_pdfPage);

            // await page.evaluate(async () => {
            //     return new Promise(async (resolve) => {
            //         // Helper function to check if an element or its ancestors have an href attribute
            //         function hasHrefAncestor(element) {
            //             let currentElement = element;
            //             while (currentElement) {
            //                 if (currentElement.hasAttribute("href")) {
            //                     return true;
            //                 }
            //                 currentElement = currentElement.parentElement;
            //             }
            //             return false;
            //         }
            //         // Get all div or button elements with cursor: pointer and without href attribute in self or ancestors
            //         const pointerElementsWithoutHrefAncestors = Array.from(document.querySelectorAll("div, button, h2, h3")).filter(element => {
            //             const styles = window.getComputedStyle(element);
            //             return styles.getPropertyValue("cursor") === "pointer" && !hasHrefAncestor(element);
            //         }).filter(element => {
            //             const attributes = Array.from(element.attributes).map(attr => attr.name);
            //             const classNames = element.className.split(" ");
            //             return !attributes.some(attr => attr.toLowerCase().includes("nav") || attr.toLowerCase().includes("menu") || attr.toLowerCase().includes("dropdown")) &&
            //                 !classNames.some(className => className.toLowerCase().includes("nav") || className.toLowerCase().includes("menu") || className.toLowerCase().includes("dropdown")) &&
            //                 !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("search")) &&
            //                 !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("subscribe")) &&
            //                 !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("submit")) &&
            //                 !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("next")) &&
            //                 !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("previous")) &&
            //                 !attributes.some(attr => attr !== "href" && element.getAttribute(attr).toLowerCase().includes("nav"));
            //         });

            //         if (pointerElementsWithoutHrefAncestors.length) {
            //             for (let i = 0; i < pointerElementsWithoutHrefAncestors.length; i++) {
            //                 setTimeout(async () => {
            //                     try {
            //                         console.log("i =>", i + 1, pointerElementsWithoutHrefAncestors.length);
            //                         console.log(pointerElementsWithoutHrefAncestors[i]);
            //                         pointerElementsWithoutHrefAncestors[i].click();
            //                         await test_pdfPage();
            //                         if ((i + 1) === pointerElementsWithoutHrefAncestors.length) {
            //                             setTimeout(() => {
            //                                 console.log("Resolved");
            //                                 resolve();
            //                             }, 5000);
            //                         }
            //                     } catch (error) {
            //                         console.log("Error =>", error);
            //                     }
            //                 }, i * 5000); // 10 seconds delay between clicks
            //             }
            //         } else {
            //             resolve();
            //         }
            //     })
            // })


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

            await page.evaluate(async () => {

                let styles = document.querySelectorAll('style')

                for (let i = 0; i < styles.length; i++) {
                    const el = styles[i];
                    styles[i].remove()
                    document.head.appendChild(el)
                }

                let links = document.querySelectorAll("link")

                console.log(links);

                for (let i = 0; i < links.length; i++) {
                    if (links[i].rel && links[i].rel === "stylesheet" && links[i].getAttribute("href").includes("https")) {

                        var body = await test_cssPage(links[i].getAttribute("href"))
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

                console.log("styleSheetList.length =>", styleSheetList.length);

                for (let i = 0; i < styleSheetList.length; i++) {
                    const styleSheet = styleSheetList[i];

                    const rules = styleSheet.cssRules || styleSheet.rules; // Handle different browser compatibility

                    for (let j = 0; j < rules.length; j++) {
                        const rule = rules[j];

                        // Check if the rule is a CSSStyleRule and not a CSSImportRule or other type of rule
                        if (rule instanceof CSSStyleRule) {
                            const { style } = rule;

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

                    for (let i = 0; i < styles.length - 1; i++) {
                        const el = styles[i];
                        el.remove()
                    }
                }, 1000);
            })

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
            await page.emulateMediaType("screen");
            await page.pdf({
                path: `pdfs/${fileName}/${fileName}.pdf`,
                margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
                printBackground: true,
                displayHeaderFooter: false,
                format: "A4",
                scale: 0.3
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

async function removePage(filePathOld, pageNumber) {
    // const { writeFileSync, readFileSync } = require("fs");
    // const { PDFDocument } = require("pdf-lib");
    // const pdf = require('pdf-parse');

    // const dataBuffer = await readFileSync(`pdfs/${filePath}/${filePath}${pageNumber ? pageNumber : ""}.pdf`);
    // const letters = await PDFDocument.load(readFileSync(`pdfs/${filePath}/${filePath}${pageNumber ? pageNumber : ""}.pdf`));

    // await pdf(dataBuffer).then(async function (data) {
    //     const pages = data.text.split('\n\n'); // Split the text by page

    //     var num = 1
    //     for (let i = 0; i < pages.length; i++) {
    //         // Get the text of the desired page
    //         const desiredPageText = pages[i];

    //         // console.log("desiredPageText =>", desiredPageText);


    //         if (!desiredPageText && i !== 0) {
    //             console.log(` `);
    //             console.log(`Text of page ${num}:`);
    //             console.log(desiredPageText);
    //             await letters.removePage(i - num);
    //             num = num + 1
    //         }
    //     }
    //     await writeFileSync(`pdfs_test/${filePath}/${filePath}${pageNumber ? pageNumber : ""}.pdf`, await letters.save());
    // }).catch(function (error) {
    //     console.log('An error occurred:', error);
    // });


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
// *************************************************************************************************************** */
