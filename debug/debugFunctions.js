function debug_instantSimulationGame (num) {
    endGame();
    startGame();
    for (let i = 0; i < num; i++) {
        computerSubmit();
    }
    endGame();
}

function debug_playedWordsHasDuplicates () {
    for (let i = 0; i < wordsPlayed.length; i++) {
        for (let j = i + 1; j < wordsPlayed.length; j++) {
            if (wordsPlayed[i] === wordsPlayed [j]) {
                return true;
            }
        }
    }
    return false;
}