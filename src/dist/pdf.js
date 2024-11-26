import { get_list } from "./service.js";
const mainAnchor = document.getElementById('bodyAnchor');
async function renderList() {
    const urlParams = new URLSearchParams(window.location.search);
    const filename = urlParams.get('file');
    const list = await get_list(filename);
    const listDiv = document.createElement('div');
    const listName = document.createElement('h1');
    listName.textContent = filename;
    let pointsNode = document.createElement('p');
    pointsNode.textContent = list.Points;
    pointsNode.className = "pointsDescription";
    let modelDivNode = document.createElement('div');
    modelDivNode.className = "listModels";
    list.Models.forEach(model => {
        let modelNode = document.createElement('p');
        modelNode.className = "modelName";
        modelNode.textContent = model;
        modelDivNode.appendChild(modelNode);
    });
    listDiv.replaceChildren(listName, pointsNode, modelDivNode);
    mainAnchor.replaceChildren(listDiv);
}
await renderList();
//# sourceMappingURL=pdf.js.map