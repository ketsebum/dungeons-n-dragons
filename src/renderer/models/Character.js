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
        stats : {
            strength : {
                val : 0,
                prof : false
            },
            dexterity : {
                val : 0,
                prof : false
            },
            constitution : {
                val : 0,
                prof : false
            },
            intelligence : {
                val : 0,
                prof : false
            },
            wisdom : {
                val : 0,
                prof : false
            },
            charisma : {
                val : 0,
                prof : false
            }
        },
        skills : {
            acrobatics : {
                val : 0,
                prof : false,
                stat : "dexterity"
            },
            animalHandling : {
                val : 0,
                prof : false,
                stat : "wisdom"
            },
            arcana : {
                val : 0,
                prof : false,
                stat : "intelligence"
            },
            athletics : {
                val : 0,
                prof : false,
                stat : "strength"
            },
            deception : {
                val : 0,
                prof : false,
                stat : "charisma"
            },
            history : {
                val : 0,
                prof : false,
                stat : "intelligence"
            },
            insight : {
                val : 0,
                prof : false,
                stat : "wisdom"
            },
            intimidation : {
                val : 0,
                prof : false,
                stat : "charisma"
            },
            investigation : {
                val : 0,
                prof : false,
                stat : "intelligence"
            },
            medicine : {
                val : 0,
                prof : false,
                stat : "wisdom"
            },
            nature : {
                val : 0,
                prof : false,
                stat : "intelligence"
            },
            perception : {
                val : 0,
                prof : false,
                stat : "wisdom"
            },
            performance : {
                val : 0,
                prof : false,
                stat : "charisma"
            },
            persuasion : {
                val : 0,
                prof : false,
                stat : "charisma"
            },
            religion : {
                val : 0,
                prof : false,
                stat : "intelligence"
            },
            sleightOfHand : {
                val : 0,
                prof : false,
                stat : "dexterity"
            },
            stealth : {
                val : 0,
                prof : false,
                stat : "dexterity"
            },
            survival : {
                val : 0,
                prof : false,
                stat : "wisdom"
            }
        }
    };
}

export default Character;