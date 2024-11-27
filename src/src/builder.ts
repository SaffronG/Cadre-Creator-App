import { post_list } from "./service.js"

const mainAnchorNode = document.getElementById("mainContent")

function renderForm() {
    const formDivNode: HTMLFormElement = document.createElement('form')
    formDivNode.id = "formDiv"

    const listNameLabel: HTMLLabelElement = document.createElement('label')
    listNameLabel.htmlFor = "listName"
    listNameLabel.textContent = 'List'
    
    const listNameInput: HTMLInputElement = document.createElement('input')
    listNameInput.id = "listName"
    listNameInput.placeholder = 'Farsight Tsunami Cadre'
    
    const detachmentLabel: HTMLLabelElement = document.createElement('label')
    detachmentLabel.htmlFor = 'detachmentInput'
    detachmentLabel.textContent = 'Detachment'

    const detatchmentSelector: HTMLSelectElement = document.createElement('select')
    detatchmentSelector.id = 'detachmentInput'
    
    const pointsLabel: HTMLLabelElement = document.createElement('label')
    pointsLabel.htmlFor = 'pointsInput'
    pointsLabel.textContent = 'Points'

    const pointValueSelector: HTMLSelectElement = document.createElement('select')
    pointValueSelector.id = 'pointsInput'
    
    const modelLabel: HTMLLabelElement = document.createElement('label')
    modelLabel.htmlFor = 'modelInput'
    modelLabel.textContent = 'Models'

    const modelFinder: HTMLInputElement = document.createElement('input')
    modelFinder.id = 'modelInput'
    modelFinder.placeholder = 'Commander Farsight...'

    const buttonDiv: HTMLDivElement = document.createElement('div')
    buttonDiv.id = "formButtons"

    const searchButton: HTMLInputElement = document.createElement('input')
    searchButton.type = "submit"

    formDivNode.addEventListener("submit", async (e) => {
        e.preventDefault()

        await post_list({
            name:listNameInput.value,
            detachment:"Cadia",
            points:"1000",
            models:[modelFinder.value]
        })

        alert("List submitted Successfully!")
    })

    const resetButton: HTMLButtonElement = document.createElement('button')
    resetButton.textContent = "Reset"

    resetButton.addEventListener("click", (e) => {
        listNameInput.value = ""
        modelFinder.value = ""
    })

    buttonDiv.replaceChildren(searchButton, resetButton)
    formDivNode.replaceChildren(listNameLabel, listNameInput,detachmentLabel, detatchmentSelector,pointsLabel, pointValueSelector,modelLabel, modelFinder, buttonDiv)
    return formDivNode
}

async function renderBuilder() {
    mainAnchorNode.replaceChildren(renderForm())
}

await renderBuilder()