import * as THREE from "three";
import Ground from "./ground_template.js";
import Armazem from "./Armazem_template.js";
import Base from "./Base.js";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */


let scene3D;

export default class Maze {
    constructor(parameters) {
        function onLoad(maze, description) {
            // Store the maze's map and size
            maze.map = description.map;
            maze.size = description.size;
            // Create a group of objects
            maze.object = new THREE.Group();

            // Create the ground
            maze.ground = new Ground({ textureUrl: description.groundTextureUrl, size: description.size });
            maze.object.add(maze.ground.object);

            // Create a wall
            maze.armazem = new Armazem({textureUrl: description.wallTextureUrl});
            maze.base = new Base({textureUrl: description.wallTextureUrl});
            //maze.armazem3D.loaded=false;
            let base1;
            base1 = maze.base.object.clone();
            maze.object.add(base1);
            let base2;
            base2 = maze.base.object.clone();
            maze.object.add(base2);
            // Build the maze
        

            const light = new THREE.DirectionalLight(0xffffff);
            light.position.set(-1,-1,1);
            maze.object.add(light);

            let armazem1;
            armazem1 = maze.armazem.object.clone();
            let armazem2;
            armazem2 = maze.armazem.object.clone();
            let armazem3;
            armazem3 = maze.armazem.object.clone();
            let armazem4;
            armazem4 = maze.armazem.object.clone();
            let armazem5;
            armazem5 = maze.armazem.object.clone();
            let armazem6;
            armazem6 = maze.armazem.object.clone();
            let armazem7;
            armazem7 = maze.armazem.object.clone();
            let armazem8;
            armazem8 = maze.armazem.object.clone();
            let armazem9;
            armazem9 = maze.armazem.object.clone();
            let armazem10;
            armazem10 = maze.armazem.object.clone();
            let armazem11;
            armazem11 = maze.armazem.object.clone();
            let armazem12;
            armazem12 = maze.armazem.object.clone();
            let armazem13;
            armazem13 = maze.armazem.object.clone();
            let armazem14;
            armazem14 = maze.armazem.object.clone();
            let armazem15;
            armazem15 = maze.armazem.object.clone();
            let armazem16;
            armazem16 = maze.armazem.object.clone();
            let armazem17;
            armazem17 = maze.armazem.object.clone();
            
            //x = r * cos(t) + x0
            //y = r * sin(t) + y0
            armazem1.position.set(-4.9,0.75,-4.116) //1
            maze.object.add(armazem1);
            armazem2.position.set(2.55,0.51,-3.6) //2
            maze.object.add(armazem2);
            armazem3.position.set(4.9,0.625,4.9) //3
            maze.object.add(armazem3);
            armazem4.position.set(2.156,2.19,-1.9) //4
            maze.object.add(armazem4);
            armazem5.position.set(3.67,2.23,1.094) //5
            maze.object.add(armazem5);
            armazem6.position.set(-0.5,2.34,-4.9)  //6
            maze.object.add(armazem6);
            armazem7.position.set(-3.27,0,-2.06)  //7
            maze.object.add(armazem7);
            armazem8.position.set(2.38,1.275,-2.48)  //8 
            maze.object.add(armazem8);
            armazem9.position.set(4.89,1.425,-0.73)  //9
            maze.object.add(armazem9);
            armazem10.position.set(0.85,0.31,-4.2)  //10
            maze.object.add(armazem10);
            armazem11.position.set(-0.55,2.03,-1.01)  //11
            maze.object.add(armazem11);
            armazem12.position.set(-0.24,0.9375,-4.42)  //12
            maze.object.add(armazem12);
            armazem13.position.set(1.078,1.41,-1.048)  //13 
            maze.object.add(armazem13);
            armazem14.position.set(-2.04,0.16,-4.87)  //14
            maze.object.add(armazem14);
            armazem15.position.set(-0.09,2.5,-2.205)  //15

            armazem5.add(base1);
            armazem15.add(base2);
            pointEachOther(armazem15,armazem5);
            maze.object.add(armazem15);
            armazem16.position.set(4.65,0.47,-0.95)  //16
            maze.object.add(armazem16);
            armazem17.position.set(2.06,1.56,-2.7)  //17
            maze.object.add(armazem17);
            maze.object.scale.set(maze.scale.x, maze.scale.y, maze.scale.z);
            maze.loaded = true;
          
           /* casinhas(armazem7.position.x, armazem7.position.y, armazem7.position.z, maze);
            casinhas(armazem1.position.x, armazem1.position.y, armazem1.position.z, maze);
            casinhas(armazem2.position.x, armazem2.position.y, armazem2.position.z, maze);
            casinhas(armazem3.position.x, armazem3.position.y, armazem3.position.z, maze);
            casinhas(armazem4.position.x, armazem4.position.y, armazem4.position.z, maze);
            casinhas(3,0,3, maze);

            //this.maze.armazem3D.loaded = false;*/

        }
/*
        function casinhas(x,y,z, maze){

            const loader = new GLTFLoader();
            loader.load('assets/warehouse.glb', (gltf) => {
                const root = gltf.scene;
                gltf.scene.scale.set(0.003,0.003,0.003);
                root.position.setX(x);
                root.position.setY(y+0.1);
                root.position.setZ(z);
                maze.object.add(root);
              });
<<<<<<< HEAD
        }*/
=======
        }
        function longTox(longitude){
            return ((100/0.5162)*(longitude-8.2451)-50)*15/50;
        }
        function latToy(latitude){
            return ((100/1.2728)*(latitude-40.8387)-50)*15/50;
        }
        function altToz(alt){
            return (50/800*alt)/10;
        }
>>>>>>> 36db49725f2a275252c744e20f7196e70c1fd116

        function pointEachOther(armazem,armazem1){
            if(armazem.position.x-armazem1.position.x>0){
                let degrees= Math.atan2(armazem.position.x-armazem1.position.x,armazem.position.z-armazem1.position.z);
                armazem.rotateY(degrees+Math.PI/2);
                armazem1.rotateY(-(Math.PI/2-degrees));
            }else{
                let degrees= Math.atan2(armazem.position.x-armazem1.position.x,armazem.position.z-armazem1.position.z);
                armazem1.rotateY(degrees-Math.PI/2);
                armazem.rotateY((Math.PI/2+degrees));
            }
        }
        
        function onProgress(url, xhr) {
            console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
        }

        function onError(url, error) {
            console.error("Error loading resource " + url + " (" + error + ").");
        }

        for (const [key, value] of Object.entries(parameters)) {
            Object.defineProperty(this, key, { value: value, writable: true, configurable: true, enumerable: true });
        }
        this.loaded = false;

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType("json");

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            description => onLoad(this, description),

            // onProgress callback
            xhr => onProgress(this.url, xhr),

            // onError callback
            error => onError(this.url, error)

            
        );
     
    }
}