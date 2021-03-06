import { CONSTANTS } from "../constants/constants.js";
import { characterData } from "../cookie-io.js";

const BGM = 0;
const SFX = 1;
const ENV = 2;

export class AudioScene extends Phaser.Scene {
    bgm = {};
    sfx = {};
    audioLoaded = false;
    previousVolume = [2, 2, 2];
    currentSongName = "";
    queuedSongName = "";

    constructor() {
        super({
            key: CONSTANTS.SCENES.AUDIO,
        });
    }

    preload() {
        // BGM
        this.load.audio("scape-main", "src/assets/audio/bgm/ScapeMain.ogg");
        this.load.audio("newbie-melody", "src/assets/audio/bgm/NewbieMelody.ogg");
        this.load.audio("harmony", "src/assets/audio/bgm/Harmony.ogg");
        this.load.audio("expanse", "src/assets/audio/bgm/Expanse.mp3");
        this.load.audio("barbarianism", "src/assets/audio/bgm/Barbarianism.ogg");
        this.load.audio("the-trade-parade", "src/assets/audio/bgm/TheTradeParade.ogg");
        this.load.audio("still-night", "src/assets/audio/bgm/StillNight.mp3");

        // SFX
        this.load.audio(
            "purchase",
            "src/assets/audio/sfx/GrandExchangeOfferComplete.mp3"
        );
        this.load.audio("quest-complete-1", "src/assets/audio/sfx/QuestCompleted1.ogg");
        this.load.audio("quest-complete-2", "src/assets/audio/sfx/QuestCompleted2.ogg");

        const skills = [
            "Attack",
            "Fletching",
            "Magic",
            "Mining",
            "Prayer",
            "Ranged",
            "Woodcutting",
        ];
        for (let skill of skills) {
            this.load.audio(
                skill.toLowerCase() + "-level-up",
                "src/assets/audio/sfx/" + skill + "LevelUp.ogg"
            );
        }
    }

    create() {
        // Don't pause BGM when clicking off the window
        this.sound.pauseOnBlur = false;
        this.changeVolume(BGM, characterData.getVolume(BGM));
        this.changeVolume(SFX, characterData.getVolume(SFX));
    }

    playBgm(audioName) {
        // Only play if song changes
        if (audioName != this.currentSongName) {
            // Check if audio has been loaded
            if (this.scene.isActive()) {
                console.log("playing music", audioName);
                if (this.audioLoaded) {
                    console.log("stopped prev song");
                    this.bgm.stop();
                }
                this.currentSongName = audioName;
                this.bgm = this.sound.add(audioName);
                this.bgm.setLoop(true);
                this.bgm.play();
                this.audioLoaded = true;
                this.changeVolume(BGM, characterData.getVolume(BGM));
            } else {
                // If called before load, play once loaded
                this.queuedSongName = audioName;
                this.events.once("create", () => {
                    this.playBgm(this.queuedSongName);
                });
            }
        }
    }

    // Pause BGM while playing SFX
    playSfx(audioName) {
        console.log("playing", audioName);
        this.bgm.pause();
        if (this.sfx?.isPlaying) {
            this.sfx.stop();
            this.bgm.pause();
        }
        this.sfx = this.sound.add(audioName);
        this.sfx.setVolume(characterData.getVolume(SFX) / 4);
        this.sfx.play();
        this.sfx.once("complete", () => {
            this.bgm.resume();
        });
    }

    // 0: BGM, 1: SFX, 2: Environment
    changeVolume(volumeType, value) {
        // Set volume and show button
        characterData.setVolume(volumeType, value);

        // Lower volume of currently playing BGM
        if (volumeType == BGM && this.bgm?.isPlaying) {
            this.bgm.setVolume(value / 4); // 0-4 = 0-100
        } else if (volumeType == SFX && this.sfx?.isPlaying) {
            this.sfx.setVolume(value / 4);
        }
    }

    mute(isMuted) {
        if (isMuted) {
            this.previousVolume[BGM] = characterData.getVolume(BGM);
            this.previousVolume[SFX] = characterData.getVolume(SFX);
            this.previousVolume[ENV] = characterData.getVolume(ENV);
            this.changeVolume(BGM, 0);
            this.changeVolume(SFX, 0);
            this.changeVolume(ENV, 0);
        } else {
            this.changeVolume(BGM, this.previousVolume[BGM]);
            this.changeVolume(SFX, this.previousVolume[SFX]);
            this.changeVolume(ENV, this.previousVolume[ENV]);
        }
    }
}
