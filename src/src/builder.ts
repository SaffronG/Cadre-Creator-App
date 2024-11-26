const mainAnchorNode = document.getElementById("mainContent")

function renderForm() {
    const formDivNode: HTMLDivElement = document.createElement('div')
    formDivNode.id = "formDiv"

    const listNameInput: HTMLInputElement = document.createElement('input')
    listNameInput.id = "listName"

    const detatchmentSelector: HTMLSelectElement = document.createElement('select')

    const pointValueSelector: HTMLSelectElement = document.createElement('select')

    const modelFinder: HTMLInputElement = document.createElement('input')

    const buttonDiv: HTMLDivElement = document.createElement('div')
    buttonDiv.id = "formButtons"

    const searchButton: HTMLInputElement = document.createElement('input')
    searchButton.textContent = "Search"
    searchButton.type = "submit"

    const resetButton: HTMLButtonElement = document.createElement('button')
    resetButton.textContent = "Reset"

    buttonDiv.replaceChildren(searchButton, resetButton)
    formDivNode.replaceChildren(listNameInput, detatchmentSelector, pointValueSelector, modelFinder, buttonDiv)
    return formDivNode
}

async function renderBuilder() {
    mainAnchorNode.replaceChildren(renderForm())
}

await renderBuilder()