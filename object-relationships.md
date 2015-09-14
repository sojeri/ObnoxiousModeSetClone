# Single Responsibility Principle

## Classes

SetRules <-- checking for sets, handling hints
SetComputerPlayer <-- takes advantage of the SetRules hint functions to choose actions for a computer player
SetCards <-- the cards themselves
SetDisplayCard <-- an object that takes in a card & draws it
SetColors <-- an object that can change the colors of the set cards
SetBoard <-- an object that can display a set card game

Deck <-- an object that holds card objects, can shuffle them, and can have cards drawn / removed
