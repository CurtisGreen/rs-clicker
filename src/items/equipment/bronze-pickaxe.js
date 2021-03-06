import Equipment from "../equipment.js";
import { EQUIPMENT } from "../../constants/constants.js";

export default class BronzePickaxe extends Equipment {
    // Attack types
    slot = EQUIPMENT.SLOTS.WEAPON;
    skill = EQUIPMENT.WEAPON_TYPES.MELEE;
    style = EQUIPMENT.ATTACK_STYLE.STAB;

    // Attack bonuses
    stabBonus = 4;
    slashBonus = -2;
    crushBonus = 2;
    magicBonus = 0;
    rangedBonus = 0;

    // Defense bonuses
    stabDefenseBonus = 0;
    slashDefenseBonus = 1;
    crushDefenseBonus = 0;
    magicDefenseBonus = 0;
    rangedDefenseBonus = 0;

    // Other bonuses
    strengthBonus = 5;
    rangedStrengthBonus = 0;
    magicStrengthBonus = 0;
    prayerBonus = 0;

    // Text data
    name = "Bronze Pickaxe";
    item = "Pickaxe";
    type = "Bronze";
    examineText = "Used for mining.";

    // Other
    cost = 15;
    requiredLevel = 1;

    constructor(scene) {
        super();

        this.scene = scene;
    }
}
