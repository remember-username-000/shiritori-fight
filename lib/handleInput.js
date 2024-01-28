const c_handleInput = "handleInput.js";

/**
 * Get the value of an HTML form element, using the element's "id" attirbute.
 * @param {string} formElementID - The "id" attribute of the HTML form element to get data from.
 * @returns The value of the HTML form element passed in as formElementID.
 */
const getInput = function (formElementID) {
    const element = document.getElementById(formElementID);
    return element.value;
}

function clearInput (formElementID) {
    const element = document.getElementById(formElementID);
    element.value = '';
}

function createMenuDiv(wordUnit) {
    let div = document.createElement("div");
    div.className = "word-select-menu-item";
    
    if (wordUnit.word.kanji.length > 0) {
        let content = document.createTextNode(wordUnit.word.kanji[0].text);
        div.appendChild(content);
    } else {
        let content = document.createTextNode(wordUnit.word.kana[wordUnit.kanaIndex].text);
        div.appendChild(content);
    }

    div.addEventListener('click', function () {
        playerSubmit(wordUnit);
        document.getElementById("word-select-menu").innerHTML = "";
        document.getElementById("word-select-menu").style.display = 'none';
    });
    return div;
}

function onUserInput () {
    const menu = document.getElementById("word-select-menu"); //Clear existing menu HTML
    menu.innerHTML = "";
    const getButton = document.getElementById("get");
    getButton.value = "Get";

    if (endsWithNN(getInput("word-input"))) { //Exit function if word fails tests
        getButton.disabled = true;
        return;
    }
    if (!overlapsWord(wordsPlayed[wordsPlayed.length - 1].word.kana[wordsPlayed[wordsPlayed.length - 1].kanaIndex].text, getInput("word-input"))) { 
        getButton.disabled = true;
        return;
    }

    playerValidWords = getWordByKana(getInput("word-input"));
    trimWordUnitArray(playerValidWords);

    if (playerValidWords.length == 0) {
        getButton.disabled = true;
        return;
    }
    if (playerValidWords.length == 1) {
        getButton.disabled = false;
        return;
    }
    for (let i = 0; i < playerValidWords.length; i++) {
        menu.appendChild(createMenuDiv(playerValidWords[i]));
        getButton.value = "...";
        getButton.disabled = false;
    }
}

function userGetHover () {
    const menu = document.getElementById("word-select-menu");
    if (menu.childElementCount > 1) {
        document.getElementById('word-select-menu').style.display = 'block';      
    }
}