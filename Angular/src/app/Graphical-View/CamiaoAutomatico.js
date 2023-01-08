import * as THREE from "three";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

export default class CamiaoAutomatico extends THREE.Mesh {

    //percurso = [rotunda, ponte, rotunda...]
    constructor() {
        super();
        this.object = new THREE.Group();
        const loader = new GLTFLoader();
        loader.load('assets/truck.glb', (gltf) => {
            const face = gltf.scene;
            gltf.scene.scale.set(0.07, 0.07, 0.07);
            this.object.add(face);
            var ud = face.userData;
            ud.name = "Truck";
            ud.description = "";
        })
    }
}