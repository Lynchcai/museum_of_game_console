import * as THREE from 'three'
import font from 'three/examples/fonts/helvetiker_bold.typeface.json'

export default class Text
{
    constructor(texts)
    {
        // Init group
        this.group = new THREE.Group()

        const text_material = new THREE.MeshBasicMaterial({ color: 0xD1D1D1})
        const text_geometry = new THREE.TextGeometry(
            texts,
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
    this.group.visible = false
    this.group.add(text_mesh)
    }
}
