// import fs from 'fs'
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const contents = urlParams.get('contents')

const mainAnchorNode = document.getElementById('main-containter')

function renderLanding() {

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

    listDivNode.replaceChildren(headerContentsNode, pointValuesNode)
    mainAnchorNode.replaceChildren(listDivNode)
}

switch (contents) {
    case "export":
        break;
    case "download":
        break;
    case "myLists":
        renderListsPage()
        break;
    case "settings":
    case "rule":
    default:
        renderLanding()
        break;
}