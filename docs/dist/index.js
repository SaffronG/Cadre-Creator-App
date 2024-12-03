import { get_headers, get_list, get_profile, get_rules, get_rule } from "./service.js";
let currentUser = "default";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const contents = urlParams.get('contents');
const mainAnchorNode = document.getElementById('main-containter');
function renderLanding() {
    const welcomeHeader = document.createElement('h1');
    welcomeHeader.id = "welcomeHeader";
    welcomeHeader.textContent = "Welcome to the cadre creator!";
    const introText = document.createElement('p');
    introText.innerHTML = 'Try and click the "<i class="fa-solid fa-plus" id="examplePlus"></i>" button down below!';
    mainAnchorNode.replaceChildren(welcomeHeader, introText);
}
async function renderListsPage() {
    let listsJson = await get_headers();
    let anchorListNode = document.createElement('div');
    listsJson.lists.forEach(list => {
        let listContainderNode = document.createElement('div');
        listContainderNode.className = "listViewer";
        let titleDivNode = document.createElement('div');
        titleDivNode.className = "titleDiv";
        let listName = document.createElement('p');
        listName.textContent = list;
        listName.className = "listText";
        let plusButtom = document.createElement('button');
        plusButtom.className = "viewMore";
        plusButtom.innerHTML = '<i class="fa-solid fa-plus"></i>';
        let listDetails = document.createElement('div');
        listDetails.className = "listDetails";
        let displayOn = false;
        listDetails.style.display = displayOn ? "block" : "none";
        plusButtom.addEventListener("click", async () => {
            displayOn = displayOn ? false : true;
            listDetails.style.display = displayOn ? "block" : "none";
            let currentList = await get_list(list);
            let pointsNode = document.createElement('p');
            pointsNode.textContent = currentList.Points;
            pointsNode.className = "pointsDescription";
            let modelDivNode = document.createElement('div');
            modelDivNode.className = "listModels";
            currentList.Models.forEach(model => {
                let modelNode = document.createElement('p');
                modelNode.className = "modelName";
                modelNode.textContent = model;
                modelDivNode.appendChild(modelNode);
            });
            // let ellipsesNode: HTMLParagraphElement = document.createElement('p')
            // ellipsesNode.textContent = "..."
            // ellipsesNode.className = "modelName"
            listDetails.replaceChildren(pointsNode, modelDivNode);
        });
        titleDivNode.appendChild(listName);
        titleDivNode.appendChild(plusButtom);
        listContainderNode.appendChild(titleDivNode);
        listContainderNode.appendChild(listDetails);
        anchorListNode.appendChild(listContainderNode);
    });
    let addNewListNode = document.createElement('button');
    addNewListNode.className = "viewMore";
    addNewListNode.innerHTML = '<i class="fa-solid fa-plus"></i>';
    addNewListNode.addEventListener("click", async () => {
        window.location.replace(`/builder.html`);
    });
    anchorListNode.appendChild(addNewListNode);
    mainAnchorNode.replaceChildren(anchorListNode);
}
async function renderSettingsPage() {
    const settings = await get_profile("default");
    const settingsDivNode = document.createElement('div');
    settingsDivNode.id = "settingsDiv";
    for (const setting in settings) {
        console.log(setting);
        const settingItemNode = document.createElement('div');
        settingItemNode.className = "setting";
        const settingHeaderNode = document.createElement('h2');
        settingHeaderNode.innerText = setting;
        settingHeaderNode.className = "settingLabel";
        const settingToggleButton = document.createElement('div');
        settingToggleButton.innerHTML = setting == "Dark-Mode" || setting == "Push-Notifications" ? '</label><!-- Rounded switch --><label class="switch"><input type="checkbox"><span class="slider round"></span></label>' : '<select></select>';
        settingItemNode.appendChild(settingHeaderNode);
        settingItemNode.appendChild(settingToggleButton);
        settingsDivNode.appendChild(settingItemNode);
    }
    const loginButton = document.createElement('a');
    loginButton.id = "loginLink";
    loginButton.href = "./index.html?contents=login";
    loginButton.textContent = "Login";
    mainAnchorNode.replaceChildren(loginButton, settingsDivNode);
}
async function renderDownloadsPage() {
    const lists = await get_headers();
    const downloadsDivNode = document.createElement('div');
    downloadsDivNode.className = 'downloads';
    lists.lists.forEach(list => {
        const downloadLinkNode = document.createElement('a');
        downloadLinkNode.innerHTML = list + '  <i class="fa-solid fa-download"></i>';
        downloadLinkNode.href = `./pdf.html?file=${list}`;
        downloadLinkNode.className = 'downloadLink';
        downloadsDivNode.appendChild(downloadLinkNode);
    });
    const titleHeader = document.createElement('div');
    titleHeader.id = "titleHeader";
    titleHeader.textContent = "Downloads";
    mainAnchorNode.replaceChildren(titleHeader, downloadsDivNode);
}
async function renderExportPage() {
    const lists = await get_headers();
    const downloadsDivNode = document.createElement('div');
    downloadsDivNode.className = 'downloads';
    lists.lists.forEach(list => {
        const downloadLinkNode = document.createElement('a');
        downloadLinkNode.innerHTML = list + '  <i class="fa-solid fa-arrow-up-from-bracket"></i>';
        downloadLinkNode.href = `./pdf.html?file=${list}`;
        downloadLinkNode.className = 'downloadLink';
        downloadsDivNode.appendChild(downloadLinkNode);
    });
    const titleHeader = document.createElement('div');
    titleHeader.id = "titleHeader";
    titleHeader.textContent = "Exports";
    mainAnchorNode.replaceChildren(titleHeader, downloadsDivNode);
}
async function renderRulesPage() {
    const rules = await get_rules();
    const rulesDivNode = document.createElement('div');
    rulesDivNode.id = "rules";
    rules.lists.forEach(rule => {
        const ruleCardNode = document.createElement('div');
        ruleCardNode.className = "ruleCard";
        const cardNodeHeader = document.createElement('h2');
        cardNodeHeader.textContent = rule;
        cardNodeHeader.className = "ruleHeader";
        let plusButton = document.createElement('button');
        plusButton.className = "viewMore";
        plusButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
        plusButton.addEventListener("click", async () => {
            const ruleJson = await get_rule(rule);
            const rulesInfoDiv = document.createElement('div');
            ruleJson.forEach(paragraph => {
                const paragraphDiv = document.createElement('div');
                paragraphDiv.className = 'rulesInfo';
                const subHeader = document.createElement('h3');
                subHeader.className = 'ruleHeading';
                subHeader.textContent = paragraph.name;
                const ruleDescription = document.createElement('p');
                ruleDescription.className = 'ruleParagraph';
                ruleDescription.textContent = paragraph.description;
            });
        });
        ruleCardNode.replaceChildren(cardNodeHeader, plusButton);
        rulesDivNode.appendChild(ruleCardNode);
    });
    mainAnchorNode.replaceChildren(rulesDivNode);
}
async function renderLoginPage() {
    const loginForm = document.createElement('div');
    loginForm.id = "formNode";
    const header = document.createElement('h1');
    header.textContent = "Login";
    header.id = "loginHeader";
    const usernameBlock = document.createElement('div');
    usernameBlock.className = "formBlock";
    const passwordBlock = document.createElement('div');
    passwordBlock.className = "formBlock";
}
switch (contents) {
    case "export":
        renderExportPage();
        break;
    case "download":
        renderDownloadsPage();
        break;
    case "myLists":
        renderListsPage();
        break;
    case "settings":
        await renderSettingsPage();
        break;
    case "rules":
        renderRulesPage();
        break;
    case "login":
        renderLoginPage();
        break;
    default:
        renderLanding();
        break;
}
//# sourceMappingURL=index.js.map