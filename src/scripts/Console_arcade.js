import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Console_arcade
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
            '/models/gltf/console_arcade/scene.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                {
                    console.log(gltf.scene)
                    this.console_arcade = gltf.scene.children[0]
                    this.console_arcade.material = new THREE.MeshToonMaterial(
                        {
                            color: 0xff00ff,
                            normalMap: this.console_arcade.normalMap,
                            side: THREE.DoubleSide
                        }
                    )







                    this.group.add(this.console_arcade)
                    this.group.scale.set(0.01, 0.01, 0.01)
                    this.group.position.set(10, 0, 0)
                }
            }
        )
    }
}