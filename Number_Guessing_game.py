import random

def Number_Guessing_game():
    print("WELCOME TO THE NUMBER GUESSING GAME!")
    number_to_guess = random.randint(1, 100)
    attempts = 0
    guessed = False

    while not guessed:
        try:
            guess = int(input("Guess a Number between 1 and 100: "))
            attempts += 1

            if guess < 1 or guess > 100:
                print("Please guess a number within the range.")
            elif guess < number_to_guess:
                print("Too Low! Try again.")
            elif guess > number_to_guess:
                print("Too High! Try again.")
            else:
                print(f"🎉Congratulations! You guessed the number {number_to_guess} in {attempts} attempts.")
                guessed = True

        except ValueError:
            print("Invalid input! Please enter a number.")


if __name__ == "__main__":
    Number_Guessing_game()
