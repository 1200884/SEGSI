import * as THREE from "three";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

/*
 * parameters = {
 *  textureUrl: String
 * }*/

export default class Armazem extends THREE.Mesh{
    constructor(parameters) {
        super();
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }
        this.object = new THREE.Group();
        let geometry= new THREE.CircleGeometry(0.1,16);
        let material = new THREE.MeshBasicMaterial({color: 0xffffff});
        let face = new THREE.Mesh(geometry, material);
        face.position.set(0.0, 0.1, 0);
        face.rotation.x = -Math.PI/2;
        this.object.add(face);

        const loader = new GLTFLoader();
            loader.load('assets/warehouse.glb', (gltf) => {
                const root = gltf.scene;
                gltf.scene.scale.set(0.003,0.003,0.003);
                root.position.setX(0);
                root.position.setY(0.1);
                root.position.setZ(0);
                face.add(root);
              });
        this.initialize();

    }

    initialize(){
    }
}