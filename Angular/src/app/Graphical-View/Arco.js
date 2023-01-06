import * as THREE from "three";

export default class Arco extends THREE.Mesh{
    constructor(size) {
        super();
        let geometry= new THREE.BoxGeometry(size-1.5,0.25,0.25);
        this.object = new THREE.Group();
        let material = new THREE.MeshStandardMaterial({color: 0x808080});
        let cube = new THREE.Mesh(geometry,material);
        cube.position.set(0,-0.28,0);
        var ud = cube.userData;
        ud.name="Arco";
        this.object.castShadow = true;
        this.object.add(cube);
        this.initialize();

    }

    initialize(){
    }
}