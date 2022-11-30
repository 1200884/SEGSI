import * as THREE from "three";

export default class Arco extends THREE.Mesh{
    constructor(size) {
        super();

        let geometry= new THREE.BoxGeometry(size-1.5,0.25,0.25);
        this.object = new THREE.Group();
        let material = new THREE.MeshBasicMaterial({color: 0xff0000});
        let cube = new THREE.Mesh(geometry,material);
        cube.position.set(0,-0.28,0);
        this.object.add(cube);
        this.initialize();

    }

    initialize(){
    }
}