
import * as THREE from "three";

/*
 * parameters = {
 *  textureUrl: String
 * }*/

export default class Base extends THREE.Mesh{
    constructor(parameters) {
        super();
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }

        let geometry= new THREE.BoxGeometry(0.3,0.05,0.05);
        this.object = new THREE.Group();
        let material = new THREE.MeshBasicMaterial({color: 0xffff11});
        let cube = new THREE.Mesh(geometry,material);
        cube.position.set(0.1,0.05,0);
        this.object.add(cube);
        this.initialize();

    }

    initialize(){
    }
}