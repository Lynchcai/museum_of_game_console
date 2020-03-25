import * as THREE from 'three'
import font from '../style/fonts/Nintendo_DS_BIOS_Regular.json'

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
    this.group.position.x = -0.73
    this.group.position.y = 1.65
    this.group.position.z = -1.03
    this.group.visible = false
    this.group.add(text_mesh)
    }
}
