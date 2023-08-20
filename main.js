import * as THREE from 'three'
import { LoadGLTFByPath } from '/ModelHelper.js'


let x = 0;
let y = 0;
let newIndicator = 1.1;
let rotate = 0 ;
let sideBarX = 1;
let sideBarOpen = false;
let ChosenId = null;


let arrowRotate, xOffset, yOffset

const lib = {
  ["Reticulum Endoplasm"] : "Contain Hard RE and Soft RE",
  ["Vacuole"] : "Big ass storage lmao",
  ["Mitochondria"] : "produces those energy stuff that makes u do ur activity or smth idk",
  ["Nucleus"] : "the brain that control the cell",
  ["Golgi Complex"] : "uh funny blobby thingy",
  ["Chloroplast"] : "it makes those good 02 zaza",
  ["Glyoxysome / Peroxisome"] : `Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  Crazy? I Was Crazy Once. They Locked Me In A Room. A Rubber Room. A Rubber Room With Rats. And Rats Make Me Crazy.
  
  `,
 

  
};

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// mouse event vars
let isSwiping = false;
const delta = 1.5;
let sogliaMove = 0;
let firstTouch = true;
let firstTime = true;
// device detection

let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobile = regexp.test(details);

//pointer event works better than touch event

  if (isMobile) {
    document.addEventListener('pointerdown', (event) => {
      firstTouch = true; 
      isSwiping = false;

      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera( pointer, camera );
      const intersects = raycaster.intersectObjects( scene.children );
    
      if (intersects.length >= 1 ) {
        if (intersects[0].object.parent.isGroup) {
          
          for (let i = 0; i < intersects[0].object.parent.children.length; i++){
            const color = new THREE.Color("rgb(178, 72, 255)");
            console.log(intersects[0].object.parent.children[i]);
    
            intersects[0].object.parent.children[i].material.emissive = color
            rotate = Math.floor(Math.random() * 10)-5;
            document.getElementById("ObjectName").innerText = intersects[0].object.parent.name
    
            document.getElementById("Description").innerText = lib[intersects[0].object.parent.name]
    
            newIndicator = 0;
            console.log(newIndicator);
          }
    
          ChosenId = intersects[0].object.parent.id; 
          //console.log(intersects[0].object);
        }
        
      } 

    });
    document.addEventListener('pointermove', (event) => {
      console.log("owo");
      if (firstTouch) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        firstTouch = false;
      } else {
        const diffX = Math.abs(event.pageX - pointer.X);
        const diffY = Math.abs(event.pageY - pointer.Y);
        if (diffX < delta && diffY < delta && sogliaMove > 2) {
          // sogliaMove>2 means 2 frame still when isSwiping is true
          onDocumentTouchClick(event); // for iOS  
        }
      }
      isSwiping = true; 
    });
    document.addEventListener('pointerup', (event) => {
      const diffX = Math.abs(event.pageX - pointer.X);
      const diffY = Math.abs(event.pageY - pointer.Y);
      if (diffX < delta && diffY < delta) {
       // onDocumentMouseClick(event); // Android old: is better desktop solution
      }
      firstTouch = true;
    });
  } else {
//desktop behavior
    document.addEventListener('pointerdown', (event) => {
      isSwiping = false;
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera( pointer, camera );
      const intersects = raycaster.intersectObjects( scene.children );
    
      if (intersects.length >= 1 ) {
        if (intersects[0].object.parent.isGroup) {
          
          for (let i = 0; i < intersects[0].object.parent.children.length; i++){
            const color = new THREE.Color("rgb(178, 72, 255)");
            console.log(intersects[0].object.parent.children[i]);
    
            intersects[0].object.parent.children[i].material.emissive = color
            rotate = Math.floor(Math.random() * 10)-5;
            document.getElementById("ObjectName").innerText = intersects[0].object.parent.name
    
            document.getElementById("Description").innerText = lib[intersects[0].object.parent.name]
    
            newIndicator = 0;
            console.log(newIndicator);
          }
    
          ChosenId = intersects[0].object.parent.id; 
          //console.log(intersects[0].object);
        }
        
      } 

    });
    document.addEventListener('pointermove', (event) => {
      isSwiping = true;
      pointer.x = (event.pageX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      console.log(pointer);
    });

    document.addEventListener('pointerup', (event) => {
      const diffX = Math.abs(event.pageX - pointer.X);
      const diffY = Math.abs(event.pageY - pointer.Y);

      if (diffX < delta && diffY < delta) {
       // onDocumentMouseClick(event);
      }
    });
  



  isSwiping = false;
}



document.addEventListener("click", function (event) { 
  //window.alert("urmom");
  

 
});

//Renderer does the job of rendering the graphics
let renderer = new THREE.WebGLRenderer({

	//Defines the canvas component in the DOM that will be used
	canvas: document.querySelector('#background'),
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

//set up the renderer with the default settings for threejs.org/editor - revision r153
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1
renderer.useLegacyLights  = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
//make sure three/build/three.module.js is over r152 or this feature is not available. 
renderer.outputColorSpace = THREE.SRGBColorSpace 

let scene = new THREE.Scene();
let cameraList = [];
let camera;

document.getElementById("FunctionLabel").innerText = "< The Function >"
if (isMobile) {
  document.getElementById("Title").innerText = "< The Plant Cell >"
}else{
  document.getElementById("Title").innerText = "< The Plant Cell [pc] >"
}

document.getElementById("MaketMaker").innerText = `
  Maket Maker:
  - People
  - People
`
document.getElementById("MaterialHandler").innerText = `
  Who Handle Materials:
  - owo
  - owo
`
document.getElementById("Description").innerText = "owoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowoowo "
// Load the GLTF model
LoadGLTFByPath(scene)

  .then(() => {
    scene = scene
    retrieveListOfCameras(scene);

    var Nucleus
    Nucleus = new THREE.Group();
    scene.getObjectByName("Plane001_1").position.y = 5.15;
    scene.getObjectByName("Plane001").position.y = 5.15;
    Nucleus.add(scene.getObjectByName("Plane001_1"));
    Nucleus.add(scene.getObjectByName("Plane001"));
    Nucleus.name = "Nucleus"

    var Vacuole
    Vacuole = new THREE.Group();
    scene.getObjectByName("Plane004").position.y = 5.15;
    scene.getObjectByName("Plane004_1").position.y = 5.15;
    Vacuole.add(scene.getObjectByName("Plane004"));
    Vacuole.add(scene.getObjectByName("Plane004_1"));
    Vacuole.add(scene.getObjectByName("Vacuole001"));
    Vacuole.name = "Vacuole";

    var RE
    RE = new THREE.Group();
    RE.add(scene.getObjectByName("RE"));
    RE.name = "Reticulum Endoplasm";

    var Mitochondria
    Mitochondria = new THREE.Group();
    Mitochondria.add(scene.getObjectByName("Mitochondria001"));
    Mitochondria.add(scene.getObjectByName("Mitochondria012"));
    Mitochondria.add(scene.getObjectByName("Mitochondria004"));
    Mitochondria.name = "Mitochondria";

    var GolgiComplex
    GolgiComplex = new THREE.Group();
    GolgiComplex.add(scene.getObjectByName("Sphere003"));
    GolgiComplex.name = "Golgi Complex";
    
    var Chloro
    Chloro = new THREE.Group();
    Chloro.add(scene.getObjectByName("Chloroplast"));
    Chloro.add(scene.getObjectByName("Chloroplast001"));
    Chloro.add(scene.getObjectByName("Chloroplast020"));
    Chloro.name = "Chloroplasst";
    
    var Perox
    Perox = new THREE.Group();
    Perox.add(scene.getObjectByName("Glioksisom"));
    Perox.add(scene.getObjectByName("Glioksisom001"));
    Perox.name = "Glyoxysome / Peroxisome";
    
    //scene.traverse(function (object) {
    //  console.log(object);
    
    //})
    scene.add(Nucleus);
    scene.add(Vacuole);
    scene.add(RE);
    scene.add(Mitochondria);
    scene.add(GolgiComplex);
    scene.add(Chloro);
    scene.add(Perox);
  })
  .catch((error) => {
    console.error('Error loading JSON scene:', error);
  });

function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}

//retrieve list of all cameras
function retrieveListOfCameras(scene){
  // Get a list of all cameras in the scene
  scene.traverse(function (object) {
    if (object.isCamera) {
      
      cameraList.push(object);
    }
  });

  //Set the camera to the first value in the list of cameras
  camera = cameraList[0];
  camera.fov = 25 + rotate;
  updateCameraAspect(camera);
  camera.position.z = -10
  // Start the animation loop after the model and cameras are loaded
  animate();
}

// Set the camera aspect ratio to match the browser window dimensions
function updateCameraAspect(camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function resetAllPart() {
  scene.traverse( function( object ) {

    const color = new THREE.Color("rgb(0, 0, 0)");


    if (object.isGroup && object.children.length > 0 && object.id != ChosenId && object.name != "Scene") {
      //console.log( object ); 
      for (let i = 0; i < object.children.length; i++){
        
        object.children[i].material.emissive = color;
      }
      
    }
        
  } );

 // for (let i = 0; i < scene.children.length; i++) {
   // scene.Traverse();
    //window.alert(scene.children.length);
    //if (scene.children[i].material) {
      
      //scene.children[i].material.opacity = 1.0;
      //scene.children[i].material.transparent = false;
      
    //}
  //}
}
let num = 1;
let hoveredId = null;
let modelRotate = 108;
let Rotated = false;
//A method to be run each time a frame is generated
document.getElementById("Arrow").addEventListener('mousedown', function onClick() {
  Rotated = !Rotated; 
  //console.log(2);
})
//document.addEventListener('mouseup', function onClick() {
//  onRotate = false; 
//  console.log(2);
//})

document.getElementById("Sidebar").addEventListener("click", function(){
  sideBarOpen = !sideBarOpen
})


function animate() {
   
   
   
    const d = new Date()

    resetAllPart()
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );

    
    if (intersects.length >= 1 && intersects[0].object.id != ChosenId) {
      intersects[0].object.material.transparent = true;
      let emCol = intersects[0].object.material.emissive
      //console.log(lerp(num,255,.1));
      num = lerp(num,100,.1);
      //if (hoveredId != intersects[0].object.id) {
      //  hoveredId = intersects[0].object.id;
      //  num = 1;

      //  intersects[0].object.material.emissive.setRGB(num/255);
      //}

      if (intersects[0].object.parent.isGroup) {
        for (let i = 0; i < intersects[0].object.parent.children.length; i++){
          intersects[0].object.parent.children[i].material.emissive.setRGB(num/255);
        }
       // console.log(intersects[0].object);
      }
      //console.log(num);
      //const color = new THREE.Color("rgb(0, "+lerp(1,255,.1)+", 255)");
      
    }
    
    if (sideBarOpen) {
      sideBarX = lerp(sideBarX,-1,.08)
    }else{
      sideBarX = lerp(sideBarX,1,.08)
    }
    document.getElementById("Sidebar").style.transform = "translate("+((Math.sin(sideBarX)+ 1)/2 * 150 ) +"%, 0%)";
    document.getElementById("Hambaga").style.transform= "translate("+(-100 + (-Math.sin(sideBarX)+ 1)/2 * 150 ) +"px, 0%)";
    if (newIndicator <= 1) { 
      newIndicator += .02;
      let bottom = - 300 + (500 * Math.abs(Math.sin(newIndicator * 3.14)));
      document.getElementById("NewIndicator").style.left = "0%";
      document.getElementById("NewIndicator").style.bottom = bottom+"px";
      document.getElementById("NewIndicator").style.transform = "rotate("+(90-(Math.sin(newIndicator * 1.57) * 90))+"deg)";
    }

    rotate = lerp(rotate,0,.05)
    document.getElementById("CellContainer").style.transform = "rotate("+rotate+"deg)";
    //camera.position.x = x/2 
    //camera.rotation.z = x/100
    //camera.position.z = -7 + Math.sin(d.getTime()* 0.001) * .01 
    //camera.rotation.x = 300 + Math.sin(d.getTime()* 0.001) * .01  + y/50
    //renderer.render(scene, camera);
    arrowRotate = Math.cos(d.getTime()* 0.002) * 5;
    
   // document.getElementById("Arrow").style.transform = "rotate("+arrowRotate+"deg) translate(-30vw, -25px)";
    
    if (Rotated == true) {
      modelRotate = lerp(modelRotate, 108,.05);
      
    }else{
      modelRotate = lerp(modelRotate, 0,.05)
    }
    let membrane = scene.getObjectByName("Membrane")
    camera.position.x = membrane.position.x   //+  Math.sin(d.getTime()* 0.001) * 2 
    
    camera.rotation.y = Math.cos(d.getTime()* 0.002) * .003   //+ (modelRotate/360 * 3.14) //+ Math.sin(modelRotate/360 * 3.14 )
    camera.position.y = -membrane.position.y -17 + -Math.abs(rotate)  + Math.cos(d.getTime()* 0.0005) + (Math.cos(modelRotate/360 * 3.14 ) * 30) + lerp(0,12, Math.sin(modelRotate/108 * 3.14 * 0.3))  
    //console.log(370%360);
    
    camera.position.z = (isMobile? -3 : 0) + Math.abs(rotate) * modelRotate/108 - (Math.abs(Math.sin(modelRotate/360 * 3.14 * 2 )) * 15) + lerp(0,-30, Math.sin((modelRotate/108) * 3.14 * 0.3) )  
    camera.rotation.z = -pointer.x/50  - (Math.abs(Math.sin(modelRotate/360 * 3.14 )))
    camera.rotation.x = 300 + Math.sin(d.getTime()* 0.001) * .01  + pointer.y/50   - (Math.abs(Math.sin(modelRotate/360 * 3.14 )))
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
};





    