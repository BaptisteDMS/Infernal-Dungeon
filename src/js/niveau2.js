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
var Fond;
var Bords;
var sol;
var Falaise;
var Ponts;
var Rien;
var changement;
var musique_de_fond3;
var groupeballe;
var groupeenemy;
let weaponsGroup;
let weapon = null;
var lastFiredTime = 0;
var groupe_plateformes;
var xCor;
var yCor;

// enemy variable 3
var enemy3;
var xCoord3;
var yCoord3;
var elem3;
var obj3;

function createEnemy3(Xcor,Ycor) {
  let xCoord3 = Xcor;
  let yCoord3 = Ycor;
  let obj3 = this.physics.add.sprite(xCoord3, yCoord3, "slime");
  enemy3.add(obj3);

  obj3.setCollideWorldBounds(true);
  this.physics.add.collider(obj3, Rien);
  this.physics.add.collider(obj3, Ponts);
  this.physics.add.collider(obj3, Falaise);
  this.physics.add.collider(obj3, sol);
  this.physics.add.collider(obj3, Bords);
  this.physics.add.collider(obj3, Fond);
  this.physics.add.collider(obj3, groupe_plateformes);
  this.physics.add.collider(obj3, player, (obj3, player) => {
    this.physics.pause();
    var timerRestart = this.time.delayedCall(3000,
      () => {
        this.scene.stop();
        this.scene.start();
      },
      null, this);    
  });
  obj3.setBounce(1);
  let speedX = Math.random() * 800 - 300; 
  let speedY = Math.random() * 800 - 300; 

  obj3.setVelocity(speedX, speedY); 
} 




   // Crée 3 ennemis avec les coordonnées spécifiées


// Exemple d'utilisation :



  


export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {

    //CHARGEMENT MUSIQUE
    this.load.audio("background3", "/src/assets/song/PAYDAY.mp3"); 
    this.load.image("Phaser_JeuDeTuiles12", "src/assets/donjon_lave/tuilesJeu.png");
    this.load.image("Phaser_JeuDeTuiles13", "src/assets/donjon_lave/ProjectUtumno_full.png");
    this.load.tilemapTiledJSON("carte2", "src/assets/donjon_lave/donjon_lave_4.json"); 
    this.load.image("Personnage", "src/assets/Redi/LUIIII.png");
    this.load.image("Sprinter_rouge", "src/assets/rouge.png");
    this.load.image("bullet", "src/assets/projectile5.png"); // Chargement de l'image de la balle
    this.load.image("fireball", "src/assets/fireball.png");

    //CHARGEMENT MONSTRES
    this.load.image("slime", "src/assets/monstres/Slime.png")
  }

  create() {
    
    groupeballe=this.physics.add.group();
    weaponsGroup=this.physics.add.group();
    musique_de_fond3 = this.sound.add("background3");
    musique_de_fond3.play();
    const carteDuNiveau = this.add.tilemap("carte2");
    const tileset1 = carteDuNiveau.addTilesetImage(
      "tuilesJeu",
      "Phaser_JeuDeTuiles12"
    ); 
    const tileset2 = carteDuNiveau.addTilesetImage(
      "ProjectUtumno_full",
      "Phaser_JeuDeTuiles13"
    ); 
    Fond = carteDuNiveau.createLayer(
      "Fond",
      [tileset1,
        tileset2]
    );
    Bords = carteDuNiveau.createLayer(
      "Bords",
      [tileset1,
      tileset2]
    );
    sol = carteDuNiveau.createLayer(
      "sol",
      [tileset1,
        tileset2]
    );
    Falaise = carteDuNiveau.createLayer(
      "Falaise",
      [tileset1,
        tileset2]
    );
    Ponts = carteDuNiveau.createLayer(
      "Ponts",
      [tileset1,
        tileset2]
    );
    Rien= carteDuNiveau.createLayer(
      "Rien",
      [tileset1,
        tileset2]
    );
    Fond.setCollisionByProperty({ estSolide: true });
    Rien.setCollisionByProperty({ estSolide: true });
    Falaise.setCollisionByProperty({ estSolide: true });
    sol.setCollisionByProperty({ estSolide: true });
    Bords.setCollisionByProperty({ estSolide: true });
    Ponts.setCollisionByProperty({ estSolide: true });

    // ajout d'un texte distintcif  du niveau
    this.add.text(550, 316.25, "Vous êtes dans le niveau 2", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    // Création du joueur
    player = this.physics.add.sprite(690, 400, "Personnage");
    player.setBounce(0.2);
    //player.setCollideWorldBounds(true);
    player.peutDash = true;
    player.gun = "Handgun";



    this.physics.world.setBounds(0, 0, 1280, 967.5);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 1280, 967.5);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);


    // Creation mechant
    
    
    enemy3 = this.physics.add.group();

    

    createEnemy3.call(this, 420, 350); // Premier ennemi aux coordonnées (100, 200)
createEnemy3.call(this, 920, 434); // Deuxième ennemi aux coordonnées (300, 400)
createEnemy3.call(this, 960, 360); // Troisième ennemi aux coordonnées (500, 600)
createEnemy3.call(this, 582, 732); // Quatrième ennemi aux coordonnées (700, 800)
createEnemy3.call(this, 700, 640);
createEnemy3.call(this, 460, 290);


    

    // Ajout de l'événement 'destroy' pour détecter la destruction d'un ennemi dans enemy3
enemy3.children.iterate(enemy3 => {
  enemy3.on('destroy', () => {
      // Générer un nombre aléatoire entre 0 (inclus) et 6 (exclus)
      var proba = Math.floor(Math.random() * 2);
      if (proba === 0) { // Vérifier si le nombre est égal à 0
          // Spawn d'une arme à la position de l'ennemi
          let randomWeaponKey = Phaser.Math.RND.pick(['ak', 'shotgun', 'pistolet', 'blaster', 'lanceflamme']);
          let weapon = this.physics.add.sprite(enemy3.x, enemy3.y, randomWeaponKey);
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

//let xCoordinates = [100, 200, 300]; // Coordonnées x de chaque ennemi
  //let yCoordinates = [50, 150, 250]; // Coordonnées y de chaque ennemi
  //createEnemy3.call(this, 1, -288, 163);
  //enemy3 = this.physics.add.group();
    
    // Création des ennemis après l'initialisation du groupe
    //let xCoordinates = [-288]; // Coordonnées x de chaque ennemi
    //let yCoordinates = [163]; // Coordonnées y de chaque ennemi
    //createEnemy3.call(this, 1, xCoordinates, yCoordinates);
  


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
   changement = this.input.keyboard.addKey("L");


    this.physics.add.collider(player, Ponts); 
    this.physics.add.collider(player, Bords); 
    this.physics.add.collider(player, sol); 
    this.physics.add.collider(player, Falaise);
    this.physics.add.collider(player, Fond);
    
  }

  update() {

     // Gestion des collisions de la balle avec les plateformes
     this.physics.add.collider(groupeballe, Ponts, (laballe, laplateforme) => {
      laballe.destroy();
  });

  this.physics.add.collider(groupeballe, Bords, (laballe, laplateforme) => {
    laballe.destroy();
});

this.physics.add.collider(groupeballe, sol, (laballe, laplateforme) => {
  laballe.destroy();
});

this.physics.add.collider(groupeballe, Falaise, (laballe, laplateforme) => {
  laballe.destroy();
});

this.physics.add.collider(groupeballe, Fond, (laballe, laplateforme) => {
  laballe.destroy();
});

this.physics.add.collider(groupeballe, enemy3, (bullet, enemy3) => {
  bullet.destroy();
  enemy3.destroy();
});



// Contact player
this.physics.overlap(groupeballe, player, (bullet, player) => {
  this.physics.pause();
  musique_de_fond3.stop();

  var timerRestart = this.time.delayedCall(3000,
    () => {
      this.scene.stop();
      this.scene.start();
    },
    null, this);
});

// Contact enemy 3
this.physics.overlap(groupeballe, enemy3, (bullet, enemy3) => {
  bullet.destroy();
  enemy3.destroy();
});

// Passage aux niveaux suivants selon la porte touchée
if (Phaser.Input.Keyboard.JustDown(changement)) {
  musique_de_fond3.stop();
  this.scene.switch("selection_map_3");
  musique_de_fond3.stop();
}



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



  // Calcul de la direction entre le joueur et la position de la souris
  this.input.mousePointer.updateWorldPoint(this.cameras.main);

  let diffX = this.input.mousePointer.worldX - player.x;
  let diffY = this.input.mousePointer.worldY - player.y;
  //console.log(diffX);
  //console.log(diffY);
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
