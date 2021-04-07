import React, { useEffect, useState } from "react";
import * as Three from "three";
export default () => {
  let [camera, setcamera] = useState(null);
  let [scene, setscene] = useState(null);
  let [renderer, setrenderer] = useState(null);
  let [mesh, setmesh] = useState(null);
  let [WIDTH, setWIDTH] = useState(null);
  let [HEIGHT, setHEIGHT] = useState(null);
  let [animationFrameId, setanimationFrameId] = useState(null);
  useEffect(() => {
    init();
    setTimeout(onWindowResize, 0);
    window.onresize = () => onWindowResize();
    return () => {
      clearFunc();
    };
  }, []);
  const init = async () => {
    const container = document.getElementById("three01-container");
    const ratio = container.clientWidth / container.clientHeight;
    const cameraTemp = new Three.PerspectiveCamera(70, ratio, 0.01, 10);
    cameraTemp.position.z = 0.6;
    setcamera((camera = cameraTemp));
    setscene((scene = new Three.Scene()));
    const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
    const material = new Three.MeshNormalMaterial();
    setmesh((mesh = new Three.Mesh(geometry, material)));
    scene.add(mesh);
    setrenderer((renderer = new Three.WebGLRenderer({ antialias: true })));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    animate();
  };
  const animate = async () => {
    setanimationFrameId((animationFrameId = requestAnimationFrame(animate)));
    let dataMesh = mesh;
    dataMesh.rotation.x += 0.01;
    dataMesh.rotation.y += 0.02;
    setmesh((mesh = dataMesh));
    renderer.render(scene, camera);
  };
  const clearFunc = () => {
    animationFrameId && cancelAnimationFrame(animationFrameId);
  };
  const onWindowResize = () => {
    setTimeout(() => {
      const VRcontainer = document.getElementById("three01-container");
      // 加if判断防止事件监听在离开本页面后因获取不到VRcontainer而报错
      if (VRcontainer) {
        setWIDTH((WIDTH = VRcontainer.clientWidth));
        setHEIGHT((HEIGHT = VRcontainer.clientHeight));
        renderer.setSize(WIDTH, HEIGHT);
      }
    }, 500);
  };
  return <div id="three01-container" style={{ height: "100%" }} />;
};
