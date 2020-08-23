import { OBJECT_TYPES, CONSTANTS, FONTS } from "../constants/constants.js";
import { ScrollWindow } from "./scroll-window.js";
import { TextRow } from "./text-row.js";

export class ChatScene extends Phaser.Scene {
    chatWindow;
    shopChatWindow;
    scrollWindow;

    constructor() {
        super({ key: CONSTANTS.SCENES.CHAT });
    }

    preload() {
        this.load.image("chat-window", "src/assets/ui/ChatWindow.png");
        this.load.image("shop-chat-window", "src/assets/ui/ShopChatWindow.png");
    }

    create() {
        // Setup scroll window
        this.scrollWindow = new ScrollWindow("chat");
        this.scene.add("scroll-window", this.scrollWindow, true);
        let welcomeText = this.add.text(
            10,
            444,
            "Welcome to RS Clicker",
            FONTS.ITEM_HEADER
        );
        let startArray = [welcomeText];

        this.scrollWindow.addObjects({
            x: 0,
            y: 345,
            width: 495,
            height: 113,
            numColumns: 1,
            padding: 0,
            objects: startArray,
        });

        // Chat window for examining items
        this.chatWindow = this.add
            .image(0, 338, "chat-window")
            .setOrigin(0, 0)
            .setDepth(0);
        this.shopChatWindow = this.add
            .image(0, 338, "shop-chat-window")
            .setOrigin(0, 0)
            .setDepth(0);

        // General info
        this.playerNameText = this.add.text(10, 459, "You", FONTS.ITEM_HEADER);

        this.show(false);
    }

    writeStrings(xDiff, ...textObjs) {
        let textLine = [];
        textObjs.forEach((textObj, index) => {
            textLine.push(this.scrollWindow.add.text(index * xDiff, 0, textObj.text, textObj.format));
        });
        this.writeObjects(...textLine);
    }

    writeObjects(...objects) {
        if (objects.length == 1) {
            this.scrollWindow.addObject(objects[0]);
            this.scrollWindow.refresh();
        }
        else {
            let row = new TextRow(this.scrollWindow, 0, 0, []);
            objects.forEach(obj => {
                row.add(obj);
            });
            console.log(row);
            row.setX(0);
            console.log("test");
            this.scrollWindow.addObject(row);
            this.scrollWindow.refresh();
        }
    }

    writeEnemyInfo(enemy) {
        this.writeStrings(
            55, 
            {text: "Stats:", format: FONTS.ITEM_HEADER},
            {text: "Attack", format: FONTS.ITEM_STATS},
            {text: enemy.attack, format: FONTS.ITEM_STATS},
            {text: "Strength", format: FONTS.ITEM_STATS},
            {text: enemy.strength, format: FONTS.ITEM_STATS},
            {text: "Defense", format: FONTS.ITEM_STATS},
            {text: enemy.defense, format: FONTS.ITEM_STATS},
            {text: "Magic", format: FONTS.ITEM_STATS},
            {text: enemy.magic, format: FONTS.ITEM_STATS},
            {text: "Ranged", format: FONTS.ITEM_STATS},
            {text: enemy.ranged, format: FONTS.ITEM_STATS},
        );
        this.writeStrings(
            55, 
            {text: "Accuracy Bonuses:", format: FONTS.ITEM_HEADER},
            {text: "Melee", format: FONTS.ITEM_STATS},
            {text: enemy.attackBonus, format: FONTS.ITEM_STATS},
            {text: "", format: {}},
            {text: "", format: {}},
            {text: "", format: {}},
            {text: "", format: {}},
            {text: "Magic", format: FONTS.ITEM_STATS},
            {text: enemy.magicBonus, format: FONTS.ITEM_STATS},
            {text: "Ranged", format: FONTS.ITEM_STATS},
            {text: enemy.rangedBonus, format: FONTS.ITEM_STATS},
        );
        this.writeStrings(
            55, 
            {text: "Damage Bonuses:", format: FONTS.ITEM_HEADER},
            {text: "Melee", format: FONTS.ITEM_STATS},
            {text: enemy.strengthBonus, format: FONTS.ITEM_STATS},
            {text: "", format: {}},
            {text: "", format: {}},
            {text: "", format: {}},
            {text: "", format: {}},
            {text: "Magic", format: FONTS.ITEM_STATS},
            {text: enemy.magicStrengthBonus, format: FONTS.ITEM_STATS},
            {text: "Ranged", format: FONTS.ITEM_STATS},
            {text: enemy.rangedStrengthBonus, format: FONTS.ITEM_STATS},
        );
        this.writeStrings(
            55, 
            {text: "Defense Bonuses:", format: FONTS.ITEM_HEADER},
            {text: "Stab", format: FONTS.ITEM_STATS},
            {text: enemy.stabDefense, format: FONTS.ITEM_STATS},
            {text: "Slash", format: FONTS.ITEM_STATS},
            {text: enemy.slashDefense, format: FONTS.ITEM_STATS},
            {text: "Crush", format: FONTS.ITEM_STATS},
            {text: enemy.crushDefense, format: FONTS.ITEM_STATS},
            {text: "Magic", format: FONTS.ITEM_STATS},
            {text: enemy.magicDefense, format: FONTS.ITEM_STATS},
            {text: "Ranged", format: FONTS.ITEM_STATS},
            {text: enemy.rangedDefense, format: FONTS.ITEM_STATS},
        );
    }

    writeEquipmentInfo(equipment) {
        this.writeStrings(0, {text: "Sells for: " + equipment.cost, format: FONTS.ITEM_STATS});
        this.writeStrings(0, {text: "Required Level: " + equipment.requiredLevel, format: FONTS.ITEM_HEADER});
        this.writeStrings(
            55, 
            {text: "Accuracy Bonuses:", format: FONTS.ITEM_HEADER},
            {text: "Stab", format: FONTS.ITEM_STATS},
            {text: equipment.stabBonus, format: FONTS.ITEM_STATS},
            {text: "Slash", format: FONTS.ITEM_STATS},
            {text: equipment.slashBonus, format: FONTS.ITEM_STATS},
            {text: "Crush", format: FONTS.ITEM_STATS},
            {text: equipment.crushBonus, format: FONTS.ITEM_STATS},
            {text: "Magic", format: FONTS.ITEM_STATS},
            {text: equipment.magicBonus, format: FONTS.ITEM_STATS},
            {text: "Ranged", format: FONTS.ITEM_STATS},
            {text: equipment.rangedBonus, format: FONTS.ITEM_STATS},
        );
        this.writeStrings(
            55, 
            {text: "Defense Bonuses:", format: FONTS.ITEM_HEADER},
            {text: "Stab", format: FONTS.ITEM_STATS},
            {text: equipment.stabDefenseBonus, format: FONTS.ITEM_STATS},
            {text: "Slash", format: FONTS.ITEM_STATS},
            {text: equipment.slashDefenseBonus, format: FONTS.ITEM_STATS},
            {text: "Crush", format: FONTS.ITEM_STATS},
            {text: equipment.crushDefenseBonus, format: FONTS.ITEM_STATS},
            {text: "Magic", format: FONTS.ITEM_STATS},
            {text: equipment.magicDefenseBonus, format: FONTS.ITEM_STATS},
            {text: "Ranged", format: FONTS.ITEM_STATS},
            {text: equipment.rangedDefenseBonus, format: FONTS.ITEM_STATS},
        );
        this.writeStrings(
            55, 
            {text: "Damage Bonuses:", format: FONTS.ITEM_HEADER},
            {text: "Melee", format: FONTS.ITEM_STATS},
            {text: equipment.strengthBonus, format: FONTS.ITEM_STATS},
            {text: "Prayer", format: FONTS.ITEM_STATS},
            {text: equipment.prayerBonus, format: FONTS.ITEM_STATS},
            {text: "", format: {}},
            {text: "", format: {}},
            {text: "Magic", format: FONTS.ITEM_STATS},
            {text: equipment.magicStrengthBonus, format: FONTS.ITEM_STATS},
            {text: "Ranged", format: FONTS.ITEM_STATS},
            {text: equipment.rangedStrengthBonus, format: FONTS.ITEM_STATS},
        );
    }

    show(isVisible = true) {
        this.scrollWindow.setVisible(isVisible);
        this.playerNameText.visible = isVisible;
        this.chatWindow.visible = isVisible;
        this.shopChatWindow.visible = isVisible;
    }

    // Show object info in chat window
    showObjectInfo(isVisible, object = false, isShop = false) {
        if (object && isVisible) {
            // Write name & description
            this.writeStrings(0, {text: object.name, format: FONTS.ITEM_HEADER});
            this.writeStrings(0, {text: object.examineText, format: FONTS.ITEM_STATS});

            // Load bigger window on shop scene
            if (isShop) {
                this.shopChatWindow.visible = true;
            } else {
                this.chatWindow.visible = true;
            }

            // Show different things for different types of objects
            switch (object.objectType) {
                case OBJECT_TYPES.EQUIPMENT:
                    this.writeEquipmentInfo(object);
                    break;
                case OBJECT_TYPES.ITEM:
                    this.writeStrings(0, {text: "Sells for: " + object.cost, format: FONTS.ITEM_STATS});
                    break;
                case OBJECT_TYPES.ENEMY:
                    this.writeEnemyInfo(object);
                    break;
                case OBJECT_TYPES.AUTOCLICKER:
                    //this.writeItemInfo(object);
                    break;
            }
        } else {
            this.show(false);
        }
    }
}
