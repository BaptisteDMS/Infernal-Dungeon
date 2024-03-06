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
var interagir;
var groupe_plateformes;
var lastFiredTime = 0;
var groupeballe;
var vitesse_lent=0;
var vitesse_dash=0;
let weapon = null;
let weaponsGroup;

// varaible 
var Fond_map;
var chateau;
var fond_porte_chateau;
var donjon;
var rien;
var musique_de_fond;

/***********************************************************************/
/** CODE PRINCIPALE
/***********************************************************************/

// définition de la classe "selection"
export default class selection_map_1 extends Phaser.Scene {
    constructor() {
      super({ key: "selection_map_2" }); // mettre le meme nom que le nom de la classe
    }
    /***********************************************************************/
    /** FONCTION PRELOAD 
  /***********************************************************************/
  
    preload() {

      //CHARGEMENT MUSIQUE
      this.load.audio("background", "/src/assets/song/clash_of_clan.mp3"); 
      //CHARGEMENT DES IMAGES DE PORTES DES DIFFERENTES NIVEAUX
      this.load.image("porte_bleu", "src/assets/map_principale/maison_bleu_prote.png");
      this.load.image("porte_rouge", "src/assets/map_principale/porte_donjon_rouge.png");
      this.load.image("porte_bois", "src/assets/map_principale/porte_donjon_bois.png");
      this.load.image("porte_brique", "src/assets/map_principale/porte_maison_brique.png");
      this.load.image("porte_chateau", "src/assets/map_principale/porte_chateau.png");
      //CHARGEMENT DES IMAGES DU PERSONNAGES
      this.load.image("fireball", "src/assets/fireball.png");
      this.load.image("Personnage", "src/assets/Redi/LUIIII.png");
      this.load.image("img_ene", "src/assets/Redi/eyeball2.png");
      this.load.image("blasterbullet", "src/assets/Redi/blasterbullet.png")
      this.load.image("pistolbullet", "src/assets/Redi/pistolbullet.png")
      this.load.image("bullet", "src/assets/projectile5.png"); // Chargement de l'image de la balle
      this.load.image("Sprinter_rouge", "src/assets/rouge.png");
      // CHARGEMENT DES IMAGES DE SHOOTS
      this.load.image("tire","src/assets/Redi/tire.jpg")
      this.load.image("cible", "src/assets/Redi/eyeball.png")
      //Arme
      this.load.image("blaster", "src/assets/armeSol/Pistolet_blaster_DH-17.jpg")
      this.load.image("ak", "src/assets/armeSol/1(3).png")
      this.load.image("pistolet", "src/assets/armeSol/1(4).png")
      this.load.image("shotgun", "src/assets/armeSol/1(2).png")
      this.load.image("lanceflamme", "src/assets/armeSol/1(1).png");
      //CHARGEMENT DES IMAGES POUR CREER LA MAP
      this.load.image("Phaser_JeuDeTuiles1", "src/assets/map_principale/terrain.png");
      this.load.image("Phaser_JeuDeTuiles2", "src/assets/map_principale/arriere_plan.png");
      this.load.image("Phaser_JeuDeTuiles3", "src/assets/map_principale/chateau.png");
      this.load.image("Phaser_JeuDeTuiles4", "src/assets/map_principale/donjon_maison.png");
      this.load.image("Phaser_JeuDeTuiles5", "src/assets/map_principale/house.png");
      this.load.image("Phaser_JeuDeTuiles6", "src/assets/map_principale/maison_bleu_prote.png");
      this.load.image("Phaser_JeuDeTuiles7", "src/assets/map_principale/porte_chateau.png");
      this.load.image("Phaser_JeuDeTuiles8", "src/assets/map_principale/porte_donjon_bois.png");
      this.load.image("Phaser_JeuDeTuiles9", "src/assets/map_principale/porte_donjon_rouge.png");
      this.load.image("Phaser_JeuDeTuiles10", "src/assets/map_principale/porte_donjon_brique.png");
      this.load.tilemapTiledJSON("carte", "src/assets/map_principale/carte_map_principale.json");   
    }
  
    /***********************************************************************/
    /** FONCTION CREATE 
  /***********************************************************************/
  
    create() {
      musique_de_fond = this.sound.add("background");
      musique_de_fond.play();
      groupeballe = this.physics.add.group();
      weaponsGroup = this.physics.add.group();

      // CREATION DE LA MAP
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
      const tileset6 = carteDuNiveau.addTilesetImage(
        "maison_bleu_porte",
        "Phaser_JeuDeTuiles6"
      ); 
      const tileset7 = carteDuNiveau.addTilesetImage(
        "porte_chateau",
        "Phaser_JeuDeTuiles7"
      ); 
      const tileset8 = carteDuNiveau.addTilesetImage(
        "porte_donjon_bois",
        "Phaser_JeuDeTuiles8"
      ); 
      const tileset9 = carteDuNiveau.addTilesetImage(
        "porte_donjon_rouge",
        "Phaser_JeuDeTuiles9"
      ); 
      const tileset10 = carteDuNiveau.addTilesetImage(
        "porte_donjon_brique",
        "Phaser_JeuDeTuiles10"
      ); 
  
      Fond_map = carteDuNiveau.createLayer(
        "Fond_map",
        [tileset1,
          tileset2,
          tileset3,
          tileset4,
          tileset5,
          tileset6,
          tileset7,
          tileset8,
          tileset9,
          tileset10]
      );
      chateau = carteDuNiveau.createLayer(
        "chateau",
        [tileset1,
          tileset2,
          tileset3,
          tileset4,
          tileset5,
          tileset6,
          tileset7,
          tileset8,
          tileset9,
          tileset10]
      );
      donjon = carteDuNiveau.createLayer(
        "donjon",
        [tileset1,
          tileset2,
          tileset3,
          tileset4,
          tileset5,
          tileset6,
          tileset7,
          tileset8,
          tileset9,
          tileset10]
      );
      fond_porte_chateau = carteDuNiveau.createLayer(
        "fond_porte_chateau",
        [tileset1,
          tileset2,
          tileset3,
          tileset4,
          tileset5,
          tileset6,
          tileset7,
          tileset8,
          tileset9,
          tileset10]
      );

      // CREATION DES COLISSION
      Fond_map.setCollisionByProperty({ estSolide: true });
      donjon.setCollisionByProperty({ estSolide: true });
      fond_porte_chateau.setCollisionByProperty({ estSolide: true });

      // Création des portes
      this.porte1 = this.physics.add.staticSprite(192.5, 225  , "porte_bleu");
      this.porte2 = this.physics.add.staticSprite(1472.5, 207.5, "porte_rouge");
      this.porte3 = this.physics.add.staticSprite(145, 1152.5, "porte_bois");
      this.porte4 = this.physics.add.staticSprite(1505, 1088.5, "porte_brique");
      this.porte5 = this.physics.add.staticSprite(720, 495, "porte_chateau");

      // Création du joueur
      player = this.physics.add.sprite(740, 600, "Personnage");
      player.setCollideWorldBounds(true);
      player.gun= "Handgun";
      player.peutDash = true;

    // CREATION DE LA COLLISION DES OBJETS AVEC LE PERSONNAGE
      this.physics.add.collider(player, fond_porte_chateau); 
      this.physics.add.collider(player, donjon); 
      this.physics.add.collider(player, chateau); 
      this.physics.add.collider(player, Fond_map);

      // PARAMETRE CAMERA
      this.physics.world.setBounds(0, 0, 1600, 1280);
      this.cameras.main.setBounds(0, 0, 1600, 1280);
      this.cameras.main.startFollow(player);

      // Création du clavier
      clavier = this.input.keyboard.createCursorKeys();
      haut = this.input.keyboard.addKey("Z");
      bas = this.input.keyboard.addKey("S");
      gauche = this.input.keyboard.addKey("Q");
      droite = this.input.keyboard.addKey("D");
      dash = this.input.keyboard.addKey("space");
      lent= this.input.keyboard.addKey("C");
      sprint = this.input.keyboard.addKey("shift");
      interagir = this.input.keyboard.addKey("E");
    }   
    
  
     /***********************************************************************/
    /** FONCTION UPDATE 
  /***********************************************************************/
  
  update() {

    // Gestion des collisions de la balle avec les plateformes
  this.physics.add.collider(groupeballe, Fond_map, (laballe, laplateforme) => {
    laballe.destroy();
});

this.physics.add.collider(groupeballe, chateau, (laballe, laplateforme) => {
  laballe.destroy();
});

this.physics.add.collider(groupeballe, fond_porte_chateau, (laballe, laplateforme) => {
laballe.destroy();
});

this.physics.add.collider(groupeballe, donjon, (laballe, laplateforme) => {
laballe.destroy();
});

this.physics.add.collider(groupeballe, rien, (laballe, laplateforme) => {
laballe.destroy();
});



     // Déplacement du joueur

  if(lent.isDown){
    vitesse_lent=70;
    if (dash.isDown && player.peutDash==true){
      vitesse_dash=500;
    }
  }else if (sprint.isDown){
    vitesse_dash=100;
    if (dash.isDown && player.peutDash==true){
      vitesse_dash=500;}
  }else if (dash.isDown && player.peutDash==true){
    vitesse_dash=500;
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
  }

  // Tire balle fct position souris
  if (this.input.mousePointer.isDown) {
    this.tirerBalle(player.gun);
  }

    // Passage aux niveaux suivants selon la porte touchée
    if (Phaser.Input.Keyboard.JustDown(interagir) == true) {
      if (this.physics.overlap(player, this.porte2))
        this.scene.switch("niveau2");
        musique_de_fond.stop();
    }


      // Calcul de la direction entre le joueur et la position de la souris
      this.input.mousePointer.updateWorldPoint(this.cameras.main);

    let diffX = this.input.mousePointer.worldX - player.x;
    let diffY = this.input.mousePointer.worldY - player.y;

    // Calcul de l'angle en radians entre le joueur et la souris
    let angle = Math.atan(diffY / diffX);


    // Convertir l'angle en degrés
    angle = Phaser.Math.RadToDeg(angle);
    //console.log(angle);
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

 tirerBalle(arme) {
  let cadence;
  let nomArme;
  let Vitesse;

  if (arme === "lanceflamme") {
      cadence = 20;
      nomArme = "fireball";
      Vitesse = 500;
  } else if (arme === "Handgun") {
      cadence = 500;
      nomArme = "pistolbullet";
      Vitesse = 1000;
  } else if (arme === "ak") {
      cadence = 200;
      nomArme = "pistolbullet";
      Vitesse = 1000;
  } else if (arme === "blaster") {
      cadence = 750;
      nomArme = "blasterbullet";
      Vitesse = 2500;
  } else if (arme === "pistolet") {
      cadence = 500;
      nomArme = "tire";
      Vitesse = 1000;
  } else if (arme === "shotgun") {
      cadence = 1200;
      nomArme = "pistolbullet";
      Vitesse = 800;

      // Vérifier si suffisamment de temps s'est écoulé depuis le dernier tir
      if (this.time.now - lastFiredTime > cadence) {
          // Calcul du coefficient de direction en fonction de la position du clic de la souris
          let diffX = this.input.mousePointer.worldX - player.x;
          let diffY = this.input.mousePointer.worldY - player.y;
          let distance = Math.sqrt(diffX * diffX + diffY * diffY);
          let coefdirX = diffX / distance;
          let coefdirY = diffY / distance;

          // Création des trois balles
          for (let i = 0; i < 3; i++) {
              let bullet;
              // Position de la balle en fonction de l'indice i
              if (i === 0) {
                  bullet = this.physics.add.sprite(player.x + 20 * coefdirX, player.y + 20 * coefdirY, nomArme);
              } else {
                  // Calcul des positions pour les balles latérales
                  let angle = (i === 1) ? -45 : 45; // Angle négatif pour la balle de gauche, positif pour la balle de droite
                  let newDirX = Math.cos(Phaser.Math.DegToRad(angle)) * coefdirX - Math.sin(Phaser.Math.DegToRad(angle)) * coefdirY;
                  let newDirY = Math.sin(Phaser.Math.DegToRad(angle)) * coefdirX + Math.cos(Phaser.Math.DegToRad(angle)) * coefdirY;
                  bullet = this.physics.add.sprite(player.x + 20 * newDirX, player.y + 20 * newDirY, nomArme);
              }

              // Ajouter la balle au groupe de balles
              groupeballe.add(bullet);

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
          }

          // Mettre à jour le temps du dernier tir
          lastFiredTime = this.time.now;
      }
  }

    
    // Vérifier si suffisamment de temps s'est écoulé depuis le dernier tir
    if (this.time.now - lastFiredTime > cadence) {
        // Calcul du coefficient de direction en fonction de la position du clic de la souris
        this.input.mousePointer.updateWorldPoint(this.cameras.main);
        let diffX = this.input.mousePointer.worldX - player.x;
        let diffY = this.input.mousePointer.worldY - player.y;
        let distance = Math.sqrt(diffX * diffX + diffY * diffY);
        let coefdirX = diffX / distance;
        let coefdirY = diffY / distance;
        
        // Création de la balle à la position du joueur avec le bon nom d'arme
        let bullet = this.physics.add.sprite(player.x + 40 * coefdirX, player.y + 40 * coefdirY, nomArme);
        
        // Ajouter la balle au groupe de balles
        groupeballe.add(bullet);
        
        // Déplacement de la balle vers la position de la souris
        this.input.mousePointer.updateWorldPoint(this.cameras.main);
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

dash (player) {
  if (player.peutDash == true) {
      
      player.peutDash = false; // on désactive la possibilté de dash
      
      // on la réactive dans 4 secondes avec un timer
      var timerDashOk = this.time.delayedCall(4000, () => {
          player.peutDash = true;
      }, null, this);  
  }
}
}