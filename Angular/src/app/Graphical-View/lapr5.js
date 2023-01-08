import * as THREE from "three";
import View from "./View.js";
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import Ground from "./Ground.js";
export default class LAPR5 {
    constructor() {
        this.gameRunning = false;
        this.scene = new THREE.Scene();
        this.view = new View();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );//window.innerWidth / window.innerHeight, 0.1, 1000
        this.camera.rotateX(Math.PI / 4);
        this.camera.position.z = 14;
        this.camera.position.y = 16;
        this.camera.position.x = -7;
        const listener = new THREE.AudioListener();
        this.camera.add(this.listener);

        // create a global audio source
        const sound = new THREE.Audio(listener);

        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load('./assets/starWars.mp3', function (buffer) {
          sound.setBuffer(buffer);
          sound.setLoop(true);
          sound.setVolume(0.05);
          sound.play();
        });
       /* THREE.ShaderChunk.fog_fragment = `
        #ifdef USE_FOG
            vec3 fogOrigin = cameraPosition;
            vec3 fogDirection = normalize(vWorldPosition - fogOrigin);
            float fogDepth = distance(vWorldPosition, fogOrigin);
            fogDepth *= fogDepth;

            //f(p) = fbm( p + fbm( p ) )
            vec3 noiseSampleCoord = vWorldPosition * 0.00025;
            float noiseSample = FBM(noiseSampleCoord + FBM(noiseSampleCoord)) * 0.5 + 0.5;
            fogDepth *= noiseSample;

            float heightFactor =0.05;
            float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (1.0 - exp(-fogDepth * fogDirection.y * fogDensity) / fogDirection.y);
            fogFactor = saturate(fogFactor);

            gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
        #endif`

        THREE.ShaderChunk.fog_pars_fragment =`
        #ifdef USE_FOG
            uniform vec3 fogColor;
            varying vec3 vWorldPosition;
            #ifdef FOG_EXP2
                uniform float fogDensity;
            #else
                uniform float fogNear;
                uniform float fogFar;
            #endif
        #endif`;

        THREE.ShaderChunk.fog_vertex =`
        #ifdef USE_FOG
            vWorldPosition = worldPosition.xyz;
        #endif`;

        THREE.ShaderChunk.fog_pars_vertex =`
        #ifdef USE_FOG
            varying vec3 vWorldPosition;
        #endif`;*/

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        const canvas = this.renderer.domElement;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        var ambientlight = new THREE.AmbientLight(0xece1bc , 0.5);//0x444444
        this.scene.add(ambientlight);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        let light = new THREE.DirectionalLight(0xFFE87C, 1.0);//0xFFE87C
        light.position.set(10, 10, 10); 
        //light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 1.0;
        light.shadow.camera.far = 50;
        light.shadow.camera.left = 20;
        light.shadow.camera.right = -20;
        light.shadow.camera.top = 20;
        light.shadow.camera.bottom = -20;
        this.scene.add(light);

        //const helper = new THREE.DirectionalLightHelper(light);
        //this.scene.add(helper);  
        
        

        this.scene.fog = new THREE.Fog(0x808080, 0.2 ,80);
        
        const skybox = new THREE.CubeTextureLoader();
        const texture6 = skybox.load([
            './assets/graycloud_bk.jpg',// :)
        
            './assets/graycloud_ft.jpg',// ceu
            './assets/graycloud_lf.jpg',// chao
            './assets/graycloud_dn.jpg',//
            './assets/graycloud_lf.jpg',// :)
            './assets/graycloud_rt.jpg',// :)
        ]);
        this.scene.background= texture6;

        class PickHelper {
            constructor() {
                this.raycaster = new THREE.Raycaster();
                this.pickedObject = null;
                this.pickedObjectSavedColor = 0;
            }
            pick(normalizedPosition, scene, camera, time) {
                var x = document.getElementById("details");
                // restore the color if there is a picked object
                if (this.pickedObject) {
                    this.pickedObject.material.color.setHex(
                        this.pickedObjectSavedColor   
                    );
                    //this.display = "block";
                    this.pickedObject = undefined;
                }
                this.raycaster.setFromCamera(normalizedPosition, camera);
                // get the list of objects the ray intersected
                const intersectedObjects =
                    this.raycaster.intersectObjects(scene.children);
                if (intersectedObjects.length) {
                    // pick the first object. It's the closest one
                    this.pickedObject = intersectedObjects[0].object;
                    // save its color
                    this.pickedObjectSavedColor =
                        this.pickedObject.material.color.getHex();
                    // set its emissive color to flashing red/yellow
                    if (this.pickedObject.userData.name == "Armazem") {
                        this.display=x.style.display;
                        x.style.display = "block";
                        x.innerHTML = "Warehouse Details:<br>"+this.pickedObject.userData.description;
                        console.log(this.pickedObject);
                        this.pickedObject.material.color.setHex(
                            (time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000
                        );
                    }else{
                        x.style.display= "none";
                    }
                }
            }
        }
        const pickPosition = { x: 0, y: 0 };
        this.pickPosition2 = { x: 0, y: 0 };
        this.pickHelper = new PickHelper();
        clearPickPosition();
        function getCanvasRelativePosition(event) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (event.clientX - rect.left) * canvas.width / rect.width,
                y: (event.clientY - rect.top) * canvas.height / rect.height,
            };
        }
        function setPickPosition(event) {
            const pos = getCanvasRelativePosition(event);
            pickPosition.x = (pos.x / canvas.width) * 2 - 1;
            pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
        }
        function clearPickPosition() {
            // unlike the mouse which always has a position
            // if the user stops touching the screen we want
            // to stop picking. For now we just pick a value
            // unlikely to pick something
            pickPosition.x = -100000;
            pickPosition.y = -100000;
        }
        window.addEventListener('click', setPickPosition);
        this.pickPosition2 = pickPosition;
        /*window.addEventListener('mouseout', clearPickPosition);
        this.pickPosition2=pickPosition;
        window.addEventListener('mouseleave', clearPickPosition);
        this.pickPosition2=pickPosition;*/
        
        /*this.initializeAudio();
        initializeAudio(){ 
            this.listener = new THREE.AudioListener();
            this.camera.add(this.listener);
            const sound = new THREE.Audio(this.listener);
            const loader = new THREE.AudioLoader();
            loader.load('./assets/starWars.mp3', (buffer) => {
                sound.setBuffer(buffer);
                sound.setVolume(1);
                sound.play();
            });
        }*/
        
    }
    update(time) {
        if (!this.gameRunning) {
            this.scene.add(this.view.object);

            this.gameRunning = true;
        } else {
            //console.log("time="+time);
            time *= 0.001;
            this.pickHelper.pick(this.pickPosition2, this.scene, this.camera, time);
            this.renderer.render(this.scene, this.camera);
            this.renderer.clearDepth();
            this.controls.minDistance=5;
            this.controls.maxDistance=100;
            if (this.camera.position.y <= 1){
                console.log("y min reached");
                this.camera.position.y = 1;
            }
        }
    }
}