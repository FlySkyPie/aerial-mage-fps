import * as THREE from 'three';

class PlayerMovmentState {
    moveForward: boolean;
    moveBackward: boolean;
    moveLeft: boolean;
    moveRight: boolean;
    canJump: boolean;

    velocity: THREE.Vector3;
    direction: THREE.Vector3;

    constructor() {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
    }
}

export default PlayerMovmentState;