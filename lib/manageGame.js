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
    let newEntry = document.createElement("p");
    
    if (wordUnit.word.kanji.length > 0) {
        if (wordUnit.word.kana[wordUnit.kanaIndex].appliesToKanji.includes('*')) {
            newEntry.innerHTML = `${wordUnit.word.kanji[0].text} (${wordUnit.word.kana[wordUnit.kanaIndex].text})`;
        } else {
            newEntry.innerHTML = `kana applies to specific kanji (${wordUnit.word.kana[wordUnit.kanaIndex].appliesToKanji[0]})`;
            console.log(wordUnit.word.kana[wordUnit.kanaIndex]);
        }
        
    } else {
        newEntry.innerHTML = wordUnit.word.kana[wordUnit.kanaIndex].text;
    }

    wordHistory.appendChild(newEntry);
    clearInput('word-input');

    if (disable) {
        disablePlayer();
    } else {
        enablePlayer();
    }
}

function playerSubmit (wordUnit) {
    submitWord(wordUnit, true);

    playerObj.dealDamage(opponentObj, 10, 0);
    gameLog(`${playerObj.getName()} played ${wordUnit.word.kana[wordUnit.kanaIndex].text}, dealing ${10} damage to ${opponentObj.getName()}!`, false);
    if (playerObj.defeatedOpponent == true) {
        updateHp(false, true);
        return;
    } else {
        updateHp(true, true);
    }
    
    computerSubmit();
}

function computerSubmit () {
    if (findNextWord(wordsPlayed[wordsPlayed.length - 1]) == null) {
        gameLog('No more valid words available.', false);
        gameLog('Player wins!', false);
        endGame();
        return;
    } else {
        let nextWord = findNextWord(wordsPlayed[wordsPlayed.length - 1])[0];
        submitWord(nextWord, false);
        gameLog(`${opponentObj.getName()} played ${nextWord.word.kana[nextWord.kanaIndex].text}, dealing ${10} damage to ${playerObj.getName()}!`, false);

        opponentObj.dealDamage(playerObj, 10, 0);
        if (opponentObj.defeatedOpponent == true) {
            updateHp(true, false);
            return;
        } else {
            updateHp(true, true);
        }
        
    }
    if (findNextWord(wordsPlayed[wordsPlayed.length - 1]) == null) { //If there are no words for the next player, activate game end condition
        gameLog('No more valid words available.', false);
        gameLog('Opponent wins!', false);
        endGame();
    }
}

function startGame () {
    playerObj.reset(100, 1);
    opponentObj.reset(100, 1);

    updateHp(true, true);

    wordsPlayed = [];
    document.getElementById('word-history').innerHTML = '';
    submitWord(getWordByID('2028990')[0], false);

    document.getElementById('start-game').disabled = true;    
    document.getElementById('end-game').disabled = false;

    let resetLog = document.getElementById('clear-log-on-start').checked;

    gameLog('Game started! (The game can be ended from the Options menu.)', resetLog);
    document.getElementsByClassName('panel-menu-bar')[1].getElementsByClassName('panel-menu-tab-text')[0].click();
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
        if (playerObj.dead()) {
            gameLog('Opponent wins!', false);
            endGame();
            return;
        }
    }
    if (forOpponent) {
        document.querySelector(".hp-text.opponent-stats").innerHTML = opponentObj.hp();
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