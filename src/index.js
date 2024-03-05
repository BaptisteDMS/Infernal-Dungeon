// chargement des librairies
import selection_principale from "/src/js/selection_principale.js";
import niveau1 from "/src/js/niveau1.js";
import niveau2 from "/src/js/niveau2.js";
import niveau3 from "/src/js/niveau3.js";
import niveau4 from "/src/js/niveau4.js";
import niveau5 from "/src/js/niveau5.js";


// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
   scale: {
        // Or set parent divId here
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
   },
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {},
      debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [selection_principale, niveau1, niveau2, niveau3, niveau4,niveau5]
};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("selection_principale");
