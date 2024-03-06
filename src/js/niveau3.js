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
var changement;
var vitesse_lent=0;
var vitesse_dash=0;
let image_sprint;
var deco_fond;
var CalquedeTuiles2;
var rien1;
var musique_de_fond5;

export default class niveau3 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    preload(){
          //CHARGEMENT MUSIQUE
    this.load.audio("background5", "/src/assets/song/street_fighter.mp3");
        this.load.image("Phaser_JeuDeTuiles14", "src/assets/map_donjon_japon/japontuiles.png");
        this.load.tilemapTiledJSON("carte3", "src/assets/map_donjon_japon/donjon_japon_fin.json");
    }
    create() {
        fct.doNothing();
        fct.doAlsoNothing();
        musique_de_fond5 = this.sound.add("background5");
        musique_de_fond5.play();
        const carteDuNiveau = this.add.tilemap("carte3");
        const tileset = carteDuNiveau.addTilesetImage(
          "carte_1",
          "Phaser_JeuDeTuiles14"
        ); 
        CalquedeTuiles2 = carteDuNiveau.createLayer(
          "CalquedeTuiles2",
          tileset
        );
        rien1 = carteDuNiveau.createLayer(
          "rien1",
         tileset
        );
        deco_fond = carteDuNiveau.createLayer(
          "deco_fond",
          tileset
        );

        
        CalquedeTuiles2.setCollisionByProperty({ estSolide: true });
        rien1.setCollisionByProperty({ estSolide: true });
        deco_fond.setCollisionByProperty({ estSolide: true });
    
    
    
    
        // ajout d'un texte distintcif  du niveau
        this.add.text(500, 400, "Vous êtes dans le niveau 3", {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "22pt"
        });
    
    
        // Création icone dash
        image_sprint = this.add.image(16, 16, "Sprinter_bleu");
    
        // Création du joueur
        player = this.physics.add.sprite(640, 483.750, "Personnage");
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

    
        this.physics.add.collider(player, deco_fond); 
        this.physics.add.collider(player, CalquedeTuiles2); 
        this.physics.add.collider(player, rien1); 
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
        if (Phaser.Input.Keyboard.JustDown(changement) == true) {
            this.scene.switch("selection_map_4"); 
            musique_de_fond5.stop();
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
      this.physics.add.collider(bullet, rien1, () => {
        bullet.destroy();
      });
      this.physics.add.collider(bullet, CalquedeTuiles2, () => {
        bullet.destroy();
      });
      this.physics.add.collider(bullet, deco_fond, () => {
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
