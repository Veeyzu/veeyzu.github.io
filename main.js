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
let isMobile = false;

if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent,
  )
  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4),
  )
) {
  isMobile = true;
}

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
        onDocumentMouseClick(event); // Android old: is better desktop solution
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
        onDocumentMouseClick(event);
      }
    });
  }

function onDocumentTouchClick(event) {
  event.preventDefault();
  scene.updateMatrixWorld();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObject(mesh);

  if (intersects.length > 0 && firstTouch === false) {
    firstTouch = true; 
    evaluateRaycast();
  }
}

function onDocumentMouseClick(event) {
  event.preventDefault();
  if (!isSwiping) {
    scene.updateMatrixWorld();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObject(mesh, true);

    if (intersects.length > 0) {
      evaluateRaycast(); //it continues
    }
  }
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
  document.getElementById("Title").innerText = "< The Plant Cell3242342 >"
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
    Chloro.name = "Chloroplast";
    
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
    camera.position.z = 0 + Math.abs(rotate) * modelRotate/108 - (Math.abs(Math.sin(modelRotate/360 * 3.14 * 2 )) * 15) + lerp(0,-30, Math.sin((modelRotate/108) * 3.14 * 0.3) )  
    camera.rotation.z = -pointer.x/50  - (Math.abs(Math.sin(modelRotate/360 * 3.14 )))
    camera.rotation.x = 300 + Math.sin(d.getTime()* 0.001) * .01  + pointer.y/50   - (Math.abs(Math.sin(modelRotate/360 * 3.14 )))
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
};





    