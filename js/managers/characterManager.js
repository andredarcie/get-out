
start();

function start(){
    Globals.characters.push(new Character("Alice", "daughter", "I wanted to go home", 10, 0, 0, 0, 0, 0));
    Globals.characters.push(new Character("Issac", "son", "Just leave me alone", 10, 0, 0, 0, 0, 0));
    Globals.characters.push(new Character("Teresa", "grandmother", "I just wanted to die", 10, 0, 0, 0, 0, 0));
    Globals.characters.push(new Character("Mary", "wife", "We're lost", 10, 0, 0, 0, 0, 0));
    Globals.characters.push(new Character("Carter", "you", "I hope to save my family", 10, 0, 0, 0, 0, 0));

    console.log(Globals.characters);
}