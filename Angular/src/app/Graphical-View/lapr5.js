import * as THREE from "three";
import View from "./View.js";
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
export default class LAPR5 {
    constructor(){
        this.gameRunning = false;
        this.scene = new THREE.Scene();
        this.view = new View();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.camera.rotateX(Math.PI/4);
        this.camera.position.z = 5;
        this.camera.position.y = 9;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        const controls = new OrbitControls( this.camera, this.renderer.domElement );
    }
    update(){
        if (!this.gameRunning) {
            this.scene.add(this.view.object);

            this.gameRunning = true;
        }else{
            this.renderer.render(this.scene,this.camera);
            this.renderer.clearDepth();
        if(this.camera.position.y<=1){
            this.camera.position.y=1;
        }
        }
    }
}