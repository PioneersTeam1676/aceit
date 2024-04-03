// typescript is working
// it seems the issue is that the script is being loaded before the page
// now not loading correct file path





    // let num:number = 1;
    // let str: string = 'asdfamhmNONONONOhmhm ';
    // console.log('PLEASE ädjkł '+str);
    import * as THREE from 'three';

    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
    import { load as cardLoad } from '../../../utils.js'


//     import { onMount } from 'svelte';
// onMount(async () => {
document.addEventListener("DOMContentLoaded", function() {
    // IMPORTS

    /*
      THOMAS THE CARDS ARE HERE OKAY
      ┌( ͝° ͜ʖ͡°)=ε/̵͇̿̿/’̿’̿ ̿    (⌐■_■)︻╦╤─ (╥﹏╥)
    */

    // const bossBattleLoad = (deck: any) => {

    //   let cards = [];

    //   for(let i = 0; i < deck.cards.length; i++) {

    //     let oldCard = deck.card[i];

    //     let newCard = {
    //       term: oldCard.term,
    //       definition: oldCard.definition
    //     }

    //     cards.push(newCard);

    //   }

    //   return cards;

    // }

    // let quizlet_cards = cardLoad(bossBattleLoad);

    let quizlet_cards = [
      {'term': 'Faire des châteaux de sable', 'definition': 'To make sandcastles'},
      {'term': 'Jouer à la poupée', 'definition': 'To play with dolls'},
      {'term': 'Sauter à la corde', 'definition': 'Jumprope'},
      {'term': 'Faire du manège', 'definition': 'To ride rides at the fair'},
      {'term': 'Jouer à chat perché', 'definition': 'To play tag'},
      {'term': 'Faire de la balançoire', 'definition': 'To go on the swings'},
      {'term': 'Jouer à la marelle', 'definition': 'To play hopscotch'},
      {'term': 'Jouer au train électrique', 'definition': 'To play with an electric train'},
      {'term': 'Jouer au ballon', 'definition': 'To play ball'},
      {'term': 'Grimper aux arbres', 'definition': 'To climb trees'},
      {'term': 'Jouer aux dames', 'definition': 'To play checkers'},
      {'term': 'Jouer aux petits voitures', 'definition': 'To play with cars'},
      {'term': 'Aller au cirque', 'definition': 'To go to the circus'},
      {'term': 'Faire des farces', 'definition': 'To play pranks'},
      {'term': 'Regarder des dessins animés', 'definition': 'To watch cartoons'},
      {'term': 'Collectionner des timbres', 'definition': 'To collect stamps'},
      {'term': 'Jouer aux billes', 'definition': 'To play marbles'},
      {'term': 'Faire de la bascule', 'definition': 'To go on the see-saw'},
      {'term': 'Sauter sur un trampoline', 'definition': 'To jump on the trampoline'},
      {'term': 'Jouer dans le parc', 'definition': 'To play in the park'},
      {'term': 'Jouer à faire semblant', 'definition': 'To play pretend'}
    ];

    let entities: Entity[] = [];
    let waitList: Entity[] = [];
    let cards: Card[] = [];


    let playerColor: number = 0x00ffff;
    let textColor: number = 0x0000ff;
    let enemyColor: number = 0xddffdd;
    let enemyShootColor: number = 0xff0000;

    let show_shoot: number = 3;// seconds
    let min_show: number = 0.5;// seconds
    let diff_scale: number = 0.1;// lowers in seconds

    let difficulty = 'easy';

    let spawnCount: number;

    if (difficulty == 'easy') {
      spawnCount = Math.min(quizlet_cards.length, 6);
    } else if (difficulty == 'medium') {
      spawnCount = Math.min(quizlet_cards.length, 8);
    } else if (difficulty == 'hard') {
      spawnCount = Math.min(quizlet_cards.length, 10);
    }

    let shouldNewLevel : boolean = false;
    let shouldUpdateWaitList: boolean = false;

    let orbit: boolean = false;
    let mixer: THREE.AnimationMixer;
    let clock: THREE.Clock = new THREE.Clock();
    let gltf;// toad model
    let background = {
      model : null,
      mixer : null,
      animations : null
    }

    // loading
    const loadCount = 2;
    let loaded = 0;



    let useNewModels:boolean = false;
    let gameEnded:boolean = false;


    // TYPES

    interface Entity {
      text: string;
      isTerm: boolean;
      textMesh: THREE.Mesh;
      modelMesh: THREE.Mesh;
      platformMesh: THREE.Mesh;
      maxCooldown?: number;
      cooldown?: number;
      damage: number;
      mixer: THREE.AnimationMixer;
      animations: any;
      dead: boolean;
    }
    const empty_entity: Entity = {text: '', isTerm: false, textMesh: null, modelMesh: null, platformMesh: null, /*maxCooldown: 0, cooldown: 0,*/ damage: 0, mixer: null, animations: null, dead: false};



    interface Card {
      text: string;
      isTerm: boolean;
      connection: Entity;
    }
    const empty_card: Card = {text: '', isTerm: false, connection: empty_entity};



    interface Position {
      x: number;
      y: number;
      z: number;
    }


    // RANDOM

    // lives
    let lives:number;

    function setLives(num:number) {
      lives = num;
      // temporary shield system as well
      if (!gameEnded)
        if (document.getElementById("boss-battle-lives"))
          document.getElementById("boss-battle-lives").textContent = "Time Left: " + Math.floor(lives) + " seconds";
    }


    // stage
    let stage:number;

    function setStage(num:number) {
      stage = num;
      if (document.getElementById("boss-battle-stage"))
        document.getElementById("boss-battle-stage").textContent = "Correct Guesses: " + stage;
    }





    // THREEJS IMPORTS
    // import './style.css';


    // import  { width } from './App.svelte';
    // import  { height } from './App.svelte';
    // let width:number = window.innerWidth;
    // let height:number = window.innerHeight;
    let widthScalar:number = 1;
    let heightScalar:number = 0.887;
    let width: number = window.innerWidth * widthScalar;
    let height: number = window.innerHeight * heightScalar;
    let paused:boolean = true;
    let started:boolean = false;
    // import  { paused } from './App.svelte';
    // import  { started } from './App.svelte';
    // import { empty } from 'svelte/internal';

    // THREEJS SETUP

  //   import { onMount } from 'svelte';
  // onMount(async () => {

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 10_000 );

    let renderer;
    if (document.querySelector("#bg"))
    {
      renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
      });
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( width*widthScalar , height*heightScalar );
    }








    function load()
    {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('./assets/media/aceit/'+((useNewModels) ? 'toad.glb' : 'oldToad.glb'), (gltf2) => {

        gltf = gltf2;

        loaded++;


      });

      gltfLoader.load('./assets/media/aceit/scenery.glb', (gltf2) => {

        gltf2.scene.scale.set(500, 500, 500);
        gltf2.scene.position.set(0, -100, 0);
        gltf2.scene.rotation.set(0, Math.PI/2, 0);

        background.model = gltf2.scene;
        background.mixer = new THREE.AnimationMixer(gltf2.scene);
        background.animations = gltf2.animations;
        background.mixer.clipAction(gltf2.animations[0]).play();

        loaded++;

      });
    }

    load();

    // camera.position.setZ(30);

    // SCENE OBJECTS

    //create entities
    // for (let i = 0; i < entities.length; i++) {

    //   const loader = new FontLoader();

    //   loader.load('src/font.json', function (font) {
    //       const geometry = new TextGeometry(entities[i].text, {
    //           font: font,
    //           size: 5,
    //           height: 0.1, //thickness
    //           curveSegments: 10,
    //           bevelEnabled: false,
    //           bevelOffset: 0,
    //           bevelSegments: 1,
    //           bevelSize: 0.3,
    //           bevelThickness: 1
    //       });

    //       let material = new THREE.MeshBasicMaterial({
    //         color: 0x00ff00
    //       });

    //       let txt = new THREE.Mesh(geometry, material);

    //       txt.position.set(0, i*5, 0);

    //       entities[i].mesh = txt;

    //       scene.add(txt);


    //   });

    // }



    // const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
    // pointLight.position.set(5, 5, 5);

    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // scene.add(lightHelper);

    // const ambientLight = new THREE.AmbientLight(0xffffff);
    // scene.add(pointLight, ambientLight);

    let controls;
    if (orbit)
      controls = new OrbitControls(camera, renderer.domElement);


    // function addStar() {
    //   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    //   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    //   const star = new THREE.Mesh(geometry, material);

    //   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    //   star.position.set(x, y, z);
    //   scene.add(star);
    // }

    // Array(200).fill().forEach(addStar);




    window.addEventListener( 'resize', onWindowResize, false );

    animate();

  // });

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      if (started)
        renderer.setSize( (window.innerWidth*widthScalar), (window.innerHeight*heightScalar) );

    }

    // ON SCROLL
    function moveCamera() {

      // scroll amount
      const t = document.body.getBoundingClientRect().top;


      // camera.position.z = t * -0.01;
      // camera.position.x = t * -0.0002;
      // camera.position.y = t * -0.0002;

    }

    document.body.onscroll = moveCamera;
    moveCamera();

    // ON FRAME
    function animate() {

      requestAnimationFrame( animate );

      // console.log("animating");
      if (loaded == loadCount) {
        paused = false;
        // console.log("almost started");
        if (started)
        {
          //on game start
          // console.log("started");
          scene = new THREE.Scene();

          camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 10_000 );

          renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg'),
          });
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setSize( width*widthScalar , height*heightScalar );

          load();
          setLives(100);
          setStage(0);
          newLevel();

          loaded = -1;
        }

      }

      if (document.getElementById("game-area"))
        started = document.getElementById("game-area").classList.contains("started");

      if (!paused && started)
      {

        if (orbit)
          controls.update();

        let delta = clock.getDelta();


        //------------------

        // entity shooting
        // for (let i = 0; i < entities.length; i++) {

        //   let show_color_time: number = show_shoot-(diff_scale*stage) > min_show ? show_shoot-(diff_scale*stage) : min_show;
        //     if (entities[i] != null && entities[i] != empty_entity && entities[i].modelMesh != null) {
        //       if (entities[i].cooldown > 0) {
        //         // TODO: lower the cooldown by the time that passed between frames
        //         if (entities[i].cooldown < show_color_time) {
        //           // entities[i].modelMesh.material.color.setHex(enemyShootColor);
        //         }
        //         else
        //         {
        //           // entities[i].modelMesh.material.color.setHex(enemyColor);
        //         }
        //         entities[i].cooldown-=delta;
        //       }
        //       else
        //       {
        //         setLives(lives-entities[i].damage);
        //         entities[i].cooldown = entities[i].maxCooldown;
        //       }
        //     }

        // }

        setLives(lives-delta);

        setStage(stage);


        if (lives <= 0)
        {
          setLives(0);
          gameEnded = true;
          if (document.getElementById("bg"))//on first game end frame
          {
            document.getElementById("bg").remove();
            document.getElementById("boss-battle-stage").remove();
            document.getElementById("boss-battle-lives").remove();

            for (let i = 0; i < 8; i++)
            {
              document.getElementById(""+i).remove();
            }

            //add score elements
            let scoreDiv = document.createElement("div");
            scoreDiv.classList.add("aceit-win-screen");

            let score = document.createElement("h1");
            score.textContent = ("Final Score: "+stage);
            scoreDiv.appendChild(score);

            let resetA = document.createElement("a");
            resetA.href = "javascript:document.location.reload();";
            let reset = document.createElement("button");
            reset.textContent = "Play Again";
            resetA.appendChild(reset);
            scoreDiv.appendChild(resetA);

            document.getElementById("game-area").appendChild(scoreDiv);
          }
        }



        if (shouldNewLevel)
        {
          shouldNewLevel = false;
          newLevel();
          return;
        }

        if (shouldUpdateWaitList)
        {
          shouldUpdateWaitList = false;
          updateWaitList();
          return;
        }




        // if ( mixer ) mixer.update( delta );

        //animations
        for (let i = 0; i < entities.length; i++) {
          if (entities[i].mixer) entities[i].mixer.update(delta);
          // else console.log("why dis no here "+entities[i].mixer);
        }
        for (let i = 0; i < waitList.length; i++) {
          if (waitList[i].mixer) waitList[i].mixer.update(delta);
          // else console.log("why dis no here either "+waitList[i].mixer);
        }

        if (background.mixer) background.mixer.update(delta);



        //------------------

        renderer.render( scene, camera );
      }//end if not paused and started

    }


    //on space bar click
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Space') {
        newLevel();
      }
    });


    // HELPER FUNCTIONS

    function getDefinition(term:string):string {
      // loop through cards and find the card with the term that matches the term passed in
      for (let i = 0; i < quizlet_cards.length; i++) {
        if (quizlet_cards[i].term === term) {
          return quizlet_cards[i].definition;
        }
      }
    }

    function getTerm(definition:string):string {
      // loop through cards and find the card with the definition that matches the definition passed in
      for (let i = 0; i < quizlet_cards.length; i++) {
        if (quizlet_cards[i].definition === definition) {
          return quizlet_cards[i].term;
        }
      }
    }

    function getEntityIndex(ent:Entity):number {
      for (let i = 0; i < entities.length; i++) {
        if (entities[i] === ent) {
          return i;
        }
      }
    }

    function removeEntity(ent:Entity) {
      if (ent === empty_entity || ent.textMesh == null || ent.modelMesh == null) {console.log("gone with the wind ahahhahaha");return;}
      // entities[entity_index].modelMesh.parent.remove(entities[entity_index].modelMesh);
      let entity_index:number = getEntityIndex(ent);
      // playDeathAnimation(entities[entity_index]);
      playDeathAnimation(ent);
      entities[entity_index] = empty_entity;
    }

    function clearScene() {

      // for (let i = 0; i < cards.length; i++) {
      //   if (cards[i].connection != empty_entity) {
      //     removeEntity(cards[i].connection);
      //   }
      // }

      // while(scene.children.length > 0){
      //   scene.remove(scene.children[0]);
      // }

      scene.remove.apply(scene, scene.children);

      cards = [];
      entities = [];
      waitList = [];

    }

    function newLevel() {

      // stage++;
      clearScene();
      createHelpers();
      createPlayer();
      setUpRightCardsAndEntities();
      setUpWrongCards();
      setUpWaitList();
      setUpButtons();
      createLevel();




    }

    function createHelpers() {
      // const gridHelper = new THREE.GridHelper(200, 50);
      // scene.add(gridHelper);


      // lights
      const ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 1, 0);
      scene.add(directionalLight);
      // add a target
      const targetObject = new THREE.Object3D();
      targetObject.position.set(0, 0, 0);
      scene.add(targetObject);



      // background model
      scene.add(background.model);


      // scene.add(gltf.scene);


    }

    //call onClick when the screen is clicked
    // document.addEventListener( 'click', animateOnClick, false );

    //ANIMATIONS FUCK ME IN THE ASS AHAHHAHAHHAHAHHAHAA
    function playIntroAnimation(ent:Entity)
    {
      if (ent === null || ent.animations === null)
      {
        // console.log('returned my vvv')
        return;
      }

      ent.mixer = new THREE.AnimationMixer( ent.modelMesh );

      // console.log(ent.animations.length);
      // console.log(ent.mixer);

      for (let i = 0; i < ent.animations.length; i++) {
        let nclip = THREE.AnimationUtils.subclip( ent.animations[i], 'Intro', 0, 300, 30);
        let action = ent.mixer.clipAction( nclip )

        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
        // console.log('MIXING IT UP!!!!!WOWOWOWA');
        // console.log(action);

      }


    }
    function playDeathAnimation(ent:Entity)
    {
      if (ent === null || ent.animations === null)
      {
        console.log("still gone");
        return;
      }

      ent.mixer = new THREE.AnimationMixer( ent.modelMesh );
      // console.log(ent.modelMesh.skeleton);
      for (let i = 0; i < ent.animations.length; i++) {
        let nclip = THREE.AnimationUtils.subclip( ent.animations[i], 'Death', 320, 1000, 30);
        let action = ent.mixer.clipAction( nclip )

        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
      }


    }

    function playShootAnimation(ent:Entity)
    {
      if (ent === null || ent.animations === null)
      {
        // console.log("still gone");
        return;
      }

      ent.mixer = new THREE.AnimationMixer( ent.modelMesh );

      for (let i = 0; i < ent.animations.length; i++) {
        let nclip = THREE.AnimationUtils.subclip( ent.animations[i], 'Intro', 0, 100, 30);
        let action = ent.mixer.clipAction( nclip )

        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
      }


    }


    //Click
    function animateOnClick() {

      // playIntroAnimation(gltf);

      // mixer = new THREE.AnimationMixer( gltf.scene );
      // let action;
      // for (let i = 0; i < gltf.animations.length; i++) {
      //   let nclip = THREE.AnimationUtils.subclip( gltf.animations[ i ], 'Action', 0, 100, 30 );
      //   action = mixer.clipAction( nclip );
      //   //clip the action by using animationutils.subclip
      //   // action = THREE.AnimationUtils.subclip( action, 'Action', 0, 100, 30 );

      //   // action.setDuration(1);
      //   action.setLoop( THREE.LoopOnce );
      //   action.play();
      // }
      // console.log(gltf.animations.length);

      for (let i = 0; i < entities.length; i++) {
        playDeathAnimation(entities[i])
      }
      for (let i = 0; i < waitList.length; i++) {
        playIntroAnimation(waitList[i])
      }
    }

    function createPlayer() {
      // make a cube
      // const geometry = new THREE.BoxGeometry(100, 25, 50);
      // const material = new THREE.MeshBasicMaterial({ color: playerColor });
      // const cube = new THREE.Mesh(geometry, material);
      // cube.position.set(0, 50, 150);
      camera.position.set(0, 95, 160);
      camera.rotation.set(Math.PI/-6, 0, 0);
      // scene.add(cube);
    }

    function createLevel() {

      // let platformdimensions = [5*(13-spawnCount), 5*(13-spawnCount), 5*(13-spawnCount)];
      let platformdimensions;
      let textSize;
      let textHeight;
      let textLeft;
      let textInsert;
      let textLength;
      switch (difficulty) {
        case "easy":
          platformdimensions = [50, 50, 50];
          textSize = 5;
          textHeight = 19;
          textLeft = 1.3;
          textInsert = 21;
          textLength = 17;
          break;
        case "medium":
          platformdimensions = [35, 35, 35];
          textSize = 3.5;
          textHeight = 29;
          textLeft = 1.3;
          textInsert = 15;
          textLength = 17;
          break;
        case "hard":
          platformdimensions = [25, 25, 25];
          textSize = 2.5;
          textHeight = 34;
          textLeft = 1.2;
          textInsert = 11;
          textLength = 17;
          break;
        default:
          platformdimensions = [50, 50, 50];
          textSize = 5;
          textHeight = 19;
          textLeft = 1.3;
          textInsert = 21;
          textLength = 17;
          break;
      }
      let levels:number[][] = [];

      // console.log("platforms: ");
      for (let i = 0; i < spawnCount; i++) {

        let isFound:boolean = false;
        let list: number[] = [];
        let count = 0;
        do {
          isFound = false;
          list = Array(3).fill(0).map(() => Math.floor(THREE.MathUtils.randFloatSpread(100)));
          list[0] *= 2.5;
          list[1] = list[1] < 0 ? 0 : list[1]*1.5;//keep y above 0
          list[2] = 50-(list[1]*3);               //change z based off of y

          //check if a platform (sized with platformdimensions) with the position created in list, would intersect with any other platforms already created in levels
          for (let j = 0; j < levels.length; j++) {
            if (list[0] + platformdimensions[0] > levels[j][0] && list[0] < levels[j][0] + platformdimensions[0] &&
                list[1] + platformdimensions[1] > levels[j][1] && list[1] < levels[j][1] + platformdimensions[1] &&
                list[2] + platformdimensions[2] > levels[j][2] && list[2] < levels[j][2] + platformdimensions[2]) {
              isFound = true;
              break;
            }
          }
          count++;
          if (count > 1000){
            createLevel();
            return;
          }
        }while (isFound);

        levels.push(list);

        let ent: Entity = i < 4  ? entities[i] : waitList[i-4];

        const loader = new FontLoader();

        loader.load('./assets/media/aceit/font.json', function (font) {
          const geometry = new TextGeometry((ent.text.length > textLength ? ent.text.substring(0, textLength)+"...": ent.text), {
              font: font,
              size: textSize,
              height: 0.1, //thickness
              curveSegments: 10,
              bevelEnabled: false,
              bevelOffset: 0,
              bevelSegments: 1,
              bevelSize: 0.3,
              bevelThickness: 1
          });

          let material = new THREE.MeshBasicMaterial({
            color: textColor
          });

          let txt = new THREE.Mesh(geometry, material);

          txt.position.set(levels[i][0], levels[i][1]+textHeight, levels[i][2]);

          txt.lookAt(camera.position.x, txt.position.y, camera.position.z);

          txt.rotation.y += 0.07;//fix text rotation

          let direction = new THREE.Vector3();
          txt.getWorldDirection( direction );


          let distance = textInsert;//how far forward the text should be from the platform center
          txt.position.add( direction.multiplyScalar(distance) );

          direction.cross( camera.up ); // Reuse the direction variable to get the right vector

          distance = textLeft;//how far to the right the text should be from the platform center
          txt.position.add( direction.multiplyScalar(distance) );



          ent.textMesh = txt;
          // console.log(txt);

          scene.add(txt);


      });

        // let mod = structuredClone(gltf.scene);

        // ent.animations = structuredClone(gltf.animations);

        //clone gltf.scene and animations
        let mod = gltf.scene.clone();
        ent.animations = gltf.animations.slice();
        // console.log(gltf.animations)


        mod.position.set(levels[i][0], levels[i][1]+50, levels[i][2]);

        mod.lookAt(camera.position.x, mod.position.y, camera.position.z);

        // mod.rotation.y += Math.PI / -2;
        mod.rotation.y += Math.PI / 2;

        // scale the model up
        // mod.scale.set(5, 5, 5);
        // mod.scale.set(platformdimensions[0]/20, platformdimensions[1]/20, platformdimensions[2]/20);
        mod.scale.set(platformdimensions[0]/10, platformdimensions[1]/10, platformdimensions[2]/10);

        ent.modelMesh = mod;

        scene.add(ent.modelMesh);


        playIntroAnimation(ent);

        // //make a cube
        // if (true)
        // {
        //   const geometry = new THREE.BoxGeometry(1, 1, 1);
        //   const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        //   const cube = new THREE.Mesh(geometry, material);
        //   cube.position.set(levels[i][0], levels[i][1]+50, levels[i][2]);
        //   scene.add(cube)
        // }
        // // ent.modelMesh = cube;
        if (paused)
        {
          const geometry = new THREE.BoxGeometry(platformdimensions[0], platformdimensions[1], platformdimensions[2]);
          const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(levels[i][0], levels[i][1]+50, levels[i][2]);
          // ent.modelMesh = cube;
          scene.add(cube)
        }


        // toad
        // const gltfLoader = new GLTFLoader();
        // gltfLoader.loadAsync('src/toad.glb').then((gltf2) => {



        //   let mod = gltf2.scene;

        //   ent.animations = gltf2.animations;

        //   mod.position.set(levels[i][0], levels[i][1]+50, levels[i][2]);

        //   mod.lookAt(camera.position.x, mod.position.y, camera.position.z);

        //   mod.rotation.y += Math.PI / 2;

        //   //scale the model up
        //   mod.scale.set(5, 5, 5);

        //   ent.modelMesh = mod;

        //   scene.add(ent.modelMesh);

        //   console.log("loaded");

          // playIntroAnimation(ent);

        // });


        // make a cube
        // const geometry = new THREE.BoxGeometry(25, 25, 25);
        // const material = new THREE.MeshBasicMaterial({ color: enemyColor });
        // const cube = new THREE.Mesh(geometry, material);
        // cube.position.set(levels[i][0], levels[i][1]+50, levels[i][2]);
        // ent.modelMesh = cube;
        // scene.add(cube)

        // make a rectangular platform underneath the cube
        // const geometry2 = new THREE.BoxGeometry(platformdimensions[0], platformdimensions[1], platformdimensions[2]);
        // const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
        // const cube2 = new THREE.Mesh(geometry2, material2);
        // cube2.position.set(levels[i][0], levels[i][1]+33, levels[i][2]);
        // ent.platformMesh = cube2;
        // scene.add(cube2);

        if (i < 4){
          entities[i] = ent;
        }
        else {
          waitList[i-4] = ent;
        }

      }


    }

    function setUpRightCardsAndEntities() {

      for (let i = 0; i < 4; i++) {

          // get a definition that has not been used yet
          let found_card = quizlet_cards[0];
          let isFound: boolean = false;
          do {
            found_card = quizlet_cards[Math.floor(Math.random() * quizlet_cards.length)];
            isFound = false;
            for (let j = 0; j < cards.length; j++) {
              if (cards[j].text == found_card.definition) {
                isFound = true;
                break;
              }
            }
          } while (isFound);

        // let cooldown = Math.floor(Math.random() * 5) + 3;
        // let cooldown = 1/spawnCount;
        let entity: Entity = {text: found_card.term, isTerm: true, textMesh: null, modelMesh: null, platformMesh: null, /*maxCooldown: cooldown, cooldown: cooldown,*/ damage: 1, mixer: null, animations: null, dead: false};
        entities.push(entity);
        let card: Card = {text: found_card.definition, isTerm: false, connection: entity};
        cards.push(card);

      }

    }

    function setUpWrongCards() {
      let max: number = 8-cards.length;
      for (let i = 0; i < max; i++) {
        // get a definition that has not been used yet
        let found_card: string = quizlet_cards[0].definition;
        let isFound: boolean = false;
        do {
          found_card = quizlet_cards[Math.floor(Math.random() * quizlet_cards.length)].definition;
          isFound = false;
          for (let j = 0; j < cards.length; j++) {
            if (cards[j].text == found_card) {
              isFound = true;
              break;
            }
          }
        } while (isFound);

        let card: Card = {text: found_card, isTerm: false, connection: empty_entity};
        // place in random position in array (essentially mixing the wrong cards into the correct cards)
        let index: number = Math.floor(Math.random() * cards.length);
        cards.splice(index, 0, card);
      }
    }

    function setUpButtons() {
      const btns = document.querySelectorAll('.card');
      btns.forEach(function (btn: HTMLButtonElement) {
        btn.textContent = cards[parseInt(btn.id)].text;

        btn.disabled = false;

        btn.addEventListener('click', function () {

          if (!paused && started && !gameEnded) {
            // if the button has not already been clicked
            if (btn.textContent != "")
            {
              let index = parseInt(btn.id);
              // if the card is not wrong
              if (cards[index].connection != empty_entity) {
                // remove the entity from the scene and set it to empty in list
                let ent = cards[index].connection;
                if (!(ent === empty_entity || ent.textMesh == null || ent.modelMesh == null || ent.dead))
                {
                  setLives(lives+5);
                  stage++;
                  playDeathAnimation(cards[index].connection);
                  cards[index].connection.dead = true;
                  let entIndex = getEntityIndex(cards[index].connection);
                  entities[entIndex].dead = true;
                  // entities[entIndex] = empty_entity;
                }
                // removeEntity(cards[index].connection);
                // remove the card
                cards[index] = empty_card;

                // check if entities are all empty
                let allEmpty: boolean = true;
                for (let i = 0; i < entities.length; i++) {
                  if (entities[i] != empty_entity && entities[i] != null && !entities[i].dead) {
                    allEmpty = false;
                    break;
                  }
                }
                // check if waitlist are all empty
                for (let i = 0; i < waitList.length; i++) {
                  if (waitList[i] != empty_entity && waitList[i] != null && !waitList[i].dead) {
                    allEmpty = false;
                    break;
                  }
                }
                // reset
                if (allEmpty){
                  shouldNewLevel = true;
                  return;
                }
                else {
                  shouldUpdateWaitList = true;
                }
              }
              else {
                setLives(lives - 20);
              }
              btn.textContent = "";
              btn.disabled = true;
            }
          }
        });


      });

    }


    function setUpWaitList() {

      for (let i = 0; i < spawnCount-4; i++) {

        // get a definition that has not been used yet
        let found_card = quizlet_cards[0];
        let isFound: boolean = false;
        do {
          found_card = quizlet_cards[Math.floor(Math.random() * quizlet_cards.length)];
          isFound = false;
          for (let j = 0; j < spawnCount-entities.length; j++) {
            if (waitList[j] != null && waitList[j].text == found_card.term) {
              isFound = true;
              break;
            }
          }
          for (let j = 0; j < cards.length; j++) {
            if (cards[j] != null && cards[j].text == found_card.definition) {
              isFound = true;
              break;
            }
          }
        } while (isFound);

        // let maxCooldown:number = 1;//added to minimum
        // let cooldown = Math.floor(Math.random() * ((show_shoot*2))) + (show_shoot*2);
        let entity: Entity = {text: found_card.term, isTerm: true, textMesh: null, modelMesh: null, platformMesh: null, /*maxCooldown: cooldown, cooldown: cooldown,*/ damage: 1, mixer: null, animations: null, dead: false};
        waitList.push(entity);
      }

    }

    function updateWaitList() {
      // go through the entities list and if they all are empty entities, then add the waitlist entities to the entities list
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].connection != empty_entity && cards[i].connection != null && !cards[i].connection.dead) {
          return;
        }
      }


      // if all the cards are empty
      for (let i = 0; i < entities.length; i++) {
        if ((entities[i] == empty_entity || entities[i].dead) && waitList[0] !== empty_entity && waitList[0] != null)
        {
          waitList[0].mixer = entities[i].mixer;
          waitList[0].animations = entities[i].animations;
          entities[i] = waitList[0];
          waitList.splice(0, 1);
        }
      }

      setUpCardsAfterEntities();
      setUpWrongCards();
      setUpButtons();

    }



    function setUpCardsAfterEntities() {

      cards = [];
      for (let i = 0; i < entities.length; i++) {
        if (entities[i] != empty_entity && entities[i] != null) {
          let card: Card = {text: getDefinition(entities[i].text), isTerm: true, connection: entities[i]};
          cards.push(card);
        }
      }

    }

    // TODO (kind of in order of what im doing)
    /*

      add a monospaced font

      MAYBE?
      add multiple spawn types
        enemies
        bush enemies
        scenery, etc.
        Notes:
          scenery only need to be spawned, no need for entities
          bush enemies must store that they are bush enemies
            they are created same as normal enemies but they have a different model

      BUGS
        make sure that everything works when quizlet_cards.length < 4

        need alternative to dom load thingy because it doenst work if clicking into bossbattle while aceit already loaded. cannot use onmount from svelte for some reason




        NEW ANIMATIONS ARENT WORKING BECAUSE THE MODEL IS USING A SKELETON TO ANIMATE --- doesn't matter because now they dont shoot lmao
    */

    });