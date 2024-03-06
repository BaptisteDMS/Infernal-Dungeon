import * as fct from "/src/js/fonctions.js";
var musique_menu1;

export default class Menu_fin_Defaite extends Phaser.Scene {
    constructor() {
        super({ key: "Menu_fin_Defaite" });
    }
  
    preload() {
        this.load.image("menu_fond1", "src/assets/Menu/backfin.png");
        this.load.image("imageBoutonPlay1", "src/assets/Menu/rejouer_rouge.png");
        this.load.image("imageBoutonBack1", "src/assets/Menu/retour_rouge.png");
        this.load.image("imageBoutonPlayHover1", "src/assets/Menu/rejouer_blanc.png");
        this.load.audio("musique_menu1", "src/assets/song/DarkSouls.mp3");
        this.load.audio("fx", "src/assets/Menu/fx.mp3");
    }
  
    create() {
        this.add.image(80, 35, "menu_fond1").setOrigin(0).setDepth(0);
  
        var bouton_play = this.add.image(410, 300, "imageBoutonPlay1").setDepth(1);
  
        bouton_play.setInteractive();
  
        bouton_play.on("pointerover", () => {
            bouton_play.setTexture("imageBoutonPlayHover1");
        });
  
        bouton_play.on("pointerout", () => {
            bouton_play.setTexture("imageBoutonPlay1");
        });
  
        bouton_play.on("pointerup", () => {
            this.scene.start("Menu");
            this.playClickSound();
            this.stopMenuMusic(); // Stoppez la musique du menu
        });
        
        // Jouez la musique du menu
        musique_menu1 = this.sound.add("musique_menu1", { loop: true });
        musique_menu1.play();
    }
  
    playClickSound() {
        this.sound.play("fx"); // Jouez le son du clic
    }
  
    stopMenuMusic() {
      // Arrêter la musique du menu
      musique_menu1.stop();
  }
  
    destroy() {
      // Arrêter la musique lorsque la scène est détruite
      if (musique_menu1 && musique_menu1.isPlaying) {
          musique_menu1.stop();
      }
      super.destroy();
    }
  
    update() {}
}
