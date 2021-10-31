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

    }
    prevTime = time;
    renderer.render(scene, camera);
}

animate();