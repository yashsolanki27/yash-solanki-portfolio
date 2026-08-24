"use client";

import { useEffect, useRef } from "react";

export default function CinematicLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let THREE, scene, camera, renderer, particles, geo, mat, animId;
    let disposed = false;
    let running = false;
    let inView = true;
    let mouse = { x: 0, y: 0 };
    let t = 0;

    function startLoop() {
      if (running || !renderer || !inView || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(animate);
    }

    function stopLoop() {
      running = false;
      cancelAnimationFrame(animId);
    }

    function animate() {
      animId = requestAnimationFrame(animate);
      t += 0.0004;
      particles.rotation.y = t * 0.06 + mouse.x * 0.04;
      particles.rotation.x = mouse.y * 0.025;
      const posArr = geo.attributes.position.array;
      for (let i = 0; i < posArr.length / 3; i++) {
        posArr[i * 3 + 1] += Math.sin(t * 0.8 + i * 0.3) * 0.0008;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }

    function onMouse(e) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
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
      camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.z = 5;

      const count = 280;
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        sizes[i] = Math.random() * 18 + 4;

        const warm = Math.random() > 0.45;
        if (warm) {
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 0.6 + Math.random() * 0.3;
          colors[i * 3 + 2] = 0.2 + Math.random() * 0.2;
        } else {
          colors[i * 3] = 0.95;
          colors[i * 3 + 1] = 0.95;
          colors[i * 3 + 2] = 1.0;
        }
      }

      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      mat = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(geo, mat);
      scene.add(particles);

      window.addEventListener("mousemove", onMouse);
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);

      startLoop();
    }

    init();

    return () => {
      disposed = true;
      stopLoop();
      window.removeEventListener("mousemove", onMouse);
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
        zIndex: 3,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
