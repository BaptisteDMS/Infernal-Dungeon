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
var armesol;
var lastFiredTime = 0;
var groupeballe;
var groupeenemy;


var vitesse_lent=0;
var vitesse_dash=0;
let image_sprint;
let weapon = null;
let weaponsGroup;

// enemy variable
var enemy;
var xCoord;
var yCoord;
var elem;
var obj;

  // enemy variable 2
  var enemy2;
  var xCoord2;
  var yCoord2;
  var elem2;
  var obj2;

  // enemy variable 3
  var enemy3;
  var xCoord3;
  var yCoord3;
  var elem3;
  var obj3;

function createEnemy() {
  xCoord = Math.random() * 800;
  yCoord = Math.random() * 600;
  obj = this.physics.add.sprite(xCoord, yCoord, "img_ene");
  obj.setCollideWorldBounds(true);
  this.physics.add.collider(obj, groupe_plateformes);
  this.physics.add.collider(obj, player, (enemy) => {
      enemy.destroy();
  });
  this.physics.add.collider(obj, enemy);
  
  enemy.add(obj);
}

function createEnemy2() {
  xCoord2 = Math.random() * 800;
  yCoord2 = Math.random() * 600;
  obj2 = this.physics.add.sprite(xCoord2, yCoord2, "Sprinter_rouge");
  obj2.setCollideWorldBounds(true);
  this.physics.add.collider(obj2, groupe_plateformes);
  this.physics.add.collider(obj2, player, (enemy2) => {
      enemy2.destroy();
  });
  this.physics.add.collider(obj2, enemy2);
  
  enemy2.add(obj2);
}
function createEnemy3() {
  let xCoord3 = Math.random() * 800;
  let yCoord3 = Math.random() * 600;
  let obj3 = this.physics.add.sprite(xCoord3, yCoord3, "fireball");
  obj3.setCollideWorldBounds(true);
  this.physics.add.collider(obj3, groupe_plateformes);
  this.physics.add.collider(obj3, player, (enemy3) => {
      enemy3.destroy();
  });
  obj3.setBounce(5);
  let speedX = Math.random() * 400 - 200; 
  let speedY = Math.random() * 400 - 200; 

  enemy3.setVelocity(speedX, speedY);
  

  
  enemy3.add(obj3);
}




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
    this.load.image("Personnage", "src/assets/Redi/LUIIII.png");
    this.load.image("Sprinter_bleu", "src/assets/bleu.png");
    this.load.image("Sprinter_rouge", "src/assets/rouge.png");
    this.load.image("img_ene", "src/assets/Redi/eyeball2.png");
    this.load.image("blasterbullet", "src/assets/Redi/blasterbullet.png")
    this.load.image("pistolbullet", "src/assets/Redi/pistolbullet.png")
  
    
    this.load.image("tire","src/assets/Redi/tire.jpg")
    this.load.image("cible", "src/assets/Redi/eyeball.png")

    //Arme
    this.load.image("blaster", "src/assets/armeSol/Pistolet_blaster_DH-17.jpg")
    this.load.image("ak", "src/assets/armeSol/1(3).png")
    this.load.image("pistolet", "src/assets/armeSol/1(4).png")
    this.load.image("shotgun", "src/assets/armeSol/1(2).png")
    this.load.image("lanceflamme", "src/assets/armeSol/1(1).png");
    
    
    
  }

  /***********************************************************************/
  /** FONCTION CREATE 
/***********************************************************************/

  create() {
    // Appel de la fonction doNothing et doAlsoNothing provenant du module fonctions.js
    fct.doNothing();
    fct.doAlsoNothing();
    groupeballe = this.physics.add.group();

    weaponsGroup = this.physics.add.group();

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
    //image_sprint = this.add.image(16, 16, "Sprinter_bleu");
    // Ajouter une image fixe en haut à gauche de l'écran
    let image_sprint = this.add.image(16, 16, "Sprinter_bleu").setOrigin(0, 0);


    // Creation arme
    armesol = this.physics.add.sprite(200,200,"lanceflamme");
    armesol.setCollideWorldBounds(true);

    // Création du joueur
    player = this.physics.add.sprite(100, 450, "Personnage");
    player.setCollideWorldBounds(true);
    player.gun= "Handgun";

    this.physics.add.collider(player,groupe_plateformes);

  
    this.physics.add.collider(player, armesol, () => {
      player.gun = "lanceflamme";
      armesol.destroy();    
  }); 
  this.physics.add.collider(player, weapon, () => {
    player.gun = "lanceflamme";
    weapon.destroy();    
}); 




    player.peutDash = true;

    /****************************
     *  CREATION DU MECHANT  *
     ****************************/

    enemy = this.physics.add.group();

    let n = 0;

    while (n < 5) {
        createEnemy.call(this); 
        
        n++;
    }

    /****************************
     *  CREATION DU MECHANT  *
     ****************************/

    enemy2 = this.physics.add.group();

    let b = 0;

    while (b < 5) {
        createEnemy2.call(this);
        
        b++;
    }

    enemy3 = this.physics.add.group();

    let c = 0;

    while (c < 5) {
        createEnemy3.call(this); 
        
        
        c++;
    }

   // Ajout de l'événement 'destroy' pour détecter la destruction d'un ennemi
// Ajout de l'événement 'destroy' pour détecter la destruction d'un ennemi
// Ajout de l'événement 'destroy' pour détecter la destruction d'un ennemi dans enemy
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
    lent= this.input.keyboard.addKey("C");
    sprint = this.input.keyboard.addKey("shift");
    interagir = this.input.keyboard.addKey("E");

  }
  
  

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

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

    elem2 = enemy2.getChildren();
    var b = elem2.length;
    let v = 0;
    while (v < b) {
        this.physics.moveTo(elem2[v], player.x-100, player.y-100, 200);
        v++;
    }

    elem3 = enemy3.getChildren();
    

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
        this.physics.add.collider(groupeballe, groupe_plateformes, (laballe) => {
            laballe.destroy();
        });
    });  
    this.physics.add.collider(groupeballe, enemy2, (bullet, enemy2) => {
      bullet.destroy();
      enemy2.destroy();
  });
  
  this.physics.add.collider(groupeballe, enemy3, (bullet, enemy3) => {
      bullet.destroy();
      enemy3.destroy();
  });
  


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
    if (Phaser.Input.Keyboard.JustDown(interagir) == true) {
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
        let diffX = this.input.mousePointer.worldX - player.x;
        let diffY = this.input.mousePointer.worldY - player.y;
        let distance = Math.sqrt(diffX * diffX + diffY * diffY);
        let coefdirX = diffX / distance;
        let coefdirY = diffY / distance;
        
        // Création de la balle à la position du joueur avec le bon nom d'arme
        let bullet = this.physics.add.sprite(player.x + 20 * coefdirX, player.y + 20 * coefdirY, nomArme);
        
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