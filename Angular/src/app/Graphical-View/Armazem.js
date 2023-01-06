import * as THREE from "three";

export default class Armazem extends THREE.Mesh{
    constructor(){
        super();
        this.object = new THREE.Group();
        const texture = new THREE.TextureLoader().load('assets/rotunda2.jpg');
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        let geometry= new THREE.CircleGeometry(0.8,16);
        let material = new THREE.MeshStandardMaterial({color: 0x808080, map: texture});
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
