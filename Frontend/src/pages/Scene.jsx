import React, { Suspense, useState, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ArrowLeft, SunMoon, Plus, Minus } from "lucide-react";

// Model component embedded directly
const Model = ({ format = "glb" }) => {
  const gltf = useLoader(GLTFLoader, "/base.glb"); // Ensure base.glb is inside public/
  return <primitive object={gltf.scene} scale={2} position={[0, -2, 0]} />;
};

// Custom camera controls component - now controls only the orbit controls
const CameraController = ({ orbitControlsRef }) => {
  return <OrbitControls ref={orbitControlsRef} enableZoom={true} />;
};

// Main component with all UI elements
const EnhancedScene = () => {
  const [theme, setTheme] = useState("dark");
  const [lightIntensity, setLightIntensity] = useState(1);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const orbitControlsRef = useRef();
  const cameraRef = useRef();
  
  // Camera zoom functions - now implemented outside the Canvas
  const handleZoomIn = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.object.position.z -= 0.5;
      orbitControlsRef.current.update();
    }
  };
  
  const handleZoomOut = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.object.position.z += 0.5;
      orbitControlsRef.current.update();
    }
  };
  
  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };
  
  const adjustLightIntensity = (value) => {
    setLightIntensity(value);
  };
  
  const handleGoBack = () => {
    // Implement navigation logic here
    console.log("Going back");
    // window.history.back(); or navigate(-1) with React Router
  };

  return (
    <div className={`h-screen w-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} relative`}>
      {/* Header with back button - now outside Canvas */}
      <div className="absolute top-6 left-6 z-10">
        <button 
          onClick={handleGoBack}
          className="bg-opacity-70 hover:bg-opacity-100 bg-gray-800 dark:bg-gray-700 p-2 rounded-md shadow-lg text-white transition-all"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Theme controls - now outside Canvas */}
      <div className="absolute bottom-6 left-6 z-10">
        <button 
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className="bg-opacity-70 hover:bg-opacity-100 bg-gray-800 dark:bg-gray-700 p-2 rounded-md shadow-lg text-white transition-all"
          aria-label="Theme settings"
        >
          <SunMoon size={24} />
        </button>
        
        {showThemeMenu && (
          <div className="absolute bottom-14 left-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="space-y-4 min-w-48">
              <div>
                <button 
                  onClick={toggleTheme}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Switch to {theme === "dark" ? "Light" : "Dark"} Theme
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Light Intensity: {lightIntensity.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={lightIntensity}
                  onChange={(e) => adjustLightIntensity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zoom controls - now outside Canvas */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn}
          className="bg-opacity-70 hover:bg-opacity-100 bg-gray-800 dark:bg-gray-700 p-2 rounded-md shadow-lg text-white transition-all"
          aria-label="Zoom in"
        >
          <Plus size={24} />
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-opacity-70 hover:bg-opacity-100 bg-gray-800 dark:bg-gray-700 p-2 rounded-md shadow-lg text-white transition-all"
          aria-label="Zoom out"
        >
          <Minus size={24} />
        </button>
      </div>

      {/* 3D Canvas - now with simplified structure */}
      <Canvas 
        camera={{ position: [0, 2, 5], ref: cameraRef }} 
        className="w-full h-full"
        style={{ background: theme === 'dark' ? '#1a202c' : '#f7fafc' }}
      >
        <ambientLight intensity={lightIntensity} />
        <directionalLight position={[5, 5, 5]} intensity={lightIntensity * 2} castShadow />
        <pointLight position={[-5, -5, 5]} intensity={lightIntensity * 1.5} />
        <hemisphereLight 
          skyColor={theme === "dark" ? "#334155" : "#ffffff"} 
          groundColor={theme === "dark" ? "#1e293b" : "#e2e8f0"} 
          intensity={lightIntensity * 0.8} 
        />
        <Suspense fallback={null}>
          <Model format="glb" />
        </Suspense>
        <CameraController orbitControlsRef={orbitControlsRef} />
      </Canvas>
    </div>
  );
};

export default EnhancedScene;