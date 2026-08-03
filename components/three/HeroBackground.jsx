"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE, scene, camera, renderer, mesh, animId;

    async function init() {
      THREE = await import("three");

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.z = 4;

      const geo = new THREE.SphereGeometry(1.6, 32, 32);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xd97320,
        wireframe: true,
        transparent: true,
        opacity: 0.07,
      });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      window.addEventListener("resize", onResize);

      let t = 0;
      function animate() {
        animId = requestAnimationFrame(animate);
        t += 0.003;
        mesh.rotation.x = t * 0.3;
        mesh.rotation.y = t * 0.5;
        renderer.render(scene, camera);
      }
      animate();
    }

    function onResize() {
      if (!canvas || !renderer || !camera) return;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    init();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.6,
      }}
    />
  );
}
