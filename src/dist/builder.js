const mainAnchorNode = document.getElementById("mainContent");
function renderForm() {
    const formDivNode = document.createElement('div');
    formDivNode.id = "formDiv";
    const listNameInput = document.createElement('input');
    listNameInput.id = "listName";
    const detatchmentSelector = document.createElement('select');
    const pointValueSelector = document.createElement('select');
    const modelFinder = document.createElement('input');
    const buttonDiv = document.createElement('div');
    buttonDiv.id = "formButtons";
    const searchButton = document.createElement('input');
    searchButton.textContent = "Search";
    searchButton.type = "submit";
    const resetButton = document.createElement('button');
    resetButton.textContent = "Reset";
    buttonDiv.replaceChildren(searchButton, resetButton);
    formDivNode.replaceChildren(listNameInput, detatchmentSelector, pointValueSelector, modelFinder, buttonDiv);
    return formDivNode;
}
async function renderBuilder() {
    mainAnchorNode.replaceChildren(renderForm());
}
await renderBuilder();
export {};
//# sourceMappingURL=builder.js.map