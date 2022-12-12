import * as THREE from "three";
import Ground from "./Ground.js";
import Armazem from "./Armazem.js";
import Base from "./Base.js";
import Arco from "./Arco.js";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import Bola_Teste from "./Bola_Teste.js";

export default class View {
    constructor(){

        function OnLoad(view){
        let txt = readFile();
        view.object = new THREE.Group();
        let size=200;
        view.ground = new Ground(size);
        view.object.add(view.ground.object);
        view.armazem = new Armazem();
        let coordinates=handleJSON(txt,view);
        let armazens=[];
        for(var i = 1; i<coordinates.length;i++){
            let armazem1 = view.armazem.object.clone();
            armazem1.position.set(coordinates[i][0],coordinates[i][1],coordinates[i][2]);
            view.object.add(armazem1);
            armazens[i]=armazem1;
            model3D(coordinates[i][0],coordinates[i][1],coordinates[i][2],view);
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
        createBridge(view, armazens[10] ,armazens[11]);
        createBridge(view, armazens[14],armazens[7]);
        createBridge(view,armazens[15],armazens[8]);
        createBridge(view,armazens[6],armazens[11]);
        createBridge(view,armazens[9],armazens[6]);
        createBridge(view,armazens[12],armazens[7]);
        createBridge(view,armazens[5],armazens[17]);
        createBridge(view,armazens[15],armazens[1]);
        createBridge(view,armazens[13],armazens[10]);
        createBridge(view,armazens[4],armazens[11]);
        createBridge(view,armazens[16],armazens[12]);

        //teste simoes
        view.bola = new Bola_Teste();
        let bola = view.bola.object.clone();
        bola.position.set(1,1,1);
        view.object.add(bola);
    }

    function readFile(){
        var txt = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
                txt = xmlhttp.responseText;
            }
        };
        xmlhttp.open("GET","https://localhost:5001/api/Warehouses",false);
        xmlhttp.send();
        var txt2= JSON.parse(txt);
        console.log(txt2);
        return txt2;
    }

    function createBridge(view,armazem1,armazem2){
        let base1 = view.base.object.clone();
        view.object.add(base1);

        let base2 = view.base.object.clone();
        view.object.add(base2);
        armazem1.add(base1);
        armazem2.add(base2);
        if (armazem1.position.y - armazem2.position.y < 0) {
            let base3=base1;
            base1=base2;
            base2=base3;
            let armazem3 = armazem1;
            armazem1 = armazem2;
            armazem2 = armazem3;
        }
        let angles = pointEachOther(armazem1, armazem2,base1,base2);

        let extreme1 = findExtreme(armazem1, armazem2);
        let extreme2 = findExtreme(armazem2, armazem1);

        extreme1[0] = armazem1.position.x + extreme1[0];
        extreme1[1] = armazem1.position.y+0.25;
        extreme1[2] = armazem1.position.z + extreme1[2];
        extreme2[0] = armazem2.position.x + extreme2[0];
        extreme2[1] = armazem2.position.y+0.25;
        extreme2[2] = armazem2.position.z + extreme2[2];

        let p = Math.sqrt(Math.pow(extreme1[0] - extreme2[0], 2) + Math.pow(extreme1[1] - extreme2[1], 2) + Math.pow(extreme1[2] - extreme2[2], 2));
        let desnivel = extreme1[1] - extreme2[1];
        if(desnivel>2){
            p+=0.2;
            view.arco = new Arco(p+0.20);
            p-=2;
        }else{
            p+=0.3;
            view.arco = new Arco(p+0.30);
            p-=2;
        }
        let arco1;
        arco1 = view.arco.object.clone();
        view.object.add(arco1);

        arco1.rotateY(angles[0]);
        arco1.position.set((extreme1[0] + extreme2[0]) / 2, (extreme1[1] + extreme2[1]-0.05) / 2, (extreme1[2] + extreme2[2]) / 2);
        arco1.rotateZ(-Math.atan(desnivel / (p)));
    }

    function pointEachOther(armazem, armazem1,base1,base2) {
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
    function longTox(longitude){
        return ((100/0.5162)*(longitude-8.2451)-50)*15/50;
    }
    function latToz(latitude){
        return ((100/1.2728)*(latitude-40.8387)-50)*15/50;
    }
    function altToy(alt){
        return (50/800*alt)/10;
    }
    function handleJSON(txt){
        let coordinates = new Array(txt.length+1);
        for(var i = 0; i<txt.length;i++){
            var id = (txt[i].id);
            coordinates[id] = new Array(3);
            var x = longTox(txt[i].longitude);
            var y = altToy(txt[i].altitude);
            var z = latToz(txt[i].latitude);
            coordinates[id][0]=x;
            coordinates[id][1]=y;
            coordinates[id][2]=z;
        }
        return coordinates;
    }
    function model3D(x,y,z, view){

        const loader = new GLTFLoader();
        loader.load('assets/warehouse.glb', (gltf) => {
            const root = gltf.scene;
            gltf.scene.scale.set(0.007,0.007,0.007);
            root.position.setX(x);
            root.position.setY(y+0.1);
            root.position.setZ(z);
            view.object.add(root);
          });
    }
    OnLoad(this);
    }
}
