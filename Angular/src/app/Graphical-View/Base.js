import * as THREE from "three";


export default class Base extends THREE.Mesh{
    constructor() {
        super();
        let geometry= new THREE.BoxGeometry(1,0.25,0.25);
        let material = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.object = new THREE.Group();
        let cube = new THREE.Mesh(geometry,material);
        cube.position.set(0.5,-0.05,0);
        this.object.add(cube);
        this.initialize();

    }

    initialize(){
    }
}