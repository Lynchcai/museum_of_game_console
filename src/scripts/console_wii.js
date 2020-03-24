import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Console_wii
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
            '/models/gltf/console_wii/scene.gltf',
            (gltf) =>
            {
                let temp = gltf.scene.children.length
                for (let i = 0; i < temp; i++) {
                    this.console_wii = gltf.scene.children[0]
                    this.console_wii.traverse((child) => { 
                        child.castShadow = true
                        child.receiveShadow = true
                        child.needsUpdate = true
                    })
                    this.group.add(this.console_wii)
                    this.group.scale.set(0.06, 0.06, 0.06)
                }
            }
        )
    }
}