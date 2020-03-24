import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Console_wii_gamepad
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
            '/models/gltf/console_wii_gamepad/scene.gltf',
            (gltf) =>
            {
                let temp = gltf.scene.children.length
                for (let i = 0; i < temp; i++) {
                    this.console_wii_gamepad = gltf.scene.children[0]
                    this.group.add(this.console_wii_gamepad)
                    this.group.scale.set(0.1, 0.1, 0.1)
                    this.group.position.set(0, 2.5, 10)
                    this.group.rotation.set(0, Math.PI*0.5, 0)
                }
            }
        )
    }
}