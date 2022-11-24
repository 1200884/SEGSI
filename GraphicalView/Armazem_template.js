import * as THREE from "three";

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
        this.initialize();

    }

    initialize(){
    }
}