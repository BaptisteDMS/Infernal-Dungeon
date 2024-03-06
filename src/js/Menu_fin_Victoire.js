import * as fct from "/src/js/fonctions.js";
var musique_menu2;

export default class Menu_fin_Victoire extends Phaser.Scene {
    constructor() {
        super({ key: "Menu_fin_Victoire" });
    }
  
    preload() {
        this.load.image("menu_fond2", "src/assets/Menu/pourpierre.jpg");
        this.load.image("imageBoutonPlay2", "src/assets/Menu/rejouer_rouge.png");
        this.load.image("imageBoutonBack2", "src/assets/Menu/retour_rouge.png");
        this.load.image("imageBoutonPlayHover2", "src/assets/Menu/rejouer_blanc.png");
        this.load.audio("musique_menu2", "src/assets/song/Bro_Force.mp3");
        this.load.audio("fx", "src/assets/Menu/fx.mp3");
    }
  
    create() {
        this.add.image(80, 35, "menu_fond2").setOrigin(0).setDepth(0);
  
        var bouton_play = this.add.image(410, 300, "imageBoutonPlay2").setDepth(1);
  
        bouton_play.setInteractive();
  
        bouton_play.on("pointerover", () => {
            bouton_play.setTexture("imageBoutonPlayHover2");
        });
  
        bouton_play.on("pointerout", () => {
            bouton_play.setTexture("imageBoutonPlay2");
        });
  
        bouton_play.on("pointerup", () => {
            this.scene.start("Menu");
            this.playClickSound();
            this.stopMenuMusic(); // Stoppez la musique du menu
        });
        
        // Jouez la musique du menu
        musique_menu2 = this.sound.add("musique_menu2", { loop: true });
        musique_menu2.play();
    }
  
    playClickSound() {
        this.sound.play("fx"); // Jouez le son du clic
    }
  
    stopMenuMusic() {
      // Arrêter la musique du menu
      musique_menu2.stop();
  }
  
    destroy() {
      // Arrêter la musique lorsque la scène est détruite
      if (musique_menu2 && musique_menu2.isPlaying) {
          musique_menu2.stop();
      }
      super.destroy();
    }
  
    update() {}
}
