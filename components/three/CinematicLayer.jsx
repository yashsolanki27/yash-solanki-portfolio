"use client";

import { useEffect, useRef } from "react";

export default function CinematicLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE, scene, camera, renderer, particles, animId;
    let mouse = { x: 0, y: 0 };

    async function init() {
      THREE = await import("three");

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

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
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

      let t = 0;
      function animate() {
        animId = requestAnimationFrame(animate);
        t += 0.0004;
        particles.rotation.y = t * 0.06 + mouse.x * 0.04;
        particles.rotation.x = mouse.y * 0.025;
        const posArr = geo.attributes.position.array;
        for (let i = 0; i < count; i++) {
          posArr[i * 3 + 1] += Math.sin(t * 0.8 + i * 0.3) * 0.0008;
        }
        geo.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      }
      animate();
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

    init();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
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
        zIndex: 3,
        pointerEvents: "none",
      }}
    />
  );
}
