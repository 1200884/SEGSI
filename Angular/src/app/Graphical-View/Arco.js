import * as THREE from "three";

export default class Arco extends THREE.Mesh{
    constructor(size, armazemOrigem, armazemDestino) {
        super();
        this.armazemOrigem = armazemOrigem;
        this.armazemDestino = armazemDestino;
        this.rotationVertical = 0;
        this.rotationHorizontal = 0;
        this.size = size -1.5;
        this.width = 0.25;
        let geometry= new THREE.BoxGeometry(this.size,this.width,this.width);
        this.object = new THREE.Group();
        let material = new THREE.MeshBasicMaterial({color: 0x808080});
        let cube = new THREE.Mesh(geometry,material);
        cube.position.set(0,-0.28,0);
        var ud = cube.userData;
        ud.name="Arco";
        this.object.add(cube);
        this.initialize();

    }

    initialize(){
    }
}