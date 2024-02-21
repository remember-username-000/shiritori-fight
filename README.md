# shiritori-fight

This program is my version of the game that can be played at http://siritori-battle.net.

## How to manually assign types to words

This feature has not been implemented in the main interface and is really still a debug feature, so the process is not very streamlined. That being said:

1. After opening the page, open the Javascript console.
2. Run either `debug_addWordTypeEntry(num);` or `debug_addAllTypeEntries();`, as necessary.
* `num` in `debug_addWordTypeEntry(num);` refers to which word (that has been played) to assign a type to, with 0 being the most current and `num` being `num` words before.
* `debug_addAllTypeEntries();` runs `debug_addWordTypeEntry(num);` for all played words in the current game.
3. Enter the ID of the type desired for each word, when prompted.
* Enter -1 to remove an already assigned type and revert the word to its default typing.
* Continue without entering anything to skip assigning that word a type.
4. Run `debug_printNewEntries();`. This will print a sequence to the console.
5. Compile and run `addType.java`, in the `debug/` folder.
6. When the program is ready, paste the sequence from step 4.