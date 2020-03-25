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
        this.$image.load()
        document.querySelector('body').appendChild(this.$image)
        
        // Texture
        const image_texture = new THREE.ImageLoader(this.$image)
        image_texture.minFilter = THREE.LinearFilter
        image_texture.magFilter = THREE.LinearFilter
        image_texture.format = THREE.RGBFormat

        // Material
        const image_material = new THREE.MeshBasicMaterial ({ map: image_texture})
        
        // Object
        const image_geometry = new THREE.PlaneGeometry( 240, 135, 4, 4) // 16:9
        this.image = new THREE.Mesh( image_geometry, image_material)
        this.image.position.set(-0.22, 1.4, -1.032)
        this.image.scale.set(0.0045, 0.0045, 0.0045)

        this.group.add(this.image)
    }
    play(){
        this.$image.play()
    }
}