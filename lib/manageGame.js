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

    const wordHistory = document.getElementById("word-history");
    let newEntry = document.createElement("p");
    
    if (wordUnit.word.kanji.length > 0) {
        if (wordUnit.word.kana[wordUnit.kanaIndex].appliesToKanji.includes('*')) {
            newEntry.innerHTML = `${wordUnit.word.kanji[0].text} (${wordUnit.word.kana[wordUnit.kanaIndex].text})`;
        } else {
            newEntry.innerHTML = 'kana applies to specific kanji';
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

    playerObj.dealDamage(opponentObj, 10);
    updateHp();
    
    computerSubmit();
}

function computerSubmit () {
    if (findNextWord(wordsPlayed[wordsPlayed.length - 1]) == null) {
        gameLog('No more valid words can be found.');
        endGame();
    } else {
        let nextWord = findNextWord(wordsPlayed[wordsPlayed.length - 1])[0];
        opponentObj.dealDamage(playerObj, 10);
        submitWord(nextWord, false);
        updateHp();
        
    }
    if (findNextWord(wordsPlayed[wordsPlayed.length - 1]) == null) {
        gameLog('No more valid words can be found.');
        endGame();
    }
}

function startGame () {
    playerObj = new Player(100, 1);
    opponentObj = new Player(100, 1);

    updateHp();

    wordsPlayed = [];
    document.getElementById('word-history').innerHTML = '';
    submitWord(getWordByID('2028990')[0], false);

    document.getElementById('start-game').disabled = true;    
    document.getElementById('end-game').disabled = false;

    gameLog('Game started! (The game can be ended from the Options menu.)');
    document.getElementsByClassName('panel-menu-bar')[1].getElementsByClassName('panel-menu-tab-text')[0].click();
}

function endGame () {
    disablePlayer();
    clearInput('word-input');

    document.getElementById('start-game').disabled = false;    
    document.getElementById('end-game').disabled = true;

    gameLog('Game over! (Start a new game from the Options menu.)');
}

function updateHp () {
    document.querySelector(".hp-text.opponent-stats").innerHTML = opponentObj.hp();
    document.querySelector(".hp-text.player-stats").innerHTML = playerObj.hp();
}