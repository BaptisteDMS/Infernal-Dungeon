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
var deco_fond;
var CalquedeTuiles2;
var rien1;
var musique_de_fond5;
var groupeballe;
var groupeenemy;
let weaponsGroup;
let weapon = null;
var lastFiredTime = 0;
var groupe_plateformes;

// enemy variable 4
var enemy4;
var xCoord4;
var yCoord4;
var elem4;
var obj4;

function createEnemy4() {
  xCoord4 = Math.random() * 800;
  yCoord4 = Math.random() * 600;
  obj4 = this.physics.add.sprite(xCoord4, yCoord4, "fantome");
  enemy4.add(obj4);
  obj4.setCollideWorldBounds(true);
  this.physics.add.collider(obj4, deco_fond);
  this.physics.add.collider(obj4, CalquedeTuiles2);
  this.physics.add.collider(obj4, rien1);
  this.physics.add.collider(obj4, groupe_plateformes);
  this.physics.add.collider(obj4, player, (obj4, player) => {
    this.physics.pause();
    var timerRestart = this.time.delayedCall(3000,
      () => {
        this.scene.stop();
        this.scene.start();
      },
      null, this);    
  });
  this.physics.add.collider(obj4, enemy4);
}

export default class niveau3 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    preload(){
          //CHARGEMENT MUSIQUE
        this.load.audio("background5", "/src/assets/song/StreetFighter.mp3");
        this.load.image("Phaser_JeuDeTuiles14", "src/assets/map_donjon_japon/japontuiles.png");
        this.load.tilemapTiledJSON("carte3", "src/assets/map_donjon_japon/donjon_japon_fin.json");
          //CHARGEMENT MONSTRES
        this.load.image("fantome", "src/assets/monstres/phh.png")
    }
    create() {
        groupeballe=this.physics.add.group();
        weaponsGroup=this.physics.add.group();
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
    
    
    
        // Création du joueur
        player = this.physics.add.sprite(640, 483.750, "Personnage");
        player.setCollideWorldBounds(true);
        player.peutDash = true;
        player.gun = "Handgun";

         /****************************
     *  CREATION DU MECHANT 4 *
     ****************************/

    enemy4 = this.physics.add.group();

    let a = 0;

    while (a < 4) {
        createEnemy4.call(this); 
        a++;
    }

    var TimerMonster4 = this.time.addEvent({
      delay: 2500, // ms
      callback: function () {
        elem4 = enemy4.getChildren();
        elem4.forEach(enemy => {
          let bullet1;
          let bullet2;
          let bullet3;
            if (enemy.x <= player.x) {
                bullet1 = this.physics.add.sprite(enemy.x+35, enemy.y, "fireball");
                bullet2 = this.physics.add.sprite(enemy.x+35, enemy.y, "fireball");
                bullet3 = this.physics.add.sprite(enemy.x+35, enemy.y, "fireball");
            } else {
                bullet1 = this.physics.add.sprite(enemy.x-35, enemy.y, "fireball");
                bullet2 = this.physics.add.sprite(enemy.x-35, enemy.y, "fireball");
                bullet3 = this.physics.add.sprite(enemy.x-35, enemy.y, "fireball");
            }
          groupeballe.add(bullet1);
          groupeballe.add(bullet2);
          groupeballe.add(bullet3);
          this.physics.moveTo(bullet1, player.x, player.y, 300);
          this.physics.moveTo(bullet2, player.x+50, player.y-50, 300);
          this.physics.moveTo(bullet3, player.x-50, player.y-50, 300);
      });
      },
      args: [],
      callbackScope: this,
      repeat: -1
    });

    // Ajout de l'événement 'destroy' pour détecter la destruction d'un ennemi dans enemy3
enemy4.children.iterate(enemy4 => {
  enemy4.on('destroy', () => {
      // Générer un nombre aléatoire entre 0 (inclus) et 6 (exclus)
      var proba = Math.floor(Math.random() * 2);
      if (proba === 0) { // Vérifier si le nombre est égal à 0
          // Spawn d'une arme à la position de l'ennemi
          let randomWeaponKey = Phaser.Math.RND.pick(['ak', 'shotgun', 'pistolet', 'blaster', 'lanceflamme']);
          let weapon = this.physics.add.sprite(enemy4.x, enemy4.y, randomWeaponKey);
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
    dash = this.input.keyboard.addKey("space");
    lent = this.input.keyboard.addKey("C");
    sprint = this.input.keyboard.addKey("shift");
    interagir = this.input.keyboard.addKey("E");
    changement = this.input.keyboard.addKey("L");

    
        this.physics.add.collider(player, deco_fond); 
        this.physics.add.collider(player, CalquedeTuiles2); 
        this.physics.add.collider(player, rien1); 
      }
    
      update() {
        // enemy follow
        elem4 = enemy4.getChildren();
        var a = elem4.length;
        let c = 0;
        while (c < a) {       
          this.physics.moveTo(elem4[c], player.x-100, player.y-100, 80);
          c++;
        }

        // Gestion des collisions de la balle avec les plateformes
    this.physics.add.collider(groupeballe, rien1, (laballe, laplateforme) => {
      laballe.destroy();
  });

  this.physics.add.collider(groupeballe, CalquedeTuiles2, (laballe, laplateforme) => {
    laballe.destroy();
});

this.physics.add.collider(groupeballe, deco_fond, (laballe, laplateforme) => {
  laballe.destroy();
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

// Contact enemy 4
this.physics.overlap(groupeballe, enemy4, (bullet, enemy4) => {
  bullet.destroy();
  enemy4.destroy();
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
      this.scene.switch("selection_map_5");
      musique_de_fond5.stop();
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
