import * as THREE from 'three';
import { Vector2 } from 'three';
import { init } from './three';

const { camera, renderer, scene, player, controls } = init();

let prevTime = performance.now();

const animate = () => {
    if (renderer === undefined || scene === undefined || camera === undefined) {
        return;
    }

    requestAnimationFrame(animate);

    const time = performance.now();

    if (controls.isLocked === true) {
        const delta = (time - prevTime) / 1000;

        if (!player.flying) {
            player.velocity.x -= player.velocity.x * 10.0 * delta;
            player.velocity.z -= player.velocity.z * 10.0 * delta;
            player.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            player.direction.z = Number(player.moveForward) - Number(player.moveBackward);
            player.direction.x = Number(player.moveRight) - Number(player.moveLeft);
            player.direction.normalize(); // this ensures consistent movements in all directions

            if (player.moveForward || player.moveBackward) {
                player.velocity.z -= player.direction.z * 400.0 * delta;
            }
            if (player.moveLeft || player.moveRight) {
                player.velocity.x -= player.direction.x * 400.0 * delta;
            }

            controls.moveRight(- player.velocity.x * delta);
            controls.moveForward(- player.velocity.z * delta);

            controls.getObject().position.y += (player.velocity.y * delta); // new behavior

            if (controls.getObject().position.y < 10) {

                player.velocity.y = 0;
                controls.getObject().position.y = 10;

                player.canJump = true;
            }
        } else {
            const cameraVecter = controls.getDirection(new THREE.Vector3());
            const forward = Number(player.moveForward) - Number(player.moveBackward);
            const moveYaw = (Number(player.moveLeft) - Number(player.moveRight)) * Math.PI * 0.5;
            const controlVecter = new THREE.Vector3();

            const rlVector = new THREE.Vector2(
                cameraVecter.z * Math.cos(moveYaw) - cameraVecter.x * Math.sin(moveYaw),
                cameraVecter.z * Math.sin(moveYaw) + cameraVecter.x * Math.cos(moveYaw),
            ).normalize();

            if (player.moveForward || player.moveBackward) {
                controlVecter.add(cameraVecter)
                    .multiplyScalar(forward);
            }
            if (player.moveLeft || player.moveRight) {
                controlVecter.add(new THREE.Vector3(rlVector.y, 0, rlVector.x));
            }

            player.flyingDirection.multiplyScalar(400).add(controlVecter.multiplyScalar(10)).normalize();
            //  player.flyingDirection.multiplyScalar(400)
            //.add(controlVecter.multiplyScalar(400 * delta)).normalize();

            const position = controls.getObject().position;
            position.x += player.flyingDirection.x * 400.0 * delta;
            position.y += player.flyingDirection.y * 400.0 * delta;
            position.z += player.flyingDirection.z * 400.0 * delta;
        }
    }
    prevTime = time;
    renderer.render(scene, camera);
}

animate();