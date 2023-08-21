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
  ["Reticulum Endoplasm"] : `Fungsi RE Kasar :
  (1) Membantu dalam sintesis protein 
  
  Fungsi RE Halus :
  (1) Sintesis lemak
  (2) Membantu metabolisme lemak
  (3) Mendetoksifikasi racun
  
  Bagian :
  a. Selapis membran yang berlekuk-lekuk 
  b. Terletak di dekat/menempel dengan inti sel
  c. Permukaan RE Kasar ditempeli oleh ribosom yang keluar dari inti sel
  d. Permukaan RE Halus tidak ditempeli ribosom
  `,
  ["Vacuole"] : `Fungsi:
  (1) Tempat penyimpanan cadangan makanan, seperti akar di ketela pohon (tepung) dan di batang tebu (gula).
  (2) Menyimpan sisa metabolisme/pencernaan karena tidak dapat dikeluarkan oleh tumbuhan tersebut. 
  (3) Mengatur konsentrasi air.
  (4) Menyimpan minyak asiri, contohnya minyak kayu putih, peppermint, dan aroma harum pada bunga.
  (5) Vakuola pada sel-sel mahkota bunga menyimpan pigmen warna, yakni warna merah, biru, kuning, dll. untuk menarik serangga yang dapat membantu penyerbukan. 
  Vakuola kontraktil (mengempang/menipis)
  (1) Mengatur tekanan osmotik atau konsentrasi air dan tempat pengeluaran cairan tubuh.
  
  Bagian:
  Vakuola dibungkus tonoplas.
  a. Tonoplas: Lapisan terluar atau membran luarnya vakuola.
  b. Vakuola di sel tumbuhan berisi getah: Mengandung makanan dan juga zat buangan lain.
  `,
  ["Mitochondria"] : `Fungsi:
  (1) Tempat respirasi seluler.
  (2) Tempat penghasil energi (ATP).
  (3) Molekul pembawa energi siap pakai.
  
  Bagian: 
  a. Mitokondria memiliki dua lapisan membran (membran dalam dan membran luar).
  Membran dalam: Pelekukan ke arah dalam yang membentuk krista.
  Di membran dalam terdapat krista dan matriks.
  b. Krista: Lapisan yang membuat permukaan membran dalam menjadi semakin luas sehingga proses respirasi sel semakin efektif. 
  c. Matriks: Cairan gel dalam mitokondria yang tersusun dari air, protein, enzim respirasi, garam, DNA, dll. 
  `,
  ["Nucleus"] : `(1) Pusat informasi dan kendali seluruh aktivitas sel.
  (2) Menyimpan informasi genetik dalam bentuk DNA.
  (3) Mengontrol pertumbuhan dan pembelahan sel.
  (4) Mengatur metabolisme sel dengan mensintesis berbagai enzim.
  (5) Memproduksi RNA dari DNA yang lalu keluar dari pori-pori ke organel yang diinginkan (ribosom).
  (6) Memproduksi ribosom.
  
  Bagian:
  a. Selubung inti/membran nukleus dalam dan luar.
  Luar: Berhubung langsung dengan RE dan akhirnya membran sel.
  b. Nukleoplasma: Gel yang tersusun dari air, protein, ion, enzim, dan asam inti.
  c. Kromatin: Benang penyerap warna di dalam nukleoplasma yang tersusun dari protein dan DNA.
  d. Kromosom: Benang kromatin yang tampak memendek pada proses mitosis.
  e. Nukleolus/anak inti: Organel tidak tetap yang terbentuk pada proses transkripsi untuk menghasilkan RNA. 

  `,
  ["Golgi Complex"] : `Fungsi:
  1. Untuk memodifikasi, mengemas, dan menyortir molekul yang ada
  2. Memproduksi selulosa yang menyusun dinding sel
  
  Bagian:
  a. Cis, sebagai penerima vesikel yang berasal dari Retikulum Endoplasma
  b. Sisterna, berfungsi sebagai modifikasi protein dari vesikel yang berasal dari RE menjadi vesikel bar
  c. Trans, sebagai pengirim vesikel dari badan golgi menuju organel selanjutnya.
  d. Vesikel transfer, untuk mentransfer protein dari badan golgi
  e. Vesikel sekretaris, untuk melepas protein atau molekul lain
  `,
  ["Chloroplast"] : `Plastida hanya ada di sel tumbuhan yang memiliki banyak fungsi, seperti membantu proses fotosintesis, menghasilkan pigmen warna pada tumbuhan, dll.
  Plastida terbagi menjadi bermacam-macam jenis ada kloroplas, kromoplas, leukoplas, dan amiloplas.
  
  Fungsi: 
  (1) Kloroplas: Plastida mengandung klorofil yang berfungsi untuk membantu fotosintesis dengan cara memanfaatkan energi sinar matahari untuk membuat makanan.
  (2) Kromoplas: Plastida pengandung berbagai pigmen warna yang bertugas untuk memberi warna pada bunga.
  (3) Leukoplas: Plastida tidak berwarna yang berfungsi untuk menyimpan cadangan makanan. 
  (4) Amiloplas: Plastida tidak berwarna yang berfungsi dalam penyimpanan amilum. 
  
  Bagian:
  Kloroplas memiliki membran rangkap, yaitu membran luar dan dalam.
  a. Membran luar: Permukaan rata yang berfungsi untuk mengatur keluar masuknya zat. 
  b. Stroma: Membran dalam yang membungkus cairan kloroplas. 
  c. Tilakoid: Membran dalam kloroplas yang melipat ke arah dalam dan membentuk lembaran-lembaran.
  d. Grana: Tumpukan tilakoid yang membentuk badan seperti tumpukan uang logam.
  `,
  ["Micro Body"] : `Peroksisom ada di sel tumbuhan dan hewan.Sementara itu, glioksisom hanya ada di sel tumbuhan.

  Peroksisom: 
  Fungsi: 
  (1) Menetralkan racun
  (2) Menghasilkan enzim katalase yang berfungsi untuk menguraikan hidrogen peroksida (H2O2) yang bersifat beracun menjadi oksigen (O2) dan air (H2O) yang bersifat netral, lalu berperan juga dalam metabolisme lemak.
  
  Glioksisom:
  Fungsi:
  (1) Menghasilkan enzim katalase dan enzim oksidase yang berperan dalam proses metabolisme lemak (lemak menjadi gula/karbohidrat) yang juga menghasilkan energi. 
  
  `,
  ["Ribosomes"] : `Fungsi :
  (1) Tempat berlangsungnya sintesis protein 
  (2) Terdapat mRNA yang berfungsi sebagai cetakan resep untuk membuat protein tertentu
  
  Bagian :
  a. Subunit besar : berfungsi untuk memberikan bentuk ikatan peptida
  b. Subunit kecil : berfungsi untuk membaca pesan mRNA untuk asam amino
  c. mRNA : berfungsi sebagai cetakan resep membuat protein tertentu
  `,
  ["Sitoplasm"] : `Sitoplasma, merupakan bagian non nukleus dari protoplasma. Sitoplasma menjadi pengisi ruang kosong sel yang berfungsi sebagai tempat reaksi biokimia. Bagian ini terdapat sitoskeleton, sitosol, dan veskuli berupa cairan.
  `,
  ["Cytoskeleton"] : `
  Fungsi :
(1) Memberi bentuk pada sel 
(2) Mengatur pergerakan yang ada di dalam sel 
(3) Mempertahankan organel-organel sel tetap berada ditempatnya masing-masing
(4) Mikrofilamen : di dalam mikrofilamen ada protein aktin, yang nantinya akan berikatan dengan miosin, sehingga terjadi kontraksi otot untuk pergerakan
(5) Filamen Intermediate : mempertahankan bentuk sel
(6) Mikrotubulus : menggerakan organel, pembentukan sila dan flagel

Bagian : 
a. Mikrofilamen : lapisan paling tipis dan letaknya di pinggir sel
b. Filamen Intermediate : lapisan yang ketebalannya sedang
c. Mikrotubulus : lapisan yang paling tebal dan tersusun dari protein tubulus
  `,
  ["Membrane Cell & Cell Wall"] : `--MEMBRAN SEL--
  [Bagian dalam]
  Fungsi : 
(1) Memisahkan bagian dalam sel dari lingkungan luar serta berperan sebagai pelindung sel
(2) Pengatur zat-zat yang masuk dan keluar sel, hanya zat tertentu yang dapat melewati membran plasma

Bagian :
a. Glikolipid : glikogen yang menempel pada fosfolipid, membantu menstabilkan membran
b. Glikoprotein : glikogen yang menempel pada protein, berfungsi sebagai reseptor hormon dan neurotransmitter
c. Fosfolipid : terbagi menjadi dua yaitu fosfat (hidrofilik) dan lipid (hidrofobik). Karena ada dua lapisan fosfolipid, maka disebut juga fosfolipid bilayer
d. Protein Integral : protein yang dapat menembus kedua lapisan membran sel
e. Protein Perifer : hanya menempel pada bagian atas/bawah sel
f. Protein Saluran : punya pori yang menjadi saluran ion pelarut air

  --DINDING SEL--
  [Bagian Luar]

  Fungsi:
1. Sebagai pelindung sel
2. Memperkuat bentuk sel
3. Menentukan ciri sel (hanya terdapat pada sel tumbuhan)

Bagian:
a. Lamela tengah, lapisan terluar dinding sel yang banyak mengandung pektin (perekat, pembentuk tekstur, dan sebagai membran sel)
b. Dinding sel primer, diantara lamela tengah dan dinding sel sekunder yang terdapat hemiselulosa (mengikat lembaran serat selulosa membentuk mikrofibril yang meningkatkan stabilitas dinding sel.), selulosa (penyusun utama dinding sel tumbuhan), lipid, dan protein. Bersifat fleksibel dan berfungsi membuat sel dapat melebar ketika mengalami pertumbuhan.
c. Dinding sel sekunder, merupakan lapisan terakhir yang mengandung banyak lignin sehingga menjadi yang paling kokoh dan kaku serta paling tebal karena terjadi pula penebalan sel.

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
let boola = false;
if (window.innerWidth < window.innerHeight) {
 boola = true;
}
//pointer eve nt work s better than touch event

  if (isMobile && boola) {
    document.getElementById("CellContainer").addEventListener('pointerdown', (event) => {
      firstTouch = true; 
      isSwiping = false;

      pointer.x = (event.pageX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.pageY / window.innerHeight) * 2 + .5;

      raycaster.setFromCamera( pointer, camera );
      const intersects = raycaster.intersectObjects( scene.children );
    
      if (intersects.length >= 1 ) {
        if (intersects[0].object.parent.isGroup) {
          
          for (let i = 0; i < intersects[0].object.parent.children.length; i++){
            let color = new THREE.Color("rgb(178, 72, 255)");
            console.log(intersects[0].object.parent.children[i]);
            
            intersects[0].object.parent.children[i].material.emissive = color
            rotate = Math.floor(Math.random() * 10)-5;
            document.getElementById("ObjectName").innerText = intersects[0].object.parent.name
    
            document.getElementById("Description").innerText = lib[intersects[0].object.parent.name]
    
            newIndicator = 0; 
            console.log(newIndicator);
          }
    
          ChosenId = intersects[0].object.parent.id; 
          //console.log(intersects[0].o asd bject);
        }
        
      } 

    });
    document.getElementById("CellContainer").addEventListener('pointermove', (event) => {
      console.log("owo2");
      if (firstTouch) {
        pointer.x = (event.pageX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.pageY / window.innerHeight) * 2 + .5;
        

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
    document.getElementById("CellContainer").addEventListener('pointerup', (event) => {
      const diffX = Math.abs(event.pageX - pointer.X);
      const diffY = Math.abs(event.pageY - pointer.Y);
      if (diffX < delta && diffY < delta) {
       // onDocumentMouseClick(event); // Android old: is better desktop solution
      }
      firstTouch = true;
    });
    console.log("owowoowowowasdSDADAD");
  } else {
    console.log("owowoowowow");
//desktop behavior
document.getElementById("CellContainer").addEventListener('pointerdown', (event) => {
      isSwiping = false;
      pointer.x = (event.pageX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.pageY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera( pointer, camera );
      const intersects = raycaster.intersectObjects( scene.children );
    
      if (intersects.length >= 1 ) {
        if (intersects[0].object.parent.isGroup) {
          
          for (let i = 0; i < intersects[0].object.parent.children.length; i++){
            let color = new THREE.Color("rgb(178, 72, 255)");
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
    document.getElementById("CellContainer").addEventListener('pointermove', (event) => {
      isSwiping = true;
      pointer.x = (event.pageX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.pageY / window.innerHeight) * 2 + 1;
      console.log(pointer);
    });

    document.getElementById("CellContainer").addEventListener('pointerup', (event) => {
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
document.getElementById("Description").innerText = "Click on an organel"
// Load the GLTF model
LoadGLTFByPath(scene)

  .then(() => {
    scene = scene
    retrieveListOfCameras(scene);

    var Nucleus
    Nucleus = new THREE.Group();
    scene.getObjectByName("Nukleus").position.y = 5.15;
    scene.getObjectByName("Nukleus001").position.y = 5.15;
    Nucleus.add(scene.getObjectByName("Nukleus"));
    Nucleus.add(scene.getObjectByName("Nukleus001"));
    Nucleus.name = "Nucleus"

    var Vacuole
    Vacuole = new THREE.Group();
    scene.getObjectByName("Plane004_2").position.y = 5.15;
    scene.getObjectByName("Plane004_1").position.y = 5.15;
    Vacuole.add(scene.getObjectByName("Plane004_2"));
    Vacuole.add(scene.getObjectByName("Plane004_1"));
    Vacuole.add(scene.getObjectByName("Vacuole001"));
    Vacuole.name = "Vacuole";

    var RE
    RE = new THREE.Group();
    RE.add(scene.getObjectByName("RE"));
    RE.add(scene.getObjectByName("Icosphere"));
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
    Perox.name = "Micro Body";
    
    var Skel
    Skel = new THREE.Group();
    Skel.add(scene.getObjectByName("Plane001"));
    Skel.add(scene.getObjectByName("Plane004"));
    Skel.name = "Cytoskeleton";

    var Ribosome
    Ribosome = new THREE.Group();
    Ribosome.add(scene.getObjectByName("Circle"));
    Ribosome.add(scene.getObjectByName("Circle001"));
    Ribosome.name = "Ribosomes";

    var WallMem
    WallMem = new THREE.Group();
    WallMem.add(scene.getObjectByName("CellWall001"));
    WallMem.add(scene.getObjectByName("Membrane"));
    WallMem.name = "Membrane Cell & Cell Wall";

    var SPlasm
    SPlasm = new THREE.Group();
    SPlasm.add(scene.getObjectByName("Plane002"));
    SPlasm.name = "Sitoplasm";
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
    scene.add(Skel);
    scene.add(Ribosome);
    scene.add(WallMem);
    scene.add(SPlasm);
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
    
    camera.position.z = (isMobile && boola? -3 : 0) + Math.abs(rotate) * modelRotate/108 - (Math.abs(Math.sin(modelRotate/360 * 3.14 * 2 )) * 15) + lerp(0,-30, Math.sin((modelRotate/108) * 3.14 * 0.3) )  
    camera.rotation.z = -pointer.x/50  - (Math.abs(Math.sin(modelRotate/360 * 3.14 )))
    camera.rotation.x = 300 + Math.sin(d.getTime()* 0.001) * .01  + pointer.y/50   - (Math.abs(Math.sin(modelRotate/360 * 3.14 )))
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
};





    