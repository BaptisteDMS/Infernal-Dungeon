  import * as fct from "/src/js/fonctions.js";

  /***********************************************************************/
  /** VARIABLES GLOBALES 
  /***********************************************************************/

  var player; // désigne le sprite du joueur
  var clavier; // pour la gestion du clavier
  var groupe_plateformes;

  // définition de la classe "selection"
  export default class selection extends Phaser.Scene {
    constructor() {
      super({ key: "selection" }); // mettre le meme nom que le nom de la classe
    }

    /***********************************************************************/
    /** FONCTION PRELOAD 
  /***********************************************************************/

    preload() {
      // Chargement des assets (images, sons, etc.)
      this.load.image("img_ciel", "src/assets/sky.png");
      this.load.image("img_plateforme", "src/assets/platform.png");
      this.load.spritesheet("img_perso", "src/assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48
      });
      this.load.image("img_porte1", "src/assets/door1.png");
      this.load.image("img_porte2", "src/assets/door2.png");
      this.load.image("img_porte3", "src/assets/door3.png");
      this.load.image("bullet", "src/assets/projectile5.png"); // Chargement de l'image de la balle
      this.load.image("fireball", "src/assets/fireball.png");
      this.load.image("Personnage", "src/assets/Redi/survivor-move_handgun_0.png");
    }

    /***********************************************************************/
    /** FONCTION CREATE 
  /***********************************************************************/

    create() {
      // Appel de la fonction doNothing et doAlsoNothing provenant du module fonctions.js
      fct.doNothing();
      fct.doAlsoNothing();

      // Création du ciel
      this.add.image(400, 300, "img_ciel");

      // Création des plateformes
      groupe_plateformes = this.physics.add.staticGroup();
      groupe_plateformes.create(200, 584, "img_plateforme");
      groupe_plateformes.create(600, 584, "img_plateforme");
      groupe_plateformes.create(600, 450, "img_plateforme");
      groupe_plateformes.create(50, 300, "img_plateforme");
      groupe_plateformes.create(750, 270, "img_plateforme");

      // Création des portes
      this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
      this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
      this.porte3 = this.physics.add.staticSprite(750, 234, "img_porte3");

      // Création du joueur
      player = this.physics.add.sprite(100, 450, "Personnage");
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);

      //  propriétées physiqyes de l'objet player :
      player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde

      /***************************
       *  CREATION DES ANIMATIONS *
       ****************************/
      // dans cette partie, on crée les animations, à partir des spritesheet
      // chaque animation est une succession de frame à vitesse de défilement défini
      // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
      // creation de l'animation "Personnage" qui sera jouée sur le player lorsque ce dernier tourne à gauche
      

      

      

      // Création du clavier
      clavier = this.input.keyboard.createCursorKeys();

      // Gestion des collisions entre le joueur et les plateformes
      this.physics.add.collider(player, groupe_plateformes);
    }

    /***********************************************************************/
    /** FONCTION UPDATE 
  /***********************************************************************/

    update() {
      // Déplacement du joueur
      if (clavier.left.isDown) {
        if (clavier.up.isDown){
          player.setVelocityX(-160);
          player.setVelocityY(-160);
          
        }else if(clavier.down.isDown) {
          player.setVelocityX(-160);
          player.setVelocityY(160);
          
        }else{
          player.setVelocityX(-160);
          
        }
      }  else if (clavier.right.isDown) {
        if (clavier.up.isDown){
          player.setVelocityX(160);
          player.setVelocityY(-160);
          
        }else if(clavier.down.isDown) {
          player.setVelocityX(160);       
          player.setVelocityY(160);
          
        }else{
          player.setVelocityX(160);
          
        }
      } else if (clavier.down.isDown) {
        if (clavier.left.isDown){
          player.setVelocityX(-160);
          player.setVelocityY(160);
          
        }else if(clavier.right.isDown) {
          player.setVelocityX(160);
          player.setVelocityY(160);
          
        }else{
          player.setVelocityY(160);
          
        }
      } else if (clavier.up.isDown) {
        if (clavier.left.isDown){
          player.setVelocityX(-160);
          player.setVelocityY(-160);
          
        }else if(clavier.right.isDown) {
          player.setVelocityX(160);
          player.setVelocityY(-160);
          
        }else{
          player.setVelocityY(-160);
          
        }
      } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play("Personnage");
      }

      // Tir de la balle suivant la position de la souris
      if (this.input.mousePointer.isDown) {
        this.tirerBalle();
      }

      // Passage aux niveaux suivants selon la porte touchée
      if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
        if (this.physics.overlap(player, this.porte1))
          this.scene.switch("niveau1"); 
        if (this.physics.overlap(player, this.porte2))
          this.scene.switch("niveau2");
        if (this.physics.overlap(player, this.porte3))
          this.scene.switch("niveau3");
      }
      let sensitivity = 0.01;

    // Calcul de la direction entre le joueur et la position de la souris
    let diffX = this.input.mousePointer.worldX - player.x;
    let diffY = this.input.mousePointer.worldY - player.y;

    // Calcul de l'angle en radians entre le joueur et la souris
    let angle = Math.atan(diffY / diffX);

    // Convertir l'angle en degrés
    angle = Phaser.Math.RadToDeg(angle);

    // Ajuster l'angle en fonction de la position du curseur
    if (diffX < 0) {
     //   player.flipX=true;
        angle-=180;
    }
else {
 // player.flipX=false;

}
    // Appliquer la sensibilité à l'angle
    //angle *= sensitivity;

    // Appliquer la rotation à l'image du joueur
    player.setAngle(angle);
    //console.log(angle);
    }

   
  tirerBalle() {
    // Calcul du coefficient de direction en fonction de la position du clic de la souris
    let diffX = this.input.mousePointer.worldX - player.x;
    let diffY = this.input.mousePointer.worldY - player.y;
    let distance = Math.sqrt(diffX * diffX + diffY * diffY);
    let coefdirX = diffX / distance;
    let coefdirY = diffY / distance;

    // Création de la balle à la position du joueur
    let bullet = this.physics.add.sprite(player.x + 20 * coefdirX, player.y + 20 * coefdirY, "fireball");

    // Déplacement de la balle vers la position de la souris
    this.physics.moveTo(
      bullet,
      this.input.mousePointer.worldX,
      this.input.mousePointer.worldY,
      500
    );

    // Gestion des collisions de la balle avec les plateformes
    this.physics.add.collider(bullet, groupe_plateformes, () => {
      bullet.destroy();
    });
  }

  }
