<!--

Refactoring goals:
- reducing repetition
- organizing code into clearer classes / objects
- better handling of single responsibility
- improving usage of syntax and variable names
  - replacing javascript with more concise jquery where appropriate for readability
- better user experience
  - updated display of hints
  - using animation to show where cards are moving on the table during the rare
    occasions that they move

New feature goals:
- a computer player
- a more helpful tutorial mode than the current hint function for players not
  already familiar with the game
- a shuffle feature for displaying the same cards in a different order
- better color options for less common vision types
- obnoxious mode:
  - technicolor / changing colors
  - cards occasionally move places on the board
  - slowly spinning but at different rates

Stretch goals:
- handling for monochromatic vision
- more shape & shading options, so users might have the opportunity to select a
  set of colors, shapes, and patterns that will be visually distinct
- integrating jasmine testing
- memory mode:
  - instead of finding pairs, match sets of colors, shapes, shades, or numbers
    to try to clear the board
- logging in to save best scores?
  - could be done with oauth
  - can also save in a session but so temporary


User Stories -- Base Features
- As a player not familiar with the game, I can enter tutorial mode and enjoy a
  simpler version of the game while getting to know the rules.
- As a player, I can choose to play alone or against a computer player.
- As a player, I can shuffle the cards around for a different perspective on the
  sets that might be on the board.
- As a player, I find there are two or more color options available that are
  visually distinct to me.
- As a player, I can choose to play in obnoxious / insane mode.
  - technicolor / color changing cards
  - cards that occasionally move places on the board -- perhaps in response to a
    mouseover event if one has not been triggered in the last 45-90 seconds
  - cards that start slowly spinning at different rates
  - a technicolor unicorn picks up the cards when you declare a set?

User Stories -- Stretch Goals
- As a player with a monochromatic display or vision type, there is one or more
  color option available to me that has visually distinct styles.
  - good for monochromatic vision but also for looking at a computer screen in
    direct sunlight or in another high light environment
- As a player, I can choose to play in memory mode.
  - instead of finding pairs, match sets of colors, shapes, shades, or numbers
    to try to clear the board
- As a player, I can customize the cards to use shapes, shades, and colors that
  are all visually distinct for me.
  - more shape & shading options, so users might have the opportunity to select
    a set of colors, shapes, and patterns that will be visually distinct

-->

What is the goal of this project?
- to refactor & add more features to the set clone I started pre-Ada
  ([original version here][set], [source][setrepo])

[set]: http://drvonnjerryxlii.github.io/setGame/
[setrepo]: https://github.com/drvonnjerryxlii/setGame

Who is the target audience (can be just yourself)?
- mostly me, but also--
- anyone who likes pattern recognition games
- colorblind folks who want to try out a version of set that's friendlier to their eyes
- obnoxious mode's audience: people who enjoy games like [techno kitten adventure][tka]

[tka]: http://technokittenadventure.com/

What are your personal learning goals?
- better understanding of CSS animation & positioning
- improving javascript, jquery, & DOM fluency
- practicing simplification & refactoring of older code
- stretch goal: working with sessions in javascript

What is the minimum viable project that you could ship that accomplishes the
goal of your project?

1. the implementation of at least one full new feature (eg, memory or obnoxious mode)
2. or a complete refactor that reduces complexity of code & breaks it down into more object-oriented principles -- compartmentalized & broken into simple, reusable parts.
3. but to be honest, I hope to both implement a full new feature & refactor the original code.

What technologies/frameworks/patterns will you be employing?
- agile / user stories
- may experiment with using closures to build each card object's draw() property

What are the tech and/or skill dependencies of your project?
- ???

What does success look like for this project?
- refactoring complete
  - code is simple and readable
  - code is well organized
    - code follows object-oriented principles ~~my Sandi Metz book is coming
      with me on the trip~~
  - code is well documented
- base features (except obnoxious mode) complete
- at least some attempt at integrating jasmine tests for BDD/TDD has been made

What does done mean?
- OBNOXIOUS MODE COMPLETE
- or memory mode, which seems more practical
- or obnoxious mode, which seems more obnoxious
