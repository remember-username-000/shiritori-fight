const c_handleInput = "handleInput.js";

/**
 * Get the value of an HTML form element, using the element's <pre><code>id</code></pre> attribute.
 * @param {string} formElementID - The "id" attribute of the HTML form element to get data from.
 * @returns The value of the HTML form element passed in as <pre><code>formElementID</code></pre>.
 */
const getInput = function (formElementID) {
    const element = document.getElementById(formElementID);
    return element.value;
}

/**
 * Clear the valueof an HTML form element, using the element's <pre><code>id</code></pre> attribute.
 * @param {string} formElementID 
 */
function clearInput (formElementID) {
    const element = document.getElementById(formElementID);
    element.value = '';
}

/**
 * Create a <pre><code>\<div\></code></pre> element for a word entry. These are intended for the homophone selection menu.
 * @param {object} wordUnit The word unit to create the <pre><code>\<div\></code></pre> element from.
 * @returns {HTMLDivElement} The <pre><code>\<div\></code></pre> element created from the <pre><code>wordUnit</code></pre>.
 */
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

    let content = document.createElement('span');
    content.innerHTML = text;
    content.style.fontSize = "24px";

    let typePreview = document.createElement("img");
    typePreview.className = "type-preview";
    typePreview.style.height = "24px";
    typePreview.style.width = "24px";
    typePreview.style.marginLeft = "8px";
    typePreview.style.marginRight = "12px";
    typePreview.src = imgUrlFromType(getWordType(wordUnit.word));

    div.appendChild(typePreview);
    div.appendChild(content);

    div.addEventListener('click', function () {
        playerSubmit(wordUnit);
        document.getElementById("word-select-menu").innerHTML = "";
        document.getElementById("word-select-menu").style.display = 'none';
    });
    return div;
}

/**
 * This function runs when the player makes an edit in the user input field for submitting words.
 */
function onUserInput () {
    const menu = document.getElementById("word-select-menu"); //Clear existing menu HTML
    menu.innerHTML = "";
    const getButton = document.getElementById("get");
    getButton.value = "Get";

    const typePreview = document.getElementById('player-ui-type-preview');

    if (endsWithNN(getInput("word-input"))) { //Exit function if word fails tests
        getButton.disabled = true;
        typePreview.src = "sprites/transparent.png";
        return;
    }
    if (!overlapsWord(wordsPlayed[wordsPlayed.length - 1].word.kana[wordsPlayed[wordsPlayed.length - 1].kanaIndex].text, getInput("word-input"))) { 
        getButton.disabled = true;
        typePreview.src = "sprites/transparent.png";
        return;
    }

    playerValidWords = getWordByKana(getInput("word-input"));
    trimPlayedFromWordUnitArray(playerValidWords);

    if (playerValidWords.length == 0) {
        getButton.disabled = true;
        typePreview.src = "sprites/transparent.png";
        return;
    }
    if (playerValidWords.length == 1) {
        getButton.disabled = false;
        typePreview.src = imgUrlFromType(getWordType(playerValidWords[0].word));
        return;
    }
    for (let i = 0; i < playerValidWords.length; i++) {
        menu.appendChild(createMenuDiv(playerValidWords[i]));
        getButton.value = "...";
        getButton.disabled = false;
        typePreview.src = "sprites/transparent.png";
    }
}

/**
 * Displays the homophone selection menu, if appropriate, when the player hovers over the "Get" button.
 */
function userGetHover () {
    const menu = document.getElementById("word-select-menu");
    if (menu.childElementCount > 1) {
        document.getElementById('word-select-menu').style.display = 'block';      
    }
}