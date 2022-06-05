import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 24;
camera.position.y = 8;
camera.position.z = 32;
scene.background = new THREE.Color(0x202020);

renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxDistance = 56;

// Axes helper
// const axesHelper = new THREE.AxesHelper( 800 );
// scene.add( axesHelper );

// Scene light
const light = new THREE.DirectionalLight(0xffffff, 1);
const lightTwo = new THREE.DirectionalLight(0xffffff, 1);
const lightThree = new THREE.DirectionalLight(0xffffff, 1);
const lightFour = new THREE.DirectionalLight(0xffffff, 1);
const lightFive = new THREE.DirectionalLight(0xffffff, 1);
const lightSix = new THREE.DirectionalLight(0xffffff, 1);

light.position.set(0,8,0);
lightTwo.position.set(0,-8,0);
lightThree.position.set(8,-8,0);
lightFour.position.set(-8,-8,0);
lightFive.position.set(8,0,0);
lightSix.position.set(-8,0,0);

scene.add(light, lightTwo, lightThree, lightFour, lightFive, lightSix);

// Instantiate a loader
const loader = new GLTFLoader();
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );
// Load a glTF resource
let mask = loader.load(
	// resource URL
	'/ubmask.gltf',
	// called when the resource is loaded
	function ( gltf ) {
		scene.add( gltf.scene );
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.x = 0;
        gltf.scene.position.y = -4;
        gltf.scene.position.z = 0;
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

// Change view when window is resized
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

// Recursive function - essentially a game loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();