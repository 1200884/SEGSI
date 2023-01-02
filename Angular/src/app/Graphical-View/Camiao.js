import * as THREE from "three";

export default class Camiao extends THREE.Mesh{
    constructor(){
        super();
        this.object = new THREE.Group();
        let geometry= new THREE.CircleGeometry(0.8,16);
        let material = new THREE.MeshBasicMaterial({color: 0xff0000});
        let face = new THREE.Mesh(geometry, material);
        face.position.set(0,0.1,0);
        face.rotation.x = -Math.PI/2;
        var ud = face.userData;
        ud.name="Truck";
        ud.description="";
        this.object.add(face);
        this.initialize();
    }
    
    initialize(){
    }
}
