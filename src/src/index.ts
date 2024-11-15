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

function renderListsPage() {
    const listDivNode = document.createElement('div')
    listDivNode.className = "listViewer"

    const headerContentsNode = document.createElement('h1')
    headerContentsNode.className = "listNodeH1"
    headerContentsNode.textContent = "Farsight Tsunami Cadre"

    const pointValuesNode = document.createElement('p')
    pointValuesNode.className = "point values"
    pointValuesNode.textContent = "2,000 pts"

    const plusButton = document.createElement('button')
    plusButton.innerHTML = '<i class="fa-solid fa-plus"></i>'

    listDivNode.replaceChildren(headerContentsNode, pointValuesNode, plusButton)
    mainAnchorNode.replaceChildren(listDivNode)
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