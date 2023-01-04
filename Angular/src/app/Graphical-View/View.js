import * as THREE from "three";
import Ground from "./Ground.js";
import Armazem from "./Armazem.js";
import Base from "./Base.js";
import Arco from "./Arco.js";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import Bola_Teste from "./Bola_Teste.js";
import Camiao from "./Camiao.js";

export default class View {
    constructor() {
        let estradas=[]; 
        let isValidPosition=false;
        function OnLoad(view) {
          
            let txt = getWarehouses();
            view.object = new THREE.Group();
            let size = 200;
            view.ground = new Ground(size);
            view.object.add(view.ground.object);
           
            





            let coordinates = handleJSON_warehouses(txt, view);
            let armazens = [];
            for (var i = 1; i < coordinates.length; i++) {
                view.armazem = new Armazem();
                let armazem1 = view.armazem.object;
                armazem1.position.set(coordinates[i][0], coordinates[i][1], coordinates[i][2]);
                armazem1.children[0].userData.description="Id:"+i+"<br>Name:"+coordinates[i][3];
                view.object.add(armazem1);
                armazens[i] = armazem1;
                console.log(armazens);
                warehouseModel3D(coordinates[i][0], coordinates[i][1], coordinates[i][2], view);
            }
            let jsonTrucks = getTrucks();
            let trucksInfo = handleJSON_trucks(jsonTrucks,view);
          
            /*for (var i = 1; i < trucksInfo.length; i++){
                view.camiao = new Camiao();
                let camiao1 = view.camiao.object;
                camiao1.position.set(armazens[i].position.x,armazens[i].position.y,armazens[i].position.z);
                view.object.add(camiao1);
                camioes[i] = camiao1;
                console.log("----------------------------"+camioes+" i= "+i);
                if(i=2){movingtruck=camiao1;}
                // get do caminho para saber o path e atraves do path o armazem partida e chegada e atraves dos armazens as coordenadas para a posiçao
                // usei o armazem igual ao numero de camioes existentes (1=1, etc)
                truckModel3D(armazens[i].position.x,armazens[i].position.y,armazens[i].position.z, view);
            }*/

            view.bola = new Camiao();
            let bola = view.bola.object;
            bola.position.set(armazens[5].position.x+0.7,armazens[5].position.y+0.2,armazens[5].position.z);
            view.object.add(bola);

            console.log(trucksInfo);
          
            //view.object.add(camiao);
            
          
        // ...
            let bridges=[];
          
            view.base = new Base();
            bridges.push(createBridge(view, armazens[1], armazens[16]));
            bridges.push(createBridge(view, armazens[16], armazens[3]));
            bridges.push(createBridge(view, armazens[2], armazens[9]));
            bridges.push(createBridge(view, armazens[2], armazens[15]));
            bridges.push(createBridge(view, armazens[3], armazens[10]));
            bridges.push(createBridge(view, armazens[3], armazens[5]));
            bridges.push(createBridge(view, armazens[4], armazens[6]));
            bridges.push(createBridge(view, armazens[4], armazens[9]));
            bridges.push(createBridge(view, armazens[16], armazens[14]));
            bridges.push(createBridge(view, armazens[8], armazens[13]));
            bridges.push(createBridge(view, armazens[7], armazens[5]));
            bridges.push(createBridge(view, armazens[17], armazens[13]));
            bridges.push(createBridge(view, armazens[12], armazens[1]));
            bridges.push(createBridge(view, armazens[8], armazens[5]));
            bridges.push(createBridge(view, armazens[10], armazens[11]));
            bridges.push(createBridge(view, armazens[14], armazens[7]));
            bridges.push(createBridge(view, armazens[15], armazens[8]));
            bridges.push(createBridge(view, armazens[6], armazens[11]));
            bridges.push(createBridge(view, armazens[9], armazens[6]));
            bridges.push(createBridge(view, armazens[12], armazens[7]));
            bridges.push(createBridge(view, armazens[5], armazens[17]));
            bridges.push(createBridge(view, armazens[15], armazens[1]));
            bridges.push(createBridge(view, armazens[13], armazens[10]));
            bridges.push(createBridge(view, armazens[4], armazens[11]));
            bridges.push(createBridge(view, armazens[16], armazens[12]));
            estradas.push(1,16,16,3,2,9,2,15,3,10,3,5,4,6,4,9,16,14,8,13,7,5,17,13,12,1,8,5,10,11,14,7,15,8,6,11,9,6,12,7,5,17,15,1,13,10,4,11,16,12);
            bola.position.set(armazens[5].position.x,armazens[5].position.y,armazens[5].position.z);
            bola.rotateY(Math.PI/4);
            let angle=0;
            let directionside = 0;
            let directionfront=0;
            let speed=0.5;
            let rotationIndex=Math.PI/8;
            let updates=false;

            window.addEventListener("keydown", event => {
                if (event.code === "KeyW") {
                directionside = -1;
                updates=true;
                } else if (event.code === "KeyS") {
                directionside = 1;
                updates=true;
               } else if(event.code === "KeyA"){
                directionfront=1;
                updates=true;
               }else if(event.code === "KeyD"){
                directionfront=-1;
                updates=true;}});

        function updatePosition() {
            console.log(estradas);

           

            if(updates){
            console.log("ANGULO É"+angle);
                if(directionside<0){
                    if(0<=angle<Math.PI/2){
                        bola.position.x=bola.position.x+speed-angle/Math.PI/2;
                        bola.position.z=bola.position.z+speed+angle/Math.PI/2;
                        updates=false;
                        directionside=0;}
                    if(Math.PI/2<=angle<Math.PI){
                        bola.position.x=bola.position.x-speed+(angle-Math.PI/2)/Math.PI/2;
                        bola.position.z=bola.position.z+speed-(Math.PI-angle)/Math.PI/2;
                        updates=false;
                        directionside=0;}
                    if(Math.PI<=angle<Math.PI*1.5){
                        bola.position.x=bola.position.x-speed+(Math.PI*1.5-angle)/Math.PI/2;
                        bola.position.z=bola.position.z-speed+(angle-Math.PI)/Math.PI/2;
                        updates=false;
                        directionside=0;}

                    if(Math.PI*1.5<=angle<Math.PI*2){
                        bola.position.x=bola.position.x+speed-(Math.PI*2-angle)/Math.PI/2;
                        bola.position.z=bola.position.z-speed+(angle-Math.PI*1.5)/Math.PI/2;
                        updates=false;
                        directionside=0;
                    }
                }
             
           //  if(directionside>0){bola.position.x =bola.position.x-speed-angle/6;bola.position.z=bola.position.z+speed+angle/6;updates=false;directionside=0}
             //if(directionfront>{Math.atan2(bola, dy) * 180 / Math.PI})
             if(directionfront>0){bola.rotateY(rotationIndex);updates=false;directionfront=0;angle=angle+rotationIndex;if(angle>Math.PI*2){angle=0;}}   
             if(directionfront<0){bola.rotateY(-rotationIndex);updates=false;directionfront=0;angle=angle-rotationIndex;if(angle<0){angle=Math.PI*2-rotationIndex;}}   
             //console.log(bola.position.x)
             //bola.position.z =bola.position.z-1;
             
            }
            requestAnimationFrame(draw);
            }

            function draw() {updatePosition();}  

            requestAnimationFrame(draw);
        
        }
        

        function getWarehouses() {
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

        function getTrucks() {
            var txt = '';
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                    txt = xmlhttp.responseText;
                }
            };
            xmlhttp.open("GET", "http://localhost:2223/api/Trucks", false);
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
           return arco1;
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
                numbers.push(degrees - Math.PI / 2);
               
               
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
        function handleJSON_warehouses(txt) {
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
        function handleJSON_trucks(txt) {
            let trucksInfo = new Array(txt.length + 1);
            for (var i = 0; i < txt.length; i++) {
                var id = (txt[i].id);
                trucksInfo[id] = new Array(6);
                trucksInfo[id][0] = txt[i].plate;  
                trucksInfo[id][1] = txt[i].tare;
                trucksInfo[id][2] = txt[i].maxWeight;
                trucksInfo[id][3] = txt[i].batteryCapacity; 
                trucksInfo[id][4] = txt[i].truckAutonomy; 
                trucksInfo[id][5] = txt[i].chargeTime; 
            }
            return trucksInfo;
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
        //nao sei
        function calculateposition(currentX,currentY,currentZ,angle){
            let finalX;
            let finalY;
            let finalZ;
                Math.pow(1/Math.cos(angle),2)-solve(1,-2*currentX,Math.pow(currentX));
        }
        function solve(a, b, c) {
            var result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
            var result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
            return result;
        }

    }
    
    
       
}
