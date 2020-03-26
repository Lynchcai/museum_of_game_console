import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Decoration
{
    constructor(decorations)
    {
        // Init group
        this.group = new THREE.Group()

        // Loading manager
        const loading_manager = new THREE.LoadingManager()

        loading_manager.onProgress = function(item, loaded, total){
            console.log(item, loaded, total);
        }

        loading_manager.onLoad = function(){
            console.log('success');
        }

        // Loaders
        const dracoLoader = new DRACOLoader(loading_manager)
        dracoLoader.setDecoderPath('./draco/')

        const gltfLoader = new GLTFLoader(loading_manager)
        gltfLoader.setDRACOLoader(dracoLoader)

        

        // Load model
        gltfLoader.load(
            decorations,
            (gltf) =>
            {
                let temp = gltf.scene.children.length
                for (let i = 0; i < temp; i++) {
                    this.decoration = gltf.scene.children[0]
                    this.decoration.traverse((child) => {
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
                    this.group.add(this.decoration)
                }
            }
        )
    }
}
