import * as fct from "/src/js/fonctions.js";



// Variable globale
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
var vitesse_lent=0;
var vitesse_dash=0;
let image_sprint;
var decor;
var CalquedeTuiles;
var rien;


export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  
  preload() {
    this.load.image("Phaser_JeuDeTuiles6", "src/assets/map_donjon_eau/arriere_plan.png");
    this.load.tilemapTiledJSON("carte1", "src/assets/map_donjon_eau/map_fin_eau.json");
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();
    const carteDuNiveau = this.add.tilemap("carte1");
    const tileset = carteDuNiveau.addTilesetImage(  
      "arriere_plan",
      "Phaser_JeuDeTuiles6"
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




    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 4", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });


    // Création icone dash
    image_sprint = this.add.image(16, 16, "Sprinter_bleu");

    // Création du joueur
    player = this.physics.add.sprite(200, 300, "Personnage");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.peutDash = true;



    this.physics.world.setBounds(0, 0, 1600, 1280);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1600, 1280);
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