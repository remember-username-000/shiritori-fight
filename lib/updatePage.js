const c_updatePage = "updatePage.js";

function panelChange (panelId, sharedClassName) {
    const menus = document.getElementById(panelId).getElementsByClassName('panel-contents');
    for (let i = 0; i < menus.length; i++) {
        menus[i].style.display = 'none';
    }
    const tabs = document.getElementById(panelId).getElementsByClassName('panel-menu-tab-text');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.color = '#777777';
        tabs[i].style.background = '#eeeeee';
    }
    
    const tab = document.querySelector(`p.panel-menu-tab-text.${sharedClassName}`);
    const content = document.querySelector(`div.panel-contents.${sharedClassName}`);
    
    content.style.display = 'block';
    tab.style.color = '#000000';
    tab.style.background = '#ffffff';
}

function gameLog (message) {
    const gameLog = document.getElementById('game-log');
    let newLine = document.createElement('p');
    newLine.innerHTML = message;
    gameLog.appendChild(newLine);
}