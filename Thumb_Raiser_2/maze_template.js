import * as THREE from "three";
import Ground from "./ground_template.js";
import Armazem from "./Armazem_template.js";
import Base from "./Base.js";
import Arco from "./Arco.js";

/*
 * parameters = {
 *  url: String,
 *  credits: String,
 *  scale: Vector3
 * }
 */

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
            maze.armazem = new Armazem({ textureUrl: description.wallTextureUrl });
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
            armazem1.position.set(-4.9, 0.75, -4.116) //1
            maze.object.add(armazem1);
            armazem2.position.set(2.55, 0.51, -3.6) //2
            maze.object.add(armazem2);
            armazem3.position.set(4.9, 0.625, 4.9) //3
            maze.object.add(armazem3);
            armazem4.position.set(2.156, 2.19, -1.9) //4
            maze.object.add(armazem4);
            armazem5.position.set(3.67, 2.23, 1.094) //5
            maze.object.add(armazem5);
            armazem6.position.set(-0.5, 2.34, -4.9)  //6
            maze.object.add(armazem6);
            armazem7.position.set(-3.27, 0, -2.06)  //7
            maze.object.add(armazem7);
            armazem8.position.set(2.38, 1.275, -2.48)  //8 
            maze.object.add(armazem8);
            armazem9.position.set(4.89, 1.425, -0.73)  //9
            maze.object.add(armazem9);
            armazem10.position.set(0.85, 0.31, -4.2)  //10
            maze.object.add(armazem10);
            armazem11.position.set(-0.55, 2.03, -1.01)  //11
            maze.object.add(armazem11);
            armazem12.position.set(-0.24, 0.9375, -4.42)  //12
            maze.object.add(armazem12);
            armazem13.position.set(1.078, 1.41, -1.048)  //13 
            maze.object.add(armazem13);
            armazem14.position.set(-2.04, 0.16, -4.87)  //14
            maze.object.add(armazem14);
            armazem15.position.set(-0.09, 2.5, -2.205)  //15

            //let extremes = findExtreme(angles,armazem15,armazem5);
            maze.object.add(armazem15);
            armazem16.position.set(4.65, 0.47, -0.95);  //16
            maze.object.add(armazem16);
            armazem17.position.set(2.06, 1.56, -2.7)  //17
            maze.object.add(armazem17);



            createBridge(maze, description, armazem2, armazem8);


            maze.object.scale.set(maze.scale.x, maze.scale.y, maze.scale.z);
            maze.loaded = true;
        }

        function createBridge(maze, description, armazem1, armazem2) {
            maze.base = new Base({ textureUrl: description.wallTextureUrl });
            let base1;
            base1 = maze.base.object.clone();
            maze.object.add(base1);

            let base2;
            base2 = maze.base.object.clone();
            maze.object.add(base2);
            armazem1.add(base1);
            armazem2.add(base2);
            if (armazem1.position.y - armazem2.position.y < 0) {
                let armazem3 = armazem1;
                armazem1 = armazem2;
                armazem2 = armazem3;
            }
            let angles = pointEachOther(armazem1, armazem2);

            const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            const cube2 = new THREE.Mesh(geometry, material);
            let extreme1 = findExtreme(armazem1, armazem2);
            let extreme2 = findExtreme(armazem2, armazem1);

            extreme1[0] = armazem1.position.x + extreme1[0];
            extreme1[1] = armazem1.position.y;
            extreme1[2] = armazem1.position.z + extreme1[2];
            //um pouco a trolha, descobrir como por isto um pouco mais em condicoes estas 6 linhas
            extreme2[0] = armazem2.position.x + extreme2[0];
            extreme2[1] = armazem2.position.y;
            extreme2[2] = armazem2.position.z + extreme2[2];

            cube.position.set(extreme1[0], extreme1[1], extreme1[2]);
            cube2.position.set(extreme2[0], extreme2[1], extreme2[2]);
            maze.object.add(cube);
            maze.object.add(cube2);




            let p = Math.sqrt(Math.pow(extreme1[0] - extreme2[0], 2) + Math.pow(extreme1[1] - extreme2[1], 2) + Math.pow(extreme1[2] - extreme2[2], 2));

            maze.arco = new Arco({ textureUrl: description.wallTextureUrl }, p);
            let arco1;
            arco1 = maze.arco.object.clone();
            maze.object.add(arco1);

            arco1.rotateY(angles[0]);
            arco1.position.set((extreme1[0] + extreme2[0]) / 2, (extreme1[1] + extreme2[1]) / 2, (extreme1[2] + extreme2[2]) / 2);
            let desnivel = extreme1[1] - extreme2[1];
            arco1.rotateZ(-Math.atan(desnivel / p));
        }

        function pointEachOther(armazem, armazem1) {
            if (armazem.position.x - armazem1.position.x > 0) {
                let degrees = Math.atan2(armazem.position.x - armazem1.position.x, armazem.position.z - armazem1.position.z);
                armazem.rotateY(degrees + Math.PI / 2);
                armazem1.rotateY(-(Math.PI / 2 - degrees));
                let numbers = [];
                numbers.push(degrees + Math.PI / 2);
                numbers.push(-(Math.PI / 2 - degrees))
                return numbers;
            } else {
                let degrees = Math.atan2(armazem.position.x - armazem1.position.x, armazem.position.z - armazem1.position.z);
                armazem1.rotateY(degrees - Math.PI / 2);
                armazem.rotateY((Math.PI / 2 + degrees));
                let numbers = [];
                numbers.push((Math.PI / 2 + degrees));
                numbers.push(degrees - Math.PI / 2)
                return numbers;
            }
        }

        /*function findExtreme(angles, armazem, armazem1) {
            let armazens = [];
            let result = [];
            armazens.push(armazem);
            armazens.push(armazem1);
            for (var i = 0; i < 2; i++) {
                console.log(angles[i]);
                result.push(armazens[i].position.x + Math.cos(angles[i]) * 0.2);
                result.push(armazens[i].position.y);
                result.push(armazens[i].position.z + Math.sin(angles[i]) * 0.2);
            }
            return result;
        }*/

        function findExtreme(armazem1, armazem2) {
            let V = [armazem2.position.x - armazem1.position.x, armazem2.position.y - armazem1.position.y, armazem2.position.z - armazem1.position.z];
            let vNorm = Math.sqrt(Math.pow(V[0], 2) + Math.pow(V[1], 2) + Math.pow(V[2], 2));
            let i;
            for (i = 0; i < 3; i++) {
                V[i] = V[i] / vNorm * 0.2;
            }
            return V;
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