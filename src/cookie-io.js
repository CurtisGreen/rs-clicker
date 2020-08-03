import { defaultData } from "./default-data.js";
import { CONSTANTS } from "./constants/constants.js";

function getDefaultData() {
    // Reset data (deep copy)
    return JSON.parse(JSON.stringify(defaultData));
}

class CharacterData {
    characterData = getDefaultData();

    getName() {
        return this.characterData.name;
    }
    setName(name) {
        this.characterData.name = name;
    }

    addGold(amount) {
        if (this.characterData.gold + amount >= 0) {
            this.characterData.gold += amount;
        }
        else {
            console.log("Warning: tried to set gold to negative number, amount:", 
                amount, "current gold:", this.characterData.gold);
        }
    }
    getGold() {
        return this.characterData.gold;
    }

    getCurrentLevel() {
        return this.characterData.currentLevel;
    }
    setCurrentLevel(level) {
        if (this.checkScene(level)) {
            this.characterData.currentLevel = level;
        }
    }

    getTotalEnemiesKilled() {
        let sum = 0;
        for (const level in this.characterData.levels) {
            for (const enemy in this.characterData.levels[level].enemiesKilled) {
                sum += this.characterData.levels[level].enemiesKilled[enemy];
            }
        }
        return sum;
    }

    addTimesClicked(value) {
        this.characterData.timesClicked += value;
    }
    getTimesClicked() {
        return this.characterData.timesClicked;
    }
    incTimesClicked() {
        this.characterData.timesClicked++;
    }

    addDamageByClicking(damage) {
        this.characterData.damageByClicking += damage;
    }
    getDamageByClicking() {
        return this.characterData.damageByClicking;
    }

    addDamageByAutoClicker(damage) {
        this.characterData.damageByAutoClick += damage;
    }
    getDamageByAutoclicker() {
        return Math.floor(this.characterData.damageByAutoClick);
    }

    getInventory() {
        return this.characterData.inventory;
    }
    setInventory(index, obj) {
        this.characterData.inventory[index] = obj;
    }

    getAllEquipment() {
        return this.characterData.equipment;
    }
    getEquipment(slot) {
        if (this.characterData.equipment[slot] != undefined) {
            return this.characterData.equipment[slot];
        }
        else {
            console.log("Warning: invalid equipment slot", slot);
            return "";
        }
    }
    setEquipment(slot, itemName) {
        console.log(slot, itemName);
        if (this.characterData.equipment[slot] != undefined) {
            this.characterData.equipment[slot] = itemName;
        }
        else {
            console.log("Warning: invalid equipment slot", slot, itemName);
        }
    }

    getClanName() {
        return this.characterData.clan.name;
    }
    setClanName(name) {
        this.characterData.clan.name = name;
    }

    addClanMember(obj) {
        this.characterData.clan.members.push(obj);
    }
    getClanMembers() {
        return this.characterData.clan.members;
    }

    getVolume(typeIndex) {
        if (typeIndex < this.characterData.audio.length) {
            return this.characterData.audio[typeIndex];
        }
    }
    setVolume(typeIndex, volume) {
        if (typeIndex < this.characterData.audio.length) {
            this.characterData.audio[typeIndex] = volume;
        }
    }

    addSkillXp(skill, xp) {
        if (this.characterData.skills[skill] != undefined) {
            this.characterData.skills[skill] += xp;
        }
        else {
            console.log("Warning: setting invalid skill", skill, xp);
        }
    }
    getSkillXp(skill) {
        if (this.characterData.skills[skill] != undefined) {
            return this.characterData.skills[skill];
        }
        else {
            console.log("Warning: getting invalid skill", skill);
            return 0;
        }
    }
    getSkills() {
        return this.characterData.skills;
    }

    getQuestCompleted(scene) {
        if (this.checkScene(scene)) {
            return this.characterData.levels[scene].questCompleted;
        }
    }
    setQuestCompleted(scene) {
        if (this.checkScene(scene)) {
            this.characterData.levels[scene].questCompleted = true;
        }
    }

    incEnemiesKilled(scene, enemy) {
        if (this.checkScene(scene)) {
            this.characterData.levels[scene].enemiesKilled[enemy]++;
        }
    }
    getEnemiesKilled(scene, enemy) {
        if (this.checkScene(scene)) {
            return this.characterData.levels[scene].enemiesKilled[enemy];
        }
    }

    checkScene(scene) {
        if (this.characterData.levels[scene] != undefined) {
            return true;
        }
        else {
            console.log("Warning: getting/setting invalid scene", scene);
            return false;
        }
    }

    getCookies() {
        // Pull out first cookie
        let decodedCookies = decodeURIComponent(document.cookie).split(";");
        if (decodedCookies[0] != "") {
            for (let i = 0; i < decodedCookies.length; i++) {
                // Split into (0)name|(1)value
                let cookieCrumbs = decodedCookies[i].split("=");
                if (
                    cookieCrumbs[i] == "characterData" ||
                    cookieCrumbs[i] == " characterData"
                ) {
                    this.characterData = JSON.parse(cookieCrumbs[1]);
                    break;
                }
            }
        }
    }

    storeCookies() {
        this.characterData.hasCookies = true;

        // Lasts for one year
        let dateTime = new Date();
        dateTime.setTime(dateTime.getTime() + CONSTANTS.UTILS.MILLIS_IN_YEAR);
        let expireString = "expires=" + dateTime.toUTCString();

        // Turn characterData into a json string and store it in a cookie
        let jsonString = JSON.stringify(this.characterData);
        document.cookie = "characterData=" + jsonString + ";" + expireString + ";path=/;";
    }

    reset() {
        this.characterData = getDefaultData();
    }
}

export var characterData = new CharacterData;