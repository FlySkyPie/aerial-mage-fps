import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import PlayerClient from './PlayerMovmentState';

export const init = () => {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);

    const player = new PlayerClient();

    camera.position.set(200, 100, 200);

    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

    hemiLight.position.set(0, 200, 0);

    directionalLight.position.set(0, 200, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 180;
    directionalLight.shadow.camera.bottom = - 100;
    directionalLight.shadow.camera.left = - 120;
    directionalLight.shadow.camera.right = 120;

    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;

    if (!Array.isArray(grid.material)) {
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
    }

    scene.add(hemiLight);
    scene.add(directionalLight);
    scene.add(ground);
    scene.add(grid);

    //Create and add demo cube to the scene.
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.castShadow = true;
    mesh.position.y = 25;
    scene.add(mesh);

    const controls = new PointerLockControls(camera, document.body);
    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions?.addEventListener('click', () => {
        console.log('click');
        controls.lock();
    });

    controls.addEventListener('lock', () => {
        if (instructions === null || blocker === null) {
            return;
        }
        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock', () => {
        if (instructions === null || blocker === null) {
            return;
        }
        blocker.style.display = 'block';
        instructions.style.display = '';
    });

    scene.add(controls.getObject());

    const onKeyDown = (event: KeyboardEvent) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                player.moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                player.moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                player.moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                player.moveRight = true;
                break;

            case 'Space':
                if (player.canJump === true) player.velocity.y += 350;
                player.canJump = false;
                break;
        }
    };

    const onKeyUp = (event: KeyboardEvent) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                player.moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                player.moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                player.moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                player.moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    //Setup renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMap.enabled = true;
    console.log('test');
    document.body.appendChild(renderer.domElement);


    const onWindowResize = () => {
        if (camera === undefined || renderer === undefined) {
            return;
        }

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    return { scene, camera, renderer, player, controls }
}