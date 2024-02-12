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
    let text;
    
    
    if (wordUnit.word.kanji.length > 0) {
        if (wordUnit.word.kana[wordUnit.kanaIndex].appliesToKanji.includes('*')) {
            text = wordUnit.word.kanji[0].text;
        } else {
            text = wordUnit.word.kana[wordUnit.kanaIndex].appliesToKanji[0];
        }   
    } else {
        text = wordUnit.word.kana[wordUnit.kanaIndex].text;
    }

    //text += ` (${getWordType(wordUnit.word)})`;
    let content = document.createTextNode(text);

    let typePreview = document.createElement("p");
    typePreview.className = "type-preview";
    typePreview.style.marginRight = "0.5em";
    typePreview.innerHTML = charFromType(getWordType(wordUnit.word));

    div.appendChild(typePreview);
    div.appendChild(content);

    //Add code for creating p.type-preview element here

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

    const typePreview = document.getElementById('player-ui-type-preview');

    if (endsWithNN(getInput("word-input"))) { //Exit function if word fails tests
        getButton.disabled = true;
        typePreview.innerHTML = "　";
        return;
    }
    if (!overlapsWord(wordsPlayed[wordsPlayed.length - 1].word.kana[wordsPlayed[wordsPlayed.length - 1].kanaIndex].text, getInput("word-input"))) { 
        getButton.disabled = true;
        typePreview.innerHTML = "　";
        return;
    }

    playerValidWords = getWordByKana(getInput("word-input"));
    trimPlayedFromWordUnitArray(playerValidWords);

    if (playerValidWords.length == 0) {
        getButton.disabled = true;
        typePreview.innerHTML = "　";
        return;
    }
    if (playerValidWords.length == 1) {
        getButton.disabled = false;
        typePreview.innerHTML = charFromType(getWordType(playerValidWords[0].word));
        return;
    }
    for (let i = 0; i < playerValidWords.length; i++) {
        menu.appendChild(createMenuDiv(playerValidWords[i]));
        getButton.value = "...";
        getButton.disabled = false;
        typePreview.innerHTML = "＋";
    }
}

function userGetHover () {
    const menu = document.getElementById("word-select-menu");
    if (menu.childElementCount > 1) {
        document.getElementById('word-select-menu').style.display = 'block';      
    }
}