
startCharacterManager();

function startCharacterManager(){
    createAllCharacters();
}

function createAllCharacters(){

    Globals.characters.push({
        name: "Carter",
        img: "",
        relationship: "you",
        thinking: "I hope to save my family",
        health: 10,
        wounds: 0,
        hunger: 0,
        fatigue: 0,
        feeling: 0,
        item: 0
    });

    Globals.characters.push({
        name: "Mary",
        img: "",
        relationship: "wife",
        thinking: "We're lost",
        health: 10,
        wounds: 0,
        hunger: 0,
        fatigue: 0,
        feeling: 0,
        item: 0
    });

    Globals.characters.push({
        name: "Alice",
        img: "",
        relationship: "daughter",
        thinking: "I wanna go home",
        health: 10,
        wounds: 0,
        hunger: 0,
        fatigue: 0,
        feeling: 0,
        item: 0
    });

    Globals.characters.push({
        name: "Issac",
        img: "",
        relationship: "son",
        thinking: "Just leave me alone",
        health: 10,
        wounds: 0,
        hunger: 0,
        fatigue: 0,
        feeling: 0,
        item: 0
    });

    Globals.characters.push({
        name: "Teresa",
        img: "",
        relationship: "grandmother",
        thinking: "I wanna go home",
        health: 10,
        wounds: 0,
        hunger: 0,
        fatigue: 0,
        feeling: 0,
        item: 0
    });

}
