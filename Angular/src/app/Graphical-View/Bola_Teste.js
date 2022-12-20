import * as THREE from "three";

export default class Bola_Teste extends THREE.Mesh{
    constructor(){
        super();
        this.object = new THREE.Group();
        let geometry= new THREE.CircleGeometry(0.8,16);
        let material = new THREE.MeshBasicMaterial({color: 0x808080});
        let circulo = new THREE.Mesh(geometry, material);
        circulo.position.set(0,0.1,0);
        this.object.add(circulo);
        this.initialize();
    }
    
    initialize(){
    }
}
