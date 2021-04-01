import * as React from "react";
import { useEffect, useRef, useState } from "react";
import * as Three from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import tableEl from "./elements";
import "./index.less";
export default () => {
  let [camera, setcamera] = useState(null);
  let [scene, setscene] = useState(null);
  let [renderer, setrenderer] = useState(null);
  let [WIDTH, setWIDTH] = useState(null);
  let [HEIGHT, setHEIGHT] = useState(null);
  let [paused, setpaused] = useState(false);
  let [idx, setidx] = useState(0);
  let [button1, setbutton1] = useState(null);
  let [button2, setbutton2] = useState(null);
  let [button3, setbutton3] = useState(null);
  let [button4, setbutton4] = useState(null);
  let [table, settable] = useState(null);
  let [targets, settargets] = useState(null);
  let [controls, setcontrols] = useState(null);
  let [animationFrameId, setanimationFrameId] = useState(null);
  const objects: any[] = [];
  const domArray: any[] = [];
  const timer = useRef(null);
  useEffect(() => {
    settable((table = tableEl));
    settargets((targets = { table: [], sphere: [], helix: [], grid: [] }));
    init();
    animate();
    setTimeout(onWindowResize, 0);
    return () => {
      clearFunc();
      myClearInterval(timer);
      window.removeEventListener("resize", onWindowResize, false);
    };
  }, []);
  const myClearInterval = (timer: any) => {
    clearInterval(timer.current);
    timer.current = null;
  };
  const toggle = () => {
    setpaused((paused = !paused));
    paused ? swiperItem() : myClearInterval(timer);
  };
  const swiperItem = () => {
    timer.current = setInterval(() => {
      console.log("setInterval");
      idx < 3 ? setidx((idx = idx + 1)) : setidx((idx = 0));
      [button1, button2, button3, button4][idx].click();
    }, 7000);
  };
  const init = () => {
    const container = document.getElementById("three03-container");
    setWIDTH((WIDTH = container.clientWidth));
    setHEIGHT((HEIGHT = container.clientHeight));
    setcamera(
      (camera = new Three.PerspectiveCamera(40, WIDTH / HEIGHT, 1, 10000))
    );
    camera.position.z = 3000;
    setscene((scene = new Three.Scene()));
    // table
    for (let i = 0; i < table.length; i += 5) {
      const element: any = document.createElement("div");
      element.className = "element";
      element.style.backgroundColor =
        "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

      const number: any = document.createElement("div");
      number.className = "number";
      number.textContent = i / 5 + 1;
      element.appendChild(number);

      const symbol: any = document.createElement("div");
      symbol.className = "symbol";
      symbol.textContent = table[i];
      element.appendChild(symbol);

      const details: any = document.createElement("div");
      details.className = "details";
      details.innerHTML = table[i + 1] + "<br>" + table[i + 2];
      element.appendChild(details);

      const object1 = new CSS3DObject(element);
      object1.position.x = Math.random() * 4000 - 2000;
      object1.position.y = Math.random() * 4000 - 2000;
      object1.position.z = Math.random() * 4000 - 2000;
      scene.add(object1);
      objects.push(object1);
      const object2 = new Three.Object3D();
      object2.position.x = table[i + 3] * 140 - 1330;
      object2.position.y = -(table[i + 4] * 180) + 990;
      targets.table.push(object2);
    }
    // sphere
    const vector1 = new Three.Vector3();
    for (let i = 0, l = objects.length; i < l; i++) {
      const phi = Math.acos(-1 + (2 * i) / l);
      const theta = Math.sqrt(l * Math.PI) * phi;
      const object12 = new Three.Object3D();
      object12.position.setFromSphericalCoords(800, phi, theta);
      vector1.copy(object12.position).multiplyScalar(2);
      object12.lookAt(vector1);
      targets.sphere.push(object12);
    }
    // helix
    const vector2 = new Three.Vector3();
    for (let i = 0, l = objects.length; i < l; i++) {
      const theta = i * 0.175 + Math.PI;
      const y = -(i * 8) + 450;
      const object22 = new Three.Object3D();
      object22.position.setFromCylindricalCoords(900, theta, y);
      vector2.x = object22.position.x * 2;
      vector2.y = object22.position.y;
      vector2.z = object22.position.z * 2;
      object22.lookAt(vector2);
      targets.helix.push(object22);
    }
    // grid
    for (let i = 0; i < objects.length; i++) {
      const object3 = new Three.Object3D();
      object3.position.x = (i % 5) * 400 - 800;
      object3.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
      object3.position.z = Math.floor(i / 25) * 1000 - 2000;
      targets.grid.push(object3);
    }
    //
    setrenderer((renderer = new CSS3DRenderer()));
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);
    //
    setcontrols(
      (controls = new TrackballControls(camera, renderer.domElement))
    );

    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener("change", render);

    setbutton1((button1 = document.getElementById("table")));
    setbutton2((button2 = document.getElementById("sphere")));
    setbutton3((button3 = document.getElementById("helix")));
    setbutton4((button4 = document.getElementById("grid")));
    // 默认为表格
    !domArray.some((domi: any) => {
      return button1 === domi;
    }) && domArray.push(button1);
    toggleActiveClass(button1);
    addButtonListerner(button1, "table", 0);
    addButtonListerner(button2, "sphere", 1);
    addButtonListerner(button3, "helix", 2);
    addButtonListerner(button4, "grid", 3);
    transform(targets.table, 2000);
    window.addEventListener("resize", onWindowResize, false);
  };
  const addButtonListerner = (btn: any, type: string, index: number) => {
    btn.addEventListener(
      "click",
      () => {
        setidx((idx = index));
        transform(targets[type], 2000);
        !domArray.some((domi: any) => {
          return btn === domi;
        }) && domArray.push(btn);
        toggleActiveClass(btn);
      },
      false
    );
  };
  const transform = (targets: any, duration: number) => {
    TWEEN.removeAll();
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      const target = targets[i];

      new TWEEN.Tween(object.position)
        .to(
          { x: target.position.x, y: target.position.y, z: target.position.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

      new TWEEN.Tween(object.rotation)
        .to(
          { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    }

    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(render)
      .start();
  };
  const onWindowResize = () => {
    setTimeout(() => {
      const container = document.getElementById("three03-container");
      setWIDTH((WIDTH = container.clientWidth));
      setHEIGHT((HEIGHT = container.clientHeight));
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
      renderer.setSize(WIDTH, HEIGHT);
      render();
    }, 500);
  };
  const clearFunc = () => {
    animationFrameId && cancelAnimationFrame(animationFrameId);
  };
  const animate = () => {
    setanimationFrameId((animationFrameId = requestAnimationFrame(animate)));
    TWEEN.update();
    controls.update();
  };
  const render = () => {
    renderer.render(scene, camera);
  };
  const toggleActiveClass = (dom: any) => {
    domArray.forEach((domItem: any) => {
      domItem.className = "";
    });
    dom.className = "active";
  };
  return (
    <div className="three03-container-wrapper">
      <div id="three03-container"></div>
      <div id="three03-container-ctrl">
        {/*  */}
        <i
          style={{ cursor: "pointer", fontSize: "24px" }}
          title="点击播放"
          className={`iconfont ${paused ? "xl-icon-pause" : "xl-icon-start"}`}
          onClick={() => toggle()}
        ></i>
      </div>
      <div id="three03-container-menu">
        <button id="table">TABLE</button>
        <button id="sphere">SPHERE</button>
        <button id="helix">HELIX</button>
        <button id="grid">GRID</button>
      </div>
    </div>
  );
};
