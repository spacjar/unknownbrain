import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canv'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 0;
camera.position.y = 150;
camera.position.x = 300;

renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );

// Materials
const material = new THREE.MeshStandardMaterial(
    {
        color: 0xFF6347,
        wireframe: true
    }
)
const maskFront = new THREE.MeshStandardMaterial(
    {
        color: 0x000000,
        wireframe: true
    }
);

const whiteMat = new THREE.MeshStandardMaterial(
    {
        color: 0xFFFFFF,
        wireframe: true
    }
);



// Scene light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

scene.background = 0x000000;

const maskTexture = new THREE.TextureLoader().load('ubmask_lower.mtl');

const torus = new THREE.Mesh( geometry, material );

// Obj and mtl loader
// const onProgress = function ( xhr ) {

//     if ( xhr.lengthComputable ) {

//         const percentComplete = xhr.loaded / xhr.total * 100;
//         console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

//     }

// };

// new MTLLoader()
// .load( '../src/assets/ubmask_lower.mtl', function ( materials ) {
//     materials.preload();

//     new OBJLoader()
//         .setMaterials( materials )
//         .load( '..src/assets/ubmask_lower.obj', function ( object ) {

//             object.position.y = - 95;
//             scene.add( object );

//         }, onProgress );

// } );

// const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const objLoader = new OBJLoader();
objLoader.load(
    '../src/assets/models/ubmask_lower.obj',
    (object) => {
        object.children[0].material = material;
        object.children[1].material = whiteMat;
        object.children[2].material = material;
        scene.add(object);
        function maskAnimate() {
            requestAnimationFrame(maskAnimate);
            object.rotation.y += 0.005;
        }
        maskAnimate();
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
)

scene.add(torus);

// function addStar() {
//     const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//     const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//     const star = new THREE.Mesh(geometry, material);
  
//     const [x, y, z] = Array(3)
//       .fill()
//       .map(() => THREE.MathUtils.randFloatSpread(100));
  
//     star.position.set(x, y, z);
//     scene.add(star);
//   }

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
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();