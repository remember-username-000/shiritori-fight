# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project is NOT an API, and thus does not declare a public API. Therefore, it does NOT adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), although the versioning guidelines given there are followed.

## [Unreleased]

### Added

- Three new types!
    - (Ｌ) Plant
    - (Ｍ) Medical
    - (Ｒ) Religion
- Currently played words are now visible in the main game area
- Added an HP bar to visually see HP

### Changed

- The player that starts the game is now randomized
- The starting word is now random
- The function that selects words for the computer to use is probably more performant now

## [1.0.0-alpha] - 2024-02-16

### Added

- Added an HP system that starts both players with 100 HP, and each word deals 10 damage
- Added HTML elements to the game to display the HP (only numbers right now)
- Added an option to clear the game's log when starting a new game
- Added the ability for the player to change their and their oppponent's name
- Added placeholder text in the word input box that tells you what character to play off of
- Added debugFunctions.js, which will contain functions useful for debugging
- Added a typemat in the planning folder
- Words now have types!
    - Types have strengths and weaknesses against each other. Playing a word with a type that is strong against the opponent's previous word deals extra damage, and vice versa
    - Introduced 5 new types and mapped JMdict's "field" attributes to them. Each type also has an associated letter:
        - (Ｂ) Business
        - (Ｓ) Science
        - (Ａ) Art
        - (Ｐ) Sports
        - (Ｎ) Normal
    - Untyped (Ｕ) words behave like normal type words.

### Changed

- Side and bottom panels now scrollbar correctly
- Game log now tells you what you (or the opponent) did
- When a kana reading corresponds to a specific kanji writing, game no longer displays 'kana apply to specific kanji' and instead displays the appropaiate kanji
- Word selection menu for homophones now give the correct kanji, when kana readings are associated with specific ones

## [0.0.0] - 2024-01-28

Any versions before this one were developed before migrating the project to GitHub, and therefore don't have links to the corresponding releases.

### Added

- This CHANGELOG.md file, which contains a chronologically ordered list of notable changes (even the ones that were made before this project was on GitHub!). All new changes will be documented here, so the old program-structure.txt file will not be used for this purpose anymore.
    - Retroactively filled CHANGELOG.md to reflect development before migration.
- README.md, which contains information about this project.

### Changed

- Project migrated to a GitHub repository (it was previously chilling in my file system, but I think GitHub is a better place for it). This should not affect functionality.

### Deprecated

- program-structure.txt, which served as the changelog before this migration, will no longer host the changelog.
    - The file is still available, even though all its information is also here.

## 0.0.0-rc - 2024-01-21

### Added

- Added rulesets in style.css to make menu transition in the side and bottom panels more apparent/intuitive.

### Changed

- Refactored the HTML page to use less onclick attributes, instead establishing these as event listeners from main.js.

## 0.0.0-beta - 2024-01-14

### Added

- The bottom and right panels now have navbars at the tops (even though the right panel only has one nav right now)
    - Content in these panels are now menus that can be changed via the navbar.
- Added a game log to the bottom menu, which tells the player when a game has started or ended.

### Changed

- Dictionary searching functions now treat small kana and vowel extenders appropriately.

### Fixed

- Fixed issues allowing already played words to be played again.
- Fixed an issue that sometimes premanently disabled the player.
- Fixed an issue that would break the game if trying to generate a word beginning with small kana or vowel extenders.

## 0.0.0-alpha - 2024-01-07

### Added

- Created program-structure.txt, which contained my initial outline and plan for this project(may not reflect end product), as well as serving as a changelog.
- Created diagram.png, which is a visual representation of the outline in program-structure.txt.
- Created the /JMdict folder, which contained the .json version of JMdict-common.
    - Created a copy of the jmdict-eng-common-3.5.0.json, which was converted into a .js file.
    - Created a .7z file, which contained the original JMdict files (which were larger). At some point, the project is intended to switch from the common words dictionary to the full dictionary, when the program is more developed.
- Created index.html.
    - Added script tags to link all of the .js files.
    - Added form elements that allow the player to submit a word. If the player submits a word with multiple meanings, then a menu pops up allowing them to select the desired one.
    - Separated the page into a main game area, and two panels.
    - The side panel now contains a list of previously played words.
    - The bottom panel now contains buttons for starting and ending the gamel
- Created style.css.
    - Added rulesets which define the borders of teh main game area and the panels.
    - Added rulesets that make the homonym selection menu more apparent/intuitive.
- Created main.js.
    - Created the onLoad function for the HTML site.
    - Created functions to log to the console when resources are ready.
- Created the /lib folder, which contained the .js files necessary for the program:
    - Most of the functions return and accept words in the form of an object that consists of the original word object, and an integer pointing to the kana reading of that word. Some of these functions return or accept arrays of these objects.
    - Created jmDictSearch.js, which contains functions for finding words in the dictionary file, using various search parameters.
    - Created checkWordIsValid.js, which contains functions that check if a word follows shiritori rules.
    - Created findNextWord.js, which contains functions for generating a word that continues the game.
    - Created handleInput.js. which contains functions for manipulating the homonym selection menu, as well as preventing the player from submitting illegal words.
    - Created manageGame.js, which contains the functions that start and end the game.

[Unreleased]: https://github.com/remember-username-000/shiritori-fight/compare/main...v0.0.0?diff=unified
[0.0.0]: https://github.com/remember-username-000/shiritori-fight/releases/tag/v0.0.0
[1.0.0-alpha]: https://github.com/remember-username-000/shiritori-fight/releases/tag/v1.0.0-alpha
