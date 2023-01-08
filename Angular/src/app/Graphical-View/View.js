import * as THREE from "three";
import Ground from "./Ground.js";
import Armazem from "./Armazem.js";
import Base from "./Base.js";
import Arco from "./Arco.js";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import Camiao from "./Camiao.js";
import CamiaoAutomatico from "./CamiaoAutomatico.js";

export default class View {
    constructor() {
        let estradas = [];
        let isValidPosition = false;
        let armazens = [];
        let armazemreal1 = null;
        let armazemreal2 = null;
        function OnLoad(view) {

            let txt = getWarehouses();
            view.object = new THREE.Group();
            let size = 200;
            view.ground = new Ground(size);
            view.object.add(view.ground.object);

            let coordinates = handleJSON_warehouses(txt, view);

            for (var i = 1; i < coordinates.length; i++) {
                view.armazem = new Armazem();
                let armazem1 = view.armazem.object;
                armazem1.position.set(coordinates[i][0], coordinates[i][1], coordinates[i][2]);
                armazem1.children[0].userData.description = "Id:" + i + "<br>Name:" + coordinates[i][3];
                view.object.add(armazem1);
                armazens[i] = armazem1;
                console.log(armazens);
                warehouseModel3D(coordinates[i][0], coordinates[i][1], coordinates[i][2], view);
                console.log(armazens[i].position.x);
            }
            let jsonTrucks = getTrucks();
            let trucksInfo = handleJSON_trucks(jsonTrucks, view);

            view.bola = new Camiao();
            let bola = view.bola.object;
            bola.position.set(armazens[5].position.x, armazens[5].position.y + 0.2, armazens[5].position.z);
            view.object.add(bola);

            console.log(trucksInfo);

            //view.object.add(camiao);


            // ...
            let bridges = [];

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
            bridges.push(createBridge(view, armazens[7], armazens[5]));//
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
            estradas.push(5, 17, 1, 16, 16, 3, 2, 9, 2, 15, 3, 10, 3, 5, 4, 6, 4, 9, 16, 14, 8, 13, 7, 5, 17, 13, 12, 1, 8, 5, 10, 11, 14, 7, 15, 8, 6, 11, 9, 6, 12, 7, 15, 1, 13, 10, 4, 11, 16, 12);
            //bola.position.set(armazens[5].position.x,armazens[5].position.y,armazens[5].position.z);
            console.log("x 5 is" + armazens[5].position.x);
            console.log("x 17 is" + armazens[17].position.x);
            console.log("Y 5 is" + armazens[5].position.z);
            console.log("Y 17 is" + armazens[17].position.z);
            // checkisOnRoad(5,armazens[5],armazens[17]);
            //console.log("Marilio Cardoso "+percentagem(1,2,1,2,1,2,1.5,1.5));
            bola.rotateY(Math.PI);
            let angle = 0;
            let directionside = 0;
            let directionfront = 0;

            let speed = 0.1;
            let rotationIndex = Math.PI / 32;
            let updates = false;

            // Create the button element
            var button = document.createElement('button');
            button.innerHTML = 'Create automatic trucks';

            // Add the button to the container
            var container = document.getElementById('button-container');
            container.appendChild(button);

            // Add an event listener to the button
            button.addEventListener('click', function () {

                /*let date;
                let travels;
                // Make a GET request to the specified URL
                fetch('http://localhost:2223/api/travels/20221205')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        date = data.date;
                        console.log(date);
                        travels = data.travels;
                        console.log(travels);
                    });*/

                //let deliveries = getDeliveries();
                /*et deliveries = [
                    {
                        "id": 4439,
                        "date": 20221205,
                        "weight": 1.0,
                        "destinationWarehouseId": 2,
                        "loadTime": 1,
                        "unloadTime": 1
                    },
                    {
                        "id": 4438,
                        "date": 20221205,
                        "weight": 1.0,
                        "destinationWarehouseId": 1,
                        "loadTime": 1,
                        "unloadTime": 1
                    },
                    {
                        "id": 4445,
                        "date": 20221205,
                        "weight": 10.0,
                        "destinationWarehouseId": 7,
                        "loadTime": 5,
                        "unloadTime": 7
                    },
                    {
                        "id": 4443,
                        "date": 20221205,
                        "weight": 10.0,
                        "destinationWarehouseId": 10,
                        "loadTime": 5,
                        "unloadTime": 7
                    },
                    {
                        "id": 4449,
                        "date": 20221205,
                        "weight": 1.0,
                        "destinationWarehouseId": 8,
                        "loadTime": 1,
                        "unloadTime": 1
                    },
                    {
                        "id": 4398,
                        "date": 20221205,
                        "weight": 10.0,
                        "destinationWarehouseId": 12,
                        "loadTime": 1,
                        "unloadTime": 1
                    }];*/
                //for (var i = 0; i < travels.length(); i++) {
                    /*const filteredObjectList = deliveries.filter(object => travels[i].includes(object.id));

                    const destWarehouseNumList = filteredObjectList.map(object => object.destinationWarehouseId);

                    const destWarehouseList = destWarehouseNumList.map(index => armazens[index]);

                    var specificBridges;
                    for (var j = 0; j < bridges.length(); j++) {
                        specificBridges.push((bridges[j].armazemOrigem, bridges[j].armazemDestino));
                    }

                    combineLists(destWarehouseList, specificBridges);*/

                    let destWarehouseList = [armazens[7], bridges[10], armazens[5], bridges[20], armazens[17], bridges[11], armazens[13]];
                    view.bola = new CamiaoAutomatico(destWarehouseList);
                    let camiaoAutomatico = view.bola.object;
                    view.object.add(camiaoAutomatico);
                //}
            });

            window.addEventListener("keydown", event => {
                if (event.code === "KeyW") {
                    console.log("W");
                    directionside = -1;
                    updates = true;
                } else if (event.code === "KeyS") {
                    directionside = 1;
                    updates = true;
                } else if (event.code === "KeyA") {
                    directionfront = 1;
                    updates = true;
                } else if (event.code === "KeyD") {
                    directionfront = -1;
                    updates = true;
                } else if (event.code === "KeyE") {
                    directionupdown = 1;
                    updates = true;
                } else if (event.code === "KeyQ") {
                    directionupdown = -1;
                    updates = true;
                }
            });


            function percentagem(armazem1x, armazem2x, armazem1y, armazem2y, armazem1z, armazem2z, newX, newY) {
                let armazem3x, armazem3y, armazem4y, armazem4x, zmaior, zmaispiqui, ymaior, ymaispiqui;
                let ladox, ladoy, ladoxpequeno, ladoypequeno, ladoz, distanciaEntreArmazens;
                if (armazem1x == bola.position.x && armazem1y == bola.position.z) {
                    bola.position.y = armazem1z;
                }
                if (armazem2x == bola.position.x && armazem2y == bola.position.z) {
                    bola.position.y = armazem2z;
                }
                if (armazem1x >= armazem2x) {
                    armazem3x = armazem1x;
                    armazem3y = armazem1y;
                    armazem4x = armazem2x;
                    armazem4y = armazem2y;
                }
                else { armazem3x = armazem2x; armazem4x = armazem1x; armazem3y = armazem2y; armazem4y = armazem1y; }
                if (armazem1y >= armazem2y) { ymaior = armazem1y; ymaispiqui = armazem2y; }
                if (armazem1y < armazem2y) { ymaior = armazem2y; ymaispiqui = armazem1y; }
                if (armazem1z <= armazem2z) { zmaior = armazem2z; zmaispiqui = armazem1z; }
                if (armazem1z > armazem2z) { zmaior = armazem1z; zmaispiqui = armazem2z; }

                //armazem 3 xmaior, armazem 4 xmais pequeno
                ladox = armazem3x - armazem4x;
                ladoy = armazem3y - armazem4y;
                ladoz = zmaior - zmaispiqui;
               
                //distanciaEntreArmazens=Math.sqrt(Math.pow(ladox,2)+Math.pow(ladoy,2));
                ladoxpequeno = newX - armazem4x;
                ladoypequeno = newY - armazem4y;
                distanciaEntreArmazens = ladoxpequeno / ladox;
                let distanciaEntreArmazens2 = ladoypequeno / ladoy;

                //distanciaEntreArmazemEPontoAtual=Math.sqrt(Math.pow(ladoxpequeno,2)+Math.pow(ladoypequeno,2));
                //if(armazem4x*distanciaEntreArmazemEPontoAtual-newX<=0.1&&armazem4y*distanciaEntreArmazemEPontoAtual-newY<=0.1){
                //console.log(bola.position.y);
                //console.log(ladoz*distanciaEntreArmazens+zmaispiqui);
                //console.log("ze alfredo"+Math.abs(bola.position.y-(ladoz*distanciaEntreArmazens+zmaispiqui)))
                //console.log("ze miguel"+Math.abs(bola.position.y-(ladoz*distanciaEntreArmazens+zmaispiqui)))
                if (Math.abs(distanciaEntreArmazens - distanciaEntreArmazens2) <= 0.05 && newX <= armazem3x && newX >= armazem4x && newY <= ymaior && newY >= ymaispiqui && Math.abs(bola.position.y - (ladoz * distanciaEntreArmazens + zmaispiqui)) < 1) {
                    //console.log("Maria Amélia!")
                    //console.log("y1 = "+armazem3y+" x1 = "+armazem3x)
                    //console.log("y2 = "+armazem4y+" x2 = "+armazem4x)

                    console.log(ladoz);
                    bola.position.y = 1-(ladoz * distanciaEntreArmazens) + zmaispiqui;
                    //console.log("z novo é "+bola.position.y);
                    return true;
                }
                //console.log("adérito");
                return false;
            }
            function updatePosition() {

                let i = 0;


                if (updates) {
                    // console.log("ANGULO É"+angle);
                    if (directionside < 0) {
                        let newpositionx;
                        let newpositiony;
                        if (0 <= angle && angle < Math.PI / 2) {
                            newpositionx = bola.position.x + speed * -Math.sin(angle);
                            newpositiony = bola.position.z + speed * -Math.cos(angle);
                        }
                        if (Math.PI / 2 <= angle && angle < Math.PI) {
                            newpositionx = bola.position.x - speed * Math.sin(angle);
                            newpositiony = bola.position.z + speed * -Math.cos(angle);
                        }
                        if (Math.PI <= angle && angle < Math.PI * 1.5) {
                            newpositionx = bola.position.x - speed * Math.sin(angle);
                            newpositiony = bola.position.z - speed * Math.cos(angle);
                        }
                        if (Math.PI * 1.5 <= angle && angle < Math.PI * 2) {
                            newpositionx = bola.position.x + speed * -Math.sin(angle);
                            newpositiony = bola.position.z - speed * Math.cos(angle);
                        }
                        if (armazemreal1 == null) {
                            for (i = 0; i < estradas.length; i = i + 2) {

                                let armazem1 = armazens[estradas[i]];
                                let armazem2 = armazens[estradas[i + 1]];
                                if (percentagem(armazem1.position.x, armazem2.position.x, armazem1.position.z, armazem2.position.z, armazem1.position.y, armazem2.position.y, newpositionx, newpositiony)) {
                                    armazemreal1 = armazem1;
                                    armazemreal2 = armazem2;
                                    bola.position.x = newpositionx;
                                    bola.position.z = newpositiony;
                                    updates = false;
                                    directionside = 0;
                                    console.log("estrada nova");
                                    break;
                                }
                            }
                        } else {
                            if (percentagem(armazemreal1.position.x, armazemreal2.position.x, armazemreal1.position.z, armazemreal2.position.z, armazemreal1.position.y, armazemreal2.position.y, newpositionx, newpositiony)) {
                                bola.position.x = newpositionx;
                                bola.position.z = newpositiony;
                                updates = false;
                                directionside = 0;
                            }
                            if ((Math.abs(bola.position.x - armazemreal1.position.x) <= 0.6 && Math.abs(bola.position.z - armazemreal1.position.z) <= 0.6) || (Math.abs(bola.position.x - armazemreal2.position.x) <= 0.6 && Math.abs(bola.position.z - armazemreal2.position.z) <= 0.6)) {
                                armazemreal1 = null;
                                armazemreal2 = null;
                                console.log("acabou a estrada");
                            }
                        }
                    }
                    if (directionside > 0) {
                        if (Math.PI <= angle && angle < Math.PI * 1.5) {
                            let newpositionx = bola.position.x + speed * -Math.sin(angle);
                            let newpositiony = bola.position.z + speed * -Math.cos(angle);

                            for (i = 0; i < estradas.length; i = i + 2) {
                                console.log(i);
                                let armazem1 = armazens[estradas[i]];
                                let armazem2 = armazens[estradas[i + 1]];

                                if (/*checkisOnRoad(newpositionx,newpositiony,armazem1,armazem2)&&newpositionx<20&&newpositiony<20&&newpositionx>-20&&newpositiony>-20&&*/percentagem(armazem1.position.x, armazem2.position.x, armazem1.position.z, armazem2.position.z, armazem1.position.y, armazem2.position.y, newpositionx, newpositiony)) {

                                    bola.position.x = newpositionx;
                                    bola.position.z = newpositiony;
                                    updates = false;
                                    directionside = 0;
                                    break;
                                }
                            }

                        }
                        if (Math.PI * 1.5 <= angle && angle < Math.PI * 2) {

                            let newpositionx = bola.position.x - speed * Math.sin(angle);
                            let newpositiony = bola.position.z + speed * -Math.cos(angle);
                            // console.log("ze nando"+angle*360/2/3.14);
                            for (i = 0; i < estradas.length; i = i + 2) {
                                let armazem1 = armazens[estradas[i]];
                                let armazem2 = armazens[estradas[i + 1]];
                                if (/*checkisOnRoad(newpositionx,newpositiony,armazem1,armazem2)&&newpositionx<20&&newpositiony<20&&newpositionx>-20&&newpositiony>-20&&*/percentagem(armazem1.position.x, armazem2.position.x, armazem1.position.z, armazem2.position.z, armazem1.position.y, armazem2.position.y, newpositionx, newpositiony)) {
                                    // console.log("2=  "+i);
                                    //  console.log("parabens es lindo parte 3");
                                    bola.position.x = newpositionx;
                                    bola.position.z = newpositiony;
                                    updates = false;
                                    directionside = 0;
                                    break;
                                }
                            }
                        }
                        if (0 <= angle && angle < Math.PI / 2) {

                            let newpositionx = bola.position.x - speed * Math.sin(angle);
                            let newpositiony = bola.position.z - speed * Math.cos(angle);
                            for (i = 0; i < estradas.length; i = i + 2) {
                                let armazem1 = armazens[estradas[i]];
                                let armazem2 = armazens[estradas[i + 1]];
                                if (/*checkisOnRoad(newpositionx,newpositiony,armazem1,armazem2)&&newpositionx<20&&newpositiony<20&&newpositionx>-20&&newpositiony>-20&&*/percentagem(armazem1.position.x, armazem2.position.x, armazem1.position.z, armazem2.position.z, armazem1.position.y, armazem2.position.y, newpositionx, newpositiony)) {
                                    //console.log("3=  "+i);
                                    //console.log("parabens es lindo");
                                    bola.position.x = newpositionx;
                                    bola.position.z = newpositiony;
                                    updates = false;
                                    directionside = 0;
                                    break;
                                }
                            }
                        }
                        if (Math.PI / 2 <= angle && angle < Math.PI) {

                            let newpositionx = bola.position.x + speed * -Math.sin(angle);
                            let newpositiony = bola.position.z - speed * Math.cos(angle);
                            for (i = 0; i < estradas.length; i = i + 2) {
                                let armazem1 = armazens[estradas[i]];
                                let armazem2 = armazens[estradas[i + 1]];
                                if (/*checkisOnRoad(newpositionx,newpositiony,armazem1,armazem2)&&newpositionx<20&&newpositiony<20&&newpositionx>-20&&newpositiony>-20&&*/percentagem(armazem1.position.x, armazem2.position.x, armazem1.position.z, armazem2.position.z, armazem1.position.y, armazem2.position.y, newpositionx, newpositiony)) {
                                    //   console.log("4=  "+i);
                                    //    console.log("parabens es lindo parte 2");
                                    bola.position.x = newpositionx;
                                    bola.position.z = newpositiony;
                                    updates = false;
                                    directionside = 0;
                                    break;
                                }
                            }
                        }
                    }


                    if (directionfront > 0) { bola.rotateY(rotationIndex); updates = false; directionfront = 0; angle = angle + rotationIndex; if (angle >= Math.PI * 2) { angle = 0; } }
                    if (directionfront < 0) { bola.rotateY(-rotationIndex); updates = false; directionfront = 0; angle = angle - rotationIndex; if (angle < 0) { angle = Math.PI * 2 - rotationIndex; } }
                    if (directionupdown > 0) { bola.rotateZ(rotationIndex); updates = false; directionupdown = 0; }
                    if (directionupdown < 0) { bola.rotateZ(-rotationIndex); updates = false; directionupdown = 0; }


                }
                requestAnimationFrame(draw);
            }

            function draw() { updatePosition(); }

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

        function getDeliveries() {
            var txt = '';
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
                    txt = xmlhttp.responseText;
                }
            };
            xmlhttp.open("GET", "http://localhost:2223/api/travels", false);
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
        function calculateposition(currentX, currentY, currentZ, angle) {
            let finalX;
            let finalY;
            let finalZ;
            Math.pow(1 / Math.cos(angle), 2) - solve(1, -2 * currentX, Math.pow(currentX));
        }
        function solve(a, b, c) {
            var result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
            var result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
            return result;
        }
        

    }



}
