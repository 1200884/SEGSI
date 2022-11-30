import * as THREE from "three";
import Ground from "./Ground.js";
import Armazem from "./Armazem.js";
import Base from "./Base.js";
import Arco from "./Arco.js";

export default class View {
    constructor(){

        function OnLoad(view){
        let txt = readFile();
        view.object = new THREE.Group();
        let size=200;
        view.ground = new Ground(size);
        view.object.add(view.ground.object);
        view.armazem = new Armazem();
        let armazem1 = view.armazem.object.clone();
        armazem1.position.set(-14.9,1.5,-12.3);
        view.object.add(armazem1);
        let armazem2 = view.armazem.object.clone();
        armazem2.position.set(-7,1,-10);
        view.object.add(armazem2);
        let armazem3 = view.armazem.object.clone();
        armazem3.position.set(14.9,1.1,14.9);
        view.object.add(armazem3);
        let armazem4 = view.armazem.object.clone();
        armazem4.position.set(-7,4.6,5.8);
        view.object.add(armazem4);
        let armazem5 = view.armazem.object.clone();
        armazem5.position.set(10,4.4,3.1);
        view.object.add(armazem5);
        let armazem6 = view.armazem.object.clone();
        armazem6.position.set(-1.5,5,-14.9);
        view.object.add(armazem6);
        let armazem7 = view.armazem.object.clone();
        armazem7.position.set(-9.5,0,-6.18);
        view.object.add(armazem7);
        let armazem8 = view.armazem.object.clone();
        armazem8.position.set(6.9,2.4,6.9);
        view.object.add(armazem8);
        let armazem9 = view.armazem.object.clone();
        armazem9.position.set(13,2.5,-1.5);
        view.object.add(armazem9);
        let armazem10 = view.armazem.object.clone();
        armazem10.position.set(-3.7,0.62,12.6);
        view.object.add(armazem10);
        let armazem11 = view.armazem.object.clone();
        armazem11.position.set(-1.6,4.0,-3.0);
        view.object.add(armazem11);
        let armazem12 = view.armazem.object.clone();
        armazem12.position.set(6.65,2.1,-12.9);
        view.object.add(armazem12);
        let armazem13 = view.armazem.object.clone();
        armazem13.position.set(3.2,2.5,-3.2);
        view.object.add(armazem13);
        let armazem14 = view.armazem.object.clone();
        armazem14.position.set(-6.1,0.4,-13);
        view.object.add(armazem14);
        let armazem15 = view.armazem.object.clone();
        armazem15.position.set(-9.1,5,10);
        view.object.add(armazem15);
        let armazem16 = view.armazem.object.clone();
        armazem16.position.set(14.5,1.5,-7);
        view.object.add(armazem16);
        let armazem17 = view.armazem.object.clone();
        armazem17.position.set(6.2,3.0,-7.3);
        view.object.add(armazem17);

        view.base = new Base();
        createBridge(view, armazem1, armazem16);
        createBridge(view, armazem16, armazem3);
        createBridge(view, armazem2, armazem9);
        createBridge(view, armazem2, armazem15);
        createBridge(view, armazem3, armazem10);
        createBridge(view, armazem3, armazem5);
        createBridge(view, armazem4, armazem6);
        createBridge(view, armazem4, armazem9);
        createBridge(view, armazem16, armazem14);
        createBridge(view, armazem8, armazem13);
        createBridge(view, armazem7, armazem5);
        createBridge(view, armazem17, armazem13);
        createBridge(view, armazem12, armazem1);
        createBridge(view, armazem8, armazem5);
        createBridge(view,armazem10,armazem11);
        createBridge(view,armazem14,armazem7);
        createBridge(view,armazem15,armazem8);
        createBridge(view,armazem6,armazem11);
        createBridge(view,armazem9,armazem6);
        createBridge(view,armazem12,armazem7);
        createBridge(view,armazem5,armazem17);
        createBridge(view,armazem15,armazem1);
        createBridge(view,armazem13,armazem10);
        createBridge(view,armazem4,armazem11);
        createBridge(view,armazem16,armazem12);
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
        console.log(txt);
        return txt;
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
            //um pouco a trolha, descobrir como por isto um pouco mais em condicoes estas 6 linhas
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
    
    OnLoad(this);
    }
}
