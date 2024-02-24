function disablePlayer () {
    document.getElementById('word-input').disabled = true;
    document.getElementById('get').disabled = true;
    document.getElementById('get').value = 'Get';

    document.getElementById("word-select-menu").innerHTML = '';
}

function enablePlayer () {
    document.getElementById('word-input').disabled = false;

}

function submitWord (wordUnit, disable) {
    wordsPlayed.push(wordUnit);

    let prevChar = caseWord(wordUnit.word.kana[wordUnit.kanaIndex].text.at(-1));
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

    submitWord(getWordRandom()[0], !playerStartsGame);

    document.getElementById('start-game').disabled = true;    
    document.getElementById('end-game').disabled = false;

    let resetLog = document.getElementById('clear-log-on-start').checked;

    gameLog('Game started! (The game can be ended from the Options menu.)', resetLog);
    document.getElementsByClassName('panel-menu-bar')[1].getElementsByClassName('panel-menu-tab-text')[0].click();

    if (!playerStartsGame) {
        computerSubmit();
    }
}

function endGame () {
    disablePlayer();
    clearInput('word-input');

    document.getElementById('start-game').disabled = false;    
    document.getElementById('end-game').disabled = true;

    gameLog('Game over! (Start a new game from the Options menu.)', false);
}

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

function updateName (originElem, targetElem, targetPlayerObj) {
    let nameString = originElem.value;
    targetElem.innerHTML = nameString;

    gameLog(`${targetPlayerObj.getName()}'s name was changed to ${nameString}.`);

    targetPlayerObj.setName(nameString);
    originElem.value = "";
}

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
}