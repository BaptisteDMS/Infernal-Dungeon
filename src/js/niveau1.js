import * as fct from "/src/js/fonctions.js";

// Variables globale
var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier
var droite;
var gauche;
var bas;
var haut;
var dash;
var lent;
var sprint;
var interagir;
var changement;
var vitesse_lent=0;
var vitesse_dash=0;
var decor;
var CalquedeTuiles;
var rien;
var musique_de_fond1;

// enemy variable 2
var enemy2;
var xCoord2;
var yCoord2;
var elem2;
var obj2;


function createEnemy2() {
  xCoord2 = Math.random() * 800;
  yCoord2 = Math.random() * 600;
  obj2 = this.physics.add.sprite(xCoord2, yCoord2, "Sprinter_rouge");
  obj2.setCollideWorldBounds(true);
  this.physics.add.collider(obj2, groupe_plateformes);
  this.physics.add.collider(obj2, player, (obj2, player) => {
    this.physics.pause();
    var timerRestart = this.time.delayedCall(3000,
      () => {
        this.scene.stop();
        this.scene.start();
      },
      null, this);    
  });
  this.physics.add.collider(obj2, enemy2);
  
  enemy2.add(obj2);
}


export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  
  preload() {

    //CHARGEMENT MUSIQUE
    this.load.audio("background1", "/src/assets/song/DOOM.mp3");
    this.load.image("Phaser_JeuDeTuiles11", "src/assets/map_principale/arriere_plan.png");
    this.load.tilemapTiledJSON("carte1", "src/assets/map_donjon_eau/map_donjon_eau.json");
    
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();
    musique_de_fond1 = this.sound.add("background1");
    musique_de_fond1.play();
    const carteDuNiveau = this.add.tilemap("carte1");
    const tileset = carteDuNiveau.addTilesetImage(  
      "arriere_plan",
      "Phaser_JeuDeTuiles11"
    ); 
    decor = carteDuNiveau.createLayer(
      "decor",
      tileset
    );
    CalquedeTuiles = carteDuNiveau.createLayer(
      "CalquedeTuiles",
      tileset
    );
    rien = carteDuNiveau.createLayer(
      "rien",
      tileset
    );


    CalquedeTuiles.setCollisionByProperty({ estSolide: true }); 
    decor.setCollisionByProperty({ estSolide: true });
    rien.setCollisionByProperty({ estSolide: true });




    // ajout d'un texte distintcif  du niveau
    this.add.text(500, 400, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });


    // Création icone dash
    image_sprint = this.add.image(16, 16, "Sprinter_bleu");

    // Création du joueur
    player = this.physics.add.sprite(640, 483.75, "Personnage");
    player.setCollideWorldBounds(true);
    player.peutDash = true;



    this.physics.world.setBounds(0, 0, 1280, 967.5);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1280, 967.5);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);


   // Création du clavier
   clavier = this.input.keyboard.createCursorKeys();
   haut = this.input.keyboard.addKey("Z");
   bas = this.input.keyboard.addKey("S");
   gauche = this.input.keyboard.addKey("Q");
   droite = this.input.keyboard.addKey("D");
   dash = this.input.keyboard.addKey("shift");
   lent= this.input.keyboard.addKey("space");
   sprint = this.input.keyboard.addKey("shift");
   interagir = this.input.keyboard.addKey("E");
   changement = this.input.keyboard.addKey("L");


    this.physics.add.collider(player, decor); 
    this.physics.add.collider(player, CalquedeTuiles); 
    this.physics.add.collider(player, rien); 

  }

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

   // Tir de la balle suivant la position de la souris
   if (this.input.mousePointer.isDown) {
     this.tirerBalle();
   }
6
   // Passage aux niveaux suivants selon la porte touchée
   if (Phaser.Input.Keyboard.JustDown(changement) == true) {
       this.scene.switch("selection_map_2");
       musique_de_fond1.stop(); 

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
 this.physics.add.collider(bullet, decor, () => {
   bullet.destroy();
 });
 this.physics.add.collider(bullet, CalquedeTuiles, () => {
   bullet.destroy();
 });
 this.physics.add.collider(bullet, rien, () => {
  bullet.destroy();
});
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