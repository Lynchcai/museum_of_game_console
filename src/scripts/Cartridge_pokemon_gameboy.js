import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Cartridge_pokemon_gameboy
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
            '/models/gltf/cartridge_pokemon_gameboy/scene.gltf',
            (gltf) =>
            {
                let temp = gltf.scene.children.length
                for (let i = 0; i < temp; i++) {
                    this.cartridge_pokemon_gameboy = gltf.scene.children[0]
                    this.cartridge_pokemon_gameboy.traverse((child) => { 
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
                    this.group.add(this.cartridge_pokemon_gameboy)
                    this.group.scale.set(1, 1, 1)
                }
            }
        )
    }
}