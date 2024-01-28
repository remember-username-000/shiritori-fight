const c_findNextWord = "findNextWord.js";

function findNextWord (prevWordUnit) {
    let validWords = getWordByInit(caseWord(prevWordUnit.word.kana[prevWordUnit.kanaIndex].text).at(-1));
    let returnArray = [];

    let readingText;

    for (let i = validWords.length - 1; i >= 0; i--) { //Iterate over each eligible word
        readingText = validWords[i].word.kana[validWords[i].kanaIndex].text;
        if (endsWithNN(readingText)) {
            validWords.splice(i, 1);
            continue;
        }
        if (readingText.length == 1) {
            validWords.splice(i, 1);
            continue;
        }
        
    }
    
    trimWordUnitArray(validWords);

    if (validWords.length == 0) {
        return null;
    }

    let random = Math.ceil(Math.random() * (validWords.length - 1));

    returnArray.push(validWords[random]);
    return returnArray;

}