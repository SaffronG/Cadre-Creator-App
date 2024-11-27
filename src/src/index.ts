import { getDefaultAutoSelectFamilyAttemptTimeout } from "net"
import { get_headers, get_list, post_list, get_profile, get_rules, get_rule } from "./service.js"
import { saveAs } from 'file-saver'

let currentUser = "default"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const contents = urlParams.get('contents')

const mainAnchorNode = document.getElementById('main-containter')

function renderLanding() {
    const welcomeHeader = document.createElement('h1')
    welcomeHeader.id = "welcomeHeader"
    welcomeHeader.textContent = "Welcome to the cadre creator!"

    const introText = document.createElement('p')
    introText.innerHTML = 'Try and click the "<i class="fa-solid fa-plus" id="examplePlus"></i>" button down below!'

    mainAnchorNode.replaceChildren(welcomeHeader, introText)
}

async function renderListsPage() {
    let listsJson = await get_headers()
    let anchorListNode: HTMLDivElement = document.createElement('div')
    listsJson.lists.forEach(list => {
        let listContainderNode: HTMLDivElement = document.createElement('div')
        listContainderNode.className = "listViewer"

        let titleDivNode: HTMLDivElement = document.createElement('div')
        titleDivNode.className = "titleDiv"

        let listName: HTMLParagraphElement = document.createElement('p')
        listName.textContent = list
        listName.className = "listText"

        let plusButtom: HTMLButtonElement = document.createElement('button')
        plusButtom.className = "viewMore"
        plusButtom.innerHTML = '<i class="fa-solid fa-plus"></i>'

        let listDetails: HTMLDivElement = document.createElement('div')
        listDetails.className = "listDetails"
        
        let displayOn = false;
        listDetails.style.display = displayOn ? "block" : "none"

        plusButtom.addEventListener("click", async () => {
            displayOn = displayOn ? false : true
            listDetails.style.display = displayOn ? "block" : "none"

            let currentList = await get_list(list)

            let pointsNode: HTMLParagraphElement = document.createElement('p')
            pointsNode.textContent = currentList.Points
            pointsNode.className = "pointsDescription"

            let modelDivNode: HTMLDivElement = document.createElement('div')
            modelDivNode.className = "listModels"

            currentList.Models.forEach(model => {
                let modelNode: HTMLParagraphElement = document.createElement('p')
                modelNode.className = "modelName"
                modelNode.textContent = model
                modelDivNode.appendChild(modelNode)
            })

            // let ellipsesNode: HTMLParagraphElement = document.createElement('p')
            // ellipsesNode.textContent = "..."
            // ellipsesNode.className = "modelName"
            
            listDetails.replaceChildren(pointsNode, modelDivNode)
        })

        titleDivNode.appendChild(listName)
        titleDivNode.appendChild(plusButtom)

        listContainderNode.appendChild(titleDivNode)
        listContainderNode.appendChild(listDetails)

        anchorListNode.appendChild(listContainderNode)
    });

    let addNewListNode: HTMLButtonElement = document.createElement('button')
    addNewListNode.className = "viewMore"
    addNewListNode.innerHTML = '<i class="fa-solid fa-plus"></i>'

    addNewListNode.addEventListener("click", async () => {
        window.location.replace(`/builder.html`)
    })

    anchorListNode.appendChild(addNewListNode)

    mainAnchorNode.replaceChildren(anchorListNode)
}

async function renderSettingsPage() {
    const settings = await get_profile("default")
    const settingsDivNode: HTMLDivElement = document.createElement('div') 
    settingsDivNode.id = "settingsDiv"

    for (const setting in settings) {
        console.log(setting)
        const settingItemNode: HTMLDivElement = document.createElement('div')
        settingItemNode.className = "setting"

        const settingHeaderNode: HTMLHeadElement = document.createElement('h2')
        settingHeaderNode.innerText = setting
        settingHeaderNode.className = "settingLabel"

        const settingToggleButton: HTMLDivElement = document.createElement('div')
        settingToggleButton.innerHTML = '</label><!-- Rounded switch --><label class="switch"><input type="checkbox"><span class="slider round"></span></label>'

        settingItemNode.appendChild(settingHeaderNode)
        settingItemNode.appendChild(settingToggleButton)
        settingsDivNode.appendChild(settingItemNode)
    }

    const loginButton: HTMLAnchorElement = document.createElement('a')
    loginButton.id = "loginLink"
    loginButton.href = "/index.html?content=login"
    loginButton.textContent = "Login"

    mainAnchorNode.replaceChildren(loginButton, settingsDivNode)
}

async function renderDownloadsPage() {
    const lists = await get_headers()
    const downloadsDivNode: HTMLDivElement = document.createElement('div')
    downloadsDivNode.className = 'downloads'

    lists.lists.forEach(list => {
        const downloadLinkNode: HTMLAnchorElement = document.createElement('a')
        downloadLinkNode.innerHTML = list + '  <i class="fa-solid fa-download"></i>'
        downloadLinkNode.href = `/pdf.html?file=${list}`
        downloadLinkNode.className = 'downloadLink'

        downloadsDivNode.appendChild(downloadLinkNode)
    });

    const titleHeader: HTMLHeadElement = document.createElement('div')
    titleHeader.id = "titleHeader"
    titleHeader.textContent = "Downloads"

    mainAnchorNode.replaceChildren(titleHeader, downloadsDivNode)
}

async function renderExportPage() {
    const lists = await get_headers()
    const downloadsDivNode: HTMLDivElement = document.createElement('div')
    downloadsDivNode.className = 'downloads'

    lists.lists.forEach(list => {
        const downloadLinkNode: HTMLAnchorElement = document.createElement('a')
        downloadLinkNode.innerHTML = list + '  <i class="fa-solid fa-arrow-up-from-bracket"></i>'
        downloadLinkNode.href = `/pdf.html?file=${list}`
        downloadLinkNode.className = 'downloadLink'
        downloadsDivNode.appendChild(downloadLinkNode)
    });

    const titleHeader: HTMLHeadElement = document.createElement('div')
    titleHeader.id = "titleHeader"
    titleHeader.textContent = "Exports"

    mainAnchorNode.replaceChildren(titleHeader, downloadsDivNode)
}

async function renderRulesPage() {
    const rules = await get_rules()
    const rulesDivNode: HTMLDivElement = document.createElement('div')
    rulesDivNode.id = "rules"

    rules.lists.forEach(rule => {
        const ruleCardNode: HTMLDivElement = document.createElement('div')
        ruleCardNode.className = "ruleCard"
        
        const cardNodeHeader: HTMLHeadElement = document.createElement('h2')
        cardNodeHeader.textContent = rule
        cardNodeHeader.className  = "ruleHeader"

        let plusButton: HTMLButtonElement = document.createElement('button')
        plusButton.className = "viewMore"
        plusButton.innerHTML = '<i class="fa-solid fa-plus"></i>'
        plusButton.addEventListener("click", async () => {
        const ruleJson = await get_rule(rule)

        const rulesInfoDiv: HTMLDivElement = document.createElement('div')
        
        ruleJson.forEach(paragraph => {
            const paragraphDiv: HTMLDivElement = document.createElement('div')
            paragraphDiv.className = 'rulesInfo'
            
            const subHeader: HTMLHeadElement = document.createElement('h3')
            subHeader.className = 'ruleHeading'
            subHeader.textContent = paragraph.name;

            const ruleDescription: HTMLDivElement  = document.createElement('p')
            ruleDescription.className = 'ruleParagraph'
            ruleDescription.textContent = paragraph.description
        });
        })
        
        ruleCardNode.replaceChildren(cardNodeHeader, plusButton)
        rulesDivNode.appendChild(ruleCardNode)
    });

    mainAnchorNode.replaceChildren(rulesDivNode)
}

async function renderLoginPage() {
    const loginForm: HTMLDivElement = document.createElement('div')
    loginForm.id = "formNode"

    const header: HTMLHeadElement = document.createElement('h1')
    header.textContent = "Login"
    header.id = "loginHeader"

    const usernameBlock: HTMLDivElement = document.createElement('div')
    usernameBlock.className = "formBlock"

    const passwordBlock: HTMLDivElement = document.createElement('div')
    passwordBlock.className = "formBlock"
}

switch (contents) {
    case "export":
        renderExportPage()
        break;
    case "download":
        renderDownloadsPage()
        break;
    case "myLists":
        renderListsPage()
        break;
    case "settings":
        await renderSettingsPage()
        break;
    case "rules":
        renderRulesPage()
        break;
    case "login":
        renderLoginPage()
        break;
    default:
        renderLanding()
        break;
}