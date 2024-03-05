import * as fct from "/src/js/fonctions.js";

export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("Phaser_JeuDeTuiles1", "src/assets/map_principale/terrain.png");
    this.load.image("Phaser_JeuDeTuiles2", "src/assets/map_principale/arriere_plan.png");
    this.load.image("Phaser_JeuDeTuiles3", "src/assets/map_principale/chateau.png");
    this.load.image("Phaser_JeuDeTuiles4", "src/assets/map_principale/donjon_maison.png");
    this.load.image("Phaser_JeuDeTuiles5", "src/assets/map_principale/house.png");
    this.load.tilemapTiledJSON("carte", "src/assets/map_principale/map_principale.json"); 
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();
    const carteDuNiveau = this.add.tilemap("carte");
    const tileset1 = carteDuNiveau.addTilesetImage(
      "terrain",
      "Phaser_JeuDeTuiles1"
    ); 
    const tileset2 = carteDuNiveau.addTilesetImage(
      "arriere_plan",
      "Phaser_JeuDeTuiles2"
    ); 
    const tileset3 = carteDuNiveau.addTilesetImage(
      "chateau",
      "Phaser_JeuDeTuiles3"
    ); 
    const tileset4 = carteDuNiveau.addTilesetImage(
      "donjon_maison",
      "Phaser_JeuDeTuiles4"
    ); 
    const tileset5 = carteDuNiveau.addTilesetImage(
      "house",
      "Phaser_JeuDeTuiles5"
    ); 
    const Fond_map = carteDuNiveau.createLayer(
      "Fond_map",
      tileset1,
      tileset2
    );
    const chateau = carteDuNiveau.createLayer(
      "chateau",
      tileset3,
      tileset5
    );
    const donjon = carteDuNiveau.createLayer(
      "donjon",
      tileset2,
      tileset5,
      tileset4,
      tileset3
    );
    const fond_porte_chateau = carteDuNiveau.createLayer(
      "fond_porte_chateau",
      tileset3,
      tileset2
    );
    Fond_map.setCollisionByProperty({ estSolide: true });
    chateau.setCollisionByProperty({ estSolide: true });
    donjon.setCollisionByProperty({ estSolide: true });
    fond_porte_chateau.setCollisionByProperty({ estSolide: true });




    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });


    this.player = this.physics.add.sprite(100, 450, "img_perso");
    this.player.refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, fond_porte_chateau); 
    this.physics.add.collider(player, donjon); 
    this.physics.add.collider(player, chateau); 
    this.physics.add.collider(player, Fond_map); 
// redimentionnement du monde avec les dimensions calculées via tiled
this.physics.world.setBounds(0, 0, 3200, 640);
//  ajout du champs de la caméra de taille identique à celle du monde
this.cameras.main.setBounds(0, 0, 3200, 640);
// ancrage de la caméra sur le joueur
this.cameras.main.startFollow(player); 
  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
      if (this.physics.overlap(this.player, this.porte_retour)) {
        this.scene.switch("selection");
      }
    }
  }
}
