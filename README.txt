# speechHangmanGame
Hangman game with voice input and output.

Link to the game: https://sophiaabi.github.io/speechHangmanGame/

We have created a version of the traditional word-guessing game hangman, that allows the user to speak to the computer in order to guess letters and control the game play. The user can either point and click each button in the interface to trigger it, or they can press the spacebar and speak the buttons instead. The user must press the space bar before each speech command. The game also has audio feedback, notifying the user on the category they selected, the clue for the word they are guessing, and if their letter guess was correct or not. If it was not correct, it will inform them how many lives they have left. At the conclusion of the game, the audio will also inform the user if they have won and guessed the word correctly, or lost, in which case it will display and speak the full word.

The Web Speech API was used to implement the speech input component of this game. After programming it, we found the Web Speech API is not attuned to hear specific letters, and most of the guesses were heard as words because of this. This led us to have to test the most common words the program heard for each letter, and we then had to hard code those common alternatives to map to the letter it should have been. This improved the performance a bit, but there are still times the program will not hear the correct letter, and this is the reason. 

This game was adapted from the hangman game: https://codepen.io/cathydutton/pen/ldazc
We completely modified the structure of the game, as we added a page to allow the user to select the category of word they would like to guess, modified all of the categories/word lists, added speech input/output, and changed the styling of the game. Sophia programmed the voice input/output and created the new category page and word lists. Ally designed and implemented all of the CSS styling, wrote the game instructions on the webpage, and made the demo video.
