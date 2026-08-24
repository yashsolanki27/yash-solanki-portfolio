"use client";

import { useEffect, useRef } from "react";

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let THREE, scene, camera, renderer, mesh, geo, mat, animId;
    let disposed = false;
    let running = false;
    let inView = true;

    function startLoop() {
      if (running || !renderer || !inView || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(animate);
    }

    function stopLoop() {
      running = false;
      cancelAnimationFrame(animId);
    }

    let t = 0;
    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.003;
      mesh.rotation.x = t * 0.3;
      mesh.rotation.y = t * 0.5;
      renderer.render(scene, camera);
    }

    function onResize() {
      if (!canvas || !renderer || !camera) return;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    function onVisibility() {
      if (document.hidden) stopLoop();
      else startLoop();
    }

    async function init() {
      THREE = await import("three");
      if (disposed) return;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.z = 4;

      geo = new THREE.SphereGeometry(1.6, 32, 32);
      mat = new THREE.MeshBasicMaterial({
        color: 0xd97320,
        wireframe: true,
        transparent: true,
        opacity: 0.07,
      });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);

      startLoop();
    }

    init();

    return () => {
      disposed = true;
      stopLoop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geo?.dispose();
      mat?.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss?.();
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
      aria-hidden="true"
    />
  );
}
