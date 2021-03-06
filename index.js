import * as THREE from 'https://unpkg.com/three@0.123.0/build/three.module.js';
import { OrbitControls } from "https://unpkg.com/three@0.123.0/examples/jsm/controls/OrbitControls.js";

var scene, renderer, camera;
var controls;
var raycaster;
var mouse;

init();
animate();

function init()
{
    renderer = new THREE.WebGLRenderer({alpha:true});
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);
    scene = new THREE.Scene();
    renderer.setClearColor(0x000000,0 ); 
    camera = new THREE.PerspectiveCamera (45,width/height,1,10000);
    camera.position.set(200,200,200);
    camera.lookAt (0,0,0); 
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed=10.0;
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    loadTextures();
}

function loadTextures(){
    var loader = new THREE.TextureLoader();
    loader.load('saikik.png',
        function ( texture ) {
            var geometry = new THREE.BoxGeometry(50,50,50);
            var material = new THREE.MeshBasicMaterial({map:texture});
            var box = new THREE.Mesh(geometry,material);
            scene.add(box);
    });

    loader.load('levi.jpg',
        function ( texture ) {
            var geometry = new THREE.BoxGeometry(50,50,50);
            var material = new THREE.MeshBasicMaterial({map:texture});
            var box = new THREE.Mesh(geometry,material);
            box.position.x=100;
            scene.add(box);
    });

    loader.load('lalouche.jpg',
    function ( texture ) {
        var geometry = new THREE.BoxGeometry(50,50,50);
        var material = new THREE.MeshBasicMaterial({map:texture});
        var box = new THREE.Mesh(geometry,material);
        box.position.x=-100;
        scene.add(box);
    });

    loader.load('shirogane.jpg',
    function ( texture ) {
        var geometry = new THREE.BoxGeometry(50,50,50);
        var material = new THREE.MeshBasicMaterial({map:texture});
        var box = new THREE.Mesh(geometry,material);
        box.position.y=100;
        scene.add(box);
    });

    loader.load('naruto.jpg',
    function ( texture ) {
        var geometry = new THREE.BoxGeometry(50,50,50);
        var material = new THREE.MeshBasicMaterial({map:texture});
        var box = new THREE.Mesh(geometry,material);
        box.position.y=-100;
        scene.add(box);
    });
}

function animate()
{
    controls.update();
    requestAnimationFrame ( animate );  

    raycaster.setFromCamera( mouse, camera );
	const intersects = raycaster.intersectObjects( scene.children );
	for ( let i = 0; i < intersects.length; i ++ ) {
		intersects[ i ].object.material.color.set( 0xF22FFF );
    }
    
    renderer.render (scene, camera);
}

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

window.addEventListener( 'mousemove', onMouseMove, false );