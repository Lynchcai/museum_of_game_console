import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Room
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
            '/models/gltf/room2/BoyRoom.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                {
                    this.room = gltf.scene.children[0]
                    this.group.add(this.room)
                    this.group.scale.set(1, 1, 1)
                }
            }
        )
    }
}