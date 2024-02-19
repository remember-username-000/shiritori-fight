const c_findNextWord = "findNextWord.js";

function findNextWord (prevWordUnit) {
    let returnArray = [];   
    let checkedIndexes = [];

    for (let i = 0; i < data_jmdict.words.length; i++) {
        let ranInt = Math.floor(Math.random() * data_jmdict.words.length);

        if (checkedIndexes.includes(ranInt)) {
            continue;
        } else {
            checkedIndexes.push(ranInt);           
        }

        let failed = false;
        for (let j = 0; j < wordsPlayed.length; j++) {
            if (wordsPlayed[j].word.id === data_jmdict.words[ranInt].id) {
                failed = true;
                break;
            }
        }
        if (failed) {
            continue;
        }

        for (let j = 0; j < data_jmdict.words[ranInt].kana.length; j++) { //Iterate through the kana readings of a word
            if (data_jmdict.words[ranInt].kana[j].common === false) { //If the kana reading found is not common, don't bother
                continue;
            }

            let readingText = data_jmdict.words[ranInt].kana[j].text;

            if (endsWithNN(readingText)) {
                continue;
            }
            if (readingText.length == 1) {
                continue;
            }
            if (overlapsWord(prevWordUnit.word.kana[prevWordUnit.kanaIndex].text, readingText)) {
                returnArray.push({
                    "word": data_jmdict.words[ranInt],
                    "kanaIndex": j
                });
                return returnArray;
            }
        }
    }

    return returnArray;

    /* Previous implementation

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
    
    trimPlayedFromWordUnitArray(validWords);

    if (validWords.length == 0) {
        return null;
    }

    let random = Math.ceil(Math.random() * (validWords.length - 1));

    returnArray.push(validWords[random]);
    return returnArray;
    */

}