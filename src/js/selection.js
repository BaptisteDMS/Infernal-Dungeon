import * as fct from "/src/js/fonctions.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier
var droite;
var gauche;
var bas;
var haut;
var dash;
var lent;
var sprint;
var groupe_plateformes;
var lastFiredTime = 0;


var vitesse_lent=0;
var vitesse_dash=0;
let image_sprint;

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
    this.load.image("Sprinter_bleu", "src/assets/bleu.png");
    this.load.image("Sprinter_rouge", "src/assets/rouge.png");
  }
    this.load.image("Gunsol", "src/assets/armeSol/1(1).png");
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

    // Création icone dash
    image_sprint = this.add.image(16, 16, "Sprinter_bleu");

    // Création du joueur
    player = this.physics.add.sprite(100, 450, "Personnage");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.gun= "Handgun";

    //  propriétées physiqyes de l'objet player :
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde


    player.peutDash = true;
  
    // Création du clavier
    clavier = this.input.keyboard.createCursorKeys();
    haut = this.input.keyboard.addKey("Z");
    bas = this.input.keyboard.addKey("S");
    gauche = this.input.keyboard.addKey("Q");
    droite = this.input.keyboard.addKey("D");
    dash = this.input.keyboard.addKey("space");
    lent= this.input.keyboard.addKey("C");
    sprint = this.input.keyboard.addKey("shift");

    // Gestion des collisions entre le joueur et les plateformes
    this.physics.add.collider(player, groupe_plateformes);
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {
    // Déplacement du joueur

    if(lent.isDown){
      vitesse_lent=70;
      if (dash.isDown && player.peutDash==true){
        vitesse_dash=8000;
        this.dash(player,image_sprint);}
    }else if (sprint.isDown){
      vitesse_dash=100;
      if (dash.isDown && player.peutDash==true){
        vitesse_dash=8000;
        this.dash(player,image_sprint);}
    }else if (dash.isDown && player.peutDash==true){
      vitesse_dash=8000;
      this.dash(player,image_sprint);
    }else{
      vitesse_dash=0;
      vitesse_lent=0;
    }

    if (gauche.isDown) {
      if (haut.isDown){
        player.setVelocityX(-160+vitesse_lent-vitesse_dash);
        player.setVelocityY(-160+vitesse_lent-vitesse_dash);
      }else if(bas.isDown) {
        player.setVelocityX(-160+vitesse_lent-vitesse_dash);
        player.setVelocityY(160-vitesse_lent+vitesse_dash);
      }else{
        player.setVelocityX(-160+vitesse_lent-vitesse_dash);
      }
    }  else if (droite.isDown) {
      if (haut.isDown){
        player.setVelocityX(160-vitesse_lent+vitesse_dash);
        player.setVelocityY(-160+vitesse_lent-vitesse_dash);
      }else if(bas.isDown) {
        player.setVelocityX(160-vitesse_lent+vitesse_dash);
        player.setVelocityY(160-vitesse_lent+vitesse_dash);
      }else{
        player.setVelocityX(160-vitesse_lent+vitesse_dash);
      }
    } else if (bas.isDown) {
      if (gauche.isDown){
        player.setVelocityX(-160+vitesse_lent-vitesse_dash);
        player.setVelocityY(160-vitesse_lent+vitesse_dash);
      }else if(droite.isDown) {
        player.setVelocityX(160-vitesse_lent+vitesse_dash);
        player.setVelocityY(160-vitesse_lent+vitesse_dash);
      }else{
        player.setVelocityY(160-vitesse_lent+vitesse_dash);
      }
    } else if (haut.isDown) {
      if (gauche.isDown){
        player.setVelocityX(-160+vitesse_lent-vitesse_dash);
        player.setVelocityY(-160+vitesse_lent-vitesse_dash);
      }else if(droite.isDown) {
        player.setVelocityX(160-vitesse_lent+vitesse_dash);
        player.setVelocityY(-160+vitesse_lent-vitesse_dash);
      }else{
        player.setVelocityY(-160+vitesse_lent-vitesse_dash);
      }
    } else {
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.anims.play("Personnage");
    }


    if (this.input.mousePointer.isDown) {
      
      this.tirerBalle(player.gun); 


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



    // Calcul de la direction entre le joueur et la position de la souris
    let diffX = this.input.mousePointer.worldX - player.x;
    let diffY = this.input.mousePointer.worldY - player.y;

    // Calcul de l'angle en radians entre le joueur et la souris
    let angle = Math.atan(diffY / diffX);

    // Convertir l'angle en degrés
    angle = Phaser.Math.RadToDeg(angle);

    // Ajuster l'angle en fonction de la position du curseur
    if (diffX < 0) {
    // player.flipX=true;
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

 


 

  // Fonction pour tirer une balle
  // Fonction pour tirer une balle
  tirerBalle(arme) {
    let cadence;
    let nomArme;
    let Vitesse;
  
    
    if (arme === "LanceFlamme") {
      cadence = 500;
      nomArme = "fireball";
      Vitesse = 100;
    } else if (arme === "Handgun") {
      cadence = 1500;
      nomArme = "fireball";
      Vitesse = 1000;
    } else {
      
      console.error("Arme non reconnue");
      return;
    }
  
    // Vérifier si suffisamment de temps s'est écoulé depuis le dernier tir
    if (this.time.now - lastFiredTime > cadence) {
      // Calcul du coefficient de direction en fonction de la position du clic de la souris
      let diffX = this.input.mousePointer.worldX - player.x;
      let diffY = this.input.mousePointer.worldY - player.y;
      let distance = Math.sqrt(diffX * diffX + diffY * diffY);
      let coefdirX = diffX / distance;
      let coefdirY = diffY / distance;
  
      // Création de la balle à la position du joueur avec le bon nom d'arme
      let bullet = this.physics.add.sprite(player.x + 20 * coefdirX, player.y + 20 * coefdirY, nomArme);
  
      // Déplacement de la balle vers la position de la souris
      this.physics.moveTo(
        bullet,
        this.input.mousePointer.worldX,
        this.input.mousePointer.worldY,
        Vitesse
      );
  
      // Gestion des collisions de la balle avec les plateformes
      this.physics.add.collider(bullet, groupe_plateformes, () => {
        bullet.destroy();
      });
  
      // Mettre à jour le temps du dernier tir
      lastFiredTime = this.time.now;
    }
  }
  
  
  
  

dash (player, image_sprint) {
  if (player.peutDash == true) {
      
      player.peutDash = false; // on désactive la possibilté de dash
      
      image_sprint = this.add.image(16, 16, "Sprinter_rouge");
      
      // on la réactive dans 4 secondes avec un timer
      var timerDashOk = this.time.delayedCall(4000, () => {
          player.peutDash = true;
          image_sprint = this.add.image(16, 16, "Sprinter_bleu");
      }, null, this);  
  }
}

}