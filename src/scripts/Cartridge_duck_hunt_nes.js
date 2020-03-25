import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Cartridge_duck_hunt_nes
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
            'models/gltf/cartridge_duck_hunt_nes/scene.gltf',
            (gltf) =>
            {
                let temp = gltf.scene.children.length
                for (let i = 0; i < temp; i++) {
                    this.cartridge_duck_hunt_nes = gltf.scene.children[0]
                    this.cartridge_duck_hunt_nes.traverse((child) => { 
                        if ( child.isMesh ) {
                            // Shadow
                            child.castShadow = true
                            child.receiveShadow = true
                            // Matrix optimization
                            child.matrixAutoUpdate = false
                            child.updateMatrix()
                            child.material = new THREE.MeshStandardMaterial({
                                map: child.material.map,
                                color: child.material.color
                            })
                        }
                    })
                    this.group.add(this.cartridge_duck_hunt_nes)
                    this.group.scale.set(0.00004, 0.00004, 0.00004)
                }
            }
        )
    }
}