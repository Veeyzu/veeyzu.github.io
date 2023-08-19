import * as THREE from './node_modules/three/build/three.module.js'
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scenePath = '/Assets/BioWorkspace.gltf'

export const LoadGLTFByPath = (scene) => {
    return new Promise((resolve, reject) => {
      // Create a loader
      const loader = new GLTFLoader();
  
      // Load the GLTF file
      loader.load(scenePath, (gltf) => {

        scene.add(gltf.scene);

        resolve();
      }, undefined, (error) => {
        reject(error);
      });
    });
};