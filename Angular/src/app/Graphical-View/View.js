import * as THREE from "three";
import Ground from "./Ground.js";
import Armazem from "./Armazem.js";
import Base from "./Base.js";
import Arco from "./Arco.js";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import Bola_Teste from "./Bola_Teste.js";

export default class View {
    constructor() {
      
        
        function OnLoad(view) {
          
            let txt = readFile();
            view.object = new THREE.Group();
            let size = 200;
            view.ground = new Ground(size);
            view.object.add(view.ground.object);
            view.bola= new Bola_Teste();
            let bola= view.bola.object;
            view.object.add(bola);
            
            let coordinates = handleJSON(txt, view);
            let armazens = [];
            for (var i = 1; i < coordinates.length; i++) {
                view.armazem = new Armazem();
                let armazem1 = view.armazem.object;
                armazem1.position.set(coordinates[i][0], coordinates[i][1], coordinates[i][2]);
                armazem1.children[0].userData.description="Id:"+i+"<br>Name:"+coordinates[i][3];
                view.object.add(armazem1);
                armazens[i] = armazem1;
                console.log(armazens)
                warehouseModel3D(coordinates[i][0], coordinates[i][1], coordinates[i][2], view);
                truckModel3D(coordinates[i][0],coordinates[i][1],coordinates[i][2], view);
            }
            

            view.base = new Base();
            createBridge(view, armazens[1], armazens[16]);
            createBridge(view, armazens[16], armazens[3]);
            createBridge(view, armazens[2], armazens[9]);
            createBridge(view, armazens[2], armazens[15]);
            createBridge(view, armazens[3], armazens[10]);
            createBridge(view, armazens[3], armazens[5]);
            createBridge(view, armazens[4], armazens[6]);
            createBridge(view, armazens[4], armazens[9]);
            createBridge(view, armazens[16], armazens[14]);
            createBridge(view, armazens[8], armazens[13]);
            createBridge(view, armazens[7], armazens[5]);
            createBridge(view, armazens[17], armazens[13]);
            createBridge(view, armazens[12], armazens[1]);
            createBridge(view, armazens[8], armazens[5]);
            createBridge(view, armazens[10], armazens[11]);
            createBridge(view, armazens[14], armazens[7]);
            createBridge(view, armazens[15], armazens[8]);
            createBridge(view, armazens[6], armazens[11]);
            createBridge(view, armazens[9], armazens[6]);
            createBridge(view, armazens[12], armazens[7]);
            createBridge(view, armazens[5], armazens[17]);
            createBridge(view, armazens[15], armazens[1]);
            createBridge(view, armazens[13], armazens[10]);
            createBridge(view, armazens[4], armazens[11]);
            createBridge(view, armazens[16], armazens[12]);
            bola.position.set(armazens[5].position.x,armazens[5].position.y,armazens[5].position.z);
        }

        function readFile() {
            var txt = '';
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                    txt = xmlhttp.responseText;
                }
            };
            xmlhttp.open("GET", "https://localhost:5001/api/Warehouses", false);
            xmlhttp.send();
            var txt2 = JSON.parse(txt);
            console.log(txt2);
            return txt2;
        }

        function createBridge(view, armazem1, armazem2) {
            let base1 = view.base.object.clone();
            view.object.add(base1);

            let base2 = view.base.object.clone();
            view.object.add(base2);
            armazem1.add(base1);
            armazem2.add(base2);
            if (armazem1.position.y - armazem2.position.y < 0) {
                let base3 = base1;
                base1 = base2;
                base2 = base3;
                let armazem3 = armazem1;
                armazem1 = armazem2;
                armazem2 = armazem3;
            }
            let angles = pointEachOther(armazem1, armazem2, base1, base2);

            let extreme1 = findExtreme(armazem1, armazem2);
            let extreme2 = findExtreme(armazem2, armazem1);

            extreme1[0] = armazem1.position.x + extreme1[0];
            extreme1[1] = armazem1.position.y + 0.25;
            extreme1[2] = armazem1.position.z + extreme1[2];
            //um pouco a trolha, descobrir como por isto um pouco mais em condicoes estas 6 linhas
            extreme2[0] = armazem2.position.x + extreme2[0];
            extreme2[1] = armazem2.position.y + 0.25;
            extreme2[2] = armazem2.position.z + extreme2[2];

            let p = Math.sqrt(Math.pow(extreme1[0] - extreme2[0], 2) + Math.pow(extreme1[1] - extreme2[1], 2) + Math.pow(extreme1[2] - extreme2[2], 2));
            let desnivel = extreme1[1] - extreme2[1];
            if (desnivel > 2) {
                p += 0.2;
                view.arco = new Arco(p + 0.20);
                p -= 2;
            } else {
                p += 0.3;
                view.arco = new Arco(p + 0.30);
                p -= 2;
            }
            let arco1;
            arco1 = view.arco.object.clone();
            view.object.add(arco1);

            arco1.rotateY(angles[0]);
            arco1.position.set((extreme1[0] + extreme2[0]) / 2, (extreme1[1] + extreme2[1] - 0.05) / 2, (extreme1[2] + extreme2[2]) / 2);
            arco1.rotateZ(-Math.atan(desnivel / (p)));
        }

        function pointEachOther(armazem, armazem1, base1, base2) {
            if (armazem.position.x - armazem1.position.x > 0) {
                let degrees = Math.atan2(armazem.position.x - armazem1.position.x, armazem.position.z - armazem1.position.z);
                base1.rotateY(degrees + Math.PI / 2);
                base2.rotateY(-(Math.PI / 2 - degrees));
                let numbers = [];
                numbers.push(degrees + Math.PI / 2);
                numbers.push(-(Math.PI / 2 - degrees))
                return numbers;
            } else {
                let degrees = Math.atan2(armazem.position.x - armazem1.position.x, armazem.position.z - armazem1.position.z);
                base2.rotateY(degrees - Math.PI / 2);
                base1.rotateY((Math.PI / 2 + degrees));
                let numbers = [];
                numbers.push((Math.PI / 2 + degrees));
                numbers.push(degrees - Math.PI / 2)
                return numbers;
            }
        }

        function findExtreme(armazem1, armazem2) {
            let V = [armazem2.position.x - armazem1.position.x, armazem2.position.y - armazem1.position.y, armazem2.position.z - armazem1.position.z];
            let vNorm = Math.sqrt(Math.pow(V[0], 2) + Math.pow(V[1], 2) + Math.pow(V[2], 2));
            let i;
            for (i = 0; i < 3; i++) {
                V[i] = V[i] / vNorm * 0.2;
            }
            return V;
        }
        function longTox(longitude) {
            return ((100 / 0.5162) * (longitude - 8.2451) - 50) * 15 / 50;
        }
        function latToz(latitude) {
            return ((100 / 1.2728) * (latitude - 40.8387) - 50) * 15 / 50;
        }
        function altToy(alt) {
            return (50 / 800 * alt) / 10;
        }
        function handleJSON(txt) {
            let coordinates = new Array(txt.length + 1);
            for (var i = 0; i < txt.length; i++) {
                var id = (txt[i].id);
                coordinates[id] = new Array(3);
                var x = longTox(txt[i].longitude);
                var y = altToy(txt[i].altitude);
                var z = latToz(txt[i].latitude);
                var description = (txt[i].description);
                coordinates[id][0] = x;
                coordinates[id][1] = y;
                coordinates[id][2] = z;
                coordinates[id][3] = description;
            }
            return coordinates;
        }
        function warehouseModel3D(x, y, z, view) {

            const loader = new GLTFLoader();
            loader.load('assets/warehouse.glb', (gltf) => {
                const root = gltf.scene;
                gltf.scene.scale.set(0.007, 0.007, 0.007);
                root.position.setX(x);
                root.position.setY(y + 0.1);
                root.position.setZ(z);
                view.object.add(root);
            });
        }
        function truckModel3D(x, y, z, view) {

            const loader = new GLTFLoader();
            loader.load('assets/truck.glb', (gltf) => {
                const root = gltf.scene;
                gltf.scene.scale.set(0.07, 0.07, 0.07);
                root.position.setX(x + 0.65);
                root.position.setY(y + 0.25);
                root.position.setZ(z);
                view.object.add(root);
            })
        }
        OnLoad(this);
        
    }
    
    update() {
            
            if (this.maze.loaded && this.player.loaded) { 
                // If all resources have been loaded
                // Add the maze, the player and the lights to the scene
                this.scene3D.add(this.maze.object);
                /* To-do #11 - Add the player to the scene
                    - player: this.player.object*/
                this.scene3D.add(this.player.object); 
                this.scene3D.add(this.lights.object);

                // Create the clock
                this.clock = new THREE.Clock();

                // Create model animations (states, emotes and expressions)
                this.animations = new Animations(this.player.object, this.player.animations);

                // Set the player's position and direction
                this.bola.position.set(armazens[5].position.x,armazens[5].position.y,armazens[5].position.z);
                this.Bola_Teste.direction = this.maze.initialDirection;

        }
        else {
            // Update the model animations
            const deltaT = this.clock.getDelta();
            this.animations.update(deltaT);

                
                    /* To-do #12 - Compute the distance covered by the player
                        - start by assuming that the player is walking:
                            covered distance = walking speed * elapsed time
                        - walking speed: this.player.walkingSpeed
                        - elapsed time: deltaT*/
                    let coveredDistance = this.player.walkingSpeed*deltaT; 
                    /* To-do #13 - Compute the player's direction increment
                        - assume that the player is turning left or right while walking:
                            direction increment = turning speed * elapsed time
                        - turning speed: this.player.turningSpeed
                        - elapsed time: deltaT*/
                    let directionIncrement = this.player.turningSpeed*deltaT; 
                    if (this.player.keyStates.run) {
                        /* To-do #14 - Adjust the distance covered by the player
                            - now assume that the player is running:
                            - multiply the covered distance by this.player.runningFactor*/

                        coveredDistance*=this.player.runningFactor; 
                        /* To-do #15 - Adjust the player's direction increment
                            - now assume that the player is running:
                            - multiply the direction increment by this.player.runningFactor*/
                        directionIncrement*=this.player.runningFactor;
                    }
                    /* To-do #16 - Check if the player is turning left or right and update the player direction accordingly by adding or subtracting the direction increment
                        - left key state: this.player.keyStates.left
                        - right key state: this.player.keyStates.right
                        - current direction: this.player.direction
                        - direction increment: directionIncrement
*/
                    if (this.player.keyStates.left) { // The player is turning left
                        this.player.direction+=directionIncrement;
                    }
                    else if (this.player.keyStates.right) { // The player is turning right
                        this.player.direction-=directionIncrement;
                    } 
                    const direction = THREE.MathUtils.degToRad(this.player.direction);
                    /* To-do #17 - Check if the player is moving backward or forward and update the player position accordingly
                        - backward key state: this.player.keyStates.backward
                        - forward key state: this.player.keyStates.forward
                        - current position: this.player.position
                        - covered distance: coveredDistance
                        - current direction: direction (expressed in radians)

                        - use the parametric form of the circle equation to compute the player's new position:
                            x = r * sin(t) + x0
                            y = y0;
                            z = r * cos(t) + z0

                            where:
                            - (x, y, z) are the player's new coordinates
                            - (x0, y0, z0) are the player's current coordinates
                            - r is the distance covered by the player
                            - t is the player direction (expressed in radians)*/
                            
                    if (this.Bola_Teste.keyStates.backward) { // The truck is moving backward
                         const newPosition = new THREE.Vector3(-coveredDistance*Math.sin(direction), 0, -coveredDistance*Math.cos(direction)).add(this.Bola_Teste.position);
                    }
                   else if (this.Bola_Teste.keyStates.forward) { // The truck is moving forward
                        const newPosition = new THREE.Vector3(coveredDistance*Math.sin(direction),0,coveredDistance*Math.cos(direction)).add(this.Bola_Teste.position);
                   }
        }
    }           
}
