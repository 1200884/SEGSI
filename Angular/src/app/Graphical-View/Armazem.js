import * as THREE from "three";

export default class Armazem extends THREE.Mesh{
    constructor(){
        super();
        this.triangulos = 16;
        this.raio = 0.8;
        this.idArmazem = 0;
        this.bases = [];
        this.object = new THREE.Group();
        const texture = new THREE.TextureLoader().load('assets/rotunda2.jpg');
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        let geometry= new THREE.CircleGeometry(this.raio,this.triangulos);
        let material = new THREE.MeshBasicMaterial({color: 0x808080, map: texture});
        let face = new THREE.Mesh(geometry, material);
        face.position.set(0,0.1,0);
        face.rotation.x = -Math.PI/2;
        var ud = face.userData;
        ud.name="Armazem";
        ud.description="";
        this.object.add(face);
        this.initialize();
    }
    initialize(){
    }
}
