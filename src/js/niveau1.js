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
var refresh;
var vitesse_lent = 0;
var vitesse_dash = 0;
var decor;
var CalquedeTuiles;
var rien;
var musique_de_fond1;
var musique_mort;
var groupeballe;
var groupeenemy;
let weaponsGroup;
let weapon = null;
var lastFiredTime = 0;
var groupe_plateformes;
var condition_switch=0;

// enemy variable 2
var enemy2;
var xCoord2;
var yCoord2;
var elem2;
var obj2;


function createEnemy2() {
  xCoord2 = Math.random() * 800;
  yCoord2 = Math.random() * 600;
  obj2 = this.physics.add.sprite(xCoord2, yCoord2, "chauve-souris");
  obj2.setCollideWorldBounds(true);
  this.physics.add.collider(obj2, decor);
  this.physics.add.collider(obj2, CalquedeTuiles);
  this.physics.add.collider(obj2, rien);
  this.physics.add.collider(obj2, player, (obj2, player) => {
    this.physics.pause();
    musique_de_fond1.stop();
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
    //CHARGEMENT MONSTRES
    this.load.image("chauve-souris", "src/assets/monstres/chauve-souris.png") 
  }

  create() {
    groupeballe=this.physics.add.group();
    weaponsGroup=this.physics.add.group();
    musique_de_fond1 = this.sound.add("background1");
    musique_mort = this.sound.add("die");
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

    // Création du joueur
    player = this.physics.add.sprite(640, 483.75, "Personnage");
    player.setCollideWorldBounds(true);
    player.peutDash = true;
    player.gun = "Handgun";



    this.physics.world.setBounds(0, 0, 1280, 967.5);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1280, 967.5);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);

    /****************************
     *  CREATION DU MECHANT 2 *
     ****************************/

    enemy2 = this.physics.add.group();

    let b = 0;

    while (b < 3) {
      createEnemy2.call(this);
      b++;
    }

    var TimerSpawn = this.time.addEvent({
      delay: 3000, // ms
      callback: function () {
        enemy2 = this.physics.add.group();

    let b = 0;

    while (b < 3) {
      createEnemy2.call(this);
      b++;
    }
      },
      args: [],
      callbackScope: this,
      repeat: -1
    });

    var TimerMonster2 = this.time.addEvent({
      delay: 500, // ms
      callback: function () {
        elem2 = enemy2.getChildren();
        elem2.forEach(enemy => {
          let bullet;
          if (enemy.x <= player.x) {
            bullet = this.physics.add.sprite(enemy.x + 35, enemy.y, "fireball");
          } else {
            bullet = this.physics.add.sprite(enemy.x - 35, enemy.y, "fireball");
          }
          groupeballe.add(bullet);
          this.physics.moveTo(bullet, player.x, player.y, 200);
        });
      },
      args: [],
      callbackScope: this,
      repeat: -1
    });

    // Ajout de l'événement 'destroy' pour détecter la destruction d'un ennemi dans enemy2
    enemy2.children.iterate(enemy2 => {
      enemy2.on('destroy', () => {
        // Générer un nombre aléatoire entre 0 (inclus) et 6 (exclus)
        var proba = Math.floor(Math.random() * 2);
        if (proba === 0) { // Vérifier si le nombre est égal à 0
          // Spawn d'une arme à la position de l'ennemi
          let randomWeaponKey = Phaser.Math.RND.pick(['ak', 'shotgun', 'pistolet', 'blaster', 'lanceflamme']);
          let weapon = this.physics.add.sprite(enemy2.x, enemy2.y, randomWeaponKey);
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
    refresh = this.input.keyboard.addKey("G");


    this.physics.add.collider(player, decor);
    this.physics.add.collider(player, CalquedeTuiles);
    this.physics.add.collider(player, rien);

  }

  update() {

    if(refresh.isDown){
      musique_de_fond1.stop();
      this.scene.stop();
      this.scene.start();
    }

    elem2 = enemy2.getChildren();
    var b = elem2.length;
    let v = 0;
    while (v < b) {
      this.physics.moveTo(elem2[v], player.x - 100, player.y - 100, 100);
      v++;
    }

    // Gestion des collisions de la balle avec les plateformes
    this.physics.add.collider(groupeballe, rien, (laballe, laplateforme) => {
      laballe.destroy();
  });

  this.physics.add.collider(groupeballe, CalquedeTuiles, (laballe, laplateforme) => {
    laballe.destroy();
});

this.physics.add.collider(groupeballe, decor, (laballe, laplateforme) => {
  laballe.destroy();
});

    this.physics.add.collider(groupeballe, enemy2, (bullet, enemy2) => {
      bullet.destroy();
      enemy2.destroy();
      condition_switch++;
    });

    // Contact player
    this.physics.overlap(groupeballe, player, (bullet, player) => {
      this.physics.pause();
      musique_de_fond1.stop();
      musique_mort.play();
      var timerRestart = this.time.delayedCall(3000,
        () => {
          musique_mort.stop();
          this.scene.stop();
          this.scene.start();
        },
        null, this);
    });

    // Contact enemy 2
    this.physics.overlap(groupeballe, enemy2, (bullet, enemy2) => {
      bullet.destroy();
      enemy2.destroy();
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
      musique_de_fond1.stop();
      this.scene.stop();
      this.scene.switch("selection_map_2");
    }else if (condition_switch==10){
      musique_de_fond1.stop();
      this.scene.stop();
      this.scene.switch("selection_map_2");
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