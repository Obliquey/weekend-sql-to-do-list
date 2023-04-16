# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

*PROJECT DESCRIPTION*
-It's a to-do list! Or rather, in the theme that I'm trying to go for, a checklist named Check-It!
Cheesy, yep. Oh well. The User will submit tasks they need to do, and my app will store them in a database with a value 'isComplete' of either true or false. As my program then updates the DOM with this task list, it will seperate the tasks using this boolean, with tasks yet to be completed going in the one box, and completed tasks going in the other! Tasks can also be deleted, if desired, thus removing them from the database entirely.

**PROBLEMS ENCOUNTERED AND SOLVED**
1. Small one, but for some reason my tasks to be completed were appending to the DOM just nicely, while completed tasks (tasks with a 'isComplete' val of TRUE) were not appending correctly. I realized it's because I had a single " within the data-id attr of that list item when I was appending them. Problem fixed by removing quotation.
2. Another problem, another typo! My completed tasks "completedButtons" were working nicely, while my incomplete tasks "completeButtons" were not. Well, I realized it's because I was had made that typo, with one being named "completedButtons" and the other "completeButtons". Whoops.
3. Decided to use LI instead of a table for my checklist. So I need to figure out a way to post the tasks to the DOM in a legible way....
    -Got it! Found out I could use hierarchical list indentation. So the main task is up front, and the notes and due date for that task are indented underneath. Seperated them each with slightly opaque dotted lines, for further legibility.

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
