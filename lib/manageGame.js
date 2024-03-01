const c_manageGame = "manageGame.js";

/**
 * Prevents the user from interacting with the main game.
 */
function disablePlayer () {
    document.getElementById('word-input').disabled = true;
    document.getElementById('get').disabled = true;
    document.getElementById('get').value = 'Get';

    document.getElementById("word-select-menu").innerHTML = '';
}

/**
 * Allows the user to interact with the main game.
 */
function enablePlayer () {
    document.getElementById('word-input').disabled = false;

}

/**
 * Submits a word unit to the game.
 * @param {Object} wordUnit A word unit representing the word to be submitted.
 * @param {boolean} disable Whether or not to disable the user after submitting the <pre><code>wordUnit</code></pre>.
 */
function submitWord (wordUnit, disable) {
    wordsPlayed.push(wordUnit);

    let prevChar = caseWord(wordUnit.word.kana[wordUnit.kanaIndex].text).at(-1);
    document.getElementById('word-input').placeholder = prevChar + "～";

    const wordHistory = document.getElementById("word-history");
    let content = document.createElement("p");
    content.className = "word-history-entry";
    
    if ((wordUnit.word.kanji.length) > 0 && (wordUnit.word.kana[wordUnit.kanaIndex].appliesToKanji.length > 0)) {
        if (wordUnit.word.kana[wordUnit.kanaIndex].appliesToKanji.includes('*')) {
            content.innerHTML = `${wordUnit.word.kanji[0].text} (${wordUnit.word.kana[wordUnit.kanaIndex].text})`;
        } else {
            content.innerHTML = `${wordUnit.word.kana[wordUnit.kanaIndex].appliesToKanji[0]} (${wordUnit.word.kana[wordUnit.kanaIndex].text})`;
        }
        
    } else {
        content.innerHTML = wordUnit.word.kana[wordUnit.kanaIndex].text;
    }

    let typePreview = document.createElement("img");
    typePreview.className = "type-preview";
    typePreview.src = imgUrlFromType(getWordType(wordUnit.word));

    let newDiv = document.createElement("div");
    newDiv.appendChild(typePreview);
    newDiv.appendChild(content);

    wordHistory.appendChild(newDiv);
    clearInput('word-input');
    document.getElementById('player-ui-type-preview').src = "sprites/transparent.png";

    if (disable) {
        disablePlayer();
    } else {
        enablePlayer();
    }
}

/**
 * Runs when the player submits a word (clicks the "Get" button with a valid word).
 * @param {Object} wordUnit A word unit representing the word to be submitted.
 */
function playerSubmit (wordUnit) {
    let damage = calculateDamage(wordsPlayed[wordsPlayed.length - 1], wordUnit, 10);
    submitWord(wordUnit, true);

    document.getElementById('you-current-word').innerHTML = wordUnit.word.kana[wordUnit.kanaIndex].text;
    document.querySelector(".player-current-word-container.for-you .type-preview").src = imgUrlFromType(getWordType(wordUnit.word));

    if (document.querySelector(".player-current-word-container.for-you .current-word-display-shading").style.display == "") {
        document.querySelector(".player-current-word-container.for-you .current-word-display-shading").style.display = "block";
    }

    if (wordsPlayed.length <= 2) {//If this is the first word of the game
        gameLog(`${playerObj.getName()} played ${wordUnit.word.kana[wordUnit.kanaIndex].text}!`, false);
    } else {
        playerObj.dealDamage(opponentObj, damage, 0);
        gameLog(`${playerObj.getName()} played ${wordUnit.word.kana[wordUnit.kanaIndex].text}, dealing ${damage} damage to ${opponentObj.getName()}!`, false); 
    }

    if (playerObj.defeatedOpponent == true) {
        updateHp(false, true);
        return;
    } else {
        updateHp(true, true);
    }
    
    computerSubmit();
}

/**
 * Submits a word as the computer, ending the game if it cannot find any valid words, or if the user will not be able to find any valid words on their next turn.
 */
function computerSubmit () {
    if (findNextWord(wordsPlayed[wordsPlayed.length - 1]).length == 0) {
        gameLog('No more valid words available.', false);
        gameLog('Player wins!', false);
        endGame();
        return;
    }

    let nextWord = findNextWord(wordsPlayed[wordsPlayed.length - 1])[0];
    let damage = calculateDamage(wordsPlayed[wordsPlayed.length - 1], nextWord, 10);
    submitWord(nextWord, false);

    document.getElementById('opponent-current-word').innerHTML = nextWord.word.kana[nextWord.kanaIndex].text
    document.querySelector(".player-current-word-container.for-opponent .type-preview").src = imgUrlFromType(getWordType(nextWord.word));

    if (document.querySelector(".player-current-word-container.for-opponent .current-word-display-shading").style.display == "") {
        document.querySelector(".player-current-word-container.for-opponent .current-word-display-shading").style.display = "block";
    }

    if (wordsPlayed.length <= 2) {//If this is the first word of the game
        gameLog(`${opponentObj.getName()} played ${nextWord.word.kana[nextWord.kanaIndex].text}!`, false);
    } else {
        opponentObj.dealDamage(playerObj, damage, 0);
        gameLog(`${opponentObj.getName()} played ${nextWord.word.kana[nextWord.kanaIndex].text}, dealing ${damage} damage to ${playerObj.getName()}!`, false);
    }

    if (opponentObj.defeatedOpponent == true) {
        updateHp(true, false);
        return;
    } else {
        updateHp(true, true);
    }

    if (findNextWord(wordsPlayed[wordsPlayed.length - 1]).length == 0) { //If there are no words for the next player, activate game end condition
        gameLog('No more valid words available.', false);
        gameLog('Opponent wins!', false);
        endGame();
    }
}

/**
 * Starts a new game, resetting both players and the list of played words.
 */
function startGame () {
    playerObj.reset(100, 1);
    opponentObj.reset(100, 1);

    let playerStartsGame = Math.random() < 0.5;

    updateHp(true, true);

    wordsPlayed = [];
    document.getElementById('word-history').innerHTML = '';

    document.getElementById('you-current-word').innerHTML = "";
    document.querySelector(".player-current-word-container.for-you .type-preview").src = "sprites/transparent.png";
    document.querySelector(".player-current-word-container.for-you .current-word-display-shading").style.display = "";
    
    document.getElementById('opponent-current-word').innerHTML = "";
    document.querySelector(".player-current-word-container.for-opponent .type-preview").src = "sprites/transparent.png";
    document.querySelector(".player-current-word-container.for-opponent .current-word-display-shading").style.display = "";

    let startingWord = getWordRandom()[0];
    while (endsWithNN(startingWord.word.kana[startingWord.kanaIndex].text)) {
        startingWord = getWordRandom()[0];
    }
    submitWord(startingWord, !playerStartsGame);

    document.getElementById('start-game').disabled = true;    
    document.getElementById('end-game').disabled = false;

    let resetLog = document.getElementById('clear-log-on-start').checked;

    gameLog('Game started! (The game can be ended from the Options menu.)', resetLog);
    document.getElementsByClassName('panel-menu-bar')[1].getElementsByClassName('panel-menu-tab-text')[0].click();

    if (!playerStartsGame) {
        computerSubmit();
    }
}

/**
 * Ends an existing game, freezing gameplay and disabling user interaction.
 */
function endGame () {
    disablePlayer();
    clearInput('word-input');

    document.getElementById('start-game').disabled = false;    
    document.getElementById('end-game').disabled = true;

    gameLog('Game over! (Start a new game from the Options menu.)', false);
}

/**
 * Updates the HP display in-game for players.
 * @param {boolean} forPlayer Whether or not to update the HP display for the user.
 * @param {boolean} forOpponent Whether or not to update the HP display for the opponent.
 * @returns 
 */
function updateHp (forPlayer, forOpponent) {
    if (forPlayer) {
        document.querySelector(".hp-text.player-stats").innerHTML = playerObj.hp();
        document.getElementById('hp-bar-you').style.width = ((playerObj.hp() / playerObj.maxHp()) * 200) + "px";
        if (playerObj.dead()) {
            gameLog('Opponent wins!', false);
            endGame();
            return;
        }
    }
    if (forOpponent) {
        document.querySelector(".hp-text.opponent-stats").innerHTML = opponentObj.hp();
        document.getElementById('hp-bar-opponent').style.width = ((opponentObj.hp() / opponentObj.maxHp()) * 200) + "px";
        if (opponentObj.dead()) {
            gameLog('Player wins!', false);
            endGame();
            return;
        }
    }
}

/**
 * Updates the names of participating players.
 * @param {Element} originElem The text field to get a new name from.
 * @param {Element} targetElem The <pre><code>Element</code></pre> that holds the target player's name display.
 * @param {Player} targetPlayerObj The <pre><code>Player</code></pre> to change the name of.
 */
function updateName (originElem, targetElem, targetPlayerObj) {
    let nameString = originElem.value;
    targetElem.innerHTML = nameString;

    gameLog(`${targetPlayerObj.getName()}'s name was changed to ${nameString}.`, false);

    targetPlayerObj.setName(nameString);
    originElem.value = "";
}

/**
 * Calculates the damage that should be dealt from playing a word.
 * @param {Object} prevWordUnit A word unit representing the word previously played.
 * @param {Object} thisWordUnit A word unit representing the word to be played.
 * @param {number} rawDamage The amount of damage that would be dealt, before applying the type advantage/disadvantage change.
 * @returns {number} The amount of damage that should be dealt, accounting for the type advantage/disadvantage change.
 */
function calculateDamage (prevWordUnit, thisWordUnit, rawDamage) {
    let prevType = getWordType(prevWordUnit.word);
    if (prevType == -1) {
        prevType = 24;
    }
    let thisType = getWordType(thisWordUnit.word);
    if (thisType == -1) {
        thisType = 24;
    }

    let typeRel = typeMat[thisType][prevType];

    if (typeRel == 0) {
        return rawDamage;
    } else if (typeRel == 1) {
        return rawDamage * 0.5;
    } else if (typeRel == 2) {
        return rawDamage * 2;
    } else if (typeRel == 9) {
        return 0;
    }

    return rawDamage;
}