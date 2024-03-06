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
var deco;
var CalquedeTuiles3;
var rien3;
var mur;
var decofinale;
var musique_de_fond9;
var groupeballe;
var groupeenemy;
let weaponsGroup;
let weapon = null;
var lastFiredTime = 0;
var groupe_plateformes;

// enemy variable boss
var boss;
var boss_vie;

export default class niveau5 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "niveau5" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
    preload(){
          //CHARGEMENT MUSIQUE
    this.load.audio("background9", "/src/assets/song/FreeBird.mp3");
        this.load.image("Phaser_JeuDeTuiles60", "src/assets/map_eglise/chateau.png");
        this.load.tilemapTiledJSON("carte5", "src/assets/map_eglise/eglise_finale.json");
          //CHARGEMENT DES MONSTRES
          this.load.image("boss", "src/assets/monstres/boss.png")
    }
    create() {
      groupeballe=this.physics.add.group();
      weaponsGroup=this.physics.add.group();
        musique_de_fond9 = this.sound.add("background9");
        musique_de_fond9.play();
        const carteDuNiveau = this.add.tilemap("carte5");
        const tileset = carteDuNiveau.addTilesetImage(
          "eglise",
          "Phaser_JeuDeTuiles60"
        ); 
        CalquedeTuiles3 = carteDuNiveau.createLayer(
          "CalquedeTuiles3",
          tileset
        );
        deco = carteDuNiveau.createLayer(
          "deco",
          tileset
        );
        mur = carteDuNiveau.createLayer(
          "mur",
          tileset
        );
        decofinale = carteDuNiveau.createLayer(
          "decofinale",
          tileset
        );
        rien3 = carteDuNiveau.createLayer(
          "rien3",
         tileset
        );




        CalquedeTuiles3.setCollisionByProperty({ estSolide: true });
        rien3.setCollisionByProperty({ estSolide: true });
        deco.setCollisionByProperty({ estSolide: true });
        decofinale.setCollisionByProperty({ estSolide: true });
        mur.setCollisionByProperty({ estSolide: true });


    
    
    
    
        // ajout d'un texte distintcif  du niveau
        this.add.text(500, 385, "Vous êtes dans le niveau 5", {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "22pt"
        });
    
    
        // Création du joueur
        player = this.physics.add.sprite(675, 515, "Personnage");
        player.setCollideWorldBounds(true);
        player.peutDash = true;
        player.gun = "ak";
    
    
    
        this.physics.world.setBounds(0, 0, 1280, 967.5);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 1280, 967.5);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(player);

        /****************************
       *  CREATION DU BOSS *
       ****************************/
      var xCoord5 = 670;
      var yCoord5 = 251;
      boss = this.physics.add.sprite(xCoord5, yCoord5, "boss");
      this.physics.add.collider(player,boss);
      this.physics.add.collider(groupeballe,boss);
      boss_vie=10;

      /****************************
     *  Event Boss *
     ****************************/

    var TimerBossAtt1= this.time.addEvent({
      delay: 3000, // ms
      callback: function () {
          let bullet;
            if (boss.x <= player.x) {
                bullet = this.physics.add.sprite(boss.x+35, boss.y, "fireball");
            } else {
                bullet = this.physics.add.sprite(boss.x-35, boss.y, "fireball");
            }
          groupeballe.add(bullet);
          this.physics.moveTo(bullet, player.x, player.y, 300);
        },
      args: [],
      callbackScope: this,
      repeat: -1
    }); 


    var TimerBossAtt2= this.time.addEvent({
      delay: 3200, // ms
      callback: function () {
          let bullet;
            if (boss.x <= player.x) {
                bullet = this.physics.add.sprite(boss.x+35, boss.y, "fireball");
            } else {
                bullet = this.physics.add.sprite(boss.x-35, boss.y, "fireball");
            }
          groupeballe.add(bullet);
          this.physics.moveTo(bullet, player.x, player.y, 300);
        },
      args: [],
      callbackScope: this,
      repeat: -1
    }); 

    var TimerBossAtt3= this.time.addEvent({
      delay: 3400, // ms
      callback: function () {
          let bullet;
            if (boss.x <= player.x) {
                bullet = this.physics.add.sprite(boss.x+35, boss.y, "fireball");
            } else {
                bullet = this.physics.add.sprite(boss.x-35, boss.y, "fireball");
            }
          groupeballe.add(bullet);
          this.physics.moveTo(bullet, player.x, player.y, 300);
        },
      args: [],
      callbackScope: this,
      repeat: -1
    }); 

    var TimerBossAttLeger= this.time.addEvent({
      delay: 8000 , // ms
      callback: function () {
        let randomValue = Math.random();
        let randomBinary = Math.round(randomValue);
        var coefdir=1;
        if (randomBinary==0){
          coefdir=1;
        }else{
          coefdir=-1;
        }

        let bullet1 = this.physics.add.sprite(boss.x+(50*coefdir), boss.y+100, "fireball");
        let bullet2 = this.physics.add.sprite(boss.x+(50*coefdir), boss.y+50, "fireball");
        let bullet3 = this.physics.add.sprite(boss.x+(50*coefdir), boss.y-50, "fireball");
        let bullet4 = this.physics.add.sprite(boss.x+(50*coefdir), boss.y-100, "fireball");
        
        groupeballe.add(bullet1);
        groupeballe.add(bullet2);
        groupeballe.add(bullet3);
        groupeballe.add(bullet4);
        
        this.physics.moveTo(bullet1, player.x, player.y, 100);
        this.physics.moveTo(bullet2, player.x, player.y, 100);
        this.physics.moveTo(bullet3, player.x, player.y, 100);
        this.physics.moveTo(bullet4, player.x, player.y, 100);
        // Gestion des collisions de la balle avec les plateformes
        this.physics.add.collider(groupeballe, groupe_plateformes, (laballe, laplateforme) => {
          laballe.destroy();
      });
      // Gestion des collisions de la balle avec les plateformes
      this.physics.add.collider(groupeballe, decofinale, (laballe, laplateforme) => {
        laballe.destroy();
    });
    // Gestion des collisions de la balle avec les plateformes
    this.physics.add.collider(groupeballe, CalquedeTuiles3, (laballe, laplateforme) => {
      laballe.destroy();
  });
  // Gestion des collisions de la balle avec les plateformes
  this.physics.add.collider(groupeballe, rien3, (laballe, laplateforme) => {
    laballe.destroy();
});
// Gestion des collisions de la balle avec les plateformes
this.physics.add.collider(groupeballe, mur, (laballe, laplateforme) => {
  laballe.destroy();
});
// Gestion des collisions de la balle avec les plateformes
this.physics.add.collider(groupeballe, deco, (laballe, laplateforme) => {
  laballe.destroy();
});
        },
      args: [],
      callbackScope: this,
      repeat: -1
    }); 


    var TimerBossBoule = this.time.addEvent({
      delay: 10000, // ms
      callback: function () {
        let bullet1 = this.physics.add.sprite(boss.x+50, boss.y, "fireball");
        let bullet2 = this.physics.add.sprite(boss.x-50, boss.y, "fireball");
        let bullet3 = this.physics.add.sprite(boss.x, boss.y+50, "fireball");
        let bullet4 = this.physics.add.sprite(boss.x, boss.y-50, "fireball");
        let bullet5 = this.physics.add.sprite(boss.x+50, boss.y+50, "fireball");
        let bullet6 = this.physics.add.sprite(boss.x-50, boss.y+50, "fireball");
        let bullet7 = this.physics.add.sprite(boss.x-50, boss.y-50, "fireball");
        let bullet8 = this.physics.add.sprite(boss.x+50, boss.y-50, "fireball");

        groupeballe.add(bullet1);
        groupeballe.add(bullet2);
        groupeballe.add(bullet3);
        groupeballe.add(bullet4);
        groupeballe.add(bullet5);
        groupeballe.add(bullet6);
        groupeballe.add(bullet7);
        groupeballe.add(bullet8);

        bullet1.setVelocityX(200);
        bullet2.setVelocityX(-200);
        bullet3.setVelocityY(200);
        bullet4.setVelocityY(-200);

        bullet5.setVelocityX(200);
        bullet5.setVelocityY(200);
        bullet6.setVelocityX(-200);
        bullet6.setVelocityY(200);
        bullet7.setVelocityY(-200);
        bullet7.setVelocityX(-200);
        bullet8.setVelocityY(-200);  
        bullet8.setVelocityX(200);

        // Gestion des collisions de la balle avec les plateformes
        this.physics.add.collider(groupeballe, groupe_plateformes, (laballe, laplateforme) => {
          laballe.destroy();
      });
      // Gestion des collisions de la balle avec les plateformes
      this.physics.add.collider(groupeballe, decofinale, (laballe, laplateforme) => {
        laballe.destroy();
    });
    // Gestion des collisions de la balle avec les plateformes
    this.physics.add.collider(groupeballe, CalquedeTuiles3, (laballe, laplateforme) => {
      laballe.destroy();
  });
  // Gestion des collisions de la balle avec les plateformes
  this.physics.add.collider(groupeballe, rien3, (laballe, laplateforme) => {
    laballe.destroy();
});
// Gestion des collisions de la balle avec les plateformes
this.physics.add.collider(groupeballe, mur, (laballe, laplateforme) => {
  laballe.destroy();
});
// Gestion des collisions de la balle avec les plateformes
this.physics.add.collider(groupeballe, deco, (laballe, laplateforme) => {
  laballe.destroy();
});
      },
      args: [],
      callbackScope: this,
      repeat: -1
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

    
        this.physics.add.collider(player, decofinale); 
        this.physics.add.collider(player, CalquedeTuiles3); 
        this.physics.add.collider(player, rien3); 
        this.physics.add.collider(player, mur); 
        this.physics.add.collider(player, deco); 
      }
    
      update() {

        // Mouvement boss
        this.physics.moveTo(boss, 670, 251, 20);

        this.physics.overlap(boss, groupeballe, (boss, bullet) => {
          bullet.destroy();
          boss_vie--;
          if(boss_vie==0){
            this.scene.stop();
            this.scene.switch("Menu_fin_Victoire");
          }
        });

        // Gestion des collisions de la balle avec les plateformes
    this.physics.add.collider(groupeballe, decofinale, (laballe, laplateforme) => {
      laballe.destroy();
  });

  this.physics.add.collider(groupeballe, CalquedeTuiles3, (laballe, laplateforme) => {
    laballe.destroy();
});

this.physics.add.collider(groupeballe, rien3, (laballe, laplateforme) => {
  laballe.destroy();
});

this.physics.add.collider(groupeballe, mur, (laballe, laplateforme) => {
  laballe.destroy();
});

this.physics.add.collider(groupeballe, deco, (laballe, laplateforme) => {
  laballe.destroy();
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
      musique_de_fond9.stop();
      this.scene.switch("Menu_fin_Victoire");
      musique_de_fond9.stop();
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
