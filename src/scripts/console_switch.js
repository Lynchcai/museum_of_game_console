import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Console_switch
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
            '/models/gltf/console_switch_and_gamepad/scene.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                {
                    this.console_switch = gltf.scene.children[0]
                    this.group.add(this.console_switch)
                    this.group.scale.set(0.01, 0.01, 0.01)
                    this.group.position.set(-1, 0.951, -1.0)
                    this.group.rotation.set(0, Math.PI*0.1, 0)
                }
            }
        )
    }
}