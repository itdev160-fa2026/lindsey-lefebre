# Activity 11 Relection: React Tic-Tac-Toe

# Concepts you learned
I have never used react before and my initial impression was that it is - at least conceptually - to Javascript what Bootstrap is to CSS. Here are some concepts I took away from this assignment:

1 - It makes it really easy to reuse code with components: The "function Square" component in this assignment ( i.e. where the Xs and Ox go on the game board) only needed to be included once and then could be resued by giving it a value and event handler. Additionally, components can be nested within other components so it seems like you'd be able to do a lot with them.

2 - Parent / Child relationships (Props): The above example of code reuse, I think, ties into props since the reused square components nested into the board function inherit the board traits. So here you can see that the Board uses the same component (square) and then passes on traits to each one.

3 - You can turn list items into components and render arrays quickly - the .map() is handy!


# React vs JS Activity 10
A simple summary is that Activity 10, or using vanilla JS, was a manual process. React, by contrast creates dynamic UI components. React is much more simplified and uses considerably less code. With activity 10, HTML code was used to create a static game board and then JavaScript comes in and selects the HTML elements in order to update the content. In other words, you manually update the DOM for each move (e.g. a click can trigger makeMove()). With React, by contrast, you are using components - not a coded DOM element. React uses components (and props I think) to render the DOM for you.

# Challenges
I thnk the biggest challenge was just figuring out the difference in how React is written vs vanilla JavaScript and where within react the different concepts were being applied. In particular, it took some time to understand state managment when I was creating the button to start a new game. There would just be so many more steps to doing this with JavaScript and it took a bit to realize that the setState() took care of what would have been all the manual assignments in JavaScript.

It was also strange to simply load the links into HTML and not have to refer back to it for the different elements.



# Next steps
I'd like to continue to strengthen my basic understanding of React and get used to working with it more. This activity was helpful, but I could definately use more practice. I am in the WebDev program and plan to go into UX design so I'd like to continue to strengthen my ability to develop user interfaces. Continuing to learn react seems like a valuable skill to help meet that goal. I would be espically interested in component patters and react router for futrue learning. 
