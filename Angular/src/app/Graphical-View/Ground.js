import * as THREE from "three";

export default class Ground {
    constructor(size){
        const texture = new THREE.TextureLoader().load('./ground.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(size/30,size/30);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        const geometry = new THREE.PlaneGeometry( size, size );
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        this.object = new THREE.Mesh( geometry, material );
        this.object.rotation.x=-Math.PI/2;
    }
}