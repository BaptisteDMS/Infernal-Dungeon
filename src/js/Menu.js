export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: "Menu" });
    }

    preload() {
        // Chargement des assets
        this.load.image("menu_fond", "src/assets/Menu/backk.png");
        this.load.image("imageBoutonPlay", "src/assets/Menu/JOUER.png");
        this.load.image("imageBoutonPlayHover", "src/assets/Menu/JOUER_blanc.png");
        this.load.image("commandes", "src/assets/Menu/commandes.png");
        this.load.image("commandes_blanches", "src/assets/Menu/commandes_blanches.png");
        this.load.image("commandestuto", "src/assets/Menu/commandestuto.png");
        this.load.image("imageBoutonGuide", "src/assets/Menu/guide_rouge.png");
        this.load.image("imageBoutonGuideBlanc", "src/assets/Menu/guide.png");
        this.load.image("imageRetour", "src/assets/Menu/retour.png");
        this.load.image("imageRetourRouge", "src/assets/Menu/retour_rouge.png");
        this.load.audio("musique_menu", "src/assets/Menu/son.mp3");
        this.load.audio("fx", "src/assets/Menu/fx.mp3");
        this.load.image("imgjeu", "src/assets/Menu/imgjeu.png");
    }

    create() {
        // Affichage du fond du menu
        this.add.image(80, 35, "menu_fond").setOrigin(0).setDepth(0);

        // Création des boutons
        var bouton_play = this.add.image(390, 300, "imageBoutonPlay").setDepth(1);
        var bouton_commandes = this.add.image(390, 350, "commandes").setDepth(1);
        var bouton_guide = this.add.image(390, 400, "imageBoutonGuide").setDepth(1);

        // Activation de l'interaction pour les boutons
        bouton_play.setInteractive();
        bouton_commandes.setInteractive();
        bouton_guide.setInteractive();

        // Définition des événements pour les boutons
        bouton_play.on("pointerover", () => {
            bouton_play.setTexture("imageBoutonPlayHover");
        });

        bouton_play.on("pointerout", () => {
            bouton_play.setTexture("imageBoutonPlay");
        });

        bouton_commandes.on("pointerover", () => {
            bouton_commandes.setTexture("commandes_blanches");
        });

        bouton_commandes.on("pointerout", () => {
            bouton_commandes.setTexture("commandes");
        });

        bouton_commandes.on("pointerup", () => {
            this.afficherImageCommandes();
            this.playClickSound();
        });

        bouton_guide.on("pointerover", () => {
            bouton_guide.setTexture("imageBoutonGuideBlanc");
        });

        bouton_guide.on("pointerout", () => {
            bouton_guide.setTexture("imageBoutonGuide");
        });

        bouton_guide.on("pointerup", () => {
            this.afficherImageGuide();
            this.playClickSound();
        });

        bouton_play.on("pointerup", () => {
            this.scene.start("selection_map_1");
            this.playClickSound();
            this.stopMenuMusic();
        });

        // Lancement de la musique du menu
        this.musiqueMenu = this.sound.add("musique_menu", { loop: true });
        this.musiqueMenu.play();
    }

    playClickSound() {
        this.sound.play("fx");
    }

    stopMenuMusic() {
        if (this.musiqueMenu && this.musiqueMenu.isPlaying) {
            this.musiqueMenu.stop();
        }
    }

    afficherImageCommandes() {
        // Afficher l'image des commandes
        var imageCommandes = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "commandestuto");
        imageCommandes.setDepth(2);

        // Ajouter le bouton de retour en bas de l'image
        var boutonRetour = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 50, "imageRetour").setInteractive().setDepth(2);

        boutonRetour.on("pointerup", () => {
            imageCommandes.destroy(); // Supprimer l'image des commandes
            boutonRetour.destroy(); // Supprimer le bouton de retour
        });
    }

    afficherImageGuide() {
        // Afficher l'image du guide
        var imageGuide = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "imgjeu");
        imageGuide.setDepth(2);

        // Ajouter le bouton de retour en bas de l'image
        var boutonRetour = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 50, "imageRetour").setInteractive().setDepth(2);

        boutonRetour.on("pointerup", () => {
            imageGuide.destroy(); // Supprimer l'image du guide
            boutonRetour.destroy(); // Supprimer le bouton de retour
        });
    }

    destroy() {
        // Arrêter la musique lorsque la scène est détruite
        if (this.musiqueMenu && this.musiqueMenu.isPlaying) {
            this.musiqueMenu.stop();
        }
        super.destroy();
    }

    update() {}
}