import * as THREE from 'three'
import font from 'three/examples/fonts/helvetiker_bold.typeface.json'

export default class Text
{
    constructor()
    {
        // Init group
        this.group = new THREE.Group()

        const text_material = new THREE.MeshNormalMaterial()
        const text_geometry = new THREE.TextGeometry(
            'Lorem ipsum dolor sit amet, consectetur adipiscing \nelit, sed do eiusmod tempor incididunt ut labore et\ndolore magna aliqua. Ut enim ad minim veniam, quis\nnostrud exercitation ullamco laboris nisi ut aliquip\nex ea commodo consequat. Duis aute irure dolor in\nreprehenderit in voluptate velit esse cillum dolore\neu fugiat nulla pariatur. Excepteur sint occaecat\ncupidatat non proident, sunt in culpa qui officia\ndeserunt mollit anim id est laborum.',
             {
                font: new THREE.Font(font),
                size: 0.03,
                height: 0.001,
                curveSegments: 6,
                bevelEnabled: false,
                bevelThickness: 0.02,
                bevelSize: 0.01,
                bevelOffset: - 0.02,
                bevelSegments: 10
             }
        )
    const text_mesh = new THREE.Mesh(text_geometry, text_material)
    this.group.add(text_mesh)
    }
}
