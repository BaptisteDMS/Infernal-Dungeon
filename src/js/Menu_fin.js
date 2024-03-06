import * as fct from "/src/js/fonctions.js";


export default class Menu_fin extends Phaser.Scene {
    constructor() {
        super({ key: "Menu_fin" });
    }
  
    preload() {
        this.load.image("menu_fond", "src/assets/Menu/backfin.png");
        this.load.image("imageBoutonPlay1", "src/assets/Menu/rejouer_rouge.png");
        this.load.image("imageBoutonBack2", "src/assets/Menu/retour_rouge.png");
        this.load.image("imageBoutonPlayHover1", "src/assets/Menu/rejouer_blanc.png");
        this.load.image("commandes1", "src/assets/Menu/commandes.png");
        this.load.image("commandes_blanches1", "src/assets/Menu/commandes_blanches.png");
        this.load.audio("musique_menu", "src/assets/Menu/son.mp3");
        this.load.image("on", "src/assets/Menu/on.png");
        this.load.image("off", "src/assets/Menu/off.png");
        this.load.audio("fx", "src/assets/Menu/fx.mp3");
    }
  
    create() {
        this.add.image(80, 35, "menu_fond").setOrigin(0).setDepth(0);
  
        var bouton_play = this.add.image(390, 300, "imageBoutonPlay1").setDepth(1);
        var bouton_commandes = this.add.image(390, 350, "commandes1").setDepth(1);
        var bouton_son = this.add.image(150, 80, "off").setInteractive().setDepth(1);
        this.boutonSon = bouton_son; // Stockez une référence au bouton du son
  
        bouton_play.setInteractive();
        bouton_commandes.setInteractive();
  
        bouton_play.on("pointerover", () => {
            bouton_play.setTexture("imageBoutonPlayHover1");
        });
  
        bouton_play.on("pointerout", () => {
            bouton_play.setTexture("imageBoutonPlay1");
        });
  
        bouton_commandes.on("pointerover", () => {
            bouton_commandes.setTexture("commandes_blanches1");
        });
  
        bouton_commandes.on("pointerout", () => {
            bouton_commandes.setTexture("commandes1");
        });
  
        bouton_commandes.on("pointerup", () => {
            this.scene.start("niveau 1");
            this.playClickSound(); // Jouez le son du clic pour le bouton "commandes"
        });
  
        bouton_play.on("pointerup", () => {
            this.scene.start("Menu");
            this.playClickSound();
            this.musiqueMenu.stop(); // Jouez le son du clic pour le bouton "jouer"
        });
  
        bouton_son.on("pointerup", this.toggleSon, this); // Ajoutez le gestionnaire d'événements pour le bouton du son
    }
  
    toggleSon() {
        if (this.musiqueMenu && this.musiqueMenu.isPlaying) {
            this.musiqueMenu.stop();
            this.boutonSon.setTexture("off");
        } else {
            this.musiqueMenu = this.sound.add("musique_menu", { loop: true });
            this.musiqueMenu.play();
            this.boutonSon.setTexture("on");
        }
    }
  
    playClickSound() {
        this.sound.play("fx"); // Jouez le son du clic
    }
  
    stopMenuMusic() {
      // Arrêter la musique du menu
      this.musiqueMenu.stop();
  }
  
    destroy() {
      // Arrêter la musique lorsque la scène est détruite
      if (this.musiqueMenu && this.musiqueMenu.isPlaying) {
          this.musiqueMenu.stop();
      }
      super.destroy();}
  
    update() {}
  }