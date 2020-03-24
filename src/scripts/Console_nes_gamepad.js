import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Console_nes_gamepad
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
            '/models/gltf/console_nes_gamepad/scene.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                {
                    this.console_nes_gamepad = gltf.scene.children[0]
                    this.group.add(this.console_nes_gamepad)
                    this.group.scale.set(0.015, 0.015, 0.015)
                    this.group.position.set(0.5, 0.570, -1.1)
                    this.group.rotation.set(Math.PI/2, Math.PI, Math.PI*0.9)
                }
            }
        )
    }
}