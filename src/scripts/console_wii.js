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
                while(gltf.scene.children.length)
                {
                    console.log(gltf.scene)
                    this.console_wii = gltf.scene.children[0]
                    this.group.add(this.console_wii)
                    this.group.scale.set(0.01, 0.01, 0.01)
                    this.group.position.set(10, 0, 0)
                }
            }
        )
    }
}