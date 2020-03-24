import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Console_gameboy
{
    constructor()
    {
        // Init group
        this.group = new THREE.Group()

        // Loaders
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        // Load model
        gltfLoader.load(
            '/models/gltf/console_gameboy/scene.gltf',
            (gltf) =>
            {
                let temp = gltf.scene.children.length
                for (let i = 0; i < temp; i++) {
                    this.console_gameboy = gltf.scene.children[0]
                    this.console_gameboy.traverse((child) => { 
                        if ( child.isMesh ) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            child.material = new THREE.MeshStandardMaterial({
                                color: child.material.color
                            })
                        }
                    })
                    this.group.add(this.console_gameboy)
                    this.group.scale.set(0.01, 0.01, 0.01)
                    this.group.position.set(0.6, 1.08, -1.0)
                    this.group.rotation.set(0, Math.PI*0.5, 0)
                }
            }
        )
    }
}