import { get_headers } from "./service.js"
import { get_list } from "./service.js"
import { post_list } from "./service.js"
import { get_profile } from "./service.js"
// import fs from 'fs'

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
        const compListTest = 
        {
            "Name": "Comp Tau List",
            "Detachment": "Mont'Ka",
            "Points": 2000,
            "Models": [
                "Commander Farsight",
                "Commander Shadowsun",
                "Ethereal on Hover Drone",
                "Coldstar Commander",
            ],
        }
        await post_list("Tau Comp List", compListTest)
        renderListsPage()
    })

    anchorListNode.appendChild(addNewListNode)

    mainAnchorNode.replaceChildren(anchorListNode)
}

async function renderSettingsPage() {
    const settings = await get_profile(currentUser)
    
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