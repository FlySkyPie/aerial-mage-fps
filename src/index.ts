import { init } from './three';

const { camera, renderer, scene } = init();

const animate = () => {
    if (renderer === undefined || scene === undefined || camera === undefined) {
        return;
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();