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
            if (wordsPlayed[i] === wordsPlayed[j]) {
                return true;
            }
        }
    }
    return false;
}

let debug_newWordTypeEntries = [];

function debug_addWordTypeEntry (num) {
    let target = wordsPlayed[wordsPlayed.length - (num + 1)];
    let header;

    if (target.word.kanji.length > 0) {
        if (target.word.kana[target.kanaIndex].appliesToKanji.includes('*')) {
            header = `${target.word.kanji[0].text} (${target.word.kana[target.kanaIndex].text})`;
        } else {
            header = `${target.word.kana[target.kanaIndex].appliesToKanji[0]} (${target.word.kana[target.kanaIndex].text})`;
        }
    } else {
        header = target.word.kana[target.kanaIndex].text;
    }

    let text = ("(" + charFromType(getWordType(target.word)) + ") " + header + ":");
    for (let i = 0; i < target.word.sense.length; i++) {
        text += ("\n    " + (i + 1) + ". ");
        for (let j = 0; j < target.word.sense[i].gloss.length; j++) {
            text += (target.word.sense[i].gloss[j].text);
            if ((j == (target.word.sense[i].gloss.length - 1)) && (i == (target.word.sense.length - 1))) {
                text += ".";
            } else if (j == (target.word.sense[i].gloss.length - 1)) {
                text += ";";
            } else {
                text += ", ";
            }
        }
    }
    text += "\n\nWhat type should this word be? (0-24)";
    let userType = prompt(text);
    if ((parseInt(userType) >= 0) && (parseInt(userType) <= 24)) {
        debug_newWordTypeEntries.push([target.word.id, parseInt(userType)]);
    }
}

function debug_printNewEntries () {
    let print = ">";
    for (let i = 0; i < debug_newWordTypeEntries.length; i++) {
        print += (debug_newWordTypeEntries[i][0] + ":" + debug_newWordTypeEntries[i][1] + ",");
    }
    print += "<";
    console.log(print);
}