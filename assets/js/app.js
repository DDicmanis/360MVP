let camera, scene, renderer, clock, rightArm;

init();
animate();




function init() {

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.set(8, 3, 7);
  camera.lookAt(-2, 1.6, -4);

  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x340023);

  // const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
  // light.position.set(0, 1, 0);
  // scene.add(light);

  // model
  const loader = new THREE.GLTFLoader();
  loader.load('assets/3d/Room.glb', function (gltf) {

    const model = gltf.scene;

    sofa = model.getObjectByName("sofa")
    sofa.position.y = (0)
    sofa.material.wireframe = true
    rightArm = model.getObjectByName('mixamorigRightArm');
    table = model.getObjectByName("table")
    table.position.y = (0);
    table.material.wireframe = true
    scene.add(model);
    console.log(model)
    for (let i = 0; i <= 9; i++) {
      var child = model.children[i]
      console.log(child)
      child.material.wireframe = true
    }

  });
  const video = document.getElementById('video');
  video.play();
  const videoTexture = new THREE.VideoTexture(video);
  const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.FrontSide, toneMapped: false });
  const screen = new THREE.PlaneGeometry(4.22, 2.34);
  const videoScreen = new THREE.Mesh(screen, videoMaterial);
  videoScreen.position.set(0.01, 3.034, -3.852)
  scene.add(videoScreen);
  const BlueLight = new THREE.DirectionalLight(0x1A2881, 1);
  BlueLight.position.set(8.5, 3.6, -3.082)
  scene.add(BlueLight);
  const helperBlue = new THREE.DirectionalLightHelper(BlueLight, 5);
  //scene.add(helperBlue);
  const RedLight = new THREE.DirectionalLight(0x862730, 1);
  RedLight.position.set(-2.88, 4.495, 7.5)
  const helperRed = new THREE.DirectionalLightHelper(RedLight, 5);
  //scene.add(helperRed);
  scene.add(RedLight);
  const PinkLight = new THREE.DirectionalLight(0x976983, 1);
  PinkLight.position.set(-3.273, 8.363, -3.358)
  scene.add(PinkLight);
  var Planemap = new THREE.TextureLoader().load('../../assets/images/texture.png')
  var mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.64, 2.54),
    new THREE.MeshBasicMaterial({ map: Planemap })
  );
  mesh.position.set(-3.936, 2.746, -0.820)
  mesh.lookAt(6.994, 2.601, -0.582)
  scene.add(mesh)
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
  scene.fog = new THREE.FogExp2(0xefd1b5, 0.001);
  document.body.append(renderer.domElement)
  //document.body.appendChild(cssRenderer.domElement);
  //cssRenderer.domElement.appendChild(renderer.domElement);
  //cssScene = new THREE.Scene();
  //create3dPage(1000, 1000, new THREE.Vector3(-1050, 0, 400), new THREE.Vector3(0, 45 * Math.PI / 180, 0), 'contacts.html');

  //document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
  //const controls = new THREE.TransformControls(camera, renderer.domElement);
  // controls.attach(BlueLight);
  //scene.add(controls);


  //scene.add(plane);

  //var cssObject = createCssObject(w, h, position, rotation, url);

  // cssScene.add(cssObject);


}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();
  TWEEN.update();


  //console.log()
  // if (rightArm) {

  //   rightArm.rotation.z += Math.sin(t) * 0.005;

  // }

  renderer.render(scene, camera);

}

// function goToShowcase() {
//   var showcasePosition = new THREE.Vector3(0, 0, 0)
//   camera.position.set(showcasePosition);
//   console.log(camera.getWorldPosition())
// }

var position1 = { x: 8.0, y: 3.0, z: 7.0 }

var lookat1 = { x: -2, y: 1.6, z: -4 }
var position2 = { x: 0.136, y: 3.236, z: 7.096 }
var lookat2 = { x: 0.136, y: 3.236, z: -1 }
var position3 = { x: 6.994, y: 2.501, z: -0.582 }
var lookat3 = { x: 0, y: 2.501, z: -0.5 }
var position = { x: 8.0, y: 3.0, z: 7.0 }
var focusCords = lookat1;

function runTween(targetLocation, targetFocus) {
  //console.log("fired")
  var tween = new TWEEN.Tween(position);
  tween.to(targetLocation, 1000)
  tween.onUpdate(function () {
    console.log("running")
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z;
  })
  tween.onComplete(function () {
    //position = targetLocation
    //console.log(position)
  });
  var tween2 = new TWEEN.Tween(focusCords)
  tween2.to(targetFocus, 1000)
  tween2.onUpdate(function () {
    //console.log("running")
    camera.lookAt(focusCords.x, focusCords.y, focusCords.z);

  });
  tween2.onComplete(function () {
    //console.log("running")
    //focusCords = targetFocus
    if (targetLocation == position3) {
      $("#iframe360").removeClass("d-none")
      $("#demoButton").removeClass("d-none")
    }
    if (targetLocation == position1) {
      $("#overlay").removeClass("d-none")
      $("#contactUsButton").removeClass("d-none")
    }

  });

  tween.start();
  tween2.start();
}

$(document).on("click", "#gotToShowcaseButton", function () {
  //camera.position.set(0.136, 3.236, 7.096);
  //camera.lookAt(0.136, 3.236, -1)
  $("#overlay").addClass("d-none")
  $("#contactUsButton").addClass("d-none")
  $("#contactPopUp").addClass("d-none")
  $("#iframe360").addClass("d-none")
  $("#showcaseLink").addClass("active-nav")
  $("#beginingLink").removeClass("active-nav")
  $("#demoLink").removeClass("active-nav")
  // tween.start();
  // tween2.start();
  runTween(position2, lookat2);
})
$(document).on("click", "#showcaseLink", function () {
  // camera.position.set(0.136, 3.236, 7.096);
  // camera.lookAt(0.136, 3.236, -1)
  $("#overlay").addClass("d-none")
  $("#contactUsButton").addClass("d-none")
  $("#contactPopUp").addClass("d-none")
  $("#demoButton").addClass("d-none")
  $("#iframe360").addClass("d-none")
  $("#showcaseLink").addClass("active-nav")
  $("#beginingLink").removeClass("active-nav")
  $("#demoLink").removeClass("active-nav")
  runTween(position2, lookat2);

})

$(document).on("click", "#beginingLink", function () {

  $("#contactUsButton").addClass("d-none")
  $("#contactPopUp").addClass("d-none")
  $("#demoButton").addClass("d-none")
  $("#iframe360").addClass("d-none")
  $("#showcaseLink").removeClass("active-nav")
  $("#beginingLink").addClass("active-nav")
  $("#demoLink").removeClass("active-nav")
  runTween(position1, lookat1)
  console.log(position1)

})
$(document).on("click", "#demoLink", function () {
  $("#overlay").addClass("d-none")
  $("#contactUsButton").addClass("d-none")
  $("#contactPopUp").addClass("d-none")
  $("#showcaseLink").removeClass("active-nav")
  $("#beginingLink").removeClass("active-nav")
  $("#demoLink").addClass("active-nav")

  //$("#iframe360").removeClass("d-none")
  runTween(position3, lookat3);
})

$(document).on("click", "#demoBigButton", function () {
  $("#iframe360").addClass("css--iframe-big")
  $("#demoButtonClose").removeClass("d-none")
})
$(document).on("click", "#demoBigButtonClose", function () {
  $("#iframe360").removeClass("css--iframe-big")
  $("#demoButtonClose").addClass("d-none")
})


