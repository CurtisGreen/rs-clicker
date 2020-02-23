export var saveData = {
    gold: 0,
    characterClass: "",
    currentLevel: "",
    totalEnemiesKilled: 0,
    timesClicked: 0,
    damageByClicking: 0,
    damageByAutoClick: 0,
    numberOfAutoClickers: 0,
    skills: {
        attack: 0,
        ranged: 0,
        magic: 0,
        health: 10,
        woodcutting: 0,
        mining: 0,
    },
    audio: [2, 2, 2], // BGM, SFX, Environment
    // Can be accessed with characterData[this.currentLevel].questCompleted, etc.
    TUTORIAL_ISLAND: {
        questCompleted: false,
        enemiesKilled: {
            rat: 0
        }
    },
    LUMBRIDGE: {
        questCompleted: false,
        enemiesKilled: {
            cow: 0,
            goblin: 0
        }
    },
    VARROCK: {
        questCompleted: false,
        enemiesKilled: {
            wizard: 0
        }
    }
};
