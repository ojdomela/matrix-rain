# matrix-rain

Building towards an npm package. For a quick look, inspect the main.js. 

List of functionality below; work in progress marked (pending). The biggest hurdle is probably refactoring state management.

The end result should expose **adjustable** options, including:

* Speed
* Characters used
* Font size (font-family pending)
* Rate of opacity/character change
* Rate of invisible / faded characters
* Rate of active columns, normalized for screen size
* One or more words to display as end result (pending)
* Input methods to handle options modification (pending)

The end result should expose the following interactable methods:

* Initialize rain effect
* Disable new rain effects (without clearing active rain)
* Clear the matrix
* Display a message normalized for screen width (pending)
* Finalize rain effect with a message normalized for screen width (pending)
