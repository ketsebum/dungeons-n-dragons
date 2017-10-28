function Character () {
    this.info = {
        name : "",
        dclass : "",
        level : 1,
        race : "",
        school : "",
        background : "",
        alignment : "",
        armorClass : 10,
        initiative : 0,
        speed : 30,
        maxHitPoints : 10,
        currHitPoints: 10,
        tempHitPoints: 0,
        otherProfs: "",
        hitDice: "",
        deathSaves: {
            sucess: 0,
            failure: 0
        },
        personality: {
            traits: {val: ""},
            ideals: {val: ""},
            bonds: {val: ""},
            flaws: {val: ""},
            feats: {val: ""},
        },
        inventory: "",
        equipment: "",
        spellcasting: "",
        spells: [],
        stats : [
            { 
                name: "strength",
                val : 0,
                prof : false
            },
            { 
                name: "dexterity",
                val : 0,
                prof : false
            },
            { 
                name: "constitution",
                val : 0,
                prof : false
            },
            { 
                name: "intelligence",
                val : 0,
                prof : false
            },
            { 
                name: "wisdom",
                val : 0,
                prof : false
            },
            { 
                name: "charisma",
                val : 0,
                prof : false
            }
        ],
        skills : [
            {
                name: "acrobatics",
                val : 0,
                prof : false,
                stat : "dexterity"
            }, {
                name: "Animal Handling",
                val : 0,
                prof : false,
                stat : "wisdom"
            }, {
                name: "arcana",
                val : 0,
                prof : false,
                stat : "intelligence"
            }, {
                name: "athletics",
                val : 0,
                prof : false,
                stat : "strength"
            }, {
                name: "deception",
                val : 0,
                prof : false,
                stat : "charisma"
            }, {
                name: "acrobatics",
                val : 0,
                prof : false,
                stat : "intelligence"
            }, {
                name: "history",
                val : 0,
                prof : false,
                stat : "wisdom"
            }, {
                name: "intimidation",
                val : 0,
                prof : false,
                stat : "charisma"
            }, {
                name: "investigation",
                val : 0,
                prof : false,
                stat : "intelligence"
            }, {
                name: "medicine",
                val : 0,
                prof : false,
                stat : "wisdom"
            }, {
                name: "nature",
                val : 0,
                prof : false,
                stat : "intelligence"
            }, {
                name: "perception",
                val : 0,
                prof : false,
                stat : "wisdom"
            }, {
                name: "performance",
                val : 0,
                prof : false,
                stat : "charisma"
            }, {
                name: "persuasion",
                val : 0,
                prof : false,
                stat : "charisma"
            }, {
                name: "religion",
                val : 0,
                prof : false,
                stat : "intelligence"
            }, {
                name: "sleight of hand",
                val : 0,
                prof : false,
                stat : "dexterity"
            },{
                name: "stealth",
                val : 0,
                prof : false,
                stat : "dexterity"
            },{
                name: "survival",
                val : 0,
                prof : false,
                stat : "wisdom"
            }
        ]
    };
}

export default Character;