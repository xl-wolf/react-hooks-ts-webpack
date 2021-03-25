import * as React from "react";
import { useEffect, useState } from "react";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'

export default () => {
    let [renderer, setrenderer] = useState(null)
    let [scene, setscene] = useState(null)
    let [camera, setcamera] = useState(null)
    let [smallSphere2, setsmallSphere2] = useState(null)
    let [smallSphere1, setsmallSphere1] = useState(null)
    let [sphereGroup, setsphereGroup] = useState(null)
    let [cameraControls, setcameraControls] = useState(null)
    const [FAR, setFAR] = useState(500)
    const [NEAR, setNEAR] = useState(1)
    const [VIEW_ANGLE, setVIEW_ANGLE] = useState(45)
    let [WIDTH, setWIDTH] = useState(null)
    let [HEIGHT, setHEIGHT] = useState(null)
    useEffect(() => {
        init()
        return () => { window.removeEventListener("resize", onWindowResize) }
    }, [])
    const init = async () => {
        const container = document.getElementById('three02-container')

        setWIDTH(WIDTH = container.clientWidth)
        setHEIGHT(HEIGHT = container.clientHeight)
        setrenderer(renderer = new THREE.WebGLRenderer({ antialias: true }))
        // renderer
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(WIDTH, HEIGHT)
        container.appendChild(renderer.domElement)
        // scene
        // camera
        setscene(scene = new THREE.Scene())
        setcamera(camera = new THREE.PerspectiveCamera(VIEW_ANGLE, WIDTH / HEIGHT, NEAR, FAR))
        camera.position.set(0, 75, 160)
        setcameraControls(cameraControls = new OrbitControls(camera, renderer.domElement))
        cameraControls.target.set(0, 40, 0)
        cameraControls.maxDistance = 400
        cameraControls.minDistance = 10
        cameraControls.update()

        const planeGeo = new THREE.PlaneBufferGeometry(100.1, 100.1)
        // reflectors/mirrors
        const geometry1 = new THREE.CircleBufferGeometry(40, 64)
        const groundMirror = new Reflector(geometry1, {
            clipBias: 0.003,
            textureWidth: WIDTH * window.devicePixelRatio,
            textureHeight: HEIGHT * window.devicePixelRatio,
            color: 0x777777
        })
        groundMirror.position.y = 0.5
        groundMirror.rotateX(-Math.PI / 2)
        scene.add(groundMirror)

        const geometry2 = new THREE.PlaneBufferGeometry(100, 100)
        const verticalMirror = new Reflector(geometry2, {
            clipBias: 0.003,
            textureWidth: WIDTH * window.devicePixelRatio,
            textureHeight: HEIGHT * window.devicePixelRatio,
            color: 0x889999
        })
        verticalMirror.position.y = 50
        verticalMirror.position.z = -50
        scene.add(verticalMirror)

        setsphereGroup(sphereGroup = new THREE.Object3D())
        scene.add(sphereGroup)

        const geometry3 = new THREE.CylinderBufferGeometry(0.1, 15 * Math.cos((Math.PI / 180) * 30), 0.1, 24, 1)
        const material1 = new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x444444 })
        const sphereCap = new THREE.Mesh(geometry3, material1)
        sphereCap.position.y = -15 * Math.sin((Math.PI / 180) * 30) - 0.05
        sphereCap.rotateX(-Math.PI)

        const geometry4 = new THREE.SphereBufferGeometry(15, 24, 24, Math.PI / 2, Math.PI * 2, 0, (Math.PI / 180) * 120)
        const halfSphere = new THREE.Mesh(geometry4, material1)
        halfSphere.add(sphereCap)
        halfSphere.rotateX((-Math.PI / 180) * 135)
        halfSphere.rotateZ((-Math.PI / 180) * 20)
        halfSphere.position.y = 7.5 + 15 * Math.sin((Math.PI / 180) * 30)

        sphereGroup.add(halfSphere)

        // 跳动的球体
        const geometry5 = new THREE.IcosahedronBufferGeometry(5, 0)
        const material2 = new THREE.MeshPhongMaterial({
            color: 0xff00ff,
            emissive: 0x333333,
            flatShading: true
        })
        setsmallSphere1(smallSphere1 = new THREE.Mesh(geometry5, material2))
        setsmallSphere2(smallSphere2 = new THREE.Mesh(geometry5, material2))
        // scene.add(smallSphere1)
        scene.add(smallSphere2)

        // walls
        const planeTop = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xff0000 }))
        planeTop.position.y = 100
        planeTop.rotateX(Math.PI / 2)
        scene.add(planeTop)

        const planeBottom = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0xffffff }))
        planeBottom.rotateX(-Math.PI / 2)
        scene.add(planeBottom)

        const planeFront = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x7f7fff }))
        planeFront.position.z = 50
        planeFront.position.y = 50
        planeFront.rotateY(Math.PI)
        scene.add(planeFront)

        const planeRight = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x00ff00 }))
        planeRight.position.x = 50
        planeRight.position.y = 50
        planeRight.rotateY(-Math.PI / 2)
        scene.add(planeRight)

        const planeLeft = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({ color: 0x00ffff }))
        planeLeft.position.x = -50
        planeLeft.position.y = 50
        planeLeft.rotateY(Math.PI / 2)
        scene.add(planeLeft)

        // lights
        const mainLight = new THREE.PointLight(0xcccccc, 1.5, 250)
        mainLight.position.y = 60
        scene.add(mainLight)

        const greenLight = new THREE.PointLight(0x00ff00, 0.25, 1000)
        greenLight.position.set(550, 50, 0)
        scene.add(greenLight)

        const redLight = new THREE.PointLight(0xff0000, 0.25, 1000)
        redLight.position.set(-550, 50, 0)
        scene.add(redLight)

        const blueLight = new THREE.PointLight(0x7f7fff, 0.25, 1000)
        blueLight.position.set(0, 50, 550)
        scene.add(blueLight)

        animate()
        window.addEventListener("resize", onWindowResize)
    }
    const animate = async () => {
        requestAnimationFrame(animate)
        const timer = Date.now() * 0.01
        sphereGroup.rotation.y -= 0.002
        setsphereGroup(sphereGroup)
        smallSphere1.position.set(
            Math.cos(timer * 0.1) * 36,
            Math.abs(Math.cos(timer * 0.2)) * 20 + 5,
            Math.sin(timer * 0.1) * 36
        )


        setsmallSphere1(smallSphere1)
        smallSphere1.rotation.y -= Math.PI / 2 - timer * 0.1
        smallSphere1.rotation.z = timer * 0.8
        setsphereGroup(sphereGroup)

        smallSphere2.position.set(
            Math.cos(timer * 0.1) * 20,
            Math.abs(Math.cos(timer * 0.2)) * 20 + 5,
            Math.sin(timer * 0.1) * 20
        )

        smallSphere2.rotation.y = Math.PI / 2 - timer * 0.2
        smallSphere2.rotation.z = timer * 0.8
        setsmallSphere2(smallSphere2)

        renderer.render(scene, camera)
    }
    const onWindowResize = () => {
        const VRcontainer = document.getElementById('three02-container')
        // 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
        if (VRcontainer) {
            setWIDTH(WIDTH = VRcontainer.clientWidth)
            setHEIGHT(HEIGHT = VRcontainer.clientHeight)
            camera.aspect = WIDTH / HEIGHT
            camera.updateProjectionMatrix()
            renderer.setSize(WIDTH, HEIGHT)
        }
    }
    return <div id="three02-container" style={{ height: '100%' }}></div>

}
