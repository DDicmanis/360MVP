let camera, scene, renderer, clock, rightArm;

init();
animate();

function createCssRenderer() {

  var cssRenderer = new THREE.CSS3DRenderer();

  cssRenderer.setSize(window.innerWidth, window.innerHeight);

  cssRenderer.domElement.style.position = 'absolute';
  renderer.domElement.style.zIndex = 0;
  cssRenderer.domElement.style.top = 0;

  return cssRenderer;
}
function createPlane(w, h, position, rotation) {

  var material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0.0,
    side: THREE.DoubleSide
  });

  var geometry = new THREE.PlaneGeometry(w, h);

  var mesh = new THREE.Mesh(geometry, material);

  mesh.position.x = position.x;
  mesh.position.y = position.y;
  mesh.position.z = position.z;

  mesh.rotation.x = rotation.x;
  mesh.rotation.y = rotation.y;
  mesh.rotation.z = rotation.z;

  return mesh;
}
function createCssObject(w, h, position, rotation, url) {

  var html = [

    '<div style="width:' + w + 'px; height:' + h + 'px;">',
    '<iframe src="' + url + '" width="' + w + '" height="' + h + '">',
    '</iframe>',
    '</div>'

  ].join('\n');

  var div = document.createElement('div');

  $(div).html(html);

  var cssObject = new THREE.CSS3DObject(div);

  cssObject.position.x = position.x;
  cssObject.position.y = position.y;
  cssObject.position.z = position.z;

  cssObject.rotation.x = rotation.x;
  cssObject.rotation.y = rotation.y;
  cssObject.rotation.z = rotation.z;

  return cssObject;
}
function create3dPage(w, h, position, rotation, url) {

  var plane = createPlane(w, h, position, rotation);

  scene.add(plane);

  var cssObject = createCssObject(w, h, position, rotation, url);

  cssScene.add(cssObject);
}

function init() {

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.set(8, 3, 7);
  camera.lookAt(-2, 1.6, -4);

  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // const light = new THREE.HemisphereLight(0xbbbbff, 0x444422);
  // light.position.set(0, 1, 0);
  // scene.add(light);

  // model
  const loader = new THREE.GLTFLoader();
  loader.load('assets/3d/Room.glb', function (gltf) {

    const model = gltf.scene;
    sofa = model.getObjectByName("sofa")
    sofa.position.y = (0)
    rightArm = model.getObjectByName('mixamorigRightArm');
    table = model.getObjectByName("table")
    table.position.y = (0);
    scene.add(model);


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
  renderer = new THREE.WebGLRenderer({ antialias: true });
  cssRenderer = createCssRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
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
$(document).on("click", "#gotToShowcaseButton", function () {
  camera.position.set(0.136, 3.236, 7.096);
  camera.lookAt(0.136, 3.236, -1)
  $("#overlay").addClass("d-none")
  $("#contactUsButton").addClass("d-none")
  $("#contactPopUp").addClass("d-none")
})
$(document).on("click", "#showcaseLink", function () {
  camera.position.set(0.136, 3.236, 7.096);
  camera.lookAt(0.136, 3.236, -1)
  $("#overlay").addClass("d-none")
  $("#contactUsButton").addClass("d-none")
  $("#contactPopUp").addClass("d-none")
  $("#demoButton").addClass("d-none")
  $("#iframe360").addClass("d-none")

})

$(document).on("click", "#demoLink", function () {
  camera.position.set(6.994, 2.501, -0.582);
  camera.lookAt(0, 2.501, -0.5)
  $("#overlay").addClass("d-none")
  $("#contactUsButton").removeClass("d-none")
  $("#contactPopUp").addClass("d-none")
})
$(document).on("click", "#demoLink", function () {
  $("#overlay").addClass("d-none")
  $("#contactUsButton").addClass("d-none")
  $("#contactPopUp").addClass("d-none")
  $("#demoButton").removeClass("d-none")
  $("#iframe360").removeClass("d-none")
})

$(document).on("click", "#demoBigButton", function () {
  $("#iframe360").addClass("css--iframe-big")
  $("#demoButtonClose").removeClass("d-none")
})
$(document).on("click", "#demoBigButtonClose", function () {
  $("#iframe360").removeClass("css--iframe-big")
  $("#demoButtonClose").addClass("d-none")
})
