import { promises } from "dns"
import { get_headers } from "./service.js"
import { get_list } from "./service.js"
// import fs from 'fs'
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
        console.log(list)
        let listContainderNode: HTMLDivElement = document.createElement('div')
        listContainderNode.className = "listViewer"
        let listName: HTMLParagraphElement = document.createElement('p')
        listName.textContent = list
        listName.className = "listText"
        let plusButtom: HTMLButtonElement = document.createElement('button')
        plusButtom.className = "viewMore"
        plusButtom.innerHTML = '<i class="fa-solid fa-plus"></i>'
        listContainderNode.appendChild(listName)
        listContainderNode.appendChild(plusButtom)
        anchorListNode.appendChild(listContainderNode)
    });
    mainAnchorNode.replaceChildren(anchorListNode)
}

async function renderSettingsPage() {

}

function renderDownloadsPage() {

}

function renderExportPage() {

}

function renderRulesPage() {

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
    default:
        renderLanding()
        break;
}