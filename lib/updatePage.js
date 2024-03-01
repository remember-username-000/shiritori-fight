const c_updatePage = "updatePage.js";

/**
 * Changes the diaplay on one of the panels to another menu tab.
 * @param {string} panelId The <pre><code>id</code></pre> of the panel to be changed.
 * @param {string} sharedClassName The <pre><code>class</code></pre> shared by the tab and the content.
 */
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

/**
 * Logs a message to the game's console.
 * @param {string} message The message to be logged.
 * @param {boolean} clear Whether or not to clear the console before logging the <pre><code>message</code></pre>.
 */
function gameLog (message, clear) {
    const gameLog = document.getElementById('game-log');
    if (clear) {
        gameLog.innerHTML = "";
        let newLine = document.createElement('p');
        newLine.innerHTML = message;
        newLine.style.marginTop = 0;
        gameLog.appendChild(newLine);
    } else {
        let newLine = document.createElement('p');
        newLine.innerHTML = message;
        gameLog.appendChild(newLine);
    }
}