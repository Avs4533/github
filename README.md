# NUMBER_GUESSING_GAME

A console based number guessing game developed in python with management and gaming features.

![Number Guessing Game](image.png)Example screenshot placeholder.



## 📜Table of Contents

Features
Installation
Usage
Game Details
Technical Specs
Future plans

## 🚀 Features

 ### 👤User System

 Import the Random Module: Use the random module to generate a random number.

Generate a Random Number: Use random.randrange(1, 100) to generate a random number between 1 and 100.

Get User Input: Use input() to prompt the user to guess the number.
Provide Feedback: Use conditional statements to check if the guess is too low, too high, or correct, and provide appropriate feedback.

Repeat Until Correct: Use a while loop to keep asking the user for a guess until the correct number is guessed.
 
  To understand how the number guessing game functions, let’s walk through two practical scenarios. These examples demonstrate how narrowing down the range intelligently—similar to a binary search—can help guess the number efficiently.

. Guessing in a Range from 1 to 100
Suppose the user defines the range from 1 to 100, and the system randomly selects 42 as the target number. The guessing process might look like this:

Guess 1: 50 → Too high
Guess 2: 25 → Too low
Guess 3: 37 → Too low
Guess 4: 43 → Too high
Guess 5: 40 → Too low
Guess 6: 41 → Too low
Guess 7: 42 → Correct!

## 🎮Gaming

. Guessing in a Range from 1 to 100.
Suppose the user defines the range from 1 to 100,
 and the system randomly selects 42 as the target number. 
The guessing process might look like this:

Guess 1: 50 → Too high
Guess 2: 25 → Too low
Guess 3: 37 → Too low
Guess 4: 43 → Too high
Guess 5: 40 → Too low
Guess 6: 41 → Too low
Guess 7: 42 → Correct!

## 💻Installation

1.Clone Repository
https://github.com/Avs4533/github/blob/main/Number_Guessing_game.py

2.Compile Program
python.exe

3.Run Application
\Number_Guessing

## 📅Future plans

.A graphical user interface (GUI) can be added using Tkinter or PyQt.

.Multiplayer mode can allow two players to compete locally or online.

.A scoring system can track attempts and store high scores.

.Hint features can give players feedback like "too high" or "too low."

.A timer can be added to make the game more challenging.

### ⚠️Note
This is an educational project.Not associated with real gambling systems.


