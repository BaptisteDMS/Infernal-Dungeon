export default class menu extends Phaser.Scene {
    constructor() {
      super({ key: "menu" });
    }
    //on charge les images
    preload() {
      this.load.image("menu_fond", "src/assets/Menu/backk.png");
      this.load.image("imageBoutonPlay", "src/assets/Menu/JOUER.png");
      this.load.image("imageBoutonBack", "src/assets/Menu/retour_rouge.png");
      this.load.image("imageBoutonPlayHover", "src/assets/Menu/JOUER_blanc.png");
      this.load.image("commandes", "src/assets/Menu/commandes.png");
      this.load.image("commandes_blanches", "src/assets/Menu/commandes_blanches.png");
    }
  
    create() {
     // on place les éléments de fond
      this.add
        .image(0, 0, "menu_fond")
        .setOrigin(0)
        .setDepth(0);
  
      //on ajoute un bouton de clic, nommé bouton_play
      var bouton_play = this.add.image(300, 250, "imageBoutonPlay").setDepth(1);
      var bouton_commandes = this.add.image(300, 300, "commandes").setDepth(1);
     
      //=========================================================
      //on rend le bouton interratif
      bouton_play.setInteractive();
      bouton_commandes.setInteractive();
  
      bouton_play.on("pointerover", () => {
          bouton_play.setTexture("imageBoutonPlayHover"); // Changez la texture pour l'image avec la couleur différente
        });
        
        bouton_play.on("pointerout", () => {
          bouton_play.setTexture("imageBoutonPlay"); // Revenez à l'image normale du bouton
        });

        bouton_commandes.on("pointerover", () => {
          bouton_commandes.setTexture("commandes_blanches"); // Changement de texture pour la couleur différente
        });
        
        bouton_commandes.on("pointerout", () => {
          bouton_commandes.setTexture("commandes"); // Revenir à la texture normale
        });
    
        bouton_commandes.on("pointerup", () => {
          this.scene.start("niveau 1");
        });
      
        bouton_play.on("pointerup", () => {
          this.scene.start("niveau 1");
        });
      }
  
      update(){}
    }