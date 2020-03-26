import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { log, MeshBasicMaterial } from 'three'

export default class Room
{
    constructor()
    {
        // Init group
        this.group = new THREE.Group()

        // Loading manager
        this.loading_manager = new THREE.LoadingManager()
        this.loaded = false

        this.loading_manager.onLoad = ()=>{
            this.loaded = true
        }

        // Loaders
        const dracoLoader = new DRACOLoader(this.loading_manager)
        dracoLoader.setDecoderPath('./draco/')

        const gltfLoader = new GLTFLoader(this.loading_manager)
        gltfLoader.setDRACOLoader(dracoLoader)

        // Load model
        gltfLoader.load(
            './models/gltf/room/Room.gltf',
            (gltf) =>
            {   
                let temp = gltf.scene.children.length
                for (let i = 0; i < temp; i++) {
                    this.room = gltf.scene.children[0]
                    this.room.traverse((child) => { 
                        if ( child.isMesh ) {
                            // Shadow
                            child.castShadow = true
                            child.receiveShadow = true
                            // Matrix optimization
                            child.matrixAutoUpdate = false
                            child.updateMatrix()
                            child.material = new THREE.MeshStandardMaterial({
                                color: child.material.color,
                                map: child.material.map
                            })
                        }
                    })
                    this.group.add(this.room)
                    this.group.scale.set(1, 1, 1)
                }
            }
        )
    }
}