function Character() {
    this.info = {
        general: [{
            name: "name",
            display: "Character's Name",
            placeholder: "Character's Name",
            val: "",
            type: "text",
            size: 2
        }, {
            name: "dclass",
            display: "Class",
            placeholder: "Class",
            val: "",
            type: "text",
            size: 2
        }, {
            name: "level",
            display: "Level",
            placeholder: "1",
            val: 1,
            type: "number",
            size: 1
        }, {
            name: "race",
            display: "Race",
            placeholder: "Race",
            val: "",
            type: "text",
            size: 2
        }, {
            name: "school",
            display: "School",
            placeholder: "School",
            val: "",
            type: "text",
            size: 2
        }, {
            name: "background",
            display: "Background",
            placeholder: "Background",
            val: "",
            type: "text",
            size: 1
        }, {
            name: "alignment",
            display: "Alignment",
            placeholder: "Alignment",
            val: "",
            type: "text",
            size: 2
        }],
        battles: [{
            display: "Armor Class",
            name: 'armorClass',
            val: 10,
        }, {
            display: "Initiative",
            name: 'initiative',
            val: 0,
        }, {
            display: "Speed",
            name: 'speed',
            val: 30,
        }, {
            display: "Max Hit Points",
            name: 'maxHitPoints',
            val: 10,
        }, {
            display: "Hit Points",
            name: 'currHitPoints',
            val: 10,
        }, {
            display: "Temp",
            name: 'tempHitPoints',
            val: 0,
        }, {
            display: "Hit Dice",
            name: 'hitDice',
            val: "",
        },{
            display: "DS Sucesses",
            name: 'deathSavesSuccess',
            val: 0,
        },{
            display: "DS Failures",
            name: 'deathSavesFailures',
            val: 0,
        },{
            display: "Attack",
            name: 'attack',
            val: 0,
        },{
            display: "Spell Attack",
            name: 'spellAttack',
            val: 0,
        },{
            display: "Spell Save",
            name: 'spellSave',
            val: 10,
        }],
        personality: {
            traits: {
                val: ""
            },
            ideals: {
                val: ""
            },
            bonds: {
                val: ""
            },
            flaws: {
                val: ""
            },
            feats: {
                val: ""
            },
            proficiency: {
                val: ""
            },
        },
        inventory: "",
        equipment: "",
        spellcasting: "",
        spells: {},
        stats: [{
            name: "strength",
            val: 10,
            prof: false
        }, {
            name: "dexterity",
            val: 10,
            prof: false
        }, {
            name: "constitution",
            val: 10,
            prof: false
        }, {
            name: "intelligence",
            val: 10,
            prof: false
        }, {
            name: "wisdom",
            val: 10,
            prof: false
        }, {
            name: "charisma",
            val: 10,
            prof: false
        }],
        skills: [{
            name: "acrobatics",
            val: 0,
            prof: false,
            stat: "dexterity"
        }, {
            name: "Ani Handling",
            val: 0,
            prof: false,
            stat: "wisdom"
        }, {
            name: "arcana",
            val: 0,
            prof: false,
            stat: "intelligence"
        }, {
            name: "athletics",
            val: 0,
            prof: false,
            stat: "strength"
        }, {
            name: "deception",
            val: 0,
            prof: false,
            stat: "charisma"
        }, {
            name: "acrobatics",
            val: 0,
            prof: false,
            stat: "intelligence"
        }, {
            name: "history",
            val: 0,
            prof: false,
            stat: "wisdom"
        }, {
            name: "intimidation",
            val: 0,
            prof: false,
            stat: "charisma"
        }, {
            name: "investigation",
            val: 0,
            prof: false,
            stat: "intelligence"
        }, {
            name: "medicine",
            val: 0,
            prof: false,
            stat: "wisdom"
        }, {
            name: "nature",
            val: 0,
            prof: false,
            stat: "intelligence"
        }, {
            name: "perception",
            val: 0,
            prof: false,
            stat: "wisdom"
        }, {
            name: "performance",
            val: 0,
            prof: false,
            stat: "charisma"
        }, {
            name: "persuasion",
            val: 0,
            prof: false,
            stat: "charisma"
        }, {
            name: "religion",
            val: 0,
            prof: false,
            stat: "intelligence"
        }, {
            name: "sleight hand",
            val: 0,
            prof: false,
            stat: "dexterity"
        }, {
            name: "stealth",
            val: 0,
            prof: false,
            stat: "dexterity"
        }, {
            name: "survival",
            val: 0,
            prof: false,
            stat: "wisdom"
        }]
    };
}

export default Character;