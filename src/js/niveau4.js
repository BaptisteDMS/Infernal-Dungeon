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
var vitesse_lent = 0;
var vitesse_dash = 0;
var Rien;
var Ruine;
var Terrain;
var Vert;
var musique_de_fond7;
var groupeballe;
var groupeenemy;
let weaponsGroup;
let weapon = null;
var lastFiredTime = 0;
var groupe_plateformes;
var enemy;
var xCoord;
var yCoord;
var elem;
var obj;

function createEnemy() {
  xCoord = Math.random() * 800;
  yCoord = Math.random() * 600;
  obj = this.physics.add.sprite(xCoord, yCoord, "img_ene");
  obj.setCollideWorldBounds(true);
  this.physics.add.collider(obj, Rien);
  this.physics.add.collider(obj, Ruine);
  this.physics.add.collider(obj, Terrain);
  this.physics.add.collider(obj, Vert);
  this.physics.add.collider(obj, player, (obj, player) => {
    this.physics.pause();
    var timerRestart = this.time.delayedCall(3000,
      () => {
        this.scene.stop();
        this.scene.start();
      },
      null, this);
  });
  this.physics.add.collider(obj, enemy);

  enemy.add(obj);
}


export default class niveau4 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau4" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    //CHARGEMENT MUSIQUE
    this.load.audio("background7", "/src/assets/song/MadMax.mp3");
    this.load.image("Phaser_JeuDeTuiles20", "src/assets/donjon_jungle/jungle-ruins.png");
    this.load.image("Phaser_JeuDeTuiles21", "src/assets/donjon_jungle/terrain-map-v7.png");
    this.load.tilemapTiledJSON("carte4", "src/assets/donjon_jungle/donjon_jun3.json");
    this.load.image("Personnage", "src/assets/Redi/LUIIII.png");
    this.load.image("Sprinter_rouge", "src/assets/rouge.png");
    this.load.image("bullet", "src/assets/projectile5.png"); // Chargement de l'image de la balle
    this.load.image("fireball", "src/assets/fireball.png");
  }

  create() {
    groupeballe=this.physics.add.group();
    weaponsGroup=this.physics.add.group();
    musique_de_fond7 = this.sound.add("background7");
    musique_de_fond7.play();
    const carteDuNiveau = this.add.tilemap("carte4");
    const tileset1 = carteDuNiveau.addTilesetImage(
      "jungle-ruins",
      "Phaser_JeuDeTuiles20"
    ); 
    const tileset2 = carteDuNiveau.addTilesetImage(
      "terrain-map-v7",
      "Phaser_JeuDeTuiles21"
    ); 

    Vert = carteDuNiveau.createLayer(
      "Vert",
      [tileset1,
        tileset2]
    );  
    Terrain = carteDuNiveau.createLayer(
      "Terrain",
      [tileset1,
        tileset2]
    );
    Ruine = carteDuNiveau.createLayer(
      "Ruine",
      [tileset1,
      tileset2]
    );
    Rien = carteDuNiveau.createLayer(
      "Rien",
      [tileset1,
        tileset2]
    );



    Rien.setCollisionByProperty({ estSolide: true });
    Vert.setCollisionByProperty({ estSolide: true });
    Ruine.setCollisionByProperty({ estSolide: true });
    Terrain.setCollisionByProperty({ estSolide: true });



    // ajout d'un texte distintcif  du niveau
    this.add.text(500, 350, "Vous êtes dans le niveau 4", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });



    // Création du joueur
    player = this.physics.add.sprite(640, 430, "Personnage");
    player.setCollideWorldBounds(true);
    player.peutDash = true;
    player.gun = "Handgun";



    this.physics.world.setBounds(0, 0, 1280, 967.5);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1280, 967.5);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);

        /****************************
     *  CREATION DU MECHANT  *
     ****************************/

        enemy = this.physics.add.group();

        let n = 0;
    
        while (n < 5) {
            createEnemy.call(this); 
            
            n++;
        }



        enemy.children.iterate(enemy => {
          enemy.on('destroy', () => {
              // Générer un nombre aléatoire entre 0 (inclus) et 6 (exclus)
              var proba = Math.floor(Math.random() * 2);
              if (proba === 0) { // Vérifier si le nombre est égal à 0
                  // Spawn d'une arme à la position de l'ennemi
                  let randomWeaponKey = Phaser.Math.RND.pick(['ak', 'shotgun', 'pistolet', 'blaster', 'lanceflamme']);
                  let weapon = this.physics.add.sprite(enemy.x, enemy.y, randomWeaponKey);
                  weapon.setCollideWorldBounds(true);
                  // Ajouter l'arme au groupe d'armes
                  weaponsGroup.add(weapon);
              }
          });
        });
    //recup arme
    this.physics.add.collider(player, weaponsGroup, (player, weapon) => {
      player.gun = weapon.texture.key;
      weapon.destroy();
    });
      // Création du clavier
      clavier = this.input.keyboard.createCursorKeys();
      haut = this.input.keyboard.addKey("Z");
      bas = this.input.keyboard.addKey("S");
      gauche = this.input.keyboard.addKey("Q");
      droite = this.input.keyboard.addKey("D");
      dash = this.input.keyboard.addKey("space");
      lent = this.input.keyboard.addKey("C");
      sprint = this.input.keyboard.addKey("shift");
      interagir = this.input.keyboard.addKey("E");
      changement = this.input.keyboard.addKey("L");

    this.physics.add.collider(player, Rien); 
    this.physics.add.collider(player, Ruine); 
    this.physics.add.collider(player, Vert); 
    this.physics.add.collider(player, Terrain);
  }

  update() {

    // Deplacement enenmy
    /*************************
     *     ENEMY FOLLOW     *
     ************************/

    elem = enemy.getChildren();
    var p = elem.length;
    let n = 0;
    while (n < p) {
        this.physics.moveTo(elem[n], player.x, player.y, 80);
        n++;
    }
        // Gestion des collisions de la balle avec les plateformes
        this.physics.add.collider(groupeballe, Rien, (laballe, laplateforme) => {
          laballe.destroy();
      });
    
      this.physics.add.collider(groupeballe, Ruine, (laballe, laplateforme) => {
        laballe.destroy();
    });
    
    this.physics.add.collider(groupeballe, Terrain, (laballe, laplateforme) => {
      laballe.destroy();
    });
    this.physics.add.collider(groupeballe, Vert, (laballe, laplateforme) => {
      laballe.destroy();
    });
    
        


 // Détection des collisions entre les balles et les ennemis
 this.physics.overlap(groupeballe, enemy, (bullet, enemy) => {
  // Création des balles à la position du joueur avec le bon nom d'arme
  let bullet1 = this.physics.add.sprite(enemy.x, enemy.y, "fireball");
  let bullet2 = this.physics.add.sprite(enemy.x, enemy.y, "fireball");
  let bullet3 = this.physics.add.sprite(enemy.x, enemy.y, "fireball");
  let bullet4 = this.physics.add.sprite(enemy.x, enemy.y, "fireball");
  let bullet5 = this.physics.add.sprite(enemy.x, enemy.y, "fireball");
  let bullet6 = this.physics.add.sprite(enemy.x, enemy.y, "fireball");
  let bullet7 = this.physics.add.sprite(enemy.x, enemy.y, "fireball");
  let bullet8 = this.physics.add.sprite(enemy.x, enemy.y, "fireball");
  

  // Suppression de l'ennemi et de la balle lorsqu'il y a une collision
  bullet.destroy();
  enemy.destroy();

  // Ajouter la balle au groupe de balles
  groupeballe.add(bullet1);
  groupeballe.add(bullet2);
  groupeballe.add(bullet3);
  groupeballe.add(bullet4);
  groupeballe.add(bullet5);
  groupeballe.add(bullet6);
  groupeballe.add(bullet7);
  groupeballe.add(bullet8);
  
  // Déplacement des balles vers la position de la souris
  bullet1.setVelocityX(500);
  bullet2.setVelocityX(-500);
  bullet3.setVelocityY(500);
  bullet4.setVelocityY(-500);

  bullet5.setVelocityX(500);
  bullet5.setVelocityY(500);
  bullet6.setVelocityX(-500);
  bullet6.setVelocityY(500);
  bullet7.setVelocityY(-500);
  bullet7.setVelocityX(-500);
  bullet8.setVelocityY(-500);  
  bullet8.setVelocityX(500);

  // Gestion des collisions de la balle avec les plateformes
  this.physics.add.collider(groupeballe, groupe_plateformes, (laballe, laplateforme) => {
      laballe.destroy();
  });
});  




            // Contact player
    this.physics.overlap(groupeballe, player, (bullet, player) => {
      this.physics.pause();
      var timerRestart = this.time.delayedCall(3000,
        () => {
          this.scene.stop();
          this.scene.start();
        },
        null, this);
    });
     // Déplacement du joueur

    if (lent.isDown) {
      vitesse_lent = 70;
      if (dash.isDown && player.peutDash == true) {
        vitesse_dash = 500;
      }
    } else if (sprint.isDown) {
      vitesse_dash = 100;
      if (dash.isDown && player.peutDash == true) {
        vitesse_dash = 500;
      }
    } else if (dash.isDown && player.peutDash == true) {
      vitesse_dash = 500;
    } else {
      vitesse_dash = 0;
      vitesse_lent = 0;
    }

    if (gauche.isDown) {
      if (haut.isDown) {
        player.setVelocityX(-160 + vitesse_lent - vitesse_dash);
        player.setVelocityY(-160 + vitesse_lent - vitesse_dash);
      } else if (bas.isDown) {
        player.setVelocityX(-160 + vitesse_lent - vitesse_dash);
        player.setVelocityY(160 - vitesse_lent + vitesse_dash);
      } else {
        player.setVelocityX(-160 + vitesse_lent - vitesse_dash);
      }
    } else if (droite.isDown) {
      if (haut.isDown) {
        player.setVelocityX(160 - vitesse_lent + vitesse_dash);
        player.setVelocityY(-160 + vitesse_lent - vitesse_dash);
      } else if (bas.isDown) {
        player.setVelocityX(160 - vitesse_lent + vitesse_dash);
        player.setVelocityY(160 - vitesse_lent + vitesse_dash);
      } else {
        player.setVelocityX(160 - vitesse_lent + vitesse_dash);
      }
    } else if (bas.isDown) {
      if (gauche.isDown) {
        player.setVelocityX(-160 + vitesse_lent - vitesse_dash);
        player.setVelocityY(160 - vitesse_lent + vitesse_dash);
      } else if (droite.isDown) {
        player.setVelocityX(160 - vitesse_lent + vitesse_dash);
        player.setVelocityY(160 - vitesse_lent + vitesse_dash);
      } else {
        player.setVelocityY(160 - vitesse_lent + vitesse_dash);
      }
    } else if (haut.isDown) {
      if (gauche.isDown) {
        player.setVelocityX(-160 + vitesse_lent - vitesse_dash);
        player.setVelocityY(-160 + vitesse_lent - vitesse_dash);
      } else if (droite.isDown) {
        player.setVelocityX(160 - vitesse_lent + vitesse_dash);
        player.setVelocityY(-160 + vitesse_lent - vitesse_dash);
      } else {
        player.setVelocityY(-160 + vitesse_lent - vitesse_dash);
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
    if (Phaser.Input.Keyboard.JustDown(changement)) {
      musique_de_fond7.stop();
      this.scene.switch("selection_map_5");
      musique_de_fond7.stop();
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
      angle -= 180;
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

  dash(player, image_sprint) {
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