import { post_list, get_factions, get_img } from "./service.js"

const mainAnchorNode = document.getElementById("mainContent")

async function renderForm() {
    const formDivNode: HTMLFormElement = document.createElement('form')
    formDivNode.id = "formDiv"

    const listNameLabel: HTMLLabelElement = document.createElement('label')
    listNameLabel.htmlFor = "listName"
    listNameLabel.textContent = 'List'
    
    const listNameInput: HTMLInputElement = document.createElement('input')
    listNameInput.id = "listName"
    listNameInput.placeholder = 'Farsight Tsunami Cadre'

    const factionLabel: HTMLLabelElement = document.createElement('label')
    factionLabel.htmlFor = 'factionInput'
    factionLabel.textContent = 'Faction'

    const factionInput: HTMLSelectElement = document.createElement('select')
    factionInput.id = 'factionInput'
    
    const detachmentLabel: HTMLLabelElement = document.createElement('label')
    detachmentLabel.htmlFor = 'detachmentInput'
    detachmentLabel.textContent = 'Detachment'

    const detatchmentSelector: HTMLSelectElement = document.createElement('select')
    detatchmentSelector.id = 'detachmentInput'

    const factions = await get_factions()

    factions.Factions.forEach(faction => {
        console.log(faction)
        const option: HTMLOptionElement = document.createElement('option')
        option.value = faction.toUpperCase()
        option.textContent = faction.toUpperCase()
        detatchmentSelector.appendChild(option)
    });
    
    const pointsLabel: HTMLLabelElement = document.createElement('label')
    pointsLabel.htmlFor = 'pointsInput'
    pointsLabel.textContent = 'Points'

    const pointValueSelector: HTMLInputElement = document.createElement('input')
    pointValueSelector.type = 'number'
    pointValueSelector.id = 'pointsInput'
    
    const modelLabel: HTMLLabelElement = document.createElement('label')
    modelLabel.htmlFor = 'modelInput'
    modelLabel.textContent = 'Models'

    const selectedModels: HTMLDivElement = document.createElement('div')
    selectedModels.id = "selectedModels"

    const modelFinder: HTMLInputElement = document.createElement('input')
    modelFinder.id = 'modelInput'
    modelFinder.placeholder = 'Commander Farsight...'

    const buttonDiv: HTMLDivElement = document.createElement('div')
    buttonDiv.id = "formButtons"

    const searchButton: HTMLInputElement = document.createElement('input')
    searchButton.type = "submit"
    
    const addButton: HTMLButtonElement = document.createElement('button')
    addButton.innerText = 'Add'

    addButton.addEventListener("click", async (e) => {
        e.preventDefault()
        console.log(modelFinder.value)
        const img = await get_img(modelFinder.value)

        const modelDiv = document.createElement('div')

        const model: HTMLParagraphElement = document.createElement('p')
        model.textContent = modelFinder.value
        model.className = 'listModels'

        const modelImg = document.createElement('img')
        modelImg.className = "modelImage"
        modelImg.src = img

        modelDiv.appendChild(model)
        modelDiv.appendChild(modelImg)
        selectedModels.appendChild(modelDiv)
    })

    formDivNode.addEventListener("submit", async (e) => {
        e.preventDefault()
        const modelsList: String[] = []
    
        selectedModels.childNodes.forEach(model => {
            modelsList.push(model.textContent)
        })

        console.log(modelsList)
        console.log(modelsList.toString())

        await post_list({
            Name:  String(listNameInput.value),
            Detachment: String(detatchmentSelector.value),
            Points: Number(pointValueSelector.value),
            Models: modelsList
        })
    })

    const resetButton: HTMLButtonElement = document.createElement('button')
    resetButton.textContent = "Reset"

    resetButton.addEventListener("click", (e) => {
        listNameInput.value = ""
        modelFinder.value = ""
        selectedModels.replaceChildren()
    })

    buttonDiv.replaceChildren(searchButton, addButton, resetButton)
    formDivNode.replaceChildren(listNameLabel, listNameInput,detachmentLabel, detatchmentSelector,pointsLabel, pointValueSelector, modelLabel, selectedModels, modelFinder, buttonDiv)
    return formDivNode
}

async function renderBuilder() {
    mainAnchorNode.replaceChildren(await renderForm())
}

await renderBuilder()