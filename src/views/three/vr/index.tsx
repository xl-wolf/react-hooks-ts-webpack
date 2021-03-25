import * as React from "react";
import { useEffect, useState } from "react";
import * as THREE from "three";
import {
    RollerCoasterGeometry,
    RollerCoasterShadowGeometry,
    RollerCoasterLiftersGeometry,
    TreesGeometry,
    SkyGeometry,
} from "three/examples/jsm/misc/RollerCoaster.js";

export default () => {
    let [renderer, setrenderer] = useState(null)
    let [scene, setscene] = useState(null)
    let [camera, setcamera] = useState(null)
    let [train, settrain] = useState(null)
    let [prevTime, setprevTime] = useState(null)
    let [velocity, setvelocity] = useState(null)
    let [position, setposition] = useState(null)
    let [tangent, settangent] = useState(null)
    let [lookAt, setlookAt] = useState(null)
    let [progress, setprogress] = useState(null)
    let [funfairs, setfunfairs] = useState([])
    let [curve, setcurve] = useState(null)
    let [WIDTH, setWIDTH] = useState(null)
    let [HEIGHT, setHEIGHT] = useState(null)
    let [animationLooper, setanimationLooper] = useState(null)
    useEffect(() => {
        init()
        return () => { window.removeEventListener("resize", onWindowResize); setanimationLooper(animationLooper = null) }
    }, [])
    const init = async () => {
        const VRcontainer = document.getElementById("vr-container");
        setWIDTH(WIDTH = VRcontainer.clientWidth)
        setHEIGHT(HEIGHT = VRcontainer.clientHeight)
        setrenderer(renderer = new THREE.WebGLRenderer({ antialias: true }))
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(WIDTH, HEIGHT);
        renderer.xr.enabled = true;
        renderer.xr.setReferenceSpaceType("local");
        setrenderer(renderer)
        VRcontainer.appendChild(renderer.domElement);
        setscene(scene = new THREE.Scene())
        scene.background = new THREE.Color(0xf0f0ff);
        setscene(scene)

        const light = new THREE.HemisphereLight(0xfff0f0, 0x606066);
        light.position.set(1, 1, 1);
        scene.add(light);
        settrain(train = new THREE.Object3D())
        scene.add(train)

        setcamera(camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 500))
        train.add(camera);
        // environment
        const geometry1 = new THREE.PlaneBufferGeometry(500, 500, 15, 15);
        geometry1.rotateX(-Math.PI / 2);

        const positions = geometry1.attributes.position.array;
        const vertex = new THREE.Vector3();

        for (let i = 0; i < positions.length; i += 3) {
            vertex.fromArray(positions, i);
            vertex.x += Math.random() * 10 - 5;
            vertex.z += Math.random() * 10 - 5;
            const distance = vertex.distanceTo(scene.position) / 5 - 25;
            vertex.y = Math.random() * Math.max(0, distance);
            vertex.toArray(positions, i);
        }
        geometry1.computeVertexNormals();
        const material1 = new THREE.MeshLambertMaterial({ color: 0x407000 })
        const mesh1 = new THREE.Mesh(geometry1, material1)
        scene.add(mesh1)
        const geometry2 = new TreesGeometry(mesh1)
        const material2 = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            vertexColors: true,
        })
        const mesh2 = new THREE.Mesh(geometry2, material2);
        scene.add(mesh2)
        const geometry3 = new SkyGeometry();
        const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const mesh3 = new THREE.Mesh(geometry3, material3);
        scene.add(mesh3);

        const PI2 = Math.PI * 2;
        setcurve(curve = (function () {
            const vector = new THREE.Vector3();
            const vector2 = new THREE.Vector3();
            return {
                getPointAt: function (t: any) {
                    t = t * PI2;

                    const x = Math.sin(t * 3) * Math.cos(t * 4) * 50;
                    const y = Math.sin(t * 10) * 2 + Math.cos(t * 17) * 2 + 5;
                    const z = Math.sin(t) * Math.sin(t * 4) * 50;

                    return vector.set(x, y, z).multiplyScalar(2);
                },

                getTangentAt: function (t: any) {
                    const delta = 0.0001;
                    const t1 = Math.max(0, t - delta);
                    const t2 = Math.min(1, t + delta);

                    return vector2
                        .copy(this.getPointAt(t2))
                        .sub(this.getPointAt(t1))
                        .normalize();
                },
            };
        })())

        const geometry4 = new RollerCoasterGeometry(curve, 1500);
        const material4 = new THREE.MeshPhongMaterial({ vertexColors: true });
        const mesh4 = new THREE.Mesh(geometry4, material4);
        scene.add(mesh4);

        const geometry5 = new RollerCoasterLiftersGeometry(curve, 100);
        const material5 = new THREE.MeshPhongMaterial();
        const mesh5 = new THREE.Mesh(geometry5, material5);
        mesh5.position.y = 0.1;
        scene.add(mesh5);

        const geometry6 = new RollerCoasterShadowGeometry(curve, 500);
        const material6 = new THREE.MeshBasicMaterial({
            color: 0x305000,
            depthWrite: false,
            transparent: true,
        });
        const mesh6 = new THREE.Mesh(geometry6, material6);
        mesh6.position.y = 0.1;
        scene.add(mesh6);

        const geometry7 = new THREE.CylinderBufferGeometry(10, 10, 5, 15);
        const material7 = new THREE.MeshLambertMaterial({ color: 0xff8080 });
        const mesh7 = new THREE.Mesh(geometry7, material7);
        mesh7.position.set(-80, 10, -70);
        mesh7.rotation.x = Math.PI / 2;
        scene.add(mesh7);

        const funfairs = [];
        funfairs.push(mesh7);

        const geometry8 = new THREE.CylinderBufferGeometry(5, 6, 4, 10);
        const material8 = new THREE.MeshLambertMaterial({ color: 0x8080ff });
        const mesh8 = new THREE.Mesh(geometry8, material8);
        mesh8.position.set(50, 2, 30);
        scene.add(mesh8);

        funfairs.push(mesh8);
        setfunfairs(funfairs)
        window.addEventListener("resize", onWindowResize);

        setvelocity(velocity = 0)
        setprogress(progress = 0)
        setprevTime(prevTime = performance.now())
        setposition(position = new THREE.Vector3())
        settangent(tangent = new THREE.Vector3())
        setlookAt(lookAt = new THREE.Vector3())
        setanimationLooper(animationLooper = renderer.setAnimationLoop(renderVR))
    }
    const renderVR = async () => {
        const time = performance.now();
        const delta = time - prevTime;
        for (let i = 0; i < funfairs.length; i++) {
            const funfair = funfairs[i];
            funfair.rotation.y = time * 0.0004;
            setfunfairs(funfairs)
        }

        progress += velocity;
        progress = progress % 1;
        setprogress(setprogress)
        position.copy(curve.getPointAt(progress));
        position.y += 0.3;
        setposition(position)
        train.position.copy(position);
        tangent.copy(curve.getTangentAt(progress));

        velocity -= tangent.y * 0.0000001 * delta;
        velocity = Math.max(0.00004, Math.min(0.0002, velocity));
        setvelocity(velocity)

        train.lookAt(lookAt.copy(position).sub(tangent));
        renderer.render(scene, camera);
        setprevTime(prevTime = time)
    }
    const onWindowResize = async () => {
        const VRcontainer = document.getElementById("vr-container");
        // 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
        if (VRcontainer) {
            setWIDTH(WIDTH = VRcontainer.clientWidth)
            setHEIGHT(HEIGHT = VRcontainer.clientHeight)
            camera.aspect = WIDTH / HEIGHT;
            setcamera(camera)
            camera.updateProjectionMatrix();
            renderer.setSize(WIDTH, HEIGHT);
        }
    }
    return <div id="vr-container" style={{ height: '100%' }} />
}
