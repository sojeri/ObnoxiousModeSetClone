# Single Responsibility Principle

## Classes

SetRules <-- checking for sets, handling hints
SetComputerPlayer <-- takes advantage of the SetRules hint functions to choose actions for a computer player
SetCards <-- the cards themselves
SetColors <-- an object that can change the colors of the set cards
SetDraw <-- an object that can draw cards & colors
SetDeck <-- an object that holds card objects, can shuffle them, and can have cards drawn / removed
SetBoard <-- an object that can display a set card game
