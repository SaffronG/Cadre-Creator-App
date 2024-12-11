import { url } from "inspector"
import { get_list, get_model } from "./service.js"

const mainAnchor = document.getElementById('bodyAnchor')

async function renderList() {
    const urlParams = new URLSearchParams(window.location.search)
    const filename: string = urlParams.get('file')

    const list = await get_list(filename)

    const listDiv: HTMLDivElement = document.createElement('div')

    const listName: HTMLHeadElement = document.createElement('h1')
    listName.textContent = filename

    let pointsNode: HTMLParagraphElement = document.createElement('p')
    pointsNode.textContent = list.Points
    pointsNode.className = "pointsDescription"

    let modelDivNode: HTMLDivElement = document.createElement('div')
    modelDivNode.className = "listModels"

    let allElements = list.Models.map( async (model) => {
        const modelJson = await get_model(model)
        console.log(modelJson)

        let currentModel: HTMLDivElement = document.createElement('div')
        currentModel.className = "pdfModel"

        let modelNameNode: HTMLParagraphElement = document.createElement('p')
        modelNameNode.className = "modelName"
        modelNameNode.textContent = model

        let compositionNode: HTMLParagraphElement = document.createElement('p')
        compositionNode.className = 'unitComposition'
        compositionNode.textContent = `Unit composition: ${modelJson.Unit_Composition}`

        let keywords: HTMLParagraphElement = document.createElement('p')
        keywords.className = 'keywords'
        keywords.textContent = `Keywords: ${modelJson.Keywords}`
        
        let statsDiv: HTMLDivElement = document.createElement('div')
        statsDiv.className = 'stats'
        
        let movement: HTMLParagraphElement = document.createElement('p')
        movement.textContent = `Movement: ${modelJson.Movement}`
        let toughness: HTMLParagraphElement = document.createElement('p')
        toughness.textContent = `Toughness: ${modelJson.Toughness}`
        let save: HTMLParagraphElement = document.createElement('p')
        save.textContent = `Save: ${modelJson.Save}`
        let wounds: HTMLParagraphElement = document.createElement('p')
        wounds.textContent = `Wounds: ${modelJson.Wounds}`
        let leadership: HTMLParagraphElement = document.createElement('p')
        leadership.textContent = `Leadership: ${modelJson.Leadership}`
        let objectiveControl: HTMLParagraphElement = document.createElement('p')
        objectiveControl.textContent = `Objective Control: ${modelJson.Objective_Control}`

        

        statsDiv.replaceChildren(movement, toughness, save, wounds, leadership, objectiveControl)

        currentModel.replaceChildren(modelNameNode, compositionNode, statsDiv, keywords)
        modelDivNode.appendChild(currentModel)
    })


    listDiv.replaceChildren(listName, pointsNode, modelDivNode)
    mainAnchor.replaceChildren(listDiv)
}

await renderList()