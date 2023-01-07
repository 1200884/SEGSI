import * as THREE from "three";
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';

export default class CamiaoAutomatico extends THREE.Mesh {

    //percurso = [rotunda, ponte, rotunda...]
    constructor(percurso) {
        super();
        this.percurso = percurso;
        this.clock = new THREE.Clock();
        this.baseLength = 1; //ver se pode ser buscada a base do armazem
        this.baseWidth = 0.25; // ver se pode ser buscada a base do armazem
        this.rotundaDiam = 16; //this.percurso[0].diametro

        this.K_BERMA = 0.1;
        this.b = this.K_BERMA * this.percurso[1].width;
        this.RAIO_ROTACAO = this.b * 0.75;  //ainda por ver

        this.hip = (this.rotundaDiam / 2) - this.b + this.RAIO_ROTACAO;
        this.catTrans = (this.baseWidth / 2) - this.b + this.RAIO_ROTACAO;
        this.teta = Math.acos(this.catTrans / this.hip);
        this.catLong = Math.sqrt(Math.pow(this.hip, 2) - Math.pow(this.catTrans, 2));
        this.lIJ = this.baseLength - this.catLong;

        this.n = 0;
        this.vela = 0;
        this.velh = 0;
        this.velv = 0;

        this.object = new THREE.Group();
        const loader = new GLTFLoader();
        loader.load('assets/truck.glb', (gltf) => {
            const face = gltf.scene;
            gltf.scene.scale.set(0.07, 0.07, 0.07);
            this.object.add(face);
            var ud = face.userData;
            ud.name = "Truck";
            ud.description = "";
        })
        this.initialize();
        this.update = true;
        this.updated();
    }

    initialize() {
        this.i = 2;
        this.ponteIJ = this.percurso[this.i - 1];
        this.nJ = this.percurso[this.i];
        this.direcao = this.ponteIJ.rotationHorizontal - this.teta;
        console.log("posicao x " + this.position.x);
        console.log("posicao y " + this.position.y);
        console.log("posicao z " + this.position.z);
        this.x = this.nJ.position.x + ((this.rotundaDiam / 2) - this.b) * Math.sin(this.direcao);
        this.y = this.nJ.position.y + 1; //este 1 = ALTURA_PERSONAGEM / 2
        this.z = this.nJ.position.z - ((this.rotundaDiam / 2) - this.b) * Math.cos(this.direcao);
        console.log("posicao x " + this.x);
        console.log("posicao y " + this.y);
        console.log("posicao z " + this.z);
        this.position.set(this.x, this.y, this.z);
        console.log("posicao x " + this.position.x);
        console.log("posicao y " + this.position.y);
        console.log("posicao z " + this.position.z);
    }

    updated() {
        while (this.update) {
            console.log("update");
            this.setMovimentoA();
            for (let i = 0; i < this.n; i++) {
                this.animacao();
            }

            this.setMovimentoB();
            for (let i = 0; i < this.n; i++) {
                this.animacao();
            }

            this.setMovimentoC();
            for (let i = 0; i < this.n; i++) {
                this.animacao();
            }

            this.i += 1;

            this.setMovimentoD();
            for (let i = 0; i < this.n; i++) {
                this.animacao();
            }

            this.i += 1;

            this.setMovimentoE();
            for (let i = 0; i < this.n; i++) {
                this.animacao();
            }

            this.setMovimentoF();
            for (let i = 0; i < this.n; i++) {
                this.animacao();
            }

            this.checkEnd();
        }
    }

    checkEnd() {
        console.log("checkEnd verification: " + this.percurso.length);
        console.log("checkEnd verification: " + this.i);
        if (this.i == this.percurso.length - 1) {
            this.update = false;
        }
    }

    animacao() {
        var delta = this.clock.getDelta();
        this.direcaoN = this.direcao + this.vela;
        this.xN = this.position.x + this.velh * Math.cos(this.direcao); //diz this.direcao no tutorial mas pessoalmente acredito q possa ser this.direcaoN
        this.yN = this.position.y + this.velv;
        this.xN = this.position.z + this.velh * Math.sin(this.direcao); //diz this.direcao no tutorial mas pessoalmente acredito q possa ser this.direcaoN

        this.position.set(this.xN * delta, this.yN * delta, this.zN * delta);
    }

    //this.i = rotunda onde ele vai andar
    setMovimentoA() { //percorrer a rotunda
        this.nI = this.percurso[this.i - 2];
        this.ponteIJ = this.percurso[this.i - 1];
        this.nJ = this.percurso[this.i];
        this.ponteJK = this.percurso[this.i + 1];
        this.nK = this.percurso[this.i + 2];
        this.velA = 1; //ainda por ver
        this.phi = this.ponteIJ.rotationHorizontal - this.ponteJK.rotationHorizontal + this.teta + this.teta;
        //o this.ponte.rotationHorizontal convinha ser substituido pelo angulo da base associada nao da ponte
        while (this.phi <= 0) {
            this.phi += 2 * Math.PI;
        }

        while (this.phi >= Math.PI * 2) {
            this.phi -= 2 * Math.PI;
        }

        this.cIJ = ((this.rotundaDiam / 2) - this.b) * this.phi;

        this.n = Math.ceil(this.cIJ / this.velA);
        this.vela = this.teta / this.n;
        this.velh = 2 * ((this.rotundaDiam / 2) - this.b) * Math.sin(this.phi / this.n / 2);
        this.velv = 0;
    }

    //this.i = rotunda onde ele vai estar
    setMovimentoB() { //saida na rotunda
        //this.nJ = this.percurso[this.i];
        //this.nK = this.percurso[this.i + 2];
        this.velB = 1; //ainda por ver
        this.cIJ = this.RAIO_ROTACAO * this.teta;
        this.n = Math.ceil(this.cIJ / this.velB);
        this.vela = -this.teta / this.n;
        this.velh = 2 * this.RAIO_ROTACAO * Math.sin(this.teta / this.n / 2);
        this.velv = 0;
    }

    //this.i = rotunda de onde ele esta a sair
    setMovimentoC() { //base de saida
        //this.nJ = this.percurso[this.i];
        //this.nK = this.percurso[this.i + 2];
        this.velC = 1; //ainda por ver
        this.n = Math.ceil(this.lIJ / this.velC);
        this.vela = 0;
        this.velh = this.lIJ * this.n;
        this.velv = 0;
    }

    //this.i = rampa onde esta
    setMovimentoD() { //rampa
        //this.nI = this.percurso[this.i - 1];
        //this.nJ = this.percurso[this.i + 1];
        this.velD = 1;  //ainda por ver
        this.n = Math.ceil(this.percurso[this.i].size / this.velD);
        this.vela = 0;
        let pIJ = this.percurso[this.i].size * Math.cos(this.percurso[this.i].rotationVertical);
        this.velh = pIJ / this.n;
        this.velv = this.percurso[this.i].rotationVertical / this.n;
    }

    //this.i = rotunda onde esta a entrar
    setMovimentoE() { //base de entrada
        //this.nI = this.percurso[this.i - 2];
        //this.nJ = this.percurso[this.i];
        this.velE = 1;  //ainda por ver
        this.n = Math.ceil(this.lIJ / this.velE);
        this.vela = 0;
        this.velh = this.lIJ / this.n;
        this.velv = 0;
    }

    //this.i = rotunda onde ele esta a entrar
    setMovimentoF() { //entrada na rotunda
        //this.nI = this.percurso[this.i - 2];
        //this.nJ = this.percurso[this.i];
        this.velF = 1; //ainda por ver
        this.cIJ = this.RAIO_ROTACAO * this.teta;
        this.n = Math.ceil(this.cIJ / this.velF);
        this.vela = -this.teta / this.n;
        this.velh = 2 * this.RAIO_ROTACAO * Math.sin(this.teta / this.n / 2);
        this.velv = 0;
    }
}
