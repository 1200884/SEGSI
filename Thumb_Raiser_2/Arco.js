import * as THREE from "three";

/*
 * parameters = {
 *  textureUrl: String
 * }*/

export default class Arco extends THREE.Mesh{
    constructor(parameters,size) {
        super();
        
        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }

        let geometry= new THREE.BoxGeometry(size-0.2,0.05,0.05);
        this.object = new THREE.Group();
        let material = new THREE.MeshBasicMaterial({color: 0xff0000});
        let cube = new THREE.Mesh(geometry,material);
        cube.position.set(0,0,0);
        this.object.add(cube);
        this.initialize();

    }

    initialize(){
    }
}