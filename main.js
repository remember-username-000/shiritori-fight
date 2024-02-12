let playerObj;
let opponentObj;

let wordsPlayed = [];
let playerValidWords;

function onLoad () {
    console.log("Page loaded successfully");
    console.log("main.js loaded successfully"); 
    
    checkAccess(c_data_jmdict);
    checkAccess(c_handleInput);
    checkAccess(c_jmDictSearch);
    checkAccess(c_checkWordIsValid);
    checkAccess(c_findNextWord);
    checkAccess(c_updatePage);
    checkAccess(c_classes);
    //manageGame has no const for this, probably should add one!

    document.getElementById('word-input').addEventListener('input', onUserInput);
    document.getElementById('get').addEventListener('mouseenter', userGetHover);
    document.getElementById('get').addEventListener('click', () => { playerSubmit(playerValidWords[playerValidWords.length - 1], true); });
    document.getElementById('word-select-menu').addEventListener('mouseleave', () => { document.getElementById('word-select-menu').style.display = 'none'; });
    document.querySelector('.panel-menu-tab-text.class-word-history').addEventListener('click', () => { panelChange('right-panel', 'class-word-history'); });
    document.querySelector('.panel-menu-tab-text.class-game-log').addEventListener('click', () => { panelChange('bottom-panel', 'class-game-log'); });
    document.querySelector('.panel-menu-tab-text.class-game-options').addEventListener('click', () => { panelChange('bottom-panel', 'class-game-options'); });
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('end-game').addEventListener('click', endGame);
    document.querySelector('.update-name.for-you').addEventListener('click', () => { updateName(document.querySelector('.name-input-field.for-you'), document.querySelector('.player-name.for-you'), playerObj); });
    document.querySelector('.update-name.for-opponent').addEventListener('click', () => { updateName(document.querySelector('.name-input-field.for-opponent'), document.querySelector('.player-name.for-opponent'), opponentObj); });
    
    document.getElementsByClassName('panel-menu-bar')[0].getElementsByClassName('panel-menu-tab-text')[0].click();
    document.getElementsByClassName('panel-menu-bar')[1].getElementsByClassName('panel-menu-tab-text')[0].click();

    playerObj = new Player(100, 1, "You");
    opponentObj = new Player(100, 1, "Opponent");
}

/*(*)
 * Adds an event listener to an element. This function should work for IE versions 9 and lower, which don't support the addEventListener() method.
 * @param {Element} element 
 * @param {String} evnt 
 * @param {Function} funct
 *(/)
function addEvent(element, evnt, funct){
    if (element.attachEvent)
        element.attachEvent('on'+evnt, funct);
    else
        element.addEventListener(evnt, funct);
}
*/

/**
 * Outputs to the console whether or not a file can be accessed by this file.
 * This function (as well as all of its calls) should be deleted during cleanup and bundling at the end of the project.
 * @param {Object} fileCheck - The object at the beginning of the file to be checked.
 */
function checkAccess (fileCheck) {
    if (fileCheck) {
        console.log(`Access to ${fileCheck} available`)
    } else {
        console.log(`No access to ${fileCheck}`)
    }
}

const typeMat = [
    //     0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
    /*0 */[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*1 */[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*2 */[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*3 */[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//business
    /*4 */[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*5 */[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*6 */[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*7 */[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//science
    /*8 */[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*9 */[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*10*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*11*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*12*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//art
    /*13*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*14*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*15*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*16*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*17*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*18*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*19*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*20*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*21*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*22*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    /*23*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],//sports
    /*24*/[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] //normal

    /* Key
    0 = normal
    1 = weak
    2 = strong
    9 = no
    */
]