import * as THREE from 'three'
export default class Poster
{
    constructor(image_url)
    {
        // Init group
        this.group = new THREE.Group()

        // image DOM
        this.$image = document.createElement('image')
        this.$image.src = image_url
        this.$image.type = "image/jpg"
        document.querySelector('body').appendChild(this.$image)
        
        // Texture
        const image_texture = new THREE.TextureLoader().load(image_url)
        // Material
        const image_material = new THREE.MeshToonMaterial ({ map: image_texture})
        
        // Object
        const image_geometry = new THREE.PlaneGeometry( 240, 135, 4, 4) // 16:9
        this.image = new THREE.Mesh( image_geometry, image_material)

        this.group.add(this.image)
    }
}